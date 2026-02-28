import { db } from "@/constants/firebase";
import {
    BorderRadius,
    FontSize,
    FontWeight,
    Spacing,
} from "@/constants/theme";
import { useTheme } from "@/constants/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import {
    arrayRemove,
    arrayUnion,
    doc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Priority = "low" | "medium" | "high";
type Status = "todo" | "in-progress" | "done";

const teamMembers = [
  { id: "u1", name: "Harsh Patel", avatar: "HP", color: "#8B5CF6" },
  { id: "u2", name: "Ananya Sharma", avatar: "AS", color: "#EC4899" },
  { id: "u3", name: "Dev Joshi", avatar: "DJ", color: "#FBBF24" },
  { id: "u4", name: "Rahul Verma", avatar: "RV", color: "#34D399" },
  { id: "u5", name: "Priya Nair", avatar: "PN", color: "#60A5FA" },
];

interface TaskActionsProps {
  taskId: string | null;
  mode: "edit" | "assign" | "support" | null;
  onClose: () => void;
}

export default function TaskActions({ taskId, mode, onClose }: TaskActionsProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  // Live task data
  const [task, setTask] = useState<any>(null);

  // Edit form
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState<Priority>("medium");
  const [editStatus, setEditStatus] = useState<Status>("todo");
  const [editDueDate, setEditDueDate] = useState("");

  useEffect(() => {
    if (!taskId) return;
    const unsub = onSnapshot(doc(db, "tasks", taskId), (snap) => {
      if (snap.exists()) {
        const data = { id: snap.id, ...snap.data() };
        setTask(data);
        if (mode === "edit") {
          setEditTitle((data as any).title || "");
          setEditDescription((data as any).description || "");
          setEditPriority((data as any).priority || "medium");
          setEditStatus((data as any).status || "todo");
          setEditDueDate((data as any).dueDate || "");
        }
      }
    });
    return unsub;
  }, [taskId, mode]);

  if (!mode || !taskId) return null;

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return Alert.alert("Error", "Title cannot be empty.");
    try {
      await updateDoc(doc(db, "tasks", taskId), {
        title: editTitle,
        description: editDescription,
        priority: editPriority,
        status: editStatus,
        dueDate: editDueDate || "No date",
      });
      onClose();
      Alert.alert("✅ Updated", "Task updated successfully.");
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  const handleToggleAssignee = async (member: typeof teamMembers[0]) => {
    const already = task?.assignees?.some((a: any) => a.id === member.id);
    try {
      const payload = { id: member.id, name: member.name, avatar: member.avatar };
      if (already) {
        await updateDoc(doc(db, "tasks", taskId), { assignees: arrayRemove(payload) });
      } else {
        await updateDoc(doc(db, "tasks", taskId), { assignees: arrayUnion(payload) });
      }
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  const handleToggleSupporter = async (member: typeof teamMembers[0]) => {
    const already = task?.supporters?.some((a: any) => a.id === member.id);
    try {
      const payload = { id: member.id, name: member.name, avatar: member.avatar };
      if (already) {
        await updateDoc(doc(db, "tasks", taskId), { supporters: arrayRemove(payload) });
      } else {
        await updateDoc(doc(db, "tasks", taskId), { supporters: arrayUnion(payload) });
      }
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  // ===== EDIT MODE =====
  if (mode === "edit") {
    return (
      <Modal visible animationType="slide" transparent>
        <View style={[styles.overlay, { backgroundColor: colors.background }]}>
          <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.text }]}>Edit Task</Text>
            <TouchableOpacity onPress={handleSaveEdit}>
              <Text style={{ color: colors.primary, fontSize: FontSize.md, fontWeight: FontWeight.semibold }}>Save</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex: 1, paddingHorizontal: Spacing.xl }} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={[styles.label, { color: colors.textMuted }]}>Title</Text>
            <TextInput style={[styles.input, { color: colors.text, borderColor: colors.border }]} value={editTitle} onChangeText={setEditTitle} placeholder="Task title" placeholderTextColor={colors.textMuted} />

            <Text style={[styles.label, { color: colors.textMuted }]}>Description</Text>
            <TextInput style={[styles.input, styles.multiInput, { color: colors.text, borderColor: colors.border }]} value={editDescription} onChangeText={setEditDescription} placeholder="Description" placeholderTextColor={colors.textMuted} multiline textAlignVertical="top" />

            <Text style={[styles.label, { color: colors.textMuted }]}>Status</Text>
            <View style={styles.chipRow}>
              {([{ key: "todo", label: "To Do", clr: "#A1A1AA" }, { key: "in-progress", label: "In Progress", clr: "#FBBF24" }, { key: "done", label: "Done", clr: "#34D399" }] as const).map((s) => (
                <TouchableOpacity key={s.key} onPress={() => setEditStatus(s.key)} style={[styles.chip, { borderColor: editStatus === s.key ? s.clr : colors.border, backgroundColor: editStatus === s.key ? `${s.clr}18` : "transparent" }]}>
                  <View style={[styles.chipDot, { backgroundColor: s.clr }]} />
                  <Text style={[styles.chipText, { color: editStatus === s.key ? s.clr : colors.textTertiary }]}>{s.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.label, { color: colors.textMuted }]}>Priority</Text>
            <View style={styles.chipRow}>
              {([{ key: "low", label: "Low", clr: "#34D399", icon: "chevron-down" }, { key: "medium", label: "Medium", clr: "#FBBF24", icon: "remove" }, { key: "high", label: "High", clr: "#F87171", icon: "chevron-up" }] as const).map((p) => (
                <TouchableOpacity key={p.key} onPress={() => setEditPriority(p.key)} style={[styles.chip, { borderColor: editPriority === p.key ? p.clr : colors.border, backgroundColor: editPriority === p.key ? `${p.clr}18` : "transparent" }]}>
                  <Ionicons name={p.icon as any} size={14} color={editPriority === p.key ? p.clr : colors.textMuted} />
                  <Text style={[styles.chipText, { color: editPriority === p.key ? p.clr : colors.textTertiary }]}>{p.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.label, { color: colors.textMuted }]}>Due Date</Text>
            <TextInput style={[styles.input, { color: colors.text, borderColor: colors.border }]} value={editDueDate} onChangeText={setEditDueDate} placeholder="YYYY-MM-DD" placeholderTextColor={colors.textMuted} keyboardType="numbers-and-punctuation" />
          </ScrollView>
        </View>
      </Modal>
    );
  }

  // ===== ASSIGN MODE =====
  if (mode === "assign") {
    return (
      <Modal visible animationType="slide" transparent>
        <View style={[styles.overlay, { backgroundColor: colors.background }]}>
          <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.text }]}>Assign Members</Text>
            <View style={{ width: 24 }} />
          </View>
          <Text style={{ paddingHorizontal: Spacing.xl, color: colors.textTertiary, fontSize: FontSize.sm, marginBottom: Spacing.lg }}>
            Tap to assign or unassign members
          </Text>
          <ScrollView style={{ flex: 1, paddingHorizontal: Spacing.xl }} contentContainerStyle={{ paddingBottom: 40 }}>
            {teamMembers.map((member) => {
              const isAssigned = task?.assignees?.some((a: any) => a.id === member.id);
              return (
                <TouchableOpacity key={member.id} style={[styles.memberRow, { borderColor: colors.border, backgroundColor: isAssigned ? `${member.color}12` : "transparent" }]} onPress={() => handleToggleAssignee(member)} activeOpacity={0.7}>
                  <View style={[styles.avatar, { backgroundColor: member.color }]}>
                    <Text style={styles.avatarText}>{member.avatar}</Text>
                  </View>
                  <Text style={[styles.memberName, { color: colors.text }]}>{member.name}</Text>
                  {isAssigned && <Ionicons name="checkmark-circle" size={20} color={member.color} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    );
  }

  // ===== SUPPORT MODE =====
  if (mode === "support") {
    return (
      <Modal visible animationType="slide" transparent>
        <View style={[styles.overlay, { backgroundColor: colors.background }]}>
          <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.text }]}>Add Support</Text>
            <View style={{ width: 24 }} />
          </View>
          <Text style={{ paddingHorizontal: Spacing.xl, color: colors.textTertiary, fontSize: FontSize.sm, marginBottom: Spacing.lg }}>
            Add team members to support on this task
          </Text>
          <ScrollView style={{ flex: 1, paddingHorizontal: Spacing.xl }} contentContainerStyle={{ paddingBottom: 40 }}>
            {teamMembers.map((member) => {
              const isSupporter = task?.supporters?.some((a: any) => a.id === member.id);
              return (
                <TouchableOpacity key={member.id} style={[styles.memberRow, { borderColor: colors.border, backgroundColor: isSupporter ? `${member.color}12` : "transparent" }]} onPress={() => handleToggleSupporter(member)} activeOpacity={0.7}>
                  <View style={[styles.avatar, { backgroundColor: member.color }]}>
                    <Text style={styles.avatarText}>{member.avatar}</Text>
                  </View>
                  <Text style={[styles.memberName, { color: colors.text }]}>{member.name}</Text>
                  {isSupporter && <Ionicons name="checkmark-circle" size={20} color={member.color} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  overlay: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  title: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
  },
  input: {
    fontSize: FontSize.md,
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  multiInput: { minHeight: 80, textAlignVertical: "top" },
  chipRow: { flexDirection: "row", gap: Spacing.sm, flexWrap: "wrap" },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: 4,
  },
  chipDot: { width: 6, height: 6, borderRadius: 3 },
  chipText: { fontSize: FontSize.sm, fontWeight: FontWeight.medium },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#FFF", fontSize: FontSize.xs, fontWeight: FontWeight.semibold },
  memberName: { flex: 1, fontSize: FontSize.md, fontWeight: FontWeight.regular },
});
