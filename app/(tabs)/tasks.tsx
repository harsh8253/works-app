import TaskCard from "@/components/TaskCard";
import { tasks } from "@/constants/mockData";
import {
  BorderRadius,
  Colors,
  FontSize,
  FontWeight,
  Spacing,
} from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabFilter = "all" | "todo" | "in-progress" | "done";

export default function TaskListScreen() {
  const colors = Colors.dark;
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs: { key: TabFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "todo", label: "To Do" },
    { key: "in-progress", label: "In Progress" },
    { key: "done", label: "Done" },
  ];

  const filteredTasks = tasks
    .filter((t) => activeTab === "all" || t.status === activeTab)
    .filter(
      (t) =>
        searchQuery === "" ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.md }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Tasks</Text>
        <TouchableOpacity
          style={[styles.iconBtn, { borderColor: colors.border }]}
        >
          <Ionicons name="options-outline" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <Animated.View
        entering={FadeIn.duration(300)}
        style={styles.searchContainer}
      >
        <View style={[styles.searchBar, { borderColor: colors.border }]}>
          <Ionicons name="search-outline" size={16} color={colors.textMuted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search tasks..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons
                name="close-circle"
                size={16}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      {/* Tabs */}
      <Animated.View entering={FadeIn.duration(300).delay(100)}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScroll}
        >
          {tabs.map((tab) => {
            const count =
              tab.key === "all"
                ? tasks.length
                : tasks.filter((t) => t.status === tab.key).length;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[
                  styles.tab,
                  activeTab === tab.key
                    ? {
                        backgroundColor: colors.surfaceLight,
                        borderColor: colors.border,
                      }
                    : { borderColor: "transparent" },
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        activeTab === tab.key ? colors.text : colors.textMuted,
                    },
                  ]}
                >
                  {tab.label}
                </Text>
                <Text
                  style={[
                    styles.tabCount,
                    {
                      color:
                        activeTab === tab.key
                          ? colors.textSecondary
                          : colors.textMuted,
                    },
                  ]}
                >
                  {count}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>

      {/* Task List */}
      <ScrollView
        style={styles.taskList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {filteredTasks.length === 0 ? (
          <Animated.View
            entering={FadeIn.duration(400)}
            style={styles.emptyState}
          >
            <Ionicons
              name="albums-outline"
              size={40}
              color={colors.textMuted}
            />
            <Text style={[styles.emptyTitle, { color: colors.textSecondary }]}>
              No tasks found
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textMuted }]}>
              {searchQuery
                ? "Try adjusting your search"
                : "Create your first task"}
            </Text>
          </Animated.View>
        ) : (
          filteredTasks.map((task, index) => (
            <Animated.View
              key={task.id}
              entering={FadeInDown.duration(300).delay(150 + index * 40)}
            >
              <TaskCard
                task={task}
                onPress={() => router.push(`/task-detail?id=${task.id}` as any)}
              />
            </Animated.View>
          ))
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        activeOpacity={0.85}
        onPress={() => router.push("/add-task" as any)}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.semibold,
    letterSpacing: -0.5,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  searchContainer: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.sm,
  },
  tabsScroll: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
    gap: Spacing.xs,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.xs + 2,
  },
  tabText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  tabCount: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.regular,
  },
  taskList: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    gap: Spacing.sm,
  },
  emptyTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
  emptySubtitle: {
    fontSize: FontSize.sm,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
});
