import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, BorderRadius, FontSize, FontWeight, Shadows } from "@/constants/theme";
import { useTheme } from "@/constants/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface CalendarProps {
  month: string;
  year: number;
}

export const LeaveCalendar: React.FC<CalendarProps> = ({ month, year }) => {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  const daysInMonth = 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Mock data for highlighting
  const approved = [5, 6, 7];
  const pending = [15, 16];
  const holidays = [21];

  const getDayStyle = (day: number) => {
    if (approved.includes(day)) return { bg: colors.successMuted, text: colors.success, label: "Approved" };
    if (pending.includes(day)) return { bg: colors.warningMuted, text: colors.warning, label: "Pending" };
    if (holidays.includes(day)) return { bg: colors.infoMuted, text: colors.info, label: "Holiday" };
    return { bg: "transparent", text: colors.textSecondary };
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={[styles.monthText, { color: colors.text }]}>{month} {year}</Text>
        <View style={styles.nav}>
          <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </View>
      </View>

      <View style={styles.weekdays}>
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <Text key={i} style={[styles.weekdayText, { color: colors.textTertiary }]}>{d}</Text>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {days.map((day) => {
          const style = getDayStyle(day);
          return (
            <View key={day} style={[styles.dayCell, { backgroundColor: style.bg }]}>
              <Text style={[styles.dayText, { color: style.text }]}>{day}</Text>
              {style.label && <View style={[styles.indicator, { backgroundColor: style.text }]} />}
            </View>
          );
        })}
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
          <Text style={[styles.legendText, { color: colors.textTertiary }]}>Approved</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.warning }]} />
          <Text style={[styles.legendText, { color: colors.textTertiary }]}>Pending</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.info }]} />
          <Text style={[styles.legendText, { color: colors.textTertiary }]}>Holiday</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  monthText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  nav: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  weekdays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: Spacing.sm,
  },
  weekdayText: {
    fontSize: 10,
    fontWeight: FontWeight.bold,
    width: 32,
    textAlign: "center",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  dayCell: {
    width: "14.28%", // 7 days
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 4,
  },
  dayText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    position: "absolute",
    bottom: 4,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.lg,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 10,
    fontWeight: FontWeight.medium,
  },
});
