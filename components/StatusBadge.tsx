import { BorderRadius, FontSize, FontWeight, Spacing } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface StatusBadgeProps {
  status: "todo" | "in-progress" | "done";
  size?: "sm" | "md";
  style?: ViewStyle;
}

const statusConfig = {
  todo: { label: "To Do", color: "#A1A1AA", bg: "rgba(161, 161, 170, 0.1)" },
  "in-progress": {
    label: "In Progress",
    color: "#FBBF24",
    bg: "rgba(251, 191, 36, 0.1)",
  },
  done: { label: "Done", color: "#34D399", bg: "rgba(52, 211, 153, 0.1)" },
};

export default function StatusBadge({
  status,
  size = "md",
  style,
}: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: config.bg,
          paddingVertical: size === "sm" ? 2 : 3,
          paddingHorizontal: size === "sm" ? Spacing.sm : Spacing.md,
        },
        style,
      ]}
    >
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <Text
        style={[
          styles.text,
          {
            color: config.color,
            fontSize: size === "sm" ? FontSize.xs : FontSize.sm,
          },
        ]}
      >
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.sm,
    alignSelf: "flex-start",
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginRight: Spacing.xs + 1,
  },
  text: {
    fontWeight: FontWeight.medium,
    letterSpacing: 0.1,
  },
});
