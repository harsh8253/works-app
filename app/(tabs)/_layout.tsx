import { useTheme } from "@/constants/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
          letterSpacing: 0.3,
        },
        tabBarIconStyle: {
          marginBottom: -2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              size={20}
              color={focused ? colors.primaryLight : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "checkbox" : "checkbox-outline"}
              size={20}
              color={focused ? colors.primaryLight : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sprint"
        options={{
          title: "Board",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "albums" : "albums-outline"}
              size={20}
              color={focused ? colors.primaryLight : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={20}
              color={focused ? colors.primaryLight : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
