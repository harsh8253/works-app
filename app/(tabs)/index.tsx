import ProgressBar from "@/components/ProgressBar";
import SummaryCard from "@/components/SummaryCard";
import TaskCard from "@/components/TaskCard";
import {
  currentSprint,
  currentUser,
  summaryData,
  tasks,
} from "@/constants/mockData";
import {
  BorderRadius,
  Colors,
  FontSize,
  FontWeight,
  Spacing,
} from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const colors = Colors.dark;
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const recentTasks = tasks.slice(0, 5);

  const summaryColors = ["#A78BFA", "#FBBF24", "#34D399", "#F87171"];

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
              {currentUser.name.split(" ")[0]}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[styles.iconBtn, { borderColor: colors.border }]}
            >
              <Ionicons
                name="search-outline"
                size={18}
                color={colors.textMuted}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconBtn, { borderColor: colors.border }]}
            >
              <Ionicons
                name="notifications-outline"
                size={18}
                color={colors.textMuted}
              />
              <View
                style={[styles.notifDot, { backgroundColor: colors.primary }]}
              />
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
            {summaryData.map((item, index) => (
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
                Current Sprint
              </Text>
              <Text style={[styles.sprintName, { color: colors.text }]}>
                {currentSprint.name}
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
            progress={currentSprint.progress}
            label={`${currentSprint.completedTasks} of ${currentSprint.totalTasks} tasks`}
            style={{ marginTop: Spacing.xl }}
          />

          <View style={styles.sprintMeta}>
            <Text style={[styles.metaText, { color: colors.textMuted }]}>
              Ends {currentSprint.deadline}
            </Text>
            <Text style={[styles.metaText, { color: colors.warning }]}>
              16d remaining
            </Text>
          </View>
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

          {recentTasks.map((task, index) => (
            <Animated.View
              key={task.id}
              entering={FadeInDown.duration(300).delay(400 + index * 50)}
            >
              <TaskCard
                task={task}
                onPress={() => router.push(`/task-detail?id=${task.id}` as any)}
              />
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        activeOpacity={0.85}
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
  sprintMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.md,
  },
  metaText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.regular,
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
