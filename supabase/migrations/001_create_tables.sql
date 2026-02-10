-- Migration: Create core tables for the application
-- Created: 2026-01-16
-- Updated: Fixed with DROP IF EXISTS for clean execution

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing policies to avoid conflicts
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can view own quiz status" ON public.quiz_status;
  DROP POLICY IF EXISTS "Users can update own quiz status" ON public.quiz_status;
  DROP POLICY IF EXISTS "Users can insert own quiz status" ON public.quiz_status;
  DROP POLICY IF EXISTS "Users can view own access history" ON public.access_history;
  DROP POLICY IF EXISTS "Users can insert own access history" ON public.access_history;
  DROP POLICY IF EXISTS "Users can view own user data" ON public.user_data;
  DROP POLICY IF EXISTS "Users can update own user data" ON public.user_data;
  DROP POLICY IF EXISTS "Users can insert own user data" ON public.user_data;
  DROP POLICY IF EXISTS "Users can view own prayer notes" ON public.prayer_notes;
  DROP POLICY IF EXISTS "Users can insert own prayer notes" ON public.prayer_notes;
  DROP POLICY IF EXISTS "Users can update own prayer notes" ON public.prayer_notes;
  DROP POLICY IF EXISTS "Users can delete own prayer notes" ON public.prayer_notes;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- 1. Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  login_count INTEGER DEFAULT 0 NOT NULL,
  quiz_completed BOOLEAN DEFAULT FALSE NOT NULL,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS profiles_login_count_idx ON public.profiles(login_count);
CREATE INDEX IF NOT EXISTS profiles_quiz_completed_idx ON public.profiles(quiz_completed);

-- Enable RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 2. Quiz status table
CREATE TABLE IF NOT EXISTS public.quiz_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE NOT NULL,
  current_step INTEGER DEFAULT 0 NOT NULL,
  last_updated TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user_id)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS quiz_status_user_id_idx ON public.quiz_status(user_id);

-- Enable RLS
ALTER TABLE public.quiz_status ENABLE ROW LEVEL SECURITY;

-- RLS Policies for quiz_status
CREATE POLICY "Users can view own quiz status"
  ON public.quiz_status FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own quiz status"
  ON public.quiz_status FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz status"
  ON public.quiz_status FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 3. Access history table
CREATE TABLE IF NOT EXISTS public.access_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  access_date DATE NOT NULL,
  accessed BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, access_date)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS access_history_user_id_idx ON public.access_history(user_id);
CREATE INDEX IF NOT EXISTS access_history_access_date_idx ON public.access_history(access_date);

-- Enable RLS
ALTER TABLE public.access_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for access_history
CREATE POLICY "Users can view own access history"
  ON public.access_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own access history"
  ON public.access_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 4. User data table
CREATE TABLE IF NOT EXISTS public.user_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  consecutive_days INTEGER DEFAULT 0 NOT NULL,
  last_access_date DATE,
  onboarding_completed BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user_id)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS user_data_user_id_idx ON public.user_data(user_id);

-- Enable RLS
ALTER TABLE public.user_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_data
CREATE POLICY "Users can view own user data"
  ON public.user_data FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own user data"
  ON public.user_data FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own user data"
  ON public.user_data FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 5. Prayer notes table
CREATE TABLE IF NOT EXISTS public.prayer_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS prayer_notes_user_id_idx ON public.prayer_notes(user_id);
CREATE INDEX IF NOT EXISTS prayer_notes_status_idx ON public.prayer_notes(status);

-- Enable RLS
ALTER TABLE public.prayer_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for prayer_notes
CREATE POLICY "Users can view own prayer notes"
  ON public.prayer_notes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own prayer notes"
  ON public.prayer_notes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own prayer notes"
  ON public.prayer_notes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own prayer notes"
  ON public.prayer_notes FOR DELETE
  USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS update_user_data_updated_at ON public.user_data;
DROP TRIGGER IF EXISTS update_prayer_notes_updated_at ON public.prayer_notes;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_data_updated_at
  BEFORE UPDATE ON public.user_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prayer_notes_updated_at
  BEFORE UPDATE ON public.prayer_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
