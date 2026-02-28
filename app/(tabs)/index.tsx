import ProgressBar from "@/components/ProgressBar";
import SummaryCard from "@/components/SummaryCard";
import TaskActions from "@/components/TaskActions";
import TaskCard from "@/components/TaskCard";
import { auth, db } from "@/constants/firebase";
import { Task } from "@/constants/mockData";
import {
    BorderRadius,
    FontSize,
    FontWeight,
    Spacing,
} from "@/constants/theme";
import { useTheme } from "@/constants/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const userName = auth.currentUser?.displayName || auth.currentUser?.email?.split("@")[0] || "User";

  // Live summary data from Firebase tasks
  const liveSummary = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const done = tasks.filter((t) => t.status === "done").length;
    const todo = tasks.filter((t) => t.status === "todo").length;
    return [
      { id: "1", title: "Total Tasks", count: total, icon: "layers-outline" },
      { id: "2", title: "In Progress", count: inProgress, icon: "time-outline" },
      { id: "3", title: "Completed", count: done, icon: "checkmark-circle-outline" },
      { id: "4", title: "To Do", count: todo, icon: "albums-outline" },
    ];
  }, [tasks]);

  // Live sprint progress
  const sprintProgress = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "done").length;
    return {
      name: "Current Sprint",
      progress: total > 0 ? done / total : 0,
      completedTasks: done,
      totalTasks: total,
    };
  }, [tasks]);

  // Notifications built from real task data
  const notifications = useMemo(() => {
    const notifs: { id: string; title: string; message: string; time: string; read: boolean }[] = [];
    const highPriority = tasks.filter((t) => t.priority === "high" && t.status !== "done");
    if (highPriority.length > 0) {
      notifs.push({
        id: "n1",
        title: "🔴 High Priority",
        message: `${highPriority.length} high-priority task${highPriority.length > 1 ? "s" : ""} need attention`,
        time: "Now",
        read: false,
      });
    }
    const inProgress = tasks.filter((t) => t.status === "in-progress");
    if (inProgress.length > 0) {
      notifs.push({
        id: "n2",
        title: "🟡 In Progress",
        message: `${inProgress.length} task${inProgress.length > 1 ? "s" : ""} currently in progress`,
        time: "Now",
        read: false,
      });
    }
    const completed = tasks.filter((t) => t.status === "done");
    if (completed.length > 0) {
      notifs.push({
        id: "n3",
        title: "✅ Completed",
        message: `${completed.length} task${completed.length > 1 ? "s" : ""} completed`,
        time: "Recent",
        read: true,
      });
    }
    if (tasks.length === 0) {
      notifs.push({
        id: "n4",
        title: "👋 Welcome",
        message: "Create your first task to get started!",
        time: "Now",
        read: false,
      });
    }
    return notifs;
  }, [tasks]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Search overlay filtered tasks
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return tasks.filter(
      (t) =>
        t.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  const recentTasks = tasks.slice(0, 5);
  const summaryColors = ["#A78BFA", "#FBBF24", "#34D399", "#60A5FA"];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <Animated.View
          entering={FadeIn.duration(400)}
          style={[styles.header, { paddingTop: insets.top + Spacing.lg }]}
        >
          <View>
            <Text style={[styles.greeting, { color: colors.textTertiary }]}>
              {getGreeting()},
            </Text>
            <Text style={[styles.name, { color: colors.text }]}>
              {userName}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[styles.iconBtn, { borderColor: colors.border }]}
              onPress={() => setShowSearch(true)}
            >
              <Ionicons
                name="search-outline"
                size={18}
                color={colors.textMuted}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconBtn, { borderColor: colors.border }]}
              onPress={() => setShowNotifications(true)}
            >
              <Ionicons
                name="notifications-outline"
                size={18}
                color={colors.textMuted}
              />
              {unreadCount > 0 && (
                <View
                  style={[styles.notifDot, { backgroundColor: colors.primary }]}
                />
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Summary Cards */}
        <Animated.View entering={FadeIn.duration(400).delay(100)}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.summaryScroll}
          >
            {liveSummary.map((item, index) => (
              <SummaryCard
                key={item.id}
                title={item.title}
                count={item.count}
                icon={item.icon as any}
                color={summaryColors[index]}
              />
            ))}
          </ScrollView>
        </Animated.View>

        {/* Sprint Progress */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(200)}
          style={[styles.sprintCard, { borderColor: colors.border }]}
        >
          <View style={styles.sprintHeader}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
                Sprint Overview
              </Text>
              <Text style={[styles.sprintName, { color: colors.text }]}>
                {sprintProgress.name}
              </Text>
            </View>
            <View
              style={[
                styles.activeBadge,
                { backgroundColor: colors.primaryMuted },
              ]}
            >
              <View
                style={[styles.activeDot, { backgroundColor: colors.primary }]}
              />
              <Text style={[styles.activeText, { color: colors.primaryLight }]}>
                Active
              </Text>
            </View>
          </View>

          <ProgressBar
            progress={sprintProgress.progress}
            label={`${sprintProgress.completedTasks} of ${sprintProgress.totalTasks} tasks`}
            style={{ marginTop: Spacing.xl }}
          />
        </Animated.View>

        {/* Recent Tasks */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(300)}
          style={styles.recentSection}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recent
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/tasks" as any)}
            >
              <Text style={[styles.seeAll, { color: colors.textTertiary }]}>
                View all →
              </Text>
            </TouchableOpacity>
          </View>

          {recentTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="albums-outline" size={36} color={colors.textMuted} />
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                No tasks yet. Tap + to create one!
              </Text>
            </View>
          ) : (
            recentTasks.map((task, index) => (
              <Animated.View
                key={task.id}
                entering={FadeInDown.duration(300).delay(400 + index * 50)}
              >
                <TaskCard
                  task={task}
                  onPress={() => router.push(`/task-detail?id=${task.id}` as any)}
                  onEdit={() => { setActionTaskId(task.id); setActionMode("edit"); }}
                  onAssign={() => { setActionTaskId(task.id); setActionMode("assign"); }}
                  onSupport={() => { setActionTaskId(task.id); setActionMode("support"); }}
                />
              </Animated.View>
            ))
          )}
        </Animated.View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        activeOpacity={0.85}
        onPress={() => router.push("/add-task" as any)}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Search Modal */}
      <Modal visible={showSearch} animationType="slide" transparent>
        <View style={[styles.modalOverlay, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { paddingTop: insets.top + Spacing.sm }]}>
            <View style={[styles.searchBar, { borderColor: colors.border }]}>
              <Ionicons name="search-outline" size={18} color={colors.textMuted} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search tasks..."
                placeholderTextColor={colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              onPress={() => { setShowSearch(false); setSearchQuery(""); }}
              style={{ marginLeft: Spacing.md }}
            >
              <Text style={{ color: colors.primaryLight, fontSize: FontSize.md }}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex: 1, paddingHorizontal: Spacing.xl }} contentContainerStyle={{ paddingBottom: 40 }}>
            {searchQuery.trim() === "" ? (
              <Text style={[styles.searchHint, { color: colors.textMuted }]}>
                Type to search tasks by title or description
              </Text>
            ) : searchResults.length === 0 ? (
              <Text style={[styles.searchHint, { color: colors.textMuted }]}>
                No tasks found for "{searchQuery}"
              </Text>
            ) : (
              searchResults.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onPress={() => {
                    setShowSearch(false);
                    setSearchQuery("");
                    router.push(`/task-detail?id=${task.id}` as any);
                  }}
                  onEdit={() => { setShowSearch(false); setActionTaskId(task.id); setActionMode("edit"); }}
                  onAssign={() => { setShowSearch(false); setActionTaskId(task.id); setActionMode("assign"); }}
                  onSupport={() => { setShowSearch(false); setActionTaskId(task.id); setActionMode("support"); }}
                />
              ))
            )}
          </ScrollView>
        </View>
      </Modal>

      {/* Notifications Modal */}
      <Modal visible={showNotifications} animationType="slide" transparent>
        <View style={[styles.modalOverlay, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { paddingTop: insets.top + Spacing.sm }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Notifications</Text>
            <TouchableOpacity onPress={() => setShowNotifications(false)}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex: 1, paddingHorizontal: Spacing.xl }} contentContainerStyle={{ paddingBottom: 40 }}>
            {notifications.map((notif) => (
              <View
                key={notif.id}
                style={[
                  styles.notifItem,
                  {
                    borderColor: colors.border,
                    backgroundColor: notif.read ? "transparent" : `${colors.primary}08`,
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.notifTitle, { color: colors.text }]}>
                    {notif.title}
                  </Text>
                  <Text style={[styles.notifMessage, { color: colors.textTertiary }]}>
                    {notif.message}
                  </Text>
                </View>
                <Text style={[styles.notifTime, { color: colors.textMuted }]}>
                  {notif.time}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>

      {/* Task Actions (Edit/Assign/Support) */}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  greeting: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    marginBottom: 2,
  },
  name: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.semibold,
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  notifDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  summaryScroll: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  sprintCard: {
    marginHorizontal: Spacing.xl,
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    marginBottom: Spacing.xxl,
  },
  sprintHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    letterSpacing: 0.3,
    marginBottom: Spacing.xs,
  },
  sprintName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.medium,
  },
  activeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
    gap: Spacing.xs,
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  activeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  recentSection: {
    paddingHorizontal: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.medium,
  },
  seeAll: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xxxl,
    gap: Spacing.md,
  },
  emptyText: {
    fontSize: FontSize.sm,
    textAlign: "center",
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
  // Search Modal
  modalOverlay: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  modalTitle: {
    flex: 1,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
  },
  searchBar: {
    flex: 1,
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
    fontSize: FontSize.md,
  },
  searchHint: {
    textAlign: "center",
    marginTop: Spacing.xxxl,
    fontSize: FontSize.sm,
  },
  // Notifications
  notifItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    gap: Spacing.md,
  },
  notifTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    marginBottom: 4,
  },
  notifMessage: {
    fontSize: FontSize.sm,
  },
  notifTime: {
    fontSize: FontSize.xs,
  },
});
