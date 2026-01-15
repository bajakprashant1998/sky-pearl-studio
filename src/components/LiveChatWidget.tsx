import { useState } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 Welcome to Digital Bull. How can we help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const quickReplies = [
    "Tell me about your services",
    "I need SEO help",
    "Get a free consultation",
    "Pricing information",
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "Thanks for reaching out! Our team will get back to you shortly. For immediate assistance, you can also call us at +91 98240 11921 or email hello@digitalbull.co.in",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    handleSend();
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
                <h3 className="font-semibold">Digital Bull Support</h3>
                <p className="text-xs text-blue-100">Usually replies instantly</p>
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
                message.isBot ? "justify-start" : "justify-end"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] px-4 py-2 rounded-2xl text-sm",
                  message.isBot
                    ? "bg-white text-slate-800 shadow-sm rounded-tl-none"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none"
                )}
              >
                {message.text}
              </div>
            </div>
          ))}

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const userMessage: Message = {
                      id: messages.length + 1,
                      text: reply,
                      isBot: false,
                      timestamp: new Date(),
                    };
                    setMessages((prev) => [...prev, userMessage]);

                    setTimeout(() => {
                      const botResponse: Message = {
                        id: messages.length + 2,
                        text: "Thanks for your interest! Our team will connect with you shortly to discuss this further. You can also schedule a free consultation through our contact form.",
                        isBot: true,
                        timestamp: new Date(),
                      };
                      setMessages((prev) => [...prev, botResponse]);
                    }, 1000);
                  }}
                  className="px-3 py-1.5 text-xs bg-white border border-blue-200 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}
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
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            Powered by Digital Bull Technology
          </p>
        </div>
      </div>
    </>
  );
};

export default LiveChatWidget;
