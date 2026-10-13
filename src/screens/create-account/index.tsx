import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import AuthForm from "@/screens/auth/AuthForm";
import { useAuth } from "@/state/AuthContext";
import type { UnauthenticatedStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<
  UnauthenticatedStackParamList,
  "CreateAccount"
>;

export default function CreateAccountScreen({ navigation }: Props) {
  const { signUp } = useAuth();

  return (
    <AuthForm
      alternateLabel="Sign in"
      onAlternate={() => {
        navigation.navigate("SignIn");
      }}
      onSubmit={signUp}
      submitLabel="Create account"
    />
  );
}
