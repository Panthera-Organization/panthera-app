import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

import { supabase, supabaseUrl } from "@/lib/supabase";

// eslint-disable-next-line i18next/no-literal-string -- Supabase GraphQL function path
const graphqlUri = supabaseUrl ? `${supabaseUrl}/functions/v1/graphql` : "";

export function createAuthLink(
  getAccessToken: () => Promise<string | null>,
): SetContextLink {
  return new SetContextLink(async (prevContext) => {
    const token = await getAccessToken();
    if (!token) {
      return {};
    }

    return {
      headers: {
        ...prevContext.headers,
        // eslint-disable-next-line i18next/no-literal-string -- OAuth bearer scheme
        authorization: `Bearer ${token}`,
      },
    };
  });
}

async function getSupabaseAccessToken(): Promise<string | null> {
  if (!supabase) {
    return null;
  }

  const { data } = await supabase.auth.getSession();
  const accessToken = data.session?.access_token;
  return accessToken ?? null;
}

const authLink = createAuthLink(getSupabaseAccessToken);
const httpLink = new HttpLink({ uri: graphqlUri });
const link = ApolloLink.from([authLink, httpLink]);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  devtools: { enabled: __DEV__ },
});
