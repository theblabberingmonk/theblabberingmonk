-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create API keys table with encryption
CREATE TABLE public.user_api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  encrypted_key TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, provider)
);

-- Create course content table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  lessons JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user progress table
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id, lesson_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.jwt() ->> 'sub' = user_id);

-- Create RLS policies for API keys
CREATE POLICY "Users can view their own API keys" 
ON public.user_api_keys 
FOR SELECT 
USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can create their own API keys" 
ON public.user_api_keys 
FOR INSERT 
WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can update their own API keys" 
ON public.user_api_keys 
FOR UPDATE 
USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can delete their own API keys" 
ON public.user_api_keys 
FOR DELETE 
USING (auth.jwt() ->> 'sub' = user_id);

-- Create RLS policies for user progress
CREATE POLICY "Users can view their own progress" 
ON public.user_progress 
FOR SELECT 
USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can create their own progress" 
ON public.user_progress 
FOR INSERT 
WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can update their own progress" 
ON public.user_progress 
FOR UPDATE 
USING (auth.jwt() ->> 'sub' = user_id);

-- Create policies for courses (public read)
CREATE POLICY "Courses are viewable by everyone" 
ON public.courses 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_api_keys_updated_at
  BEFORE UPDATE ON public.user_api_keys
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample course data
INSERT INTO public.courses (course_id, title, description, lessons) VALUES
('fundamentals', 'LLM Fundamentals', 'Learn the basics of Large Language Models', '[
  {
    "id": "intro",
    "title": "Introduction to LLMs",
    "description": "Understanding what Large Language Models are and how they work",
    "content": "Large Language Models (LLMs) are AI systems trained on vast amounts of text data to understand and generate human-like text. They use transformer architecture to process and generate language.",
    "duration": "15 min"
  },
  {
    "id": "training",
    "title": "How LLMs are Trained",
    "description": "Deep dive into the training process of LLMs",
    "content": "LLMs are trained through a process called pre-training, where they learn patterns in language from massive datasets. This is followed by fine-tuning to improve their performance on specific tasks.",
    "duration": "20 min"
  },
  {
    "id": "applications",
    "title": "LLM Applications",
    "description": "Explore real-world applications of LLMs",
    "content": "LLMs power chatbots, content generation, code completion, translation, summarization, and many other applications. They are transforming how we interact with technology.",
    "duration": "18 min"
  }
]'),
('data-scientist', 'LLM Data Scientist', 'Advanced techniques for data scientists working with LLMs', '[
  {
    "id": "embeddings",
    "title": "Understanding Embeddings",
    "description": "Learn how text embeddings work in LLMs",
    "content": "Embeddings are numerical representations of text that capture semantic meaning. They allow LLMs to understand relationships between words and concepts.",
    "duration": "25 min"
  },
  {
    "id": "fine-tuning",
    "title": "Fine-tuning Strategies",
    "description": "Techniques for customizing LLMs for specific tasks",
    "content": "Fine-tuning involves training a pre-trained model on domain-specific data. Techniques include full fine-tuning, LoRA, and prompt tuning.",
    "duration": "30 min"
  },
  {
    "id": "evaluation",
    "title": "Model Evaluation",
    "description": "Methods for evaluating LLM performance",
    "content": "Evaluating LLMs requires both automated metrics (BLEU, ROUGE) and human evaluation. Consider bias, hallucination, and task-specific performance.",
    "duration": "22 min"
  }
]'),
('engineer', 'LLM Engineer', 'Building production-ready LLM applications', '[
  {
    "id": "architecture",
    "title": "LLM System Architecture",
    "description": "Designing scalable LLM applications",
    "content": "Building LLM applications requires careful consideration of API design, caching, rate limiting, and error handling. Consider using vector databases for retrieval-augmented generation.",
    "duration": "35 min"
  },
  {
    "id": "optimization",
    "title": "Performance Optimization",
    "description": "Optimizing LLM applications for speed and cost",
    "content": "Techniques include prompt optimization, response caching, model quantization, and choosing the right model size for your use case.",
    "duration": "28 min"
  },
  {
    "id": "deployment",
    "title": "Deployment Strategies",
    "description": "Deploying LLMs in production environments",
    "content": "Learn about different deployment options: API-based services, self-hosted models, edge deployment, and hybrid approaches. Consider security and compliance requirements.",
    "duration": "32 min"
  }
]');