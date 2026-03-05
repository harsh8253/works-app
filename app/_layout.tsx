import SplashScreenComponent from "@/components/SplashScreen";
import { ThemeProvider, useTheme } from "@/constants/ThemeContext";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus, View } from "react-native";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync?.();

export const unstable_settings = {
  initialRouteName: "login",
};

function InnerLayout() {
  const { isDark } = useTheme();

  return (
    <>
      <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={isDark ? "light" : "dark"} />
    </>
  );
}

export default function RootLayout() {
  const [splashVisible, setSplashVisible] = useState(true);
  const appState = useRef(AppState.currentState);

  const hideNativeSplash = useCallback(() => {
    SplashScreen.hideAsync?.();
  }, []);

  useEffect(() => {
    const t = setTimeout(hideNativeSplash, 50);
    return () => clearTimeout(t);
  }, [hideNativeSplash]);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (nextState: AppStateStatus) => {
      const cameToForeground =
        appState.current.match(/inactive|background/) && nextState === "active";
      appState.current = nextState;
      if (cameToForeground) setSplashVisible(true);
    });
    return () => sub.remove();
  }, []);

  const handleSplashFinish = useCallback(() => {
    setSplashVisible(false);
  }, []);

  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        <InnerLayout />
      </View>
      {splashVisible && (
        <SplashScreenComponent onFinish={handleSplashFinish} />
      )}
    </ThemeProvider>
  );
}
