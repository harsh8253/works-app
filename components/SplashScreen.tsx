import { Colors, FontWeight } from "@/constants/theme";
import React, { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const NAME_PART1 = "ciright";
const NAME_PART2 = "HRM";
const LETTER_DELAY_MS = 80;

const TAGLINE = ["Manage", "Track", "Deliver"];

function AnimatedLetter({
  letter,
  index,
  isAccent,
}: {
  letter: string;
  index: number;
  isAccent: boolean;
}) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.6);

  useEffect(() => {
    const delay = index * LETTER_DELAY_MS;
    opacity.value = withDelay(delay, withSpring(1, { damping: 14, stiffness: 200 }));
    scale.value = withDelay(delay, withSpring(1, { damping: 14, stiffness: 200 }));
  }, [index]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.Text
      style={[
        styles.letter,
        isAccent && styles.letterAccent,
        style,
      ]}
    >
      {letter}
    </Animated.Text>
  );
}

export default function SplashScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const totalLetters = NAME_PART1.length + NAME_PART2.length;
    const duration = totalLetters * LETTER_DELAY_MS + 1200;
    const timer = setTimeout(() => {
      runOnJS(onFinish)();
    }, duration);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
      pointerEvents="box-none"
    >
      <View style={styles.center}>
        <View style={styles.titleRow}>
          {NAME_PART1.split("").map((letter, i) => (
            <AnimatedLetter key={`c-${i}`} letter={letter} index={i} isAccent={false} />
          ))}
          {NAME_PART2.split("").map((letter, i) => (
            <AnimatedLetter
              key={`h-${i}`}
              letter={letter}
              index={NAME_PART1.length + i}
              isAccent
            />
          ))}
        </View>

        <View style={styles.taglineRow}>
          <Text style={styles.taglineText}>{TAGLINE[0]}</Text>
          <View style={styles.taglineLine} />
          <Text style={styles.taglineText}>{TAGLINE[1]}</Text>
          <View style={styles.taglineLine} />
          <Text style={styles.taglineText}>{TAGLINE[2]}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.dark.background,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  center: {
    alignItems: "center",
    maxWidth: "85%",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  letter: {
    fontSize: Platform.select({ ios: 36, android: 34, default: 34 }),
    fontWeight: FontWeight.bold,
    color: Colors.dark.text,
  },
  letterAccent: {
    color: Colors.dark.primary,
  },
  taglineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  taglineText: {
    fontSize: 13,
    color: Colors.dark.textSecondary,
    fontWeight: FontWeight.medium,
  },
  taglineLine: {
    width: 2,
    height: 12,
    backgroundColor: Colors.dark.primary,
    borderRadius: 1,
  },
});
