import { useTheme } from "@/constants/ThemeContext";
import { BorderRadius, FontSize, FontWeight, Spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NotFoundScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Ionicons name="construct-outline" size={80} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>404</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Under Development
        </Text>
        <Text style={[styles.description, { color: colors.textTertiary }]}>
          This feature is currently being built. Please check back later!
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.buttonText}>Go Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xxxl,
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 64,
    fontWeight: FontWeight.bold,
    marginTop: Spacing.lg,
  },
  subtitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.semibold,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: FontSize.md,
    textAlign: "center",
    marginBottom: Spacing.xxxxl,
    lineHeight: 24,
  },
  button: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
});
