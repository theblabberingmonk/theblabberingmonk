
import React from "react";
import { Bot, FileText, Calculator, MessageSquare, Zap, Brain, Code, Image } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";

const AllApps = () => {
  const apps = [
    {
      id: "ai-chat",
      name: "AI Chat Assistant",
      description: "Have intelligent conversations with our advanced AI assistant. Perfect for brainstorming, learning, and problem-solving.",
      icon: Bot,
      category: "Conversational AI",
      comingSoon: false
    },
    {
      id: "text-analyzer",
      name: "Text Analyzer",
      description: "Analyze sentiment, extract keywords, and get insights from any text. Great for content analysis and research.",
      icon: FileText,
      category: "Text Processing",
      comingSoon: false
    },
    {
      id: "prompt-optimizer",
      name: "Prompt Optimizer",
      description: "Craft better prompts for AI models. Get suggestions to improve your prompts and achieve better results.",
      icon: MessageSquare,
      category: "AI Tools",
      comingSoon: false
    },
    {
      id: "model-calculator",
      name: "Model Calculator",
      description: "Calculate costs, tokens, and performance metrics for different AI models. Plan your AI usage effectively.",
      icon: Calculator,
      category: "Utilities",
      comingSoon: false
    },
    {
      id: "code-generator",
      name: "Code Generator",
      description: "Generate code snippets, functions, and complete programs using AI. Support for multiple programming languages.",
      icon: Code,
      category: "Development",
      comingSoon: true
    },
    {
      id: "image-generator",
      name: "Image Generator",
      description: "Create stunning images from text descriptions. Perfect for creative projects and visual content.",
      icon: Image,
      category: "Creative AI",
      comingSoon: true
    },
    {
      id: "data-insights",
      name: "Data Insights",
      description: "Upload your data and get AI-powered insights, visualizations, and recommendations.",
      icon: Brain,
      category: "Analytics",
      comingSoon: true
    },
    {
      id: "workflow-automation",
      name: "Workflow Automation",
      description: "Automate repetitive tasks and create intelligent workflows using AI and integrations.",
      icon: Zap,
      category: "Automation",
      comingSoon: true
    }
  ];

  const categories = [...new Set(apps.map(app => app.category))];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Apps & Tools 🚀
          </h1>
          <p className="text-xl text-gray-600">
            Discover powerful AI tools to supercharge your productivity
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="bg-tbm-100 text-tbm-700 px-3 py-1 rounded-full text-sm font-medium mr-3">
                {category}
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apps
                .filter(app => app.category === category)
                .map((app) => (
                  <Card key={app.id} className="hover:shadow-lg transition-shadow relative">
                    {app.comingSoon && (
                      <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        Coming Soon
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <app.icon className="mr-3 h-6 w-6 text-tbm-500" />
                        {app.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {app.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full" 
                        disabled={app.comingSoon}
                        variant={app.comingSoon ? "outline" : "default"}
                      >
                        {app.comingSoon ? "Coming Soon" : "Launch App"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}

        <div className="mt-16 text-center bg-tbm-50 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Got an idea for a new app?
          </h3>
          <p className="text-gray-600 mb-6">
            We're always looking to build tools that solve real problems. Share your ideas with us!
          </p>
          <Button variant="outline">
            Suggest an App
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllApps;
