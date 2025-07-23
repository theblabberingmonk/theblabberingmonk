import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ApiKeyWarning from "@/components/ApiKeyWarning";
import { useApiKeyStatus } from "@/hooks/useApiKeyStatus";

const Translator = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { hasApiKey } = useApiKeyStatus();

  const languages = [
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "italian", label: "Italian" },
    { value: "portuguese", label: "Portuguese" },
    { value: "chinese", label: "Chinese (Mandarin)" },
    { value: "japanese", label: "Japanese" },
    { value: "korean", label: "Korean" },
    { value: "arabic", label: "Arabic" },
    { value: "hindi", label: "Hindi" },
    { value: "russian", label: "Russian" },
    { value: "dutch", label: "Dutch" },
  ];

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: "Please enter text",
        description: "Enter the text you want to translate.",
        variant: "destructive",
      });
      return;
    }

    if (!targetLanguage) {
      toast({
        title: "Please select a language",
        description: "Choose the target language for translation.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("ai-translator", {
        body: { 
          text: sourceText.trim(),
          targetLanguage 
        },
      });

      if (error) throw error;

      setTranslatedText(data.translation);
      toast({
        title: "Translation complete!",
        description: "Your text has been successfully translated.",
      });
    } catch (error) {
      console.error("Error translating text:", error);
      toast({
        title: "Error",
        description: "Failed to translate text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    toast({
      title: "Copied!",
      description: "Translation copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {!hasApiKey && (
          <ApiKeyWarning onSetupKey={() => window.location.href = '/dashboard'} />
        )}

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Languages className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">AI Translator</h1>
          <p className="text-muted-foreground mt-2">
            Translate text between languages with AI precision
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-center">Translate to</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Source Text
              </CardTitle>
              <CardDescription>
                Enter the text you want to translate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter text to translate..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                className="min-h-[300px] resize-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                Translation
              </CardTitle>
              <CardDescription>
                Translated text will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[300px] p-4 bg-muted/50 rounded-lg border border-border/50">
                {translatedText ? (
                  <div className="whitespace-pre-wrap text-sm">{translatedText}</div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Languages className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Translation will appear here</p>
                    </div>
                  </div>
                )}
              </div>
              {translatedText && (
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="w-full mt-4"
                >
                  Copy Translation
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleTranslate}
            disabled={loading || !sourceText.trim() || !targetLanguage}
            size="lg"
            className="min-w-[200px]"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                Translating...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4" />
                Translate
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Translator;