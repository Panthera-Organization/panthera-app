import { t } from "i18next";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AppState } from "react-native";
import type { Session } from "@supabase/supabase-js";

import { apolloClient } from "@/lib/apollo";
import { supabase } from "@/lib/supabase";

export type AuthCredentials = {
  email: string;
  password: string;
};

type AuthContextValue = {
  session: Session | null;
  isReady: boolean;
  signIn: (credentials: AuthCredentials) => Promise<string | null>;
  signUp: (credentials: AuthCredentials) => Promise<string | null>;
  signOut: () => Promise<string | null>;
};

async function signIn(credentials: AuthCredentials): Promise<string | null> {
  if (!supabase) {
    return t("screens.auth.signInUnavailable");
  }

  const { error } = await supabase.auth.signInWithPassword(credentials);
  const errorMessage = error?.message ?? null;
  return errorMessage;
}

async function signUp(credentials: AuthCredentials): Promise<string | null> {
  if (!supabase) {
    return t("screens.auth.createAccountUnavailable");
  }

  const { error } = await supabase.auth.signUp(credentials);
  const errorMessage = error?.message ?? null;
  return errorMessage;
}

async function signOut(): Promise<string | null> {
  if (!supabase) {
    return t("screens.auth.signOutUnavailable");
  }

  const { error } = await supabase.auth.signOut();

  return error?.message ?? null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(supabase === null);
  const previousUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    const client = supabase;
    if (!client) {
      return;
    }

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((event, nextSession) => {
      const nextUserId = nextSession?.user.id ?? null;
      const previousUserId = previousUserIdRef.current;

      if (
        event === "SIGNED_OUT" ||
        (previousUserId !== null &&
          nextUserId !== null &&
          previousUserId !== nextUserId)
      ) {
        void apolloClient.clearStore();
      }

      previousUserIdRef.current = nextUserId;
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return value;
}
