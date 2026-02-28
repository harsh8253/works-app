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
import { signOut } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import {
    Alert,
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
  const { colors, isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  const user = auth.currentUser;
  const userName = user?.displayName || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "No email";
  const userInitials = userName.slice(0, 2).toUpperCase();

  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const fetched = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Task)
        );
        setTasks(fetched);
      },
      (error) => {
        console.error("Error fetching tasks:", error);
      }
    );
    return unsub;
  }, []);

  const profileStats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "done").length;
    const onTimePercent = total > 0 ? Math.round((done / total) * 100) : 0;
    return [
      { label: "Tasks", value: String(total) },
      { label: "Done", value: String(done) },
      { label: "Rate", value: `${onTimePercent}%` },
    ];
  }, [tasks]);

  const handleLogout = async () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
            router.replace("/login" as any);
          } catch (error: any) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  const menuItems: MenuSection[] = [
    {
      section: "Preferences",
      items: [
        {
          icon: isDark ? "moon-outline" : "sunny-outline",
          label: "Dark Mode",
          type: "toggle" as const,
          value: isDark,
          onToggle: () => toggleTheme(),
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
            <Text style={styles.avatarLargeText}>{userInitials}</Text>
          </View>
          <Text style={[styles.profileName, { color: colors.text }]}>
            {userName}
          </Text>
          <Text style={[styles.profileRole, { color: colors.primaryLight }]}>
            Team Member
          </Text>

          <View style={styles.profileMeta}>
            <View style={styles.metaItem}>
              <Ionicons
                name="mail-outline"
                size={14}
                color={colors.textMuted}
              />
              <Text style={[styles.metaText, { color: colors.textTertiary }]}>
                {userEmail}
              </Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            {profileStats.map((stat) => (
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
            {section.items.map((item) => (
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
            onPress={handleLogout}
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
