import TaskActions from "@/components/TaskActions";
import TaskCard from "@/components/TaskCard";
import { db } from "@/constants/firebase";
import { Task } from "@/constants/mockData";
import {
    BorderRadius,
    FontSize,
    FontWeight,
    Spacing
} from "@/constants/theme";
import { useTheme } from "@/constants/ThemeContext";
import { useRouter } from "expo-router";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface KanbanColumn {
  key: "todo" | "in-progress" | "done";
  title: string;
  color: string;
}

const columns: KanbanColumn[] = [
  { key: "todo", title: "To Do", color: "#A1A1AA" },
  { key: "in-progress", title: "In Progress", color: "#FBBF24" },
  { key: "done", title: "Done", color: "#34D399" },
];

export default function SprintBoardScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [actionTaskId, setActionTaskId] = useState<string | null>(null);
  const [actionMode, setActionMode] = useState<"edit" | "assign" | "support" | null>(null);

  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const fetchedTasks = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Task)
        );
        fetchedTasks.sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0));
        setTasks(fetchedTasks);
      },
      (error) => {
        console.error("Error fetching tasks:", error);
      }
    );
    return unsub;
  }, []);

  const stats = useMemo(() => [
    { label: "Total", value: tasks.length, color: colors.text },
    { label: "Active", value: tasks.filter((t) => t.status === "in-progress").length, color: "#FBBF24" },
    { label: "Done", value: tasks.filter((t) => t.status === "done").length, color: "#34D399" },
  ], [tasks]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <Animated.View
        entering={FadeIn.duration(400)}
        style={[styles.header, { paddingTop: insets.top + Spacing.md }]}
      >
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Sprint Board
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.textMuted }]}>
            {tasks.length} tasks across {columns.length} columns
          </Text>
        </View>
      </Animated.View>

      {/* Stats */}
      <Animated.View
        entering={FadeIn.duration(400).delay(100)}
        style={[styles.statsRow]}
      >
        {stats.map((stat) => (
          <View key={stat.label} style={styles.stat}>
            <Text style={[styles.statValue, { color: stat.color }]}>
              {stat.value}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </Animated.View>

      {/* Kanban Board */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.boardScroll}
        decelerationRate="fast"
        snapToInterval={268}
      >
        {columns.map((column, colIndex) => {
          const columnTasks = tasks.filter((t) => t.status === column.key);
          return (
            <Animated.View
              key={column.key}
              entering={FadeInRight.duration(400).delay(200 + colIndex * 100)}
              style={[styles.column, { borderColor: colors.border }]}
            >
              <View style={styles.columnHeader}>
                <View style={styles.columnTitleRow}>
                  <View
                    style={[
                      styles.columnDot,
                      { backgroundColor: column.color },
                    ]}
                  />
                  <Text
                    style={[
                      styles.columnTitle,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {column.title}
                  </Text>
                  <Text
                    style={[styles.columnCount, { color: colors.textMuted }]}
                  >
                    {columnTasks.length}
                  </Text>
                </View>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.columnContent}
              >
                {columnTasks.length === 0 ? (
                  <View
                    style={[styles.emptyColumn, { borderColor: colors.border }]}
                  >
                    <Text
                      style={[styles.emptyText, { color: colors.textMuted }]}
                    >
                      No tasks
                    </Text>
                  </View>
                ) : (
                  columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      compact
                      onPress={() =>
                        router.push(`/task-detail?id=${task.id}` as any)
                      }
                      onEdit={() => { setActionTaskId(task.id); setActionMode("edit"); }}
                      onAssign={() => { setActionTaskId(task.id); setActionMode("assign"); }}
                      onSupport={() => { setActionTaskId(task.id); setActionMode("support"); }}
                    />
                  ))
                )}
              </ScrollView>
            </Animated.View>
          );
        })}
      </ScrollView>

      <TaskActions
        taskId={actionTaskId}
        mode={actionMode}
        onClose={() => { setActionTaskId(null); setActionMode(null); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.semibold,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
    gap: Spacing.xxl,
  },
  stat: {
    alignItems: "flex-start",
  },
  statValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
  },
  statLabel: {
    fontSize: FontSize.xs,
    marginTop: 1,
  },
  boardScroll: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 100,
    gap: Spacing.sm,
  },
  column: {
    width: 260,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.md,
    maxHeight: "100%",
  },
  columnHeader: {
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  columnTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  columnDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  columnTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    flex: 1,
  },
  columnCount: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.regular,
  },
  columnContent: {
    paddingBottom: Spacing.sm,
  },
  emptyColumn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xxxl,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: BorderRadius.lg,
  },
  emptyText: {
    fontSize: FontSize.sm,
  },
});
