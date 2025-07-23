import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";

export const useApiKeyStatus = () => {
  const { user } = useUser();
  const [hasApiKey, setHasApiKey] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkApiKey = async () => {
      if (!user) {
        setChecking(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_api_keys")
          .select("id")
          .eq("user_id", user.id)
          .eq("is_active", true)
          .limit(1);

        if (!error && data && data.length > 0) {
          setHasApiKey(true);
        }
      } catch (error) {
        console.error("Error checking API key:", error);
      } finally {
        setChecking(false);
      }
    };

    checkApiKey();
  }, [user]);

  return { hasApiKey, checking };
};