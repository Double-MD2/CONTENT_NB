-- Migration: Add missing fields to profiles table
-- Created: 2026-01-18
-- Description: Add name, religion, photo_url, and onboarding_completed fields

-- Add missing columns to profiles table
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS name TEXT,
  ADD COLUMN IF NOT EXISTS religion TEXT,
  ADD COLUMN IF NOT EXISTS photo_url TEXT,
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE NOT NULL;

-- Create indexes for frequently queried fields
CREATE INDEX IF NOT EXISTS profiles_onboarding_completed_idx ON public.profiles(onboarding_completed);

-- Update existing records to set onboarding_completed = TRUE where quiz_completed = TRUE
-- This ensures users who already completed the quiz are not redirected to onboarding
UPDATE public.profiles
SET onboarding_completed = TRUE
WHERE quiz_completed = TRUE AND onboarding_completed = FALSE;
