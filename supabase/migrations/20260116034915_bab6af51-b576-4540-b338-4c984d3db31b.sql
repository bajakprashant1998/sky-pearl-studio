-- Fix security vulnerability: Replace insecure session-based RLS with deny-all policies
-- The x-session-id header approach is vulnerable to spoofing

-- Drop existing vulnerable policies on chat_conversations
DROP POLICY IF EXISTS "Users can create own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can view own conversations by session" ON public.chat_conversations;

-- Drop existing vulnerable policies on chat_messages
DROP POLICY IF EXISTS "Users can insert messages to own conversations" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can view messages from own conversations" ON public.chat_messages;

-- Create secure deny-all policies for chat_conversations
-- Direct client access is denied; use edge functions with service role for chat operations
CREATE POLICY "Deny direct select on chat_conversations"
ON public.chat_conversations
FOR SELECT
USING (false);

CREATE POLICY "Deny direct insert on chat_conversations"
ON public.chat_conversations
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Deny direct update on chat_conversations"
ON public.chat_conversations
FOR UPDATE
USING (false);

CREATE POLICY "Deny direct delete on chat_conversations"
ON public.chat_conversations
FOR DELETE
USING (false);

-- Create secure deny-all policies for chat_messages
CREATE POLICY "Deny direct select on chat_messages"
ON public.chat_messages
FOR SELECT
USING (false);

CREATE POLICY "Deny direct insert on chat_messages"
ON public.chat_messages
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Deny direct update on chat_messages"
ON public.chat_messages
FOR UPDATE
USING (false);

CREATE POLICY "Deny direct delete on chat_messages"
ON public.chat_messages
FOR DELETE
USING (false);