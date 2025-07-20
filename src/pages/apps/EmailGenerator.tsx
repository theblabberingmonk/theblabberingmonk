import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const EmailGenerator = () => {
  const [instructions, setInstructions] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!instructions.trim()) {
      toast({
        title: "Please enter instructions",
        description: "Tell us what kind of email you want to generate.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("ai-email-generator", {
        body: { instructions: instructions.trim() },
      });

      if (error) throw error;

      setGeneratedEmail(data.email);
      toast({
        title: "Email generated!",
        description: "Your email has been successfully generated.",
      });
    } catch (error) {
      console.error("Error generating email:", error);
      toast({
        title: "Error",
        description: "Failed to generate email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
    toast({
      title: "Copied!",
      description: "Email copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Wand2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">AI Email Generator</h1>
          <p className="text-muted-foreground mt-2">
            Create professional emails with AI assistance
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Instructions
              </CardTitle>
              <CardDescription>
                Tell us what kind of email you want to generate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Example: Write a professional follow-up email to a client about our meeting yesterday. Thank them for their time and ask about next steps for the project proposal..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              <Button
                onClick={handleGenerate}
                disabled={loading || !instructions.trim()}
                className="w-full mt-4"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                    Generating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Wand2 className="h-4 w-4" />
                    Generate Email
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Generated Email
              </CardTitle>
              <CardDescription>
                Your AI-generated email will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[300px] p-4 bg-muted/50 rounded-lg border border-border/50">
                {generatedEmail ? (
                  <div className="whitespace-pre-wrap text-sm">{generatedEmail}</div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Your generated email will appear here</p>
                    </div>
                  </div>
                )}
              </div>
              {generatedEmail && (
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="w-full mt-4"
                >
                  Copy to Clipboard
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmailGenerator;