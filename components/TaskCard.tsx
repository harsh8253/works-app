import { Task } from "@/constants/mockData";
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
import AvatarGroup from "./AvatarGroup";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface TaskCardProps {
  task: Task;
  onPress?: () => void;
  compact?: boolean;
  style?: ViewStyle;
}

export default function TaskCard({
  task,
  onPress,
  compact = false,
  style,
}: TaskCardProps) {
  const colors = Colors.dark;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 20, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20, stiffness: 400 });
  };

  if (compact) {
    return (
      <AnimatedTouchable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.85}
        style={[
          styles.compactCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
          animatedStyle,
          style,
        ]}
      >
        <Text
          style={[styles.compactTitle, { color: colors.text }]}
          numberOfLines={1}
        >
          {task.title}
        </Text>
        <View style={styles.compactFooter}>
          <PriorityBadge priority={task.priority} size="sm" />
          <AvatarGroup avatars={task.assignees} size={20} maxDisplay={2} />
        </View>
      </AnimatedTouchable>
    );
  }

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
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {task.title}
        </Text>
      </View>

      <Text
        style={[styles.description, { color: colors.textTertiary }]}
        numberOfLines={2}
      >
        {task.description}
      </Text>

      <View style={styles.badgeRow}>
        <StatusBadge status={task.status} size="sm" />
        <PriorityBadge
          priority={task.priority}
          size="sm"
          style={{ marginLeft: Spacing.sm }}
        />
      </View>

      <View style={styles.footer}>
        <AvatarGroup avatars={task.assignees} size={24} />
        <View style={styles.dueDateRow}>
          <Ionicons
            name="calendar-outline"
            size={13}
            color={colors.textMuted}
          />
          <Text style={[styles.dueDate, { color: colors.textMuted }]}>
            {task.dueDate}
          </Text>
        </View>
      </View>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  header: {
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    lineHeight: 20,
  },
  description: {
    fontSize: FontSize.sm,
    lineHeight: 18,
    marginBottom: Spacing.md,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dueDateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dueDate: {
    fontSize: FontSize.xs,
    marginLeft: Spacing.xs,
    fontWeight: FontWeight.regular,
  },
  // Compact
  compactCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  compactTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    marginBottom: Spacing.sm,
  },
  compactFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
