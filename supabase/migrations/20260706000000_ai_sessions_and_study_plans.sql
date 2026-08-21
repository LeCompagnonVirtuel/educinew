-- Migration: Create ai_sessions and study_plans tables for AI features
-- These tables support the AI dashboard and study plan pages

-- AI Sessions table: tracks user interactions with the AI assistant
CREATE TABLE IF NOT EXISTS public.ai_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  session_type TEXT NOT NULL DEFAULT 'chat' CHECK (session_type IN ('chat', 'explain', 'quiz', 'summarize')),
  subject TEXT,
  messages_count INTEGER NOT NULL DEFAULT 0,
  score NUMERIC(5,2),
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Study Plans table: stores AI-generated study plans for users
CREATE TABLE IF NOT EXISTS public.study_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Plan d''étude personnalisé',
  description TEXT,
  subjects TEXT[] NOT NULL DEFAULT '{}',
  plan_data JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ai_sessions_user_id ON public.ai_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_sessions_school_id ON public.ai_sessions(school_id);
CREATE INDEX IF NOT EXISTS idx_ai_sessions_created_at ON public.ai_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_study_plans_user_id ON public.study_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_study_plans_school_id ON public.study_plans(school_id);
CREATE INDEX IF NOT EXISTS idx_study_plans_status ON public.study_plans(status);

-- RLS
ALTER TABLE public.ai_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;

-- AI Sessions policies
CREATE POLICY "ai_sessions_select_own" ON public.ai_sessions
  FOR SELECT USING (
    auth.uid() = user_id
    OR public.is_super_admin()
    OR (school_id IS NOT NULL AND school_id = public.get_user_school_id())
  );

CREATE POLICY "ai_sessions_insert_own" ON public.ai_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ai_sessions_update_own" ON public.ai_sessions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "ai_sessions_delete_own" ON public.ai_sessions
  FOR DELETE USING (auth.uid() = user_id OR public.is_super_admin());

-- Study Plans policies
CREATE POLICY "study_plans_select_own" ON public.study_plans
  FOR SELECT USING (
    auth.uid() = user_id
    OR public.is_super_admin()
    OR (school_id IS NOT NULL AND school_id = public.get_user_school_id())
  );

CREATE POLICY "study_plans_insert_own" ON public.study_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "study_plans_update_own" ON public.study_plans
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "study_plans_delete_own" ON public.study_plans
  FOR DELETE USING (auth.uid() = user_id OR public.is_super_admin());

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_ai_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER set_ai_sessions_updated_at
  BEFORE UPDATE ON public.ai_sessions
  FOR EACH ROW EXECUTE FUNCTION public.handle_ai_updated_at();

CREATE TRIGGER set_study_plans_updated_at
  BEFORE UPDATE ON public.study_plans
  FOR EACH ROW EXECUTE FUNCTION public.handle_ai_updated_at();

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.study_plans;
