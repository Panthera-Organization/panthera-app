import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type SupabaseTarget = "local" | "staging";

function readTarget(): SupabaseTarget {
  return process.env.EXPO_PUBLIC_SUPABASE_ENV === "staging" ? "staging" : "local";
}

function readSupabaseConfig(target: SupabaseTarget): {
  url: string | undefined;
  anonKey: string | undefined;
} {
  if (target === "staging") {
    return {
      url: process.env.EXPO_PUBLIC_SUPABASE_STAGING_URL,
      anonKey: process.env.EXPO_PUBLIC_SUPABASE_STAGING_ANON_KEY,
    };
  }

  return {
    url: process.env.EXPO_PUBLIC_SUPABASE_LOCAL_URL,
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_LOCAL_ANON_KEY,
  };
}

const { url: supabaseUrl, anonKey: supabaseAnonKey } = readSupabaseConfig(
  readTarget(),
);

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      })
    : null;
