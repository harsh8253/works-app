import CustomButton from "@/components/CustomButton";
import {
  BorderRadius,
  Colors,
  FontSize,
  FontWeight,
  Spacing,
} from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Priority = "low" | "medium" | "high";
type Status = "todo" | "in-progress" | "done";

const priorityOptions: {
  key: Priority;
  label: string;
  color: string;
  icon: string;
}[] = [
  { key: "low", label: "Low", color: "#34D399", icon: "chevron-down" },
  { key: "medium", label: "Medium", color: "#FBBF24", icon: "remove" },
  { key: "high", label: "High", color: "#F87171", icon: "chevron-up" },
];

const statusOptions: { key: Status; label: string; color: string }[] = [
  { key: "todo", label: "To Do", color: "#A1A1AA" },
  { key: "in-progress", label: "In Progress", color: "#FBBF24" },
  { key: "done", label: "Done", color: "#34D399" },
];

const teamMembers = [
  { id: "u1", name: "Harsh Patel", avatar: "HP", color: "#8B5CF6" },
  { id: "u2", name: "Ananya Sharma", avatar: "AS", color: "#EC4899" },
  { id: "u3", name: "Dev Joshi", avatar: "DJ", color: "#FBBF24" },
  { id: "u4", name: "Rahul Verma", avatar: "RV", color: "#34D399" },
  { id: "u5", name: "Priya Nair", avatar: "PN", color: "#60A5FA" },
];

