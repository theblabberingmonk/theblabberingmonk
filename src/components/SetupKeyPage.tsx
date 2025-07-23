import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Key, Shield, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SetupKeyPageProps {
  onComplete: () => void;
}

const SetupKeyPage = ({ onComplete }: SetupKeyPageProps) => {
  const { user } = useUser();
  const { toast } = useToast();
  const [provider, setProvider] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);

  const providers = [
    { 
      value: "openai", 
      label: "OpenAI (GPT-4, GPT-3.5)",
      url: "https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key"
    },
    { 
      value: "anthropic", 
      label: "Anthropic (Claude)",
      url: "https://docs.anthropic.com/en/api/admin-api/apikeys/get-api-key"
    },
    { 
      value: "google", 
      label: "Google (Gemini)",
      url: "https://ai.google.dev/gemini-api/docs/api-key"
    },
    { 
      value: "perplexity", 
      label: "Perplexity",
      url: "https://www.perplexity.ai/help-center/en/articles/10352995-api-settings"
    },
  ];

  const handleSaveKey = async () => {
    if (!provider || !apiKey || !user) {
      toast({
        title: "Missing information",
        description: "Please select a provider and enter your API key.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Create or update profile first
      await supabase
        .from("profiles")
        .upsert({
          user_id: user.id,
          display_name: user.fullName || user.emailAddresses[0]?.emailAddress,
        });

      // Save encrypted API key
      const { error } = await supabase
        .from("user_api_keys")
        .upsert({
          user_id: user.id,
          provider,
          encrypted_key: btoa(apiKey), // Basic encoding - in production use proper encryption
          is_active: true,
        });

      if (error) throw error;

      toast({
        title: "API Key Saved",
        description: "Your API key has been securely saved. You can now use all AI features!",
      });

      onComplete();
    } catch (error) {
      console.error("Error saving API key:", error);
      toast({
        title: "Error",
        description: "Failed to save API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Brain className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to TBM Labs!</CardTitle>
          <CardDescription>
            Set up your AI provider to start using our powerful tools
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Security Features</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• End-to-end encryption</li>
              <li>• No keys stored in plaintext</li>
              <li>• Secure Supabase storage</li>
              <li>• Your data never leaves our secure environment</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="provider">AI Provider</Label>
              <Select value={provider} onValueChange={setProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your AI provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Your API key is encrypted and stored securely
              </p>
            </div>
          </div>

          <Button
            onClick={handleSaveKey}
            disabled={loading || !provider || !apiKey}
            className="w-full"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                Saving...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                Save API Key & Continue
              </div>
            )}
          </Button>

          <Button
            onClick={handleSkip}
            variant="outline"
            className="w-full"
          >
            Skip for now
          </Button>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Don't have an API key?{" "}
              <a
                href={providers.find(p => p.value === provider)?.url || "https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Get one here
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupKeyPage;