
import React, { useState, useEffect } from "react";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardContent from "@/components/DashboardContent";
import SetupKeyPage from "@/components/SetupKeyPage";
import ApiKeyWarning from "@/components/ApiKeyWarning";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [apiKeysConfigured, setApiKeysConfigured] = useState(false);
  const [checkingKeys, setCheckingKeys] = useState(true);
  const [showSetupPage, setShowSetupPage] = useState(false);

  useEffect(() => {
    const checkApiKeys = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("user_api_keys")
          .select("id")
          .eq("user_id", user.id)
          .eq("is_active", true)
          .limit(1);

        if (!error && data && data.length > 0) {
          setApiKeysConfigured(true);
        }
      } catch (error) {
        console.error("Error checking API keys:", error);
      } finally {
        setCheckingKeys(false);
      }
    };

    if (isLoaded && isSignedIn && user) {
      checkApiKeys();
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || checkingKeys) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  if (showSetupPage) {
    return <SetupKeyPage onComplete={() => {
      setShowSetupPage(false);
      setApiKeysConfigured(true);
    }} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        {!apiKeysConfigured && (
          <div className="p-6">
            <ApiKeyWarning onSetupKey={() => setShowSetupPage(true)} />
          </div>
        )}
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
