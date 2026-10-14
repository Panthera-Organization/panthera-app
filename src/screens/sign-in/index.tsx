import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import AuthForm from "@/screens/auth/AuthForm";
import { useAuth } from "@/state/AuthContext";
import type { UnauthenticatedStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<UnauthenticatedStackParamList, "SignIn">;

export default function SignInScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { signIn } = useAuth();

  return (
    <AuthForm
      alternateLabel={t("screens.createAccount.title")}
      onAlternate={() => {
        navigation.navigate("CreateAccount");
      }}
      onSubmit={signIn}
      submitLabel={t("screens.signIn.title")}
    />
  );
}
