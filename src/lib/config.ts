import Constants from 'expo-constants';

/**
 * Typed app config from environment / expo-constants.
 * Use for API base URLs, feature flags, and other build-time config.
 * Do not put secrets here; use EAS Secrets or env at build time.
 */
export type Config = {
  apiBaseUrl: string;
};

function getConfig(): Config {
  const extra = Constants.expoConfig?.extra ?? {};
  return {
    apiBaseUrl: (extra.apiBaseUrl as string) ?? '',
  };
}

export const config = getConfig();
