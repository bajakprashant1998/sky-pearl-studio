-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can view conversations by session" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can create conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can view messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.chat_messages;

-- Create session-based RLS policies for chat_conversations
-- Users can only view conversations that match their session_id (passed via request header)
CREATE POLICY "Users can view own conversations by session" 
ON public.chat_conversations 
FOR SELECT 
USING (session_id = current_setting('request.headers', true)::json->>'x-session-id');

-- Users can create conversations with their session_id
CREATE POLICY "Users can create own conversations" 
ON public.chat_conversations 
FOR INSERT 
WITH CHECK (session_id = current_setting('request.headers', true)::json->>'x-session-id');

-- Create session-based RLS policies for chat_messages
-- Users can only view messages from their own conversations
CREATE POLICY "Users can view messages from own conversations" 
ON public.chat_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.chat_conversations 
    WHERE id = chat_messages.conversation_id 
    AND session_id = current_setting('request.headers', true)::json->>'x-session-id'
  )
);

-- Users can insert messages into their own conversations
CREATE POLICY "Users can insert messages to own conversations" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.chat_conversations 
    WHERE id = chat_messages.conversation_id 
    AND session_id = current_setting('request.headers', true)::json->>'x-session-id'
  )
);