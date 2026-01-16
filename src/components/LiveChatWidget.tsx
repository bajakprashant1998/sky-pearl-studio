import { useState, useEffect, useRef, useMemo } from "react";
import { MessageCircle, X, Send, Minimize2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { createChatClient } from "@/lib/supabaseChat";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  is_bot: boolean;
  created_at: string;
}

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [sessionId] = useState(() => {
    const stored = localStorage.getItem("chat_session_id");
    if (stored) return stored;
    const newId = crypto.randomUUID();
    localStorage.setItem("chat_session_id", newId);
    return newId;
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Create a Supabase client with the session ID header for RLS
  const supabase = useMemo(() => createChatClient(sessionId), [sessionId]);

  const quickReplies = [
    "Tell me about your services",
    "I need SEO help",
    "Get a free consultation",
    "Pricing information",
  ];

  // Initialize conversation and load existing messages
  useEffect(() => {
    const initConversation = async () => {
      // Try to find existing conversation
      const { data: existingConv } = await supabase
        .from("chat_conversations")
        .select("id")
        .eq("session_id", sessionId)
        .maybeSingle();

      if (existingConv) {
        setConversationId(existingConv.id);
        // Load existing messages
        const { data: existingMessages } = await supabase
          .from("chat_messages")
          .select("*")
          .eq("conversation_id", existingConv.id)
          .order("created_at", { ascending: true });

        if (existingMessages && existingMessages.length > 0) {
          setMessages(existingMessages);
        } else {
          // Add welcome message
          addWelcomeMessage(existingConv.id);
        }
      } else {
        // Create new conversation
        const { data: newConv, error } = await supabase
          .from("chat_conversations")
          .insert({ session_id: sessionId })
          .select()
          .single();

        if (newConv) {
          setConversationId(newConv.id);
          addWelcomeMessage(newConv.id);
        }
      }
    };

    initConversation();
  }, [sessionId]);

  const addWelcomeMessage = async (convId: string) => {
    const welcomeMessage = {
      conversation_id: convId,
      content: "Hi there! 👋 Welcome to Digital Bull. How can we help you grow your business today?",
      is_bot: true,
    };

    const { data } = await supabase
      .from("chat_messages")
      .insert(welcomeMessage)
      .select()
      .single();

    if (data) {
      setMessages([data]);
    }
  };

  // Subscribe to realtime messages
  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`chat-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => {
            // Avoid duplicates
            if (prev.some((m) => m.id === newMessage.id)) return prev;
            return [...prev, newMessage];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText || !conversationId || isLoading) return;

    setInputValue("");
    setIsLoading(true);

    try {
      // Save user message
      const { data: userMsg } = await supabase
        .from("chat_messages")
        .insert({
          conversation_id: conversationId,
          content: messageText,
          is_bot: false,
        })
        .select()
        .single();

      // Get AI response
      const conversationHistory = messages.map((m) => ({
        role: m.is_bot ? "assistant" : "user",
        content: m.content,
      }));

      const response = await supabase.functions.invoke("chat", {
        body: { message: messageText, conversationHistory },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const aiResponse = response.data?.response || "Sorry, I couldn't process that. Please try again.";

      // Save bot response
      await supabase.from("chat_messages").insert({
        conversation_id: conversationId,
        content: aiResponse,
        is_bot: true,
      });
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-24 z-50 p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center group",
          isOpen
            ? "bg-slate-600 hover:bg-slate-700"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        )}
        aria-label={isOpen ? "Close chat" : "Open live chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </>
        )}
        {!isOpen && (
          <span className="absolute right-full mr-3 bg-white text-slate-800 px-3 py-1 rounded-lg text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            Chat with us
          </span>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl transition-all duration-300 transform origin-bottom-right overflow-hidden",
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/dibull_logo.png"
                  alt="Digital Bull"
                  className="w-10 h-10 rounded-full bg-white p-1"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <h3 className="font-semibold">Digital Bull AI Assistant</h3>
                <p className="text-xs text-blue-100">Powered by AI • Usually replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[300px] overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.is_bot ? "justify-start" : "justify-end"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] px-4 py-2 rounded-2xl text-sm",
                  message.is_bot
                    ? "bg-white text-slate-800 shadow-sm rounded-tl-none"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-slate-800 shadow-sm rounded-2xl rounded-tl-none px-4 py-2">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              </div>
            </div>
          )}

          {/* Quick Replies */}
          {messages.length === 1 && !isLoading && (
            <div className="flex flex-wrap gap-2 mt-4">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(reply)}
                  className="px-3 py-1.5 text-xs bg-white border border-blue-200 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 rounded-full border-slate-200 focus:border-blue-500"
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSend()}
              size="icon"
              className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              disabled={isLoading || !inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            Powered by Digital Bull AI
          </p>
        </div>
      </div>
    </>
  );
};

export default LiveChatWidget;
