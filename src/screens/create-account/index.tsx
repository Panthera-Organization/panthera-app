import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import AuthForm from "@/screens/auth/AuthForm";
import { useAuth } from "@/state/AuthContext";
import type { UnauthenticatedStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<
  UnauthenticatedStackParamList,
  "CreateAccount"
>;

export default function CreateAccountScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { signUp } = useAuth();

  return (
    <AuthForm
      alternateLabel={t("screens.signIn.title")}
      onAlternate={() => {
        navigation.navigate("SignIn");
      }}
      onSubmit={signUp}
      submitLabel={t("screens.createAccount.title")}
    />
  );
}