export default function AddTaskScreen() {
  const colors = Colors.dark;
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [status, setStatus] = useState<Status>("todo");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const isValid = title.trim().length > 0;

  const handleCreate = () => {
    // UI only — just navigate back
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <Animated.View
        entering={FadeIn.duration(300)}
        style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          New Task
        </Text>
        <View style={{ width: 24 }} />
      </Animated.View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 100 },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title */}
          <Animated.View entering={FadeInDown.duration(300).delay(50)}>
            <TextInput
              style={[
                styles.titleInput,
                { color: colors.text, borderBottomColor: colors.border },
              ]}
              placeholder="Task title"
              placeholderTextColor={colors.textMuted}
              value={title}
              onChangeText={setTitle}
              autoFocus
            />
          </Animated.View>

          {/* Description */}
          <Animated.View entering={FadeInDown.duration(300).delay(100)}>
            <TextInput
              style={[
                styles.descInput,
                {
                  color: colors.textSecondary,
                  borderBottomColor: colors.border,
                },
              ]}
              placeholder="Add a description..."
              placeholderTextColor={colors.textMuted}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </Animated.View>

          {/* Status */}
          <Animated.View
            entering={FadeInDown.duration(300).delay(150)}
            style={styles.fieldSection}
          >
            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>
              Status
            </Text>
            <View style={styles.optionRow}>
              {statusOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.key}
                  onPress={() => setStatus(opt.key)}
                  style={[
                    styles.optionChip,
                    {
                      borderColor:
                        status === opt.key ? opt.color : colors.border,
                      backgroundColor:
                        status === opt.key ? `${opt.color}12` : "transparent",
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <View
                    style={[styles.optionDot, { backgroundColor: opt.color }]}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color:
                          status === opt.key ? opt.color : colors.textTertiary,
                      },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Priority */}
          <Animated.View
            entering={FadeInDown.duration(300).delay(200)}
            style={styles.fieldSection}
          >
            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>
              Priority
            </Text>
            <View style={styles.optionRow}>
              {priorityOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.key}
                  onPress={() => setPriority(opt.key)}
                  style={[
                    styles.optionChip,
                    {
                      borderColor:
                        priority === opt.key ? opt.color : colors.border,
                      backgroundColor:
                        priority === opt.key ? `${opt.color}12` : "transparent",
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={opt.icon as any}
                    size={14}
                    color={priority === opt.key ? opt.color : colors.textMuted}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color:
                          priority === opt.key
                            ? opt.color
                            : colors.textTertiary,
                      },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Due Date */}
          <Animated.View
            entering={FadeInDown.duration(300).delay(250)}
            style={styles.fieldSection}
          >
            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>
              Due Date
            </Text>
            <TouchableOpacity
              style={[styles.dateInput, { borderColor: colors.border }]}
              activeOpacity={0.7}
            >
              <Ionicons
                name="calendar-outline"
                size={16}
                color={colors.textMuted}
              />
              <TextInput
                style={[styles.dateTextInput, { color: colors.text }]}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.textMuted}
                value={dueDate}
                onChangeText={setDueDate}
                keyboardType="numbers-and-punctuation"
              />
            </TouchableOpacity>
          </Animated.View>

          {/* Assign Members */}
          <Animated.View
            entering={FadeInDown.duration(300).delay(300)}
            style={styles.fieldSection}
          >
            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>
              Assign to
            </Text>
            <View style={styles.membersGrid}>
              {teamMembers.map((member) => {
                const isSelected = selectedMembers.includes(member.id);
                return (
                  <TouchableOpacity
                    key={member.id}
                    onPress={() => toggleMember(member.id)}
                    style={[
                      styles.memberChip,
                      {
                        borderColor: isSelected ? member.color : colors.border,
                        backgroundColor: isSelected
                          ? `${member.color}12`
                          : "transparent",
                      },
                    ]}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.memberAvatar,
                        {
                          backgroundColor: member.color,
                          opacity: isSelected ? 1 : 0.5,
                        },
                      ]}
                    >
                      <Text style={styles.memberInitials}>{member.avatar}</Text>
                    </View>
                    <Text
                      style={[
                        styles.memberName,
                        {
                          color: isSelected ? colors.text : colors.textTertiary,
                        },
                      ]}
                    >
                      {member.name.split(" ")[0]}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={14}
                        color={member.color}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </Animated.View>

          {/* Tags */}
          <Animated.View
            entering={FadeInDown.duration(300).delay(350)}
            style={styles.fieldSection}
          >
            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>
              Tags
            </Text>
            <TextInput
              style={[
                styles.tagInput,
                { color: colors.text, borderColor: colors.border },
              ]}
              placeholder="frontend, backend, design..."
              placeholderTextColor={colors.textMuted}
              value={tags}
              onChangeText={setTags}
            />
            {tags.trim().length > 0 && (
              <View style={styles.tagPreview}>
                {tags.split(",").map((tag, i) => {
                  const trimmed = tag.trim();
                  if (!trimmed) return null;
                  return (
                    <View
                      key={i}
                      style={[
                        styles.tagBadge,
                        { backgroundColor: colors.primaryMuted },
                      ]}
                    >
                      <Text
                        style={[
                          styles.tagBadgeText,
                          { color: colors.primaryLight },
                        ]}
                      >
                        {trimmed}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </Animated.View>

          {/* Attachments placeholder */}
          <Animated.View
            entering={FadeInDown.duration(300).delay(400)}
            style={styles.fieldSection}
          >
            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>
              Attachments
            </Text>
            <TouchableOpacity
              style={[styles.attachmentDrop, { borderColor: colors.border }]}
              activeOpacity={0.7}
            >
              <Ionicons
                name="cloud-upload-outline"
                size={24}
                color={colors.textMuted}
              />
              <Text style={[styles.attachText, { color: colors.textTertiary }]}>
                Tap to upload files
              </Text>
              <Text style={[styles.attachSub, { color: colors.textMuted }]}>
                PDF, images, documents up to 25 MB
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Action Bar */}
      <Animated.View
        entering={FadeIn.duration(300).delay(300)}
        style={[
          styles.bottomBar,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            paddingBottom: insets.bottom + Spacing.sm,
          },
        ]}
      >
        <CustomButton
          title="Cancel"
          variant="ghost"
          onPress={() => router.back()}
          style={{ flex: 1, marginRight: Spacing.sm }}
        />
        <CustomButton
          title="Create Task"
          variant="primary"
          onPress={handleCreate}
          disabled={!isValid}
          style={{ flex: 2 }}
          icon={<Ionicons name="add" size={18} color="#FFFFFF" />}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.medium,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
  },
  // Title
  titleInput: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.semibold,
    letterSpacing: -0.5,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    marginBottom: Spacing.md,
  },
  // Description
  descInput: {
    fontSize: FontSize.md,
    lineHeight: 22,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    marginBottom: Spacing.xxl,
    minHeight: 80,
  },
  // Field sections
  fieldSection: {
    marginBottom: Spacing.xxl,
  },
  fieldLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: Spacing.md,
  },
  // Status & Priority chips
  optionRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  optionChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.xs + 1,
  },
  optionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  optionText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  // Date
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  dateTextInput: {
    flex: 1,
    fontSize: FontSize.md,
  },
  // Members
  membersGrid: {
    gap: Spacing.sm,
  },
  memberChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.md,
  },
  memberAvatar: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  memberInitials: {
    color: "#FFFFFF",
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
  memberName: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    flex: 1,
  },
  // Tags
  tagInput: {
    fontSize: FontSize.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  tagPreview: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  tagBadge: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  tagBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  // Attachments
  attachmentDrop: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xxl,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderStyle: "dashed",
    gap: Spacing.sm,
  },
  attachText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  attachSub: {
    fontSize: FontSize.xs,
  },
  // Bottom bar
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
  },
});
