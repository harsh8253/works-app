import PriorityBadge from "@/components/PriorityBadge";
import StatusBadge from "@/components/StatusBadge";
import { tasks } from "@/constants/mockData";
import {
  BorderRadius,
  Colors,
  FontSize,
  FontWeight,
  Spacing,
} from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TaskDetailScreen() {
  const colors = Colors.dark;
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [commentText, setCommentText] = useState("");

  const task = tasks.find((t) => t.id === id) || tasks[0];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textSecondary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textTertiary }]}>
          Task
        </Text>
        <TouchableOpacity>
          <Ionicons
            name="ellipsis-horizontal"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Title & Badges */}
        <Animated.View entering={FadeIn.duration(300)} style={styles.section}>
          <Text style={[styles.taskTitle, { color: colors.text }]}>
            {task.title}
          </Text>
          <View style={styles.badgeRow}>
            <StatusBadge status={task.status} />
            <PriorityBadge
              priority={task.priority}
              style={{ marginLeft: Spacing.sm }}
            />
          </View>
        </Animated.View>

        {/* Description */}
        <Animated.View
          entering={FadeInDown.duration(300).delay(100)}
          style={styles.section}
        >
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
            Description
          </Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {task.description}
          </Text>
        </Animated.View>

        {/* Details */}
        <Animated.View
          entering={FadeInDown.duration(300).delay(200)}
          style={styles.section}
        >
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
            Details
          </Text>
          <View style={styles.detailsGrid}>
            {(
              [
                {
                  label: "Status",
                  icon: "radio-button-on",
                  value:
                    task.status === "in-progress"
                      ? "In Progress"
                      : task.status === "todo"
                        ? "To Do"
                        : "Done",
                  iconColor:
                    task.status === "done"
                      ? "#34D399"
                      : task.status === "in-progress"
                        ? "#FBBF24"
                        : "#A1A1AA",
                },
                {
                  label: "Priority",
                  icon:
                    task.priority === "high"
                      ? "chevron-up"
                      : task.priority === "low"
                        ? "chevron-down"
                        : "remove",
                  value:
                    task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1),
                  iconColor:
                    task.priority === "high"
                      ? "#F87171"
                      : task.priority === "low"
                        ? "#34D399"
                        : "#FBBF24",
                },
                {
                  label: "Due Date",
                  icon: "calendar-outline",
                  value: task.dueDate,
                  iconColor: colors.textTertiary,
                },
              ] as const
            ).map((detail) => (
              <TouchableOpacity
                key={detail.label}
                style={[styles.detailItem, { borderColor: colors.border }]}
                activeOpacity={0.7}
              >
                <Text style={[styles.detailLabel, { color: colors.textMuted }]}>
                  {detail.label}
                </Text>
                <View style={styles.detailValueRow}>
                  <Ionicons
                    name={detail.icon}
                    size={14}
                    color={detail.iconColor}
                  />
                  <Text style={[styles.detailValue, { color: colors.text }]}>
                    {detail.value}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Members */}
        <Animated.View
          entering={FadeInDown.duration(300).delay(300)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
              Members
            </Text>
            <TouchableOpacity>
              <Ionicons name="add" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
          {task.assignees.map((user) => (
            <View key={user.id} style={styles.memberRow}>
              <View
                style={[
                  styles.memberAvatar,
                  {
                    backgroundColor:
                      user.avatar === "HP"
                        ? "#8B5CF6"
                        : user.avatar === "AS"
                          ? "#EC4899"
                          : user.avatar === "DJ"
                            ? "#FBBF24"
                            : user.avatar === "RV"
                              ? "#34D399"
                              : "#60A5FA",
                  },
                ]}
              >
                <Text style={styles.memberInitials}>{user.avatar}</Text>
              </View>
              <Text style={[styles.memberName, { color: colors.text }]}>
                {user.name}
              </Text>
            </View>
          ))}
        </Animated.View>

        {/* Attachments */}
        {task.attachments.length > 0 && (
          <Animated.View
            entering={FadeInDown.duration(300).delay(400)}
            style={styles.section}
          >
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
              Attachments
            </Text>
            {task.attachments.map((attachment) => (
              <TouchableOpacity
                key={attachment.id}
                style={[styles.attachmentRow, { borderColor: colors.border }]}
                activeOpacity={0.6}
              >
                <Ionicons
                  name={
                    attachment.type === "pdf"
                      ? "document-outline"
                      : attachment.type === "fig"
                        ? "color-palette-outline"
                        : "code-outline"
                  }
                  size={16}
                  color={colors.textTertiary}
                />
                <View style={styles.attachmentInfo}>
                  <Text style={[styles.attachmentName, { color: colors.text }]}>
                    {attachment.name}
                  </Text>
                  <Text
                    style={[styles.attachmentSize, { color: colors.textMuted }]}
                  >
                    {attachment.size}
                  </Text>
                </View>
                <Ionicons
                  name="download-outline"
                  size={16}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}

        {/* Comments */}
        <Animated.View
          entering={FadeInDown.duration(300).delay(500)}
          style={styles.section}
        >
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
            Comments · {task.comments.length}
          </Text>

          {task.comments.length === 0 ? (
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              No comments yet
            </Text>
          ) : (
            task.comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <View
                  style={[
                    styles.commentAvatar,
                    {
                      backgroundColor:
                        comment.avatar === "HP"
                          ? "#8B5CF6"
                          : comment.avatar === "AS"
                            ? "#EC4899"
                            : comment.avatar === "RV"
                              ? "#34D399"
                              : "#60A5FA",
                    },
                  ]}
                >
                  <Text style={styles.commentInitials}>{comment.avatar}</Text>
                </View>
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text
                      style={[styles.commentAuthor, { color: colors.text }]}
                    >
                      {comment.author}
                    </Text>
                    <Text
                      style={[styles.commentTime, { color: colors.textMuted }]}
                    >
                      {comment.timestamp}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.commentText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {comment.text}
                  </Text>
                </View>
              </View>
            ))
          )}
        </Animated.View>
      </ScrollView>

      {/* Comment Input */}
      <View
        style={[
          styles.commentInputContainer,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            paddingBottom: insets.bottom + Spacing.sm,
          },
        ]}
      >
        <View style={[styles.commentInputBox, { borderColor: colors.border }]}>
          <TextInput
            style={[styles.commentInput, { color: colors.text }]}
            placeholder="Write a comment..."
            placeholderTextColor={colors.textMuted}
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: commentText.trim()
                  ? colors.primary
                  : "transparent",
              },
            ]}
          >
            <Ionicons
              name="arrow-up"
              size={16}
              color={commentText.trim() ? "#FFFFFF" : colors.textMuted}
            />
          </TouchableOpacity>
        </View>
      </View>
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
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  section: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: Spacing.md,
  },
  taskTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    lineHeight: 26,
    marginBottom: Spacing.md,
    letterSpacing: -0.3,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    fontSize: FontSize.md,
    lineHeight: 22,
  },
  detailsGrid: {
    gap: Spacing.sm,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  detailLabel: {
    fontSize: FontSize.sm,
  },
  detailValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  detailValue: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    gap: Spacing.md,
  },
  memberAvatar: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  memberInitials: {
    color: "#FFFFFF",
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
  memberName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
  },
  attachmentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    gap: Spacing.md,
  },
  attachmentInfo: {
    flex: 1,
  },
  attachmentName: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  attachmentSize: {
    fontSize: FontSize.xs,
    marginTop: 1,
  },
  emptyText: {
    fontSize: FontSize.sm,
  },
  commentItem: {
    flexDirection: "row",
    marginBottom: Spacing.lg,
  },
  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  commentInitials: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: FontWeight.semibold,
  },
  commentContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  commentAuthor: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  commentTime: {
    fontSize: FontSize.xs,
  },
  commentText: {
    fontSize: FontSize.sm,
    lineHeight: 20,
  },
  commentInputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
  },
  commentInputBox: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  commentInput: {
    flex: 1,
    fontSize: FontSize.sm,
    maxHeight: 80,
    paddingVertical: Spacing.xs,
  },
  sendButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Spacing.sm,
  },
});
