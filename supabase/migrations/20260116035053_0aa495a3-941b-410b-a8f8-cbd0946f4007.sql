-- Remove unused chat tables since the chat feature is not implemented
-- This eliminates dead database objects and security warnings

-- Drop policies first
DROP POLICY IF EXISTS "Deny direct select on chat_messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Deny direct insert on chat_messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Deny direct update on chat_messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Deny direct delete on chat_messages" ON public.chat_messages;

DROP POLICY IF EXISTS "Deny direct select on chat_conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Deny direct insert on chat_conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Deny direct update on chat_conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Deny direct delete on chat_conversations" ON public.chat_conversations;

-- Drop tables (chat_messages first due to foreign key dependency)
DROP TABLE IF EXISTS public.chat_messages;
DROP TABLE IF EXISTS public.chat_conversations;