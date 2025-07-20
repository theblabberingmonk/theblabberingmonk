
import React, { useState } from "react";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardContent from "@/components/DashboardContent";
import AuthSetupBanner from "@/components/AuthSetupBanner";

const Dashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [apiKeysConfigured, setApiKeysConfigured] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        {!apiKeysConfigured && (
          <AuthSetupBanner onSetupComplete={() => setApiKeysConfigured(true)} />
        )}
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
