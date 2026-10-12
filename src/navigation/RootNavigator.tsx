import { useAuth } from "@/state/AuthContext";

import AuthorizedStack from "./AuthorizedStack";
import UnauthenticatedStack from "./UnauthenticatedStack";

export default function RootNavigator() {
  const { session } = useAuth();

  if (session) {
    return <AuthorizedStack />;
  }

  return <UnauthenticatedStack />;
}
