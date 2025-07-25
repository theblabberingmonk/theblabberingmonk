
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

import CoursePage from "./pages/CoursePage";
import AllApps from "./pages/AllApps";
import EmailSummarizer from "./pages/apps/EmailSummarizer";
import EmailGenerator from "./pages/apps/EmailGenerator";
import Translator from "./pages/apps/Translator";
import TextToSpeech from "./pages/apps/TextToSpeech";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          
          <Route path="/course/:trackId" element={<CoursePage />} />
          <Route path="/apps" element={<AllApps />} />
          <Route path="/apps/email-summarizer" element={<EmailSummarizer />} />
          <Route path="/apps/email-generator" element={<EmailGenerator />} />
          <Route path="/apps/translator" element={<Translator />} />
          <Route path="/apps/text-to-speech" element={<TextToSpeech />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
