import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_TARGET_LOCAL = "local";
const SUPABASE_TARGET_STAGING = "staging";

type SupabaseTarget =
  typeof SUPABASE_TARGET_LOCAL | typeof SUPABASE_TARGET_STAGING;

function readTarget(): SupabaseTarget {
  return process.env.EXPO_PUBLIC_SUPABASE_ENV === SUPABASE_TARGET_STAGING
    ? SUPABASE_TARGET_STAGING
    : SUPABASE_TARGET_LOCAL;
}

function readSupabaseConfig(target: SupabaseTarget): {
  url: string | undefined;
  anonKey: string | undefined;
} {
  if (target === SUPABASE_TARGET_STAGING) {
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

const supabaseConfig = readSupabaseConfig(readTarget());
export const supabaseUrl = supabaseConfig.url;
const supabaseAnonKey = supabaseConfig.anonKey;

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
