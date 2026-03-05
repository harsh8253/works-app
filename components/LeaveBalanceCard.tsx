import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Colors, Spacing, BorderRadius, FontSize, FontWeight, Shadows } from "@/constants/theme";
import { useTheme } from "@/constants/ThemeContext";

interface LeaveBalanceCardProps {
  label: string;
  count: number;
  total: number;
  color: string;
  onPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const LeaveBalanceCard: React.FC<LeaveBalanceCardProps> = ({ label, count, total, color, onPress }) => {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => { scale.value = withSpring(0.96); };
  const handlePressOut = () => { scale.value = withSpring(1); };

  return (
    <AnimatedPressable
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
        animatedStyle,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + "15" }]}>
        <Text style={[styles.count, { color }]}>{count}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        <Text style={[styles.total, { color: colors.textSecondary }]}>{total} Total Days</Text>
      </View>
      <View style={styles.progressBarBg}>
        <View 
          style={[
            styles.progressBarFill, 
            { backgroundColor: color, width: `${(count / total) * 100}%` }
          ]} 
        />
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    marginRight: Spacing.md,
    ...Shadows.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  count: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  info: {
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  total: {
    fontSize: FontSize.xs,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 2,
  },
});
