
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  username TEXT,
  email TEXT,
  avatar_url TEXT,
  tokens INTEGER DEFAULT 100,
  subscription_tier TEXT DEFAULT 'free',
  daily_streak INTEGER DEFAULT 0,
  last_daily_claim DATE,
  referral_code TEXT UNIQUE,
  referred_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create AI girlfriends table (with nullable user_id for templates)
CREATE TABLE public.ai_girlfriends (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER,
  ethnicity TEXT,
  body_type TEXT,
  hair_color TEXT,
  hair_style TEXT,
  face_style TEXT,
  clothing_style TEXT,
  personality_traits JSONB,
  behavior_settings JSONB,
  avatar_url TEXT,
  is_template BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create chat conversations table
CREATE TABLE public.conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  girlfriend_id UUID REFERENCES public.ai_girlfriends(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create chat messages table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'ai')),
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'voice')),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create WhatsApp chat data table
CREATE TABLE public.whatsapp_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  girlfriend_id UUID REFERENCES public.ai_girlfriends(id) ON DELETE CASCADE,
  nicknames JSONB,
  typing_style JSONB,
  interests JSONB,
  inside_jokes JSONB,
  conversation_patterns JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create daily rewards table
CREATE TABLE public.daily_rewards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  claim_date DATE NOT NULL,
  tokens_earned INTEGER NOT NULL,
  streak_day INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, claim_date)
);

-- Create referrals table
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  referred_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  tokens_earned INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(referrer_id, referred_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_girlfriends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for AI girlfriends (allowing templates to be viewed by all)
CREATE POLICY "Users can view their own girlfriends" ON public.ai_girlfriends FOR SELECT USING (
  auth.uid() = user_id OR is_template = true OR user_id IS NULL
);
CREATE POLICY "Users can create their own girlfriends" ON public.ai_girlfriends FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can update their own girlfriends" ON public.ai_girlfriends FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own girlfriends" ON public.ai_girlfriends FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for conversations
CREATE POLICY "Users can view their own conversations" ON public.conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own conversations" ON public.conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own conversations" ON public.conversations FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for messages
CREATE POLICY "Users can view messages in their conversations" ON public.messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.conversations WHERE id = conversation_id AND user_id = auth.uid())
);
CREATE POLICY "Users can create messages in their conversations" ON public.messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.conversations WHERE id = conversation_id AND user_id = auth.uid())
);

-- Create RLS policies for WhatsApp data
CREATE POLICY "Users can view their own WhatsApp data" ON public.whatsapp_data FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own WhatsApp data" ON public.whatsapp_data FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own WhatsApp data" ON public.whatsapp_data FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for daily rewards
CREATE POLICY "Users can view their own daily rewards" ON public.daily_rewards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own daily rewards" ON public.daily_rewards FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for referrals
CREATE POLICY "Users can view referrals they made or received" ON public.referrals FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = referrer_id AND user_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = referred_id AND user_id = auth.uid())
);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  referral_code_val TEXT;
BEGIN
  -- Generate unique referral code
  referral_code_val := UPPER(SUBSTRING(REPLACE(NEW.id::text, '-', ''), 1, 8));
  
  INSERT INTO public.profiles (user_id, email, referral_code)
  VALUES (NEW.id, NEW.email, referral_code_val);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default AI girlfriend templates
INSERT INTO public.ai_girlfriends (user_id, name, age, ethnicity, body_type, hair_color, hair_style, face_style, clothing_style, personality_traits, behavior_settings, is_template, avatar_url) VALUES
(NULL, 'Aria Blake', 24, 'Caucasian', 'Fit', 'Blonde', 'Long Wavy', 'Sexy', 'Casual', '{"traits": ["playful", "caring", "adventurous"], "mood": "flirty"}', '{"style": "casual", "energy": "high"}', true, '/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png'),
(NULL, 'Tanya Blaze', 26, 'Latina', 'Fit', 'Brunette', 'Long Straight', 'Sexy', 'Sporty', '{"traits": ["confident", "passionate", "loyal"], "mood": "intense"}', '{"style": "direct", "energy": "medium"}', true, '/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png'),
(NULL, 'Em Maxine', 22, 'European', 'Skinny', 'Blonde', 'Medium Wavy', 'Smiling', 'Cute', '{"traits": ["sweet", "innocent", "bubbly"], "mood": "cheerful"}', '{"style": "gentle", "energy": "high"}', true, '/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png'),
(NULL, 'Jade Bennett', 28, 'Ebony', 'Curvy', 'Black', 'Long Curly', 'Sexy', 'Elegant', '{"traits": ["sophisticated", "mysterious", "sensual"], "mood": "sultry"}', '{"style": "submissive", "energy": "low"}', true, '/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png'),
(NULL, 'Sarah Reagan', 25, 'Caucasian', 'Curvy', 'Blonde', 'Long Straight', 'Sexy', 'Classy', '{"traits": ["elegant", "intelligent", "romantic"], "mood": "loving"}', '{"style": "romantic", "energy": "medium"}', true, '/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png'),
(NULL, 'Lexie Wilder', 23, 'Caucasian', 'Fit', 'Blonde', 'Medium Straight', 'Casual', 'Sporty', '{"traits": ["adventurous", "fun", "energetic"], "mood": "playful"}', '{"style": "casual", "energy": "high"}', true, '/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png');
