import { currentUser } from "@/constants/mockData";
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
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ToggleItem = {
  icon: string;
  label: string;
  type: "toggle";
  value: boolean;
  onToggle: (val: boolean) => void;
};

type NavItem = {
  icon: string;
  label: string;
  type: "nav";
  value?: string;
};

type MenuSection = {
  section: string;
  items: (ToggleItem | NavItem)[];
};

export default function ProfileScreen() {
  const colors = Colors.dark;
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const menuItems: MenuSection[] = [
    {
      section: "Preferences",
      items: [
        {
          icon: "moon-outline",
          label: "Dark Mode",
          type: "toggle" as const,
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          icon: "notifications-outline",
          label: "Notifications",
          type: "toggle" as const,
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        {
          icon: "language-outline",
          label: "Language",
          type: "nav" as const,
          value: "English",
        },
      ],
    },
    {
      section: "Account",
      items: [
        {
          icon: "shield-checkmark-outline",
          label: "Privacy & Security",
          type: "nav" as const,
        },
        {
          icon: "help-circle-outline",
          label: "Help & Support",
          type: "nav" as const,
        },
        {
          icon: "information-circle-outline",
          label: "About",
          type: "nav" as const,
        },
      ],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + Spacing.lg }]}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Profile
          </Text>
        </View>

        {/* Profile Section */}
        <Animated.View
          entering={FadeIn.duration(400)}
          style={styles.profileSection}
        >
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>{currentUser.avatar}</Text>
          </View>
          <Text style={[styles.profileName, { color: colors.text }]}>
            {currentUser.name}
          </Text>
          <Text style={[styles.profileRole, { color: colors.primaryLight }]}>
            {currentUser.role}
          </Text>

          <View style={styles.profileMeta}>
            <View style={styles.metaItem}>
              <Ionicons
                name="mail-outline"
                size={14}
                color={colors.textMuted}
              />
              <Text style={[styles.metaText, { color: colors.textTertiary }]}>
                {currentUser.email}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons
                name="people-outline"
                size={14}
                color={colors.textMuted}
              />
              <Text style={[styles.metaText, { color: colors.textTertiary }]}>
                {currentUser.team}
              </Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            {[
              { label: "Tasks", value: "32" },
              { label: "Sprints", value: "6" },
              { label: "On Time", value: "94%" },
            ].map((stat) => (
              <View key={stat.label} style={styles.stat}>
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {stat.value}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Menu Sections */}
        {menuItems.map((section, sIndex) => (
          <Animated.View
            key={section.section}
            entering={FadeInDown.duration(400).delay(100 + sIndex * 80)}
            style={styles.menuSection}
          >
            <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>
              {section.section}
            </Text>
            {section.items.map((item, iIndex) => (
              <TouchableOpacity
                key={item.label}
                style={styles.menuItem}
                activeOpacity={item.type === "toggle" ? 1 : 0.6}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons
                    name={item.icon as any}
                    size={18}
                    color={colors.textTertiary}
                  />
                  <Text style={[styles.menuItemText, { color: colors.text }]}>
                    {item.label}
                  </Text>
                </View>
                {item.type === "toggle" ? (
                  <Switch
                    value={item.value as boolean}
                    onValueChange={item.onToggle}
                    trackColor={{
                      false: colors.surfaceLight,
                      true: `${colors.primary}50`,
                    }}
                    thumbColor={
                      (item.value as boolean)
                        ? colors.primary
                        : colors.textMuted
                    }
                  />
                ) : (
                  <View style={styles.menuItemRight}>
                    {typeof item.value === "string" && (
                      <Text
                        style={[
                          styles.menuItemValue,
                          { color: colors.textMuted },
                        ]}
                      >
                        {item.value}
                      </Text>
                    )}
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color={colors.textMuted}
                    />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </Animated.View>
        ))}

        {/* Logout */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(300)}
          style={styles.logoutSection}
        >
          <TouchableOpacity
            style={[styles.logoutButton, { borderColor: colors.border }]}
            activeOpacity={0.6}
            onPress={() => router.replace("/login" as any)}
          >
            <Ionicons name="log-out-outline" size={18} color={colors.danger} />
            <Text style={[styles.logoutText, { color: colors.danger }]}>
              Log Out
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={[styles.version, { color: colors.textMuted }]}>
          SprintFlow v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.semibold,
    letterSpacing: -0.5,
  },
  profileSection: {
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#8B5CF6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  avatarLargeText: {
    color: "#FFFFFF",
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
  },
  profileName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    marginBottom: Spacing.xs,
  },
  profileRole: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    marginBottom: Spacing.lg,
  },
  profileMeta: {
    gap: Spacing.sm,
    marginBottom: Spacing.xxl,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  metaText: {
    fontSize: FontSize.sm,
  },
  statsRow: {
    flexDirection: "row",
    gap: Spacing.xxxxl,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
  },
  statLabel: {
    fontSize: FontSize.xs,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginHorizontal: Spacing.xl,
    marginVertical: Spacing.xxl,
  },
  menuSection: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: Spacing.md,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  menuItemText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  menuItemValue: {
    fontSize: FontSize.sm,
  },
  logoutSection: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  logoutText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
  version: {
    textAlign: "center",
    fontSize: FontSize.xs,
    marginBottom: Spacing.xxxl,
  },
});
