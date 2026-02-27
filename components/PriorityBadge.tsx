import { BorderRadius, FontSize, FontWeight, Spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface PriorityBadgeProps {
  priority: "high" | "medium" | "low";
  size?: "sm" | "md";
  style?: ViewStyle;
}

const priorityConfig = {
  high: {
    label: "High",
    color: "#F87171",
    bg: "rgba(248, 113, 113, 0.1)",
    icon: "chevron-up" as const,
  },
  medium: {
    label: "Medium",
    color: "#FBBF24",
    bg: "rgba(251, 191, 36, 0.1)",
    icon: "remove" as const,
  },
  low: {
    label: "Low",
    color: "#34D399",
    bg: "rgba(52, 211, 153, 0.1)",
    icon: "chevron-down" as const,
  },
};

export default function PriorityBadge({
  priority,
  size = "md",
  style,
}: PriorityBadgeProps) {
  const config = priorityConfig[priority];

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
      <Ionicons
        name={config.icon}
        size={size === "sm" ? 10 : 12}
        color={config.color}
        style={{ marginRight: Spacing.xs - 1 }}
      />
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
  text: {
    fontWeight: FontWeight.medium,
    letterSpacing: 0.1,
  },
});
