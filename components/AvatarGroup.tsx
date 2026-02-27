import { Colors, FontWeight } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface AvatarGroupProps {
  avatars: { id: string; name: string; avatar: string }[];
  maxDisplay?: number;
  size?: number;
  style?: ViewStyle;
}

function getAvatarColor(initials: string): string {
  const colorMap: Record<string, string> = {
    HP: "#8B5CF6",
    AS: "#EC4899",
    DJ: "#FBBF24",
    RV: "#34D399",
    PN: "#60A5FA",
  };
  return colorMap[initials] || "#8B5CF6";
}

export default function AvatarGroup({
  avatars,
  maxDisplay = 3,
  size = 28,
  style,
}: AvatarGroupProps) {
  const colors = Colors.dark;
  const displayAvatars = avatars.slice(0, maxDisplay);
  const remaining = avatars.length - maxDisplay;

  return (
    <View style={[styles.container, style]}>
      {displayAvatars.map((user, index) => (
        <View
          key={user.id}
          style={[
            styles.avatar,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: getAvatarColor(user.avatar),
              marginLeft: index > 0 ? -(size * 0.28) : 0,
              zIndex: displayAvatars.length - index,
              borderWidth: 2,
              borderColor: colors.background,
            },
          ]}
        >
          <Text style={[styles.initials, { fontSize: size * 0.32 }]}>
            {user.avatar}
          </Text>
        </View>
      ))}
      {remaining > 0 && (
        <View
          style={[
            styles.avatar,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              marginLeft: -(size * 0.28),
              backgroundColor: colors.surfaceLight,
              borderWidth: 2,
              borderColor: colors.background,
            },
          ]}
        >
          <Text style={[styles.moreText, { fontSize: size * 0.28 }]}>
            +{remaining}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    color: "#FFFFFF",
    fontWeight: FontWeight.semibold,
    letterSpacing: 0.3,
  },
  moreText: {
    color: "#71717A",
    fontWeight: FontWeight.medium,
  },
});
