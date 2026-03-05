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
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface RequestLeaveModalProps {
  visible: boolean;
  onClose: () => void;
}

export const RequestLeaveModal: React.FC<RequestLeaveModalProps> = ({ visible, onClose }) => {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const insets = useSafeAreaInsets();

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
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardView}
        >
          <View 
            style={[
              styles.modalContent, 
              { 
                backgroundColor: colors.background,
                paddingBottom: Platform.OS === "ios" ? insets.bottom + Spacing.lg : Spacing.xl 
              }
            ]}
          >
            <View style={styles.dragIndicatorContainer}>
              <View style={[styles.dragIndicator, { backgroundColor: colors.border }]} />
            </View>

            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.text }]}>Request Leave</Text>
              <TouchableOpacity 
                onPress={onClose}
                style={[styles.closeBtn, { backgroundColor: colors.surfaceLight }]}
              >
                <Ionicons name="close" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView 
              contentContainerStyle={styles.form} 
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              <Text style={[styles.label, { color: colors.textSecondary }]}>Leave Type</Text>
              <TouchableOpacity 
                activeOpacity={0.7}
                style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <Text style={{ color: colors.text, fontSize: FontSize.md }}>{leaveType}</Text>
                <Ionicons name="chevron-down" size={20} color={colors.textTertiary} />
              </TouchableOpacity>

              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>From Date</Text>
                  <TouchableOpacity 
                    activeOpacity={0.7}
                    style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border }]}
                  >
                    <Text style={{ color: colors.text, fontSize: FontSize.md }}>{startDate}</Text>
                    <Ionicons name="calendar-outline" size={18} color={colors.textTertiary} />
                  </TouchableOpacity>
                </View>
                <View style={{ width: Spacing.md }} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>To Date</Text>
                  <TouchableOpacity 
                    activeOpacity={0.7}
                    style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border }]}
                  >
                    <Text style={{ color: colors.text, fontSize: FontSize.md }}>{endDate}</Text>
                    <Ionicons name="calendar-outline" size={18} color={colors.textTertiary} />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={[styles.label, { color: colors.textSecondary }]}>Reason</Text>
              <TextInput
                style={[
                  styles.textArea,
                  { 
                    backgroundColor: colors.surface, 
                    borderColor: colors.border, 
                    color: colors.text,
                    fontSize: FontSize.md
                  }
                ]}
                placeholder="Briefly explain your reason..."
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={3}
                value={reason}
                onChangeText={setReason}
              />

              <View style={styles.footer}>
                <CustomButton
                  title="Submit Request"
                  onPress={onClose}
                  fullWidth
                  size="lg"
                  style={styles.submitBtn}
                />
              </View>
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
    paddingHorizontal: Spacing.lg,
    maxHeight: "95%",
  },
  dragIndicatorContainer: {
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  dragIndicator: {
    width: 36,
    height: 4,
    borderRadius: 2,
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
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    paddingBottom: Spacing.md,
  },
  label: {
    fontSize: 12,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.xs,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    height: 52,
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
    height: 90,
    textAlignVertical: "top",
    marginBottom: Spacing.lg,
  },
  footer: {
    marginTop: Spacing.sm,
  },
  submitBtn: {
    height: 56,
  },
});
