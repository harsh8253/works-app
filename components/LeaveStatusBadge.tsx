import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Colors, FontSize, FontWeight, BorderRadius, Spacing } from "@/constants/theme";
import { useTheme } from "@/constants/ThemeContext";

export type LeaveStatus = "Approved" | "Pending" | "Rejected";

interface LeaveStatusBadgeProps {
  status: LeaveStatus;
}

export const LeaveStatusBadge: React.FC<LeaveStatusBadgeProps> = ({ status }) => {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  const getStatusConfig = () => {
    switch (status) {
      case "Approved":
        return {
          bg: isDark ? colors.successMuted : "#ECFDF5",
          text: colors.success,
        };
      case "Pending":
        return {
          bg: isDark ? colors.warningMuted : "#FFFBEB",
          text: colors.warning,
        };
      case "Rejected":
        return {
          bg: isDark ? colors.dangerMuted : "#FEF2F2",
          text: colors.danger,
        };
      default:
        return { bg: colors.surfaceLight, text: colors.textSecondary };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <View style={[styles.dot, { backgroundColor: config.text }]} />
      <Text style={[styles.text, { color: config.text }]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    alignSelf: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    textTransform: "capitalize",
  },
});
