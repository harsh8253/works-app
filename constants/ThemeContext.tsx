import { Colors } from "@/constants/theme";
import React, { createContext, useContext, useState } from "react";

type ThemeMode = "dark" | "light";

interface ThemeContextType {
  mode: ThemeMode;
  colors: typeof Colors.dark;
  isDark: boolean;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "dark",
  colors: Colors.dark,
  isDark: true,
  toggleTheme: () => {},
  setMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("dark");

  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const colors = mode === "dark" ? Colors.dark : Colors.light;
  const isDark = mode === "dark";

  return (
    <ThemeContext.Provider value={{ mode, colors, isDark, toggleTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
