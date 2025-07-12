
import React from "react";
import { AlertTriangle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthSetupBannerProps {
  onSetupComplete: () => void;
}

const AuthSetupBanner = ({ onSetupComplete }: AuthSetupBannerProps) => {
  return (
    <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">
              API Keys Required
            </h3>
            <p className="text-sm text-yellow-700">
              Set up your API keys to start using our AI tools. Don't worry, they're stored securely!
            </p>
          </div>
        </div>
        <Button
          onClick={onSetupComplete}
          variant="outline"
          size="sm"
          className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
        >
          <Settings className="h-4 w-4 mr-2" />
          Setup Keys
        </Button>
      </div>
    </div>
  );
};

export default AuthSetupBanner;
