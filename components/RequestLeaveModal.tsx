import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Colors, Spacing, BorderRadius, FontSize, FontWeight } from "@/constants/theme";
import { useTheme } from "@/constants/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";

interface RequestLeaveModalProps {
  visible: boolean;
  onClose: () => void;
}

export const RequestLeaveModal: React.FC<RequestLeaveModalProps> = ({ visible, onClose }) => {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  const [leaveType, setLeaveType] = useState("Annual Leave");
  const [startDate, setStartDate] = useState("2026-03-25");
  const [endDate, setEndDate] = useState("2026-03-27");
  const [reason, setReason] = useState("");

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.text }]}>Request Leave</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Leave Type</Text>
              <View style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={{ color: colors.text }}>{leaveType}</Text>
                <Ionicons name="chevron-down" size={20} color={colors.textTertiary} />
              </View>

              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>From Date</Text>
                  <View style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={{ color: colors.text }}>{startDate}</Text>
                    <Ionicons name="calendar-outline" size={18} color={colors.textTertiary} />
                  </View>
                </View>
                <View style={{ width: Spacing.md }} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>To Date</Text>
                  <View style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={{ color: colors.text }}>{endDate}</Text>
                    <Ionicons name="calendar-outline" size={18} color={colors.textTertiary} />
                  </View>
                </View>
              </View>

              <Text style={[styles.label, { color: colors.textSecondary }]}>Reason</Text>
              <TextInput
                style={[
                  styles.textArea,
                  { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }
                ]}
                placeholder="Briefly explain your reason..."
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={4}
                value={reason}
                onChangeText={setReason}
              />

              <CustomButton
                title="Submit Request"
                onPress={onClose}
                fullWidth
                size="lg"
                style={{ marginTop: Spacing.xl }}
              />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  keyboardView: {
    width: "100%",
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    padding: Spacing.lg,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  form: {
    paddingBottom: Spacing.xxxl,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.sm,
    textTransform: "uppercase",
  },
  input: {
    height: 50,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  row: {
    flexDirection: "row",
    marginBottom: Spacing.lg,
  },
  textArea: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    height: 100,
    textAlignVertical: "top",
  },
});
