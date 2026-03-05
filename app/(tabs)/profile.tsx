import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useTheme } from "@/constants/ThemeContext";
import { Colors, Spacing, BorderRadius, FontSize, FontWeight } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { isDark, toggleTheme } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/login");
  };

  const renderMenuItem = (icon: any, label: string, value?: string, onPress?: () => void, isDestructive = false) => (
    <TouchableOpacity 
      style={[styles.menuItem, { borderBottomColor: colors.borderLight }]} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.menuLeft}>
        <View style={[styles.iconContainer, { backgroundColor: isDestructive ? colors.dangerMuted : colors.primaryMuted }]}>
          <Ionicons name={icon} size={20} color={isDestructive ? colors.danger : colors.primary} />
        </View>
        <Text style={[styles.menuLabel, { color: isDestructive ? colors.danger : colors.text }]}>{label}</Text>
      </View>
      <View style={styles.menuRight}>
        {value && <Text style={[styles.menuValue, { color: colors.textSecondary }]}>{value}</Text>}
        {onPress && <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image source={{ uri: "https://i.pravatar.cc/150?u=john" }} style={styles.largeAvatar} />
          <Text style={[styles.userName, { color: colors.text }]}>John Doe</Text>
          <Text style={[styles.userRole, { color: colors.textSecondary }]}>Senior UI Designer</Text>
          <TouchableOpacity style={[styles.editBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.editBtnText, { color: colors.text }]}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>General</Text>
        <View style={[styles.menuCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {renderMenuItem("person-outline", "Personal Information", undefined, () => {})}
          {renderMenuItem("briefcase-outline", "Employment Details", undefined, () => {})}
          {renderMenuItem("document-text-outline", "Documents", undefined, () => {})}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Preferences</Text>
        <View style={[styles.menuCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.menuItem, { borderBottomColor: colors.borderLight }]}>
            <View style={styles.menuLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.infoMuted }]}>
                <Ionicons name="moon-outline" size={20} color={colors.info} />
              </View>
              <Text style={[styles.menuLabel, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="white"
            />
          </View>
          {renderMenuItem("notifications-outline", "Notifications", "On", () => {})}
          {renderMenuItem("lock-closed-outline", "Security", undefined, () => {})}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Support</Text>
        <View style={[styles.menuCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {renderMenuItem("help-circle-outline", "Help Center", undefined, () => {})}
          {renderMenuItem("information-circle-outline", "About SprintFlow", "v1.0.0")}
          {renderMenuItem("log-out-outline", "Log Out", undefined, handleLogout, true)}
        </View>

        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: Spacing.xl,
    alignItems: "center",
  },
  profileInfo: {
    alignItems: "center",
  },
  largeAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: Spacing.md,
  },
  userName: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
  },
  userRole: {
    fontSize: FontSize.md,
    marginBottom: Spacing.lg,
  },
  editBtn: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  editBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  content: {
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    textTransform: "uppercase",
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
    letterSpacing: 1,
  },
  menuCard: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: Spacing.xl,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.md,
    borderBottomWidth: 1,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  menuLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
  menuRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  menuValue: {
    fontSize: FontSize.sm,
  },
});
