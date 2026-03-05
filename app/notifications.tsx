import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/constants/ThemeContext";
import { Colors, Spacing, BorderRadius, FontSize, FontWeight } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const NOTIFICATIONS = [
  {
    id: "1",
    type: "task",
    title: "New Task Assigned",
    description: "You have been assigned to 'Update Design System Documentation'.",
    time: "2h ago",
    isRead: false,
    icon: "clipboard-outline",
    iconColor: "#3B82F6",
  },
  {
    id: "2",
    type: "leave",
    title: "Leave Approved",
    description: "Your sick leave request for March 10th has been approved.",
    time: "5h ago",
    isRead: false,
    icon: "calendar-check-outline",
    iconColor: "#10B981",
  },
  {
    id: "3",
    type: "alert",
    title: "System Maintenance",
    description: "The system will be down for maintenance from 2:00 AM to 4:00 AM tonight.",
    time: "1d ago",
    isRead: true,
    icon: "warning-outline",
    iconColor: "#F59E0B",
  },
  {
    id: "4",
    type: "announcement",
    title: "New Policy Update",
    description: "Please review the updated remote work policy in the HR portal.",
    time: "2d ago",
    isRead: true,
    icon: "megaphone-outline",
    iconColor: "#6366F1",
  },
  {
    id: "5",
    type: "task",
    title: "Task Overdue",
    description: "The task 'Quarterly Report' is now overdue by 2 days.",
    time: "3d ago",
    isRead: true,
    icon: "alert-circle-outline",
    iconColor: "#EF4444",
  },
];

export default function NotificationsScreen() {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");

  const filteredNotifications = activeTab === "All" 
    ? NOTIFICATIONS 
    : NOTIFICATIONS.filter(n => n.type === "alert");

  const renderItem = ({ item }: { item: typeof NOTIFICATIONS[0] }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        { 
          backgroundColor: colors.surface, 
          borderBottomColor: colors.borderLight,
          opacity: item.isRead ? 0.7 : 1 
        },
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.iconColor + "15" }]}>
        <Ionicons name={item.icon as any} size={24} color={item.iconColor} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: colors.text, fontWeight: item.isRead ? FontWeight.medium : FontWeight.bold }]}>
            {item.title}
          </Text>
          <Text style={[styles.time, { color: colors.textTertiary }]}>{item.time}</Text>
        </View>
        <Text 
          style={[styles.description, { color: colors.textSecondary }]}
          numberOfLines={2}
        >
          {item.description}
        </Text>
      </View>
      {!item.isRead && <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={[styles.safeTop, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.borderLight }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Notifications</Text>
          <TouchableOpacity style={styles.markReadButton}>
            <Text style={[styles.markReadText, { color: colors.primary }]}>Mark all</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          {["All", "Alerts"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tab,
                activeTab === tab && { borderBottomColor: colors.primary }
              ]}
            >
              <Text 
                style={[
                  styles.tabText, 
                  { color: activeTab === tab ? colors.primary : colors.textSecondary }
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredNotifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { paddingBottom: Spacing.xl + insets.bottom }]}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={64} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              {activeTab === "Alerts" ? "No critical alerts" : "No notifications yet"}
            </Text>
          </View>
        }
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeTop: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backButton: {
    padding: Spacing.xs,
    marginLeft: -Spacing.xs,
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  markReadButton: {
    padding: Spacing.xs,
  },
  markReadText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
  },
  tab: {
    paddingVertical: Spacing.sm,
    marginRight: Spacing.xl,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
  notificationItem: {
    flexDirection: "row",
    padding: Spacing.lg,
    alignItems: "center",
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: FontSize.md,
    flex: 1,
    marginRight: Spacing.sm,
  },
  time: {
    fontSize: FontSize.xs,
  },
  description: {
    fontSize: FontSize.sm,
    lineHeight: 20,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: Spacing.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    fontSize: FontSize.md,
    marginTop: Spacing.md,
  },
});
