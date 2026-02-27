import {
  BorderRadius,
  Colors,
  FontSize,
  FontWeight,
  Spacing,
} from "@/constants/theme";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  fullWidth = false,
}: CustomButtonProps) {
  const scale = useSharedValue(1);
  const colors = Colors.dark;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 20, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20, stiffness: 400 });
  };

  const variantStyles: Record<string, ViewStyle> = {
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.surfaceLight,
    },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: colors.border,
    },
    ghost: {
      backgroundColor: "transparent",
    },
    danger: {
      backgroundColor: colors.dangerMuted,
    },
  };

  const variantTextStyles: Record<string, TextStyle> = {
    primary: { color: "#FFFFFF" },
    secondary: { color: colors.text },
    outline: { color: colors.textSecondary },
    ghost: { color: colors.textSecondary },
    danger: { color: colors.danger },
  };

  const sizeStyles: Record<
    string,
    { paddingV: number; paddingH: number; fontSize: number }
  > = {
    sm: { paddingV: Spacing.sm, paddingH: Spacing.lg, fontSize: FontSize.sm },
    md: { paddingV: Spacing.md, paddingH: Spacing.xl, fontSize: FontSize.md },
    lg: { paddingV: Spacing.lg, paddingH: Spacing.xxl, fontSize: FontSize.md },
  };

  const currentSize = sizeStyles[size];

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        variantStyles[variant],
        {
          paddingVertical: currentSize.paddingV,
          paddingHorizontal: currentSize.paddingH,
          opacity: disabled ? 0.4 : 1,
        },
        fullWidth && styles.fullWidth,
        animatedStyle,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? "#FFFFFF" : colors.textSecondary}
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text
            style={[
              styles.text,
              variantTextStyles[variant],
              { fontSize: currentSize.fontSize },
              icon ? { marginLeft: Spacing.sm } : undefined,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BorderRadius.lg,
  },
  fullWidth: {
    width: "100%",
  },
  text: {
    fontWeight: FontWeight.medium,
    letterSpacing: 0.2,
  },
});
