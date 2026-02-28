import { ThemeProvider, useTheme } from "@/constants/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export const unstable_settings = {
  initialRouteName: "splash",
};

function InnerLayout() {
  const { isDark } = useTheme();

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
        <Stack.Screen
          name="add-task"
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
            presentation: "modal",
          }}
        />
      </Stack>
      <StatusBar style={isDark ? "light" : "dark"} />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <InnerLayout />
    </ThemeProvider>
  );
}
