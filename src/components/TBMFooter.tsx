
import React, { useState } from "react";
import { Brain, Mail, Github, Twitter, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const TBMFooter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Mock newsletter signup - replace with actual implementation
    setTimeout(() => {
      toast({
        title: "Welcome to the family! 🎉",
        description: "You've successfully subscribed to The Blabbering Monk newsletter!",
      });
      setEmail("");
      setIsSubscribing(false);
    }, 1000);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="mb-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Don't want to create an account? Just subscribe to our newsletter! 📬
            </h3>
            <p className="text-gray-300 mb-6">
              Get the latest AI insights, tool updates, and learning resources delivered to your inbox weekly.
            </p>
            <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button 
                type="submit" 
                disabled={isSubscribing}
                className="bg-tbm-500 hover:bg-tbm-600"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            <p className="text-sm text-gray-400 mt-3">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-8 w-8 text-tbm-500" />
                <span className="text-xl font-bold">TBM Labs</span>
              </div>
              <p className="text-gray-300 text-sm">
                Democratizing AI education and tools for everyone. Learn, build, and innovate with The Blabbering Monk.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/track/fundamentals" className="hover:text-white transition-colors">LLM Fundamentals</a></li>
                <li><a href="/track/data-scientist" className="hover:text-white transition-colors">LLM Data Scientist</a></li>
                <li><a href="/track/engineer" className="hover:text-white transition-colors">LLM Engineer</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/apps/ai-chat" className="hover:text-white transition-colors">AI Chat Assistant</a></li>
                <li><a href="/apps/text-analyzer" className="hover:text-white transition-colors">Text Analyzer</a></li>
                <li><a href="/apps/prompt-optimizer" className="hover:text-white transition-colors">Prompt Optimizer</a></li>
                <li><a href="/apps/model-calculator" className="hover:text-white transition-colors">Model Calculator</a></li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/auth" className="hover:text-white transition-colors">Join TBM Labs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 The Blabbering Monk Labs. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TBMFooter;
