import {
    BorderRadius,
    FontSize,
    FontWeight,
    Spacing,
} from "@/constants/theme";
import { useTheme } from "@/constants/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from "react-native";

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  containerStyle?: ViewStyle;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
}

export default function CustomInput({
  label,
  error,
  icon,
  containerStyle,
  rightIcon,
  onRightIconPress,
  ...props
}: CustomInputProps) {
  const [focused, setFocused] = useState(false);
  const { colors } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: colors.textTertiary }]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.surface,
            borderColor: error
              ? colors.danger
              : focused
                ? colors.primary
                : colors.border,
          },
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={focused ? colors.primaryLight : colors.textMuted}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[
            styles.input,
            { color: colors.text },
            icon ? undefined : { paddingLeft: Spacing.lg },
          ]}
          placeholderTextColor={colors.textMuted}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {rightIcon && (
          <Ionicons
            name={rightIcon}
            size={18}
            color={colors.textMuted}
            style={styles.rightIcon}
            onPress={onRightIconPress}
          />
        )}
      </View>
      {error && (
        <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    marginBottom: Spacing.sm,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: "hidden",
  },
  icon: {
    paddingLeft: Spacing.md,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.md + 2,
    paddingHorizontal: Spacing.md,
    fontSize: FontSize.md,
  },
  rightIcon: {
    paddingRight: Spacing.md,
  },
  error: {
    fontSize: FontSize.xs,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
});
