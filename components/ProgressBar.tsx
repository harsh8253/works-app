import { FontSize, FontWeight, Spacing } from "@/constants/theme";
import { useTheme } from "@/constants/ThemeContext";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

interface ProgressBarProps {
  progress: number;
  height?: number;
  showLabel?: boolean;
  label?: string;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  animated?: boolean;
}

export default function ProgressBar({
  progress,
  height = 4,
  showLabel = true,
  label,
  color,
  backgroundColor,
  style,
  animated = true,
}: ProgressBarProps) {
  const { colors } = useTheme();
  const animatedWidth = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      animatedWidth.value = withTiming(progress, {
        duration: 1000,
        easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
      });
    } else {
      animatedWidth.value = progress;
    }
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedWidth.value * 100}%`,
  }));

  const barColor = color || colors.primary;
  const trackColor = backgroundColor || colors.primaryMuted;

  return (
    <View style={[styles.container, style]}>
      {(showLabel || label) && (
        <View style={styles.labelRow}>
          {label && (
            <Text style={[styles.label, { color: colors.textTertiary }]}>
              {label}
            </Text>
          )}
          {showLabel && (
            <Text style={[styles.percentage, { color: colors.textSecondary }]}>
              {Math.round(progress * 100)}%
            </Text>
          )}
        </View>
      )}
      <View
        style={[
          styles.track,
          {
            height,
            backgroundColor: trackColor,
            borderRadius: height / 2,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.fill,
            {
              height,
              backgroundColor: barColor,
              borderRadius: height / 2,
            },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
  },
  percentage: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  track: {
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
  },
});
