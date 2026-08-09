import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="create-account" />
      <Stack.Screen name="confirm-email" />
    </Stack>
  );
}
