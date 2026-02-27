import { Colors, FontSize, FontWeight, Spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
  rightIcon2?: keyof typeof Ionicons.glyphMap;
  onRight2Press?: () => void;
  subtitle?: string;
  style?: ViewStyle;
}

export default function Header({
  title,
  showBack = false,
  onBackPress,
  rightIcon,
  onRightPress,
  rightIcon2,
  onRight2Press,
  subtitle,
  style,
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  const colors = Colors.dark;

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
          paddingTop: insets.top + Spacing.sm,
        },
        style,
      ]}
    >
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        <View>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.rightSection}>
        {rightIcon2 && (
          <TouchableOpacity
            onPress={onRight2Press}
            style={styles.iconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name={rightIcon2} size={22} color={colors.text} />
          </TouchableOpacity>
        )}
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightPress}
            style={styles.iconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name={rightIcon} size={22} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backButton: {
    marginRight: Spacing.sm,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  subtitle: {
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
