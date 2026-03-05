import { Platform } from "react-native";

// SprintFlow Design System – Minimal Zinc + Blue
export const Colors = {
  dark: {
    primary: "#3B82F6",
    primaryLight: "#60A5FA",
    primaryDark: "#2563EB",
    primaryMuted: "rgba(59, 130, 246, 0.12)",
    background: "#09090B",
    surface: "#18181B",
    surfaceLight: "#1F1F23",
    card: "#141416",
    cardHover: "#1C1C1F",
    border: "rgba(63, 63, 70, 0.5)",
    borderLight: "rgba(63, 63, 70, 0.3)",
    text: "#FAFAFA",
    textSecondary: "#A1A1AA",
    textTertiary: "#71717A",
    textMuted: "#52525B",
    success: "#34D399",
    successMuted: "rgba(52, 211, 153, 0.12)",
    warning: "#FBBF24",
    warningMuted: "rgba(251, 191, 36, 0.12)",
    danger: "#F87171",
    dangerMuted: "rgba(248, 113, 113, 0.12)",
    info: "#60A5FA",
    infoMuted: "rgba(96, 165, 250, 0.12)",
    white: "#FFFFFF",
    black: "#000000",
    overlay: "rgba(0, 0, 0, 0.6)",
    shadow: "rgba(0, 0, 0, 0.4)",
    tabIconDefault: "#52525B",
    tabIconSelected: "#60A5FA",
    tint: "#3B82F6",
    icon: "#71717A",
    glass: "rgba(24, 24, 27, 0.85)",
  },
  light: {
    primary: "#2563EB",
    primaryLight: "#3B82F6",
    primaryDark: "#1D4ED8",
    primaryMuted: "rgba(37, 99, 235, 0.08)",
    background: "#FAFAFA",
    surface: "#FFFFFF",
    surfaceLight: "#F4F4F5",
    card: "#FFFFFF",
    cardHover: "#F4F4F5",
    border: "rgba(228, 228, 231, 0.8)",
    borderLight: "rgba(228, 228, 231, 0.5)",
    text: "#09090B",
    textSecondary: "#52525B",
    textTertiary: "#A1A1AA",
    textMuted: "#D4D4D8",
    success: "#10B981",
    successMuted: "rgba(16, 185, 129, 0.08)",
    warning: "#F59E0B",
    warningMuted: "rgba(245, 158, 11, 0.08)",
    danger: "#EF4444",
    dangerMuted: "rgba(239, 68, 68, 0.08)",
    info: "#3B82F6",
    infoMuted: "rgba(59, 130, 246, 0.08)",
    white: "#FFFFFF",
    black: "#000000",
    overlay: "rgba(0, 0, 0, 0.3)",
    shadow: "rgba(0, 0, 0, 0.06)",
    tabIconDefault: "#A1A1AA",
    tabIconSelected: "#2563EB",
    tint: "#2563EB",
    icon: "#71717A",
    glass: "rgba(255, 255, 255, 0.9)",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
  section: 48,
};

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 12,
  xl: 14,
  xxl: 18,
  full: 9999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  xxxl: 28,
  display: 34,
};

export const FontWeight = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  extrabold: "800" as const,
};

export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  }),
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
