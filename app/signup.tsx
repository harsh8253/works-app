import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { auth } from "@/constants/firebase";
import { BorderRadius, FontSize, FontWeight, Spacing } from "@/constants/theme";
import { useTheme } from "@/constants/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignupScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // After signup, we might want to go to a "Success" or back to login
      // For now, let's go to the under development screen
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Signup Failed", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    if (Platform.OS !== "web") {
      Alert.alert(
        "Platform Not Supported",
        "Standard Google Sign-In via popup is currently only supported on Web in this setup.",
      );
      return;
    }
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Google Sign-In Failed", error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + 60, paddingBottom: insets.bottom + 20 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <Animated.View
            entering={FadeIn.duration(500)}
            style={styles.logoSection}
          >
            <Text style={styles.logoText}>
              sprint
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: FontWeight.semibold,
                }}
              >
                flow
              </Text>
            </Text>
            <Text style={[styles.welcomeText, { color: colors.textTertiary }]}>
              Create your account
            </Text>
          </Animated.View>

          {/* Form */}
          <Animated.View
            entering={FadeIn.duration(500).delay(150)}
            style={styles.formSection}
          >
            <CustomInput
              label="Email"
              placeholder="you@company.com"
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <CustomInput
              label="Password"
              placeholder="••••••••"
              icon="lock-closed-outline"
              secureTextEntry={!showPassword}
              rightIcon={showPassword ? "eye-outline" : "eye-off-outline"}
              onRightIconPress={() => setShowPassword(!showPassword)}
              value={password}
              onChangeText={setPassword}
            />

            <CustomInput
              label="Confirm Password"
              placeholder="••••••••"
              icon="lock-closed-outline"
              secureTextEntry={!showPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            {/* Sign Up */}
            <CustomButton
              title="Sign Up"
              onPress={handleSignup}
              fullWidth
              size="lg"
              style={{ marginTop: Spacing.xxl }}
            />

            {/* Divider */}
            <View style={styles.divider}>
              <View
                style={[styles.dividerLine, { backgroundColor: colors.border }]}
              />
              <Text style={[styles.dividerText, { color: colors.textMuted }]}>
                or
              </Text>
              <View
                style={[styles.dividerLine, { backgroundColor: colors.border }]}
              />
            </View>

            {/* Social */}
            <View style={styles.socialRow}>
              <TouchableOpacity
                style={[styles.socialButton, { borderColor: colors.border }]}
                activeOpacity={0.7}
                onPress={handleGoogleSignIn}
              >
                <Ionicons
                  name="logo-google"
                  size={18}
                  color={colors.textSecondary}
                />
                <Text
                  style={[styles.socialText, { color: colors.textSecondary }]}
                >
                  Google
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Footer */}
          <View style={styles.footerLink}>
            <Text style={{ color: colors.textMuted }}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/login" as any)}>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: FontWeight.semibold,
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xxxl,
  },
  logoSection: {
    marginBottom: Spacing.xxxxl,
  },
  logoText: {
    fontSize: 32,
    fontWeight: FontWeight.regular,
    color: "#FAFAFA",
    letterSpacing: -1.5,
    marginBottom: Spacing.sm,
  },
  welcomeText: {
    fontSize: FontSize.md,
  },
  formSection: {},
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Spacing.xxl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: Spacing.lg,
    fontSize: FontSize.sm,
  },
  socialRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  socialText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  footerLink: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.xxl,
  },
});
