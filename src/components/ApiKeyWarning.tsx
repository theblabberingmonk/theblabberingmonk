import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Key } from "lucide-react";
import { Link } from "react-router-dom";

interface ApiKeyWarningProps {
  onSetupKey: () => void;
}

const ApiKeyWarning = ({ onSetupKey }: ApiKeyWarningProps) => {
  return (
    <Alert className="mb-6 border-warning/50 bg-warning/10">
      <AlertTriangle className="h-4 w-4 text-warning" />
      <AlertDescription className="flex items-center justify-between">
        <span className="text-sm">
          You haven't set up an API key yet. Set up your AI provider to use all features.
        </span>
        <Button
          onClick={onSetupKey}
          size="sm"
          variant="outline"
          className="ml-4 border-warning/50 hover:bg-warning/10"
        >
          <Key className="h-3 w-3 mr-1" />
          Set up API Key
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiKeyWarning;