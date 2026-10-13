import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import AuthForm from "@/screens/auth/AuthForm";
import { useAuth } from "@/state/AuthContext";
import type { UnauthenticatedStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<UnauthenticatedStackParamList, "SignIn">;

export default function SignInScreen({ navigation }: Props) {
  const { signIn } = useAuth();

  return (
    <AuthForm
      alternateLabel="Create account"
      onAlternate={() => {
        navigation.navigate("CreateAccount");
      }}
      onSubmit={signIn}
      submitLabel="Sign in"
    />
  );
}
