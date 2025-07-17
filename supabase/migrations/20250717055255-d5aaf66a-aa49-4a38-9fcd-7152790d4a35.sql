-- Add image generation capabilities and extended user profile fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS height TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS ethnicity TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS sexual_orientation TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS hobbies TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS relationship_goals TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS past_relationships TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

-- Add image prompt field to ai_girlfriends table for generated images
ALTER TABLE ai_girlfriends ADD COLUMN IF NOT EXISTS image_prompt TEXT;
ALTER TABLE ai_girlfriends ADD COLUMN IF NOT EXISTS generated_image_url TEXT;