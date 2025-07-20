import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const EmailSummarizer = () => {
  const [email, setEmail] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!email.trim()) {
      toast({
        title: "Please enter an email",
        description: "Paste the email content you want to summarize.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("ai-email-summarizer", {
        body: { email: email.trim() },
      });

      if (error) throw error;

      setSummary(data.summary);
      toast({
        title: "Email summarized!",
        description: "Your email has been successfully summarized.",
      });
    } catch (error) {
      console.error("Error summarizing email:", error);
      toast({
        title: "Error",
        description: "Failed to summarize email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Mail className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">AI Email Summarizer</h1>
          <p className="text-muted-foreground mt-2">
            Get quick, intelligent summaries of long emails
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Content
              </CardTitle>
              <CardDescription>
                Paste the email you want to summarize below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your email content here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              <Button
                onClick={handleSummarize}
                disabled={loading || !email.trim()}
                className="w-full mt-4"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Get Email Summary
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Summary
              </CardTitle>
              <CardDescription>
                AI-generated summary will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[300px] p-4 bg-muted/50 rounded-lg border border-border/50">
                {summary ? (
                  <div className="whitespace-pre-wrap text-sm">{summary}</div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Your email summary will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmailSummarizer;