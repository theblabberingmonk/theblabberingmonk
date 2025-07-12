
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Mail, 
  Languages, 
  Volume2, 
  Mic, 
  Radio,
  FileText,
  Image,
  Code,
  MessageSquare,
  Search,
  Palette
} from "lucide-react";

const ToolsShowcase = () => {
  const tools = [
    {
      name: "AI Data Analyst",
      description: "Upload a CSV, get instant insights and visualizations",
      icon: BarChart3,
      status: "Beta",
      category: "Data"
    },
    {
      name: "AI Email Summarizer",
      description: "Paste emails, get concise summaries",
      icon: Mail,
      status: "Live",
      category: "Productivity"
    },
    {
      name: "AI Translator",
      description: "Translate text using advanced AI models",
      icon: Languages,
      status: "Live",
      category: "Language"
    },
    {
      name: "AI Text-to-Speech",
      description: "Generate lifelike audio from text",
      icon: Volume2,
      status: "Beta",
      category: "Audio"
    },
    {
      name: "AI Speech-to-Text",
      description: "Upload voice recordings, get accurate transcripts",
      icon: Mic,
      status: "Coming Soon",
      category: "Audio"
    },
    {
      name: "AI Podcast Generator",
      description: "Turn blog posts into engaging podcasts",
      icon: Radio,
      status: "Coming Soon",
      category: "Content"
    },
    {
      name: "AI Document Chat",
      description: "Chat with your PDFs and documents",
      icon: FileText,
      status: "Beta",
      category: "Documents"
    },
    {
      name: "AI Image Generator",
      description: "Create stunning images from text prompts",
      icon: Image,
      status: "Coming Soon",
      category: "Creative"
    },
    {
      name: "AI Code Assistant",
      description: "Get help with coding and debugging",
      icon: Code,
      status: "Beta",
      category: "Development"
    },
    {
      name: "AI Chat Companion",
      description: "Have conversations with various AI personalities",
      icon: MessageSquare,
      status: "Live",
      category: "Chat"
    },
    {
      name: "AI Research Helper",
      description: "Research topics and get comprehensive summaries",
      icon: Search,
      status: "Coming Soon",
      category: "Research"
    },
    {
      name: "AI Logo Designer",
      description: "Create professional logos with AI assistance",
      icon: Palette,
      status: "Coming Soon",
      category: "Design"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-100 text-green-700 border-green-200";
      case "Beta":
        return "bg-tbm-100 text-tbm-700 border-tbm-200";
      case "Coming Soon":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50" id="tools">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="tbm-chip mx-auto mb-6">
            <span>AI Tool Suite</span>
          </div>
          <h2 className="section-title mb-6">
            One-Click AI Tools
          </h2>
          <p className="section-subtitle mx-auto">
            Bring your own API key and explore our growing collection of privacy-first AI tools. No registration, no data storage, just pure AI power.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Card 
              key={tool.name} 
              className="feature-card bg-white border-gray-200 hover:border-tbm-300 hover:shadow-lg cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <tool.icon className="w-8 h-8 text-tbm-500 group-hover:text-tbm-600 transition-colors" />
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(tool.status)}`}>
                    {tool.status}
                  </span>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-tbm-600 transition-colors">
                  {tool.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-3">
                  {tool.description}
                </CardDescription>
                <div className="text-xs text-tbm-500 font-medium uppercase tracking-wide">
                  {tool.category}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            More tools are being added regularly. Join our community to stay updated!
          </p>
          <a href="#contact" className="button-primary">
            Get Notified of New Tools
          </a>
        </div>
      </div>
    </section>
  );
};

export default ToolsShowcase;
