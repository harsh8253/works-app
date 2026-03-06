import {
  BorderRadius,
  Colors,
  FontSize,
  FontWeight,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { useTheme } from "@/constants/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

interface CalendarProps {
  month: string;
  year: number;
}

const MONTH_MAP: { [key: string]: string } = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

export const LeaveCalendar: React.FC<CalendarProps> = ({ month, year }) => {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  const currentMonthYear = useMemo(() => {
    const monthStr = MONTH_MAP[month] || "01";
    return `${year}-${monthStr}-01`;
  }, [month, year]);

  // Mock data for highlighting (mapped to dates for March 2026)
  const approved = [5, 6, 7];
  const pending = [15, 16];
  const holidays = [21];

  const markedDates = useMemo(() => {
    const marked: any = {};
    const monthStr = MONTH_MAP[month] || "01";

    if (month === "March" && year === 2026) {
      approved.forEach((day) => {
        const date = `${year}-${monthStr}-${day < 10 ? "0" + day : day}`;
        marked[date] = {
          state: "approved",
          customStyles: {
            container: {
              backgroundColor: colors.successMuted,
              borderRadius: 8,
              height: 36,
              width: 36,
            },
            text: { color: colors.success, fontWeight: FontWeight.medium },
          },
        };
      });

      pending.forEach((day) => {
        const date = `${year}-${monthStr}-${day < 10 ? "0" + day : day}`;
        marked[date] = {
          state: "pending",
          customStyles: {
            container: {
              backgroundColor: colors.warningMuted,
              borderRadius: 8,
              height: 36,
              width: 36,
            },
            text: { color: colors.warning, fontWeight: FontWeight.medium },
          },
        };
      });

      holidays.forEach((day) => {
        const date = `${year}-${monthStr}-${day < 10 ? "0" + day : day}`;
        marked[date] = {
          state: "holiday",
          customStyles: {
            container: {
              backgroundColor: colors.infoMuted,
              borderRadius: 8,
              height: 36,
              width: 36,
            },
            text: { color: colors.info, fontWeight: FontWeight.medium },
          },
        };
      });
    }

    return marked;
  }, [month, year, colors]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <Calendar
        current={currentMonthYear}
        markingType={"custom"}
        markedDates={markedDates}
        firstDay={1} // Monday
        hideExtraDays={true}
        enableSwipeMonths={true}
        renderHeader={() => (
          <View style={styles.header}>
            <Text style={[styles.monthText, { color: colors.text }]}>
              {month} {year}
            </Text>
          </View>
        )}
        renderArrow={(direction) => (
          <Ionicons
            name={direction === "left" ? "chevron-back" : "chevron-forward"}
            size={20}
            color={colors.textSecondary}
          />
        )}
        theme={
          {
            backgroundColor: "transparent",
            calendarBackground: "transparent",
            textSectionTitleColor: colors.textTertiary,
            dayTextColor: colors.textSecondary,
            todayTextColor: colors.primary,
            monthTextColor: colors.text,
            textDisabledColor: colors.border,
            textDayFontWeight: FontWeight.medium as any,
            textMonthFontWeight: FontWeight.bold as any,
            textDayHeaderFontWeight: FontWeight.bold as any,
            textDayFontSize: FontSize.sm,
            textMonthFontSize: FontSize.md,
            textDayHeaderFontSize: 10,
            "stylesheet.calendar.header": {
              header: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: Spacing.md,
                paddingLeft: Platform.OS === "web" ? 10 : 0,
                paddingRight: Platform.OS === "web" ? 10 : 0,
              },
              week: {
                marginTop: 0,
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: Spacing.sm,
              },
              dayHeader: {
                fontSize: 10,
                fontWeight: FontWeight.bold,
                width: 32,
                textAlign: "center",
                color: colors.textTertiary,
              },
            },
          } as any
        }
        dayComponent={({ date, state, marking }: any) => {
          const isSelected = !!marking;
          const customStyle = marking?.customStyles || {};
          const isToday = state === "today";

          return (
            <View style={[styles.dayContainer]}>
              <View
                style={[
                  styles.dayCell,
                  isSelected && customStyle.container,
                  isToday &&
                    !isSelected && {
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.05)",
                    },
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    {
                      color:
                        state === "disabled"
                          ? colors.border
                          : isSelected
                            ? customStyle.text.color
                            : isToday
                              ? colors.primary
                              : colors.textSecondary,
                    },
                  ]}
                >
                  {date.day}
                </Text>
                {isSelected && (
                  <View
                    style={[
                      styles.indicator,
                      { backgroundColor: customStyle.text.color },
                    ]}
                  />
                )}
              </View>
            </View>
          );
        }}
      />

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: colors.success }]}
          />
          <Text style={[styles.legendText, { color: colors.textTertiary }]}>
            Approved
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: colors.warning }]}
          />
          <Text style={[styles.legendText, { color: colors.textTertiary }]}>
            Pending
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.info }]} />
          <Text style={[styles.legendText, { color: colors.textTertiary }]}>
            Holiday
          </Text>
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
    paddingVertical: 5,
  },
  monthText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    textAlign: "center",
  },
  dayContainer: {
    width: "14.28%",
    alignItems: "center",
    justifyContent: "center",
  },
  dayCell: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
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
