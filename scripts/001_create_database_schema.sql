-- Create profiles table for user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  student_id TEXT,
  university TEXT,
  year_of_study INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assessments table for mental health evaluations
CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stress_level INTEGER NOT NULL CHECK (stress_level >= 1 AND stress_level <= 10),
  anxiety_level INTEGER NOT NULL CHECK (anxiety_level >= 1 AND anxiety_level <= 10),
  depression_level INTEGER NOT NULL CHECK (depression_level >= 1 AND depression_level <= 10),
  sleep_quality INTEGER NOT NULL CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
  academic_pressure INTEGER NOT NULL CHECK (academic_pressure >= 1 AND academic_pressure <= 10),
  social_support INTEGER NOT NULL CHECK (social_support >= 1 AND social_support <= 10),
  coping_mechanisms TEXT[],
  additional_concerns TEXT,
  overall_score INTEGER,
  risk_level TEXT CHECK (risk_level IN ('low', 'moderate', 'high', 'severe')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ai_companions table for assigned companions
CREATE TABLE IF NOT EXISTS public.ai_companions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  companion_type TEXT NOT NULL CHECK (companion_type IN ('supportive', 'motivational', 'mindful', 'academic')),
  companion_name TEXT NOT NULL,
  companion_description TEXT NOT NULL,
  personality_traits TEXT[],
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Create conversations table for chat history
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  companion_id UUID NOT NULL REFERENCES public.ai_companions(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'companion')),
  sentiment_score DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resources table for wellbeing resources
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('mindfulness', 'exercise', 'study_tips', 'sleep', 'nutrition', 'social')),
  content_type TEXT NOT NULL CHECK (content_type IN ('article', 'video', 'audio', 'exercise', 'tool')),
  url TEXT,
  content TEXT,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  estimated_time INTEGER, -- in minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_resource_interactions table to track resource usage
CREATE TABLE IF NOT EXISTS public.user_resource_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id UUID NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('viewed', 'completed', 'bookmarked', 'rated')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, resource_id, interaction_type)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_companions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_resource_interactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Create RLS policies for assessments
CREATE POLICY "assessments_select_own" ON public.assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "assessments_insert_own" ON public.assessments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "assessments_update_own" ON public.assessments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "assessments_delete_own" ON public.assessments FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for ai_companions
CREATE POLICY "companions_select_own" ON public.ai_companions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "companions_insert_own" ON public.ai_companions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "companions_update_own" ON public.ai_companions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "companions_delete_own" ON public.ai_companions FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for conversations
CREATE POLICY "conversations_select_own" ON public.conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "conversations_insert_own" ON public.conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "conversations_update_own" ON public.conversations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "conversations_delete_own" ON public.conversations FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for resources (public read, admin write)
CREATE POLICY "resources_select_all" ON public.resources FOR SELECT TO authenticated USING (true);

-- Create RLS policies for user_resource_interactions
CREATE POLICY "interactions_select_own" ON public.user_resource_interactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "interactions_insert_own" ON public.user_resource_interactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "interactions_update_own" ON public.user_resource_interactions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "interactions_delete_own" ON public.user_resource_interactions FOR DELETE USING (auth.uid() = user_id);
