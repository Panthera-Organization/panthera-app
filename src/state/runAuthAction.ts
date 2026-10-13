export async function runAuthAction(
  action: () => Promise<string | null>,
  setIsSubmitting: (value: boolean) => void,
  setErrorMessage: (value: string | null) => void,
): Promise<void> {
  setIsSubmitting(true);
  setErrorMessage(null);
  try {
    const errorMessage = await action();
    if (errorMessage) {
      setErrorMessage(errorMessage);
    }
  } finally {
    setIsSubmitting(false);
  }
}
