
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Brain, Grid3X3, BookOpen, LogOut, Settings, Lightbulb, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const DashboardSidebar = () => {
  const [activeSection, setActiveSection] = useState("apps");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/");
    }
  };

  const learningTracks = [
    { id: "fundamentals", name: "LLM Fundamentals", progress: 25 },
    { id: "data-scientist", name: "LLM Data Scientist", progress: 10 },
    { id: "engineer", name: "LLM Engineer", progress: 0 },
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
            <button
              onClick={() => setActiveSection("apps")}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === "apps"
                  ? "bg-tbm-100 text-tbm-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Grid3X3 className="mr-3 h-4 w-4" />
              All Tools
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Learning
          </h3>
          <div className="space-y-3">
            {learningTracks.map((track) => (
              <div key={track.id} className="space-y-1">
                <button
                  onClick={() => setActiveSection(`learning-${track.id}`)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeSection === `learning-${track.id}`
                      ? "bg-tbm-100 text-tbm-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <BookOpen className="mr-3 h-4 w-4" />
                  <span className="flex-1 text-left">{track.name}</span>
                </button>
                <div className="px-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
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
