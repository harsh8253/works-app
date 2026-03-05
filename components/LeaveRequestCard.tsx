import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Colors, Spacing, BorderRadius, FontSize, FontWeight, Shadows } from "@/constants/theme";
import { useTheme } from "@/constants/ThemeContext";
import { LeaveStatusBadge, LeaveStatus } from "./LeaveStatusBadge";
import { Ionicons } from "@expo/vector-icons";

interface LeaveRequestCardProps {
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: LeaveStatus;
  reason: string;
  approvedBy?: string;
}

export const LeaveRequestCard: React.FC<LeaveRequestCardProps> = ({ 
  type, startDate, endDate, days, status, reason, approvedBy 
}) => {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.type, { color: colors.text }]}>{type}</Text>
          <Text style={[styles.date, { color: colors.textSecondary }]}>{startDate} - {endDate}</Text>
        </View>
        <LeaveStatusBadge status={status} />
      </View>

      <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color={colors.textTertiary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>{days} Days</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="chatbubble-outline" size={16} color={colors.textTertiary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]} numberOfLines={1}>
            {reason}
          </Text>
        </View>
      </View>

      {status === "Approved" && approvedBy && (
        <View style={styles.approvedBy}>
          <Text style={[styles.approvedText, { color: colors.textTertiary }]}>Approved by </Text>
          <Text style={[styles.managerName, { color: colors.primary }]}>{approvedBy}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },
  type: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  date: {
    fontSize: FontSize.xs,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginBottom: Spacing.md,
  },
  details: {
    flexDirection: "row",
    gap: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  detailText: {
    fontSize: FontSize.xs,
  },
  approvedBy: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xs,
  },
  approvedText: {
    fontSize: 10,
  },
  managerName: {
    fontSize: 10,
    fontWeight: FontWeight.bold,
  },
});
