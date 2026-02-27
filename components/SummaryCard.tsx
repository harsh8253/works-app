import {
  BorderRadius,
  Colors,
  FontSize,
  FontWeight,
  Spacing,
} from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface SummaryCardProps {
  title: string;
  count: number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export default function SummaryCard({
  title,
  count,
  icon,
  color,
  style,
  onPress,
}: SummaryCardProps) {
  const colors = Colors.dark;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 20, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20, stiffness: 400 });
  };

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.85}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        animatedStyle,
        style,
      ]}
    >
      <View style={styles.topRow}>
        <Ionicons name={icon} size={18} color={color} />
        <Text style={[styles.count, { color: colors.text }]}>{count}</Text>
      </View>
      <Text style={[styles.title, { color: colors.textTertiary }]}>
        {title}
      </Text>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 130,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    marginRight: Spacing.sm,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  count: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.semibold,
  },
  title: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    letterSpacing: 0.3,
  },
});
