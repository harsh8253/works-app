import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { auth } from "@/constants/firebase";
import { BorderRadius, FontSize, FontWeight, Spacing } from "@/constants/theme";
import { useTheme } from "@/constants/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Image,
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

export default function LoginScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: Spacing.sm,
              }}
            >
              <Image
                source={require("@/assets/images/ciright.png")}
                style={{
                  width: 48,
                  height: 48,
                  marginRight: Spacing.sm,
                  borderRadius: BorderRadius.lg,
                }}
                resizeMode="contain"
              />
              <Text style={styles.logoText}>
                ciright
                <Text
                  style={{
                    color: colors.primary,
                    fontWeight: FontWeight.semibold,
                  }}
                >
                  HRM
                </Text>
              </Text>
            </View>
            <Text style={[styles.welcomeText, { color: colors.textTertiary }]}>
              Sign in to your workspace
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

            {/* Options */}
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      borderColor: rememberMe ? colors.primary : colors.border,
                      backgroundColor: rememberMe
                        ? colors.primary
                        : "transparent",
                    },
                  ]}
                >
                  {rememberMe && (
                    <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                  )}
                </View>
                <Text
                  style={[styles.optionText, { color: colors.textTertiary }]}
                >
                  Remember me
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text
                  style={[styles.optionText, { color: colors.textSecondary }]}
                >
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sign In */}
            <CustomButton
              title="Sign In"
              onPress={handleLogin}
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
          <Animated.View
            entering={FadeIn.duration(500).delay(300)}
            style={styles.footer}
          >
            <Text style={[styles.footerText, { color: colors.textMuted }]}>
              By signing in, you agree to our Terms of Service
            </Text>
          </Animated.View>

          {/* Footer Link */}
          <View style={styles.footerLink}>
            <Text style={{ color: colors.textMuted }}>
              Don&apos;t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/signup" as any)}>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: FontWeight.semibold,
                }}
              >
                Sign Up
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
  },
  welcomeText: {
    fontSize: FontSize.md,
  },
  formSection: {},
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.xs,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
  },
  optionText: {
    fontSize: FontSize.sm,
  },
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
  footer: {
    alignItems: "center",
    marginTop: Spacing.xxxxl,
  },
  footerText: {
    fontSize: FontSize.xs,
    textAlign: "center",
  },
  footerLink: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.xxl,
  },
});
