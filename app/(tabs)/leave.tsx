import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@/constants/ThemeContext";
import { Colors, Spacing, BorderRadius, FontSize, FontWeight } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { LeaveBalanceCard } from "@/components/LeaveBalanceCard";
import { LeaveRequestCard } from "@/components/LeaveRequestCard";
import { LeaveCalendar } from "@/components/LeaveCalendar";
import { RequestLeaveModal } from "@/components/RequestLeaveModal";
import Animated, { FadeInUp, FadeInRight } from "react-native-reanimated";

const LEAVE_HISTORY = [
  { id: "1", type: "Annual Leave", status: "Approved" as const, startDate: "Mar 05", endDate: "Mar 07", days: 3, reason: "Family trip to mountains", approvedBy: "Sarah Jenkins" },
  { id: "2", type: "Sick Leave", status: "Pending" as const, startDate: "Mar 15", endDate: "Mar 16", days: 1, reason: "Dental checkup appointment" },
  { id: "3", type: "Optional Leave", status: "Rejected" as const, startDate: "Feb 12", endDate: "Feb 12", days: 1, reason: "Personal errands", approvedBy: "Sarah Jenkins" },
];

export default function LeaveManagementScreen() {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Leave Management</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Track and request your time off</Text>
        </View>
        <TouchableOpacity 
          style={[styles.addBtn, { backgroundColor: colors.primary }]}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Leave Balances Section */}
        <Animated.View entering={FadeInRight.delay(100)}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.balanceList}>
            <LeaveBalanceCard 
              label="Paid Leave" 
              count={12} 
              total={20} 
              color={colors.primary} 
            />
            <LeaveBalanceCard 
              label="Optional" 
              count={2} 
              total={5} 
              color={colors.info} 
            />
            <LeaveBalanceCard 
              label="Sick Leave" 
              count={5} 
              total={10} 
              color={colors.success} 
            />
          </ScrollView>
        </Animated.View>

        {/* Filters */}
        <View style={styles.filterBar}>
          {["All", "Pending", "Approved", "Rejected"].map((filter) => (
            <TouchableOpacity 
              key={filter} 
              onPress={() => setActiveFilter(filter)}
              style={[
                styles.filterItem, 
                { backgroundColor: activeFilter === filter ? colors.primary : colors.surface, 
                  borderColor: activeFilter === filter ? colors.primary : colors.border 
                }
              ]}
            >
              <Text style={[
                styles.filterText, 
                { color: activeFilter === filter ? "white" : colors.textSecondary }
              ]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Calendar Section */}
        <Animated.View entering={FadeInUp.delay(200)}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Leave Calendar</Text>
          <LeaveCalendar month="March" year={2026} />
        </Animated.View>

        {/* Leave Requests Section */}
        <Animated.View entering={FadeInUp.delay(300)}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Leave History</Text>
            <TouchableOpacity>
              <Text style={{ color: colors.primary, fontWeight: "600" }}>View All</Text>
            </TouchableOpacity>
          </View>
          {LEAVE_HISTORY
            .filter(item => activeFilter === "All" || item.status === activeFilter)
            .map((item) => (
              <LeaveRequestCard key={item.id} {...item} />
          ))}
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Request Modal */}
      <RequestLeaveModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
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
  subtitle: {
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  addBtn: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  balanceList: {
    marginHorizontal: -Spacing.lg,
    paddingLeft: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  filterBar: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  filterItem: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  filterText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.md,
  },
});
