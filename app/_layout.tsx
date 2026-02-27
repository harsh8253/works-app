import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export const unstable_settings = {
  initialRouteName: "splash",
};

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="task-detail"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
