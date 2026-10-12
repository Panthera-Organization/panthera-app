import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AppState } from "react-native";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";

type AuthContextValue = {
  session: Session | null;
  isReady: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const client = supabase;
    if (!client) {
      setSession(null);
      setIsReady(true);
      return;
    }

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsReady(true);
    });

    const appStateSubscription = AppState.addEventListener(
      "change",
      (nextState) => {
        if (nextState === "active") {
          void client.auth.startAutoRefresh();
        } else {
          void client.auth.stopAutoRefresh();
        }
      },
    );

    return () => {
      subscription.unsubscribe();
      appStateSubscription.remove();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, isReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return value;
}
