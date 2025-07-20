import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { instructions } = await req.json();
    
    if (!instructions) {
      throw new Error('Instructions are required');
    }

    // Get the JWT token from the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Get user's API key
    const { data: apiKeyData, error: keyError } = await supabase
      .from('user_api_keys')
      .select('provider, encrypted_key')
      .eq('is_active', true)
      .limit(1)
      .single();

    if (keyError || !apiKeyData) {
      throw new Error('No API key found. Please set up your API key first.');
    }

    // Decrypt the API key
    const apiKey = atob(apiKeyData.encrypted_key);
    const provider = apiKeyData.provider;

    let apiUrl = '';
    let headers = {};
    let body = {};

    // Configure API call based on provider
    if (provider === 'openai') {
      apiUrl = 'https://api.openai.com/v1/chat/completions';
      headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      };
      body = {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a professional email writer. Generate clear, professional, and well-structured emails based on user instructions. Include appropriate subject lines, greetings, body content, and closings.'
          },
          {
            role: 'user',
            content: `Please write a professional email based on these instructions:\n\n${instructions}`
          }
        ],
        max_tokens: 800,
        temperature: 0.7,
      };
    } else if (provider === 'anthropic') {
      apiUrl = 'https://api.anthropic.com/v1/messages';
      headers = {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      };
      body = {
        model: 'claude-3-sonnet-20240229',
        max_tokens: 800,
        messages: [
          {
            role: 'user',
            content: `Please write a professional email based on these instructions. Include a subject line, appropriate greeting, well-structured body content, and professional closing:\n\n${instructions}`
          }
        ],
      };
    } else {
      throw new Error(`Unsupported provider: ${provider}`);
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API request failed: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    let email = '';
    if (provider === 'openai') {
      email = data.choices[0].message.content;
    } else if (provider === 'anthropic') {
      email = data.content[0].text;
    }

    return new Response(JSON.stringify({ email }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in email generator:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});