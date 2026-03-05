import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useTheme } from "@/constants/ThemeContext";
import { Colors, Spacing, BorderRadius, FontSize, FontWeight } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

const TASKS = [
  { id: "1", title: "Update Design System", priority: "High", status: "In Progress", deadline: "Today" },
  { id: "2", title: "Review Q1 Reports", priority: "Medium", status: "Pending", deadline: "Tomorrow" },
  { id: "3", title: "Team Lunch RSVP", priority: "Low", status: "Completed", deadline: "Completed" },
  { id: "4", title: "Client Presentation", priority: "High", status: "Pending", deadline: "Mar 10" },
];

export default function TasksScreen() {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const [activeFilter, setActiveFilter] = useState("All");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return colors.danger;
      case "Medium": return colors.warning;
      case "Low": return colors.info;
      default: return colors.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Tasks</Text>
        <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterBar}>
        {["All", "In Progress", "Pending", "Completed"].map((filter) => (
          <TouchableOpacity 
            key={filter} 
            onPress={() => setActiveFilter(filter)}
            style={[
              styles.filterItem, 
              activeFilter === filter && { backgroundColor: colors.primary, borderColor: colors.primary }
            ]}
          >
            <Text style={[
              styles.filterText, 
              { color: activeFilter === filter ? "white" : colors.textSecondary }
            ]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {TASKS.map((task) => (
          <View key={task.id} style={[styles.taskCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.taskHeader}>
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) + "20" }]}>
                <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>{task.priority}</Text>
              </View>
              <Text style={[styles.deadlineText, { color: colors.textTertiary }]}>{task.deadline}</Text>
            </View>
            <Text style={[styles.taskTitle, { color: colors.text }]}>{task.title}</Text>
            <View style={styles.taskFooter}>
              <View style={styles.statusRow}>
                <Ionicons 
                  name={task.status === "Completed" ? "checkmark-circle" : "ellipse-outline"} 
                  size={16} 
                  color={task.status === "Completed" ? colors.success : colors.textTertiary} 
                />
                <Text style={[styles.statusText, { color: colors.textSecondary }]}>{task.status}</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={20} color={colors.textTertiary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.xxxxl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  filterBar: {
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  filterItem: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: "transparent",
  },
  filterText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  taskCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: FontWeight.bold,
    textTransform: "uppercase",
  },
  deadlineText: {
    fontSize: FontSize.xs,
  },
  taskTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    marginBottom: Spacing.md,
  },
  taskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusText: {
    fontSize: FontSize.xs,
  },
});
