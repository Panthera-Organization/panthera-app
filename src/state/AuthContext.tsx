import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AppState } from "react-native";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";

type AuthContextValue = {
  session: Session | null;
  isReady: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<string | null>;
};

async function signIn(email: string, password: string): Promise<string | null> {
  if (!supabase) {
    return "Sign in is unavailable.";
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  return error?.message ?? null;
}

async function signUp(email: string, password: string): Promise<string | null> {
  if (!supabase) {
    return "Create account is unavailable.";
  }

  const { error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
  });

  return error?.message ?? null;
}

async function signOut(): Promise<string | null> {
  if (!supabase) {
    return "Sign out is unavailable.";
  }

  const { error } = await supabase.auth.signOut();

  return error?.message ?? null;
}

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

  const value = useMemo(
    () => ({
      session,
      isReady,
      signIn,
      signUp,
      signOut,
    }),
    [session, isReady],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return value;
}
