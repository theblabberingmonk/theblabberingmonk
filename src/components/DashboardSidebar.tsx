
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Brain, Grid3X3, BookOpen, LogOut, Settings, Lightbulb, Users, ChevronDown, ChevronRight, Bot, FileText, Calculator, MessageSquare } from "lucide-react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";

const DashboardSidebar = () => {
  const [activeSection, setActiveSection] = useState("apps");
  const [isAppsExpanded, setIsAppsExpanded] = useState(false);
  const location = useLocation();
  const { signOut } = useClerk();
  const { user } = useUser();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const learningTracks = [
    { 
      id: "fundamentals", 
      name: "LLM Fundamentals", 
      progress: 8, // 1 out of 12 lessons completed
      totalLessons: 12,
      completedLessons: 1
    },
    { 
      id: "data-scientist", 
      name: "LLM Data Scientist", 
      progress: 7, // 1 out of 15 lessons completed
      totalLessons: 15,
      completedLessons: 1
    },
    { 
      id: "engineer", 
      name: "LLM Engineer", 
      progress: 0, // 0 out of 18 lessons completed
      totalLessons: 18,
      completedLessons: 0
    },
  ];

  const apps = [
    { id: "email-summarizer", name: "AI Email Summarizer", icon: FileText },
    { id: "email-generator", name: "AI Email Generator", icon: MessageSquare },
    { id: "translator", name: "AI Translator", icon: Bot },
    { id: "text-to-speech", name: "AI Text to Speech", icon: Calculator },
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-tbm-500" />
          <span className="text-xl font-bold text-gray-900">TBM Labs</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-8">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Apps
          </h3>
          <div className="space-y-1">
            <Link
              to="/apps"
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === "/apps"
                  ? "bg-tbm-100 text-tbm-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Grid3X3 className="mr-3 h-4 w-4" />
              All Tools
            </Link>
            
            <button
              onClick={() => setIsAppsExpanded(!isAppsExpanded)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:bg-gray-50"
            >
              <span>Quick Access</span>
              {isAppsExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            {isAppsExpanded && (
              <div className="ml-6 space-y-1">
                {apps.map((app) => (
                  <Link
                    key={app.id}
                    to={`/apps/${app.id}`}
                    className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      location.pathname === `/apps/${app.id}`
                        ? "bg-tbm-100 text-tbm-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <app.icon className="mr-3 h-4 w-4" />
                    {app.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Learning
          </h3>
          <div className="space-y-3">
            {learningTracks.map((track) => (
              <div key={track.id} className="space-y-1">
                <Link
                  to={`/course/${track.id}`}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === `/course/${track.id}`
                      ? "bg-tbm-100 text-tbm-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <BookOpen className="mr-3 h-4 w-4" />
                  <span className="flex-1 text-left">{track.name}</span>
                </Link>
                <div className="px-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>{track.completedLessons}/{track.totalLessons} lessons</span>
                    <span>{track.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-tbm-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${track.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            More
          </h3>
          <div className="space-y-1">
            <button
              onClick={() => setActiveSection("suggest")}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === "suggest"
                  ? "bg-tbm-100 text-tbm-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Lightbulb className="mr-3 h-4 w-4" />
              Suggest Ideas
            </button>
            <button
              onClick={() => setActiveSection("collaborate")}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === "collaborate"
                  ? "bg-tbm-100 text-tbm-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Users className="mr-3 h-4 w-4" />
              Collaborate
            </button>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        {user && (
          <div className="mb-3 px-3 py-2 text-sm text-gray-600">
            Signed in as {user.firstName || user.emailAddresses[0]?.emailAddress?.split('@')[0]}
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
