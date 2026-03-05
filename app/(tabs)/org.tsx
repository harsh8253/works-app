import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@/constants/ThemeContext";
import { Colors, Spacing, BorderRadius, FontSize, FontWeight } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

const ORG_DATA = [
  { id: "1", name: "Sarah Jenkins", role: "CEO", avatar: "https://i.pravatar.cc/150?u=sarah" },
  { 
    id: "2", 
    name: "John Doe", 
    role: "Senior UI Designer", 
    avatar: "https://i.pravatar.cc/150?u=john",
    managerId: "1"
  },
  { 
    id: "3", 
    name: "Emily Blunt", 
    role: "HR Director", 
    avatar: "https://i.pravatar.cc/150?u=emily",
    managerId: "1"
  },
  { 
    id: "4", 
    name: "Mark Ruffalo", 
    role: "Tech Lead", 
    avatar: "https://i.pravatar.cc/150?u=mark",
    managerId: "2"
  }
];

export default function OrgScreen() {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  const renderNode = (node: any, level = 0) => (
    <View key={node.id} style={[styles.nodeContainer, { marginLeft: level * 20 }]}>
      <View style={[styles.node, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Image source={{ uri: node.avatar }} style={styles.avatar} />
        <View style={styles.nodeInfo}>
          <Text style={[styles.nodeName, { color: colors.text }]}>{node.name}</Text>
          <Text style={[styles.nodeRole, { color: colors.textSecondary }]}>{node.role}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
        </TouchableOpacity>
      </View>
      {level < 2 && <View style={[styles.connector, { backgroundColor: colors.borderLight }]} />}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Organization Chart</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.searchBar}>
          <View style={[styles.searchInput, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Ionicons name="search" size={20} color={colors.textTertiary} />
            <Text style={[styles.searchPlaceholder, { color: colors.textTertiary }]}>Search employees...</Text>
          </View>
        </View>

        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Company Structure</Text>
        
        {ORG_DATA.map((node, index) => renderNode(node, index === 0 ? 0 : (index < 3 ? 1 : 2)))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.xxxxl,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  searchBar: {
    marginBottom: Spacing.xl,
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  searchPlaceholder: {
    fontSize: FontSize.md,
  },
  subtitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    textTransform: "uppercase",
    marginBottom: Spacing.md,
    letterSpacing: 1,
  },
  nodeContainer: {
    marginBottom: Spacing.md,
  },
  node: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: Spacing.md,
  },
  nodeInfo: {
    flex: 1,
  },
  nodeName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  nodeRole: {
    fontSize: FontSize.xs,
  },
  connector: {
    width: 2,
    height: 10,
    marginLeft: 21,
  }
});
