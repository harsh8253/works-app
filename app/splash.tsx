import { Colors, FontSize, FontWeight, Spacing } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export default function SplashScreen() {
  const colors = Colors.dark;
  const router = useRouter();

  const logoOpacity = useSharedValue(0);
  const logoTranslateY = useSharedValue(8);
  const taglineOpacity = useSharedValue(0);
  const lineWidth = useSharedValue(0);

  useEffect(() => {
    logoOpacity.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });
    logoTranslateY.value = withTiming(0, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });

    taglineOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
    lineWidth.value = withDelay(
      600,
      withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) }),
    );

    const timer = setTimeout(() => {
      router.replace("/login" as any);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoTranslateY.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  const lineStyle = useAnimatedStyle(() => ({
    width: `${lineWidth.value * 40}%`,
    opacity: lineWidth.value * 0.5,
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <Text style={styles.logoText}>
          sprint
          <Text
            style={{ color: colors.primary, fontWeight: FontWeight.semibold }}
          >
            flow
          </Text>
        </Text>
      </Animated.View>

      <Animated.View style={taglineStyle}>
        <Text style={[styles.tagline, { color: colors.textMuted }]}>
          Track · Sprint · Deliver
        </Text>
      </Animated.View>

      <Animated.View
        style={[styles.line, { backgroundColor: colors.primary }, lineStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginBottom: Spacing.md,
  },
  logoText: {
    fontSize: 36,
    fontWeight: FontWeight.regular,
    color: "#FAFAFA",
    letterSpacing: -1.5,
  },
  tagline: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: Spacing.xxxl,
  },
  line: {
    position: "absolute",
    bottom: 80,
    height: 1,
    borderRadius: 1,
  },
});
