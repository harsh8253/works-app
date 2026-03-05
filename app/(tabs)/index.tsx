import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useTheme } from "@/constants/ThemeContext";
import { Colors, Spacing, BorderRadius, FontSize, FontWeight, Shadows } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>Good Morning,</Text>
          <Text style={[styles.userName, { color: colors.text }]}>John Doe</Text>
        </View>
        <TouchableOpacity style={[styles.notificationBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
          <View style={[styles.notificationBadge, { backgroundColor: colors.danger }]} />
        </TouchableOpacity>
      </View>

      {/* Employee Profile Card */}
      <View style={[styles.profileCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?u=john" }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, { color: colors.text }]}>Senior UI Designer</Text>
          <Text style={[styles.profileDept, { color: colors.textSecondary }]}>Product & Design Team</Text>
          <View style={styles.statusBadge}>
            <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
            <Text style={[styles.statusText, { color: colors.success }]}>Checked In (09:42 AM)</Text>
          </View>
        </View>
      </View>

      {/* Balance Summary (Horizontal Scroll) */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Balance Summary</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.balanceScroll}>
        <View style={[styles.balanceCard, { backgroundColor: colors.primaryMuted, borderColor: colors.primary }]}>
          <Text style={[styles.balanceLabel, { color: colors.primary }]}>Annual Leave</Text>
          <Text style={[styles.balanceValue, { color: colors.text }]}>12 Days</Text>
          <Text style={[styles.balanceSubtitle, { color: colors.textSecondary }]}>Available</Text>
        </View>
        <View style={[styles.balanceCard, { backgroundColor: colors.successMuted, borderColor: colors.success }]}>
          <Text style={[styles.balanceLabel, { color: colors.success }]}>Sick Leave</Text>
          <Text style={[styles.balanceValue, { color: colors.text }]}>5 Days</Text>
          <Text style={[styles.balanceSubtitle, { color: colors.textSecondary }]}>Used: 2 Days</Text>
        </View>
        <View style={[styles.balanceCard, { backgroundColor: colors.infoMuted, borderColor: colors.info }]}>
          <Text style={[styles.balanceLabel, { color: colors.info }]}>WFH</Text>
          <Text style={[styles.balanceValue, { color: colors.text }]}>8 Days</Text>
          <Text style={[styles.balanceSubtitle, { color: colors.textSecondary }]}>Monthly limit</Text>
        </View>
      </ScrollView>

      {/* Task Summary */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Active Tasks</Text>
        <TouchableOpacity>
          <Text style={{ color: colors.primary, fontWeight: "600" }}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.taskItem}>
          <Ionicons name="checkbox" size={20} color={colors.primary} />
          <View style={styles.taskDetails}>
            <Text style={[styles.taskTitle, { color: colors.text }]}>Design System Update</Text>
            <Text style={[styles.taskDeadline, { color: colors.danger }]}>Due Today</Text>
          </View>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
        <View style={styles.taskItem}>
          <Ionicons name="checkbox-outline" size={20} color={colors.textSecondary} />
          <View style={styles.taskDetails}>
            <Text style={[styles.taskTitle, { color: colors.text }]}>Weekly HR Meeting</Text>
            <Text style={[styles.taskDeadline, { color: colors.textSecondary }]}>Tomorrow, 10:00 AM</Text>
          </View>
        </View>
      </View>

      {/* Calendar & Holidays Row */}
      <View style={styles.row}>
        <View style={[styles.halfCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Office Holidays</Text>
          <View style={styles.holidayItem}>
            <Text style={[styles.holidayDate, { color: colors.primary }]}>Mar 21</Text>
            <Text style={[styles.holidayName, { color: colors.text }]}>Independence Day</Text>
          </View>
        </View>
        <View style={[styles.halfCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Birthdays</Text>
          <View style={styles.birthdayItem}>
            <Image source={{ uri: "https://i.pravatar.cc/150?u=jane" }} style={styles.smallAvatar} />
            <Text style={[styles.birthdayName, { color: colors.text }]}>Jane Cooper</Text>
          </View>
        </View>
      </View>

      {/* Absent Employees */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Who's Away Today</Text>
      </View>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, padding: Spacing.md }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["Guy Hawkins", "Bessie Cooper", "Arlene McCoy"].map((name, i) => (
            <View key={i} style={styles.absentUser}>
              <Image source={{ uri: `https://i.pravatar.cc/150?u=${i}` }} style={styles.avatarSmall} />
              <Text style={[styles.absentName, { color: colors.text }]}>{name.split(' ')[0]}</Text>
              <Text style={[styles.absentType, { color: colors.textSecondary }]}>Sick</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Community Feed */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Community Feed</Text>
      </View>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.feedHeader}>
          <Image source={{ uri: "https://i.pravatar.cc/150?u=admin" }} style={styles.smallAvatar} />
          <View>
            <Text style={[styles.feedAuthor, { color: colors.text }]}>HR Department</Text>
            <Text style={[styles.feedTime, { color: colors.textSecondary }]}>2 hours ago</Text>
          </View>
        </View>
        <Text style={[styles.feedText, { color: colors.text }]}>
          We're excited to announce our upcoming team building event next Friday! Stay tuned for more details. 🚀
        </Text>
        <Image 
          source={{ uri: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format" }} 
          style={styles.feedImage}
        />
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingTop: Spacing.xxxxl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  greeting: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
  userName: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "white",
  },
  profileCard: {
    flexDirection: "row",
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    alignItems: "center",
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
  },
  profileDept: {
    fontSize: FontSize.sm,
    marginBottom: Spacing.xs,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: Spacing.xs,
  },
  statusText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  balanceScroll: {
    marginHorizontal: -Spacing.lg,
    paddingLeft: Spacing.lg,
    marginBottom: Spacing.md,
  },
  balanceCard: {
    width: width * 0.35,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginRight: Spacing.md,
  },
  balanceLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.xs,
  },
  balanceValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  balanceSubtitle: {
    fontSize: FontSize.xs,
  },
  card: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    overflow: "hidden",
  },
  taskItem: {
    flexDirection: "row",
    padding: Spacing.md,
    alignItems: "center",
  },
  taskDetails: {
    marginLeft: Spacing.sm,
  },
  taskTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
  taskDeadline: {
    fontSize: FontSize.xs,
  },
  divider: {
    height: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.lg,
  },
  halfCard: {
    width: "48%",
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.sm,
  },
  holidayItem: {
    marginTop: Spacing.xs,
  },
  holidayDate: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  holidayName: {
    fontSize: FontSize.xs,
  },
  birthdayItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xs,
  },
  smallAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: Spacing.xs,
  },
  birthdayName: {
    fontSize: FontSize.xs,
  },
  absentUser: {
    alignItems: "center",
    marginRight: Spacing.xl,
  },
  avatarSmall: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginBottom: Spacing.xs,
  },
  absentName: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  absentType: {
    fontSize: FontSize.xs,
  },
  feedHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
  },
  feedAuthor: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  feedTime: {
    fontSize: FontSize.xs,
  },
  feedText: {
    fontSize: FontSize.md,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    lineHeight: 20,
  },
  feedImage: {
    width: "100%",
    height: 180,
    marginTop: Spacing.xs,
  }
});
