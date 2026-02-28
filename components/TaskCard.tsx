import { db } from "@/constants/firebase";
import { Task } from "@/constants/mockData";
import {
    BorderRadius,
    FontSize,
    FontWeight,
    Spacing,
} from "@/constants/theme";
import { useTheme } from "@/constants/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import {
    Alert,
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
  onEdit?: () => void;
  onAssign?: () => void;
  onSupport?: () => void;
  compact?: boolean;
  style?: ViewStyle;
}

export default function TaskCard({
  task,
  onPress,
  onEdit,
  onAssign,
  onSupport,
  compact = false,
  style,
}: TaskCardProps) {
  const { colors } = useTheme();
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

  const confirmDelete = () => {
    Alert.alert(
      "Delete Task",
      `Are you sure you want to delete "${task.title}"?\n\nThis action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "tasks", task.id));
            } catch (e: any) {
              Alert.alert("Error", e.message || "Failed to delete task");
            }
          },
        },
      ]
    );
  };

  const handleLongPress = () => {
    const buttons: any[] = [
      { text: "Open Task", onPress: onPress },
    ];
    if (onEdit) {
      buttons.push({ text: "✏️ Edit Task", onPress: onEdit });
    }
    if (onAssign) {
      buttons.push({ text: "👤 Assign Members", onPress: onAssign });
    }
    if (onSupport) {
      buttons.push({ text: "🤝 Add Support", onPress: onSupport });
    }
    buttons.push({
      text: "🗑️ Delete Task",
      style: "destructive",
      onPress: confirmDelete,
    });
    buttons.push({ text: "Cancel", style: "cancel" });

    Alert.alert(task.title, "Choose an action", buttons);
  };

  if (compact) {
    return (
      <AnimatedTouchable
        onPress={onPress}
        onLongPress={handleLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.85}
        delayLongPress={400}
        style={[
          styles.compactCard,
          { backgroundColor: colors.card, borderColor: colors.border },
          animatedStyle,
          style,
        ]}
      >
        <Text style={[styles.compactTitle, { color: colors.text }]} numberOfLines={1}>
          {task.title}
        </Text>
        <View style={styles.compactFooter}>
          <PriorityBadge priority={task.priority} size="sm" />
          <AvatarGroup avatars={task.assignees || []} size={20} maxDisplay={2} />
        </View>
      </AnimatedTouchable>
    );
  }

  return (
    <AnimatedTouchable
      onPress={onPress}
      onLongPress={handleLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.85}
      delayLongPress={400}
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
        animatedStyle,
        style,
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {task.title}
        </Text>
      </View>
      <Text style={[styles.description, { color: colors.textTertiary }]} numberOfLines={2}>
        {task.description}
      </Text>
      <View style={styles.badgeRow}>
        <StatusBadge status={task.status} size="sm" />
        <PriorityBadge priority={task.priority} size="sm" style={{ marginLeft: Spacing.sm }} />
      </View>
      <View style={styles.footer}>
        <AvatarGroup avatars={task.assignees || []} size={24} />
        <View style={styles.dueDateRow}>
          <Ionicons name="calendar-outline" size={13} color={colors.textMuted} />
          <Text style={[styles.dueDate, { color: colors.textMuted }]}>{task.dueDate}</Text>
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
  header: { marginBottom: Spacing.xs },
  title: { fontSize: FontSize.md, fontWeight: FontWeight.medium, lineHeight: 20 },
  description: { fontSize: FontSize.sm, lineHeight: 18, marginBottom: Spacing.md },
  badgeRow: { flexDirection: "row", alignItems: "center", marginBottom: Spacing.md },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  dueDateRow: { flexDirection: "row", alignItems: "center" },
  dueDate: { fontSize: FontSize.xs, marginLeft: Spacing.xs, fontWeight: FontWeight.regular },
  compactCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  compactTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, marginBottom: Spacing.sm },
  compactFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
});
