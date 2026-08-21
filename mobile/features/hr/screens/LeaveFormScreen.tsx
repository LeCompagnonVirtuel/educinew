import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Button } from '../../../components/ui';

interface LeaveFormData {
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
}

export default function LeaveFormScreen({ navigation }: any) {
  const [formData, setFormData] = useState<LeaveFormData>({
    leave_type: 'ANNUAL',
    start_date: '',
    end_date: '',
    reason: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LeaveFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LeaveFormData, string>> = {};

    if (!formData.leave_type) newErrors.leave_type = 'Leave type is required';
    if (!formData.start_date.trim()) newErrors.start_date = 'Start date is required';
    if (!formData.end_date.trim()) newErrors.end_date = 'End date is required';
    if (!formData.reason.trim()) newErrors.reason = 'Reason is required';

    if (formData.start_date && formData.end_date) {
      const start = new Date(formData.start_date);
      const end = new Date(formData.end_date);
      if (end < start) {
        newErrors.end_date = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Replace with actual API call
      // await api.createLeave(formData);
      Alert.alert('Success', 'Leave request submitted successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to submit leave request');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof LeaveFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const leaveTypes = [
    { value: 'ANNUAL', label: 'Annual Leave', icon: 'sunny' },
    { value: 'SICK', label: 'Sick Leave', icon: 'medical' },
    { value: 'PERSONAL', label: 'Personal Leave', icon: 'person' },
    { value: 'MATERNITY', label: 'Maternity Leave', icon: 'heart' },
    { value: 'PATERNITY', label: 'Paternity Leave', icon: 'man' },
    { value: 'UNPAID', label: 'Unpaid Leave', icon: 'wallet' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={FONT_SIZES.lg} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.title}>Request Leave</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Leave Type Selection */}
        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Leave Type</Text>
          <View style={styles.leaveTypeGrid}>
            {leaveTypes.map((type) => (
              <TouchableOpacity
                key={type.value}
                style={[
                  styles.leaveTypeOption,
                  formData.leave_type === type.value && styles.leaveTypeOptionSelected,
                ]}
                onPress={() => updateFormData('leave_type', type.value)}
              >
                <Ionicons
                  name={type.icon as any}
                  size={FONT_SIZES.lg}
                  color={formData.leave_type === type.value ? COLORS.white : COLORS.primary}
                />
                <Text
                  style={[
                    styles.leaveTypeText,
                    formData.leave_type === type.value && styles.leaveTypeTextSelected,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.leave_type && <Text style={styles.errorText}>{errors.leave_type}</Text>}
        </Card>

        {/* Date Selection */}
        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Date Range</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Start Date</Text>
            <TextInput
              style={[styles.input, errors.start_date && styles.inputError]}
              value={formData.start_date}
              onChangeText={(value) => updateFormData('start_date', value)}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={COLORS.onSurfaceVariant}
            />
            {errors.start_date && <Text style={styles.errorText}>{errors.start_date}</Text>}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>End Date</Text>
            <TextInput
              style={[styles.input, errors.end_date && styles.inputError]}
              value={formData.end_date}
              onChangeText={(value) => updateFormData('end_date', value)}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={COLORS.onSurfaceVariant}
            />
            {errors.end_date && <Text style={styles.errorText}>{errors.end_date}</Text>}
          </View>
        </Card>

        {/* Reason */}
        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Reason</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textArea, errors.reason && styles.inputError]}
              value={formData.reason}
              onChangeText={(value) => updateFormData('reason', value)}
              placeholder="Enter reason for leave request"
              placeholderTextColor={COLORS.onSurfaceVariant}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            {errors.reason && <Text style={styles.errorText}>{errors.reason}</Text>}
          </View>
        </Card>

        {/* Submit Button */}
        <View style={styles.actions}>
          <Button
            title="Submit Leave Request"
            variant="primary"
            fullWidth
            loading={loading}
            onPress={handleSubmit}
            iconLeft={<Ionicons name="send" size={FONT_SIZES.md} color={COLORS.white} />}
          />
          <Button
            title="Cancel"
            variant="secondary"
            fullWidth
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outline,
  },
  backButton: {
    padding: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.onSurface,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  sectionCard: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
    marginBottom: SPACING.lg,
  },
  leaveTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  leaveTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.outline,
    backgroundColor: COLORS.surface,
    minWidth: 120,
  },
  leaveTypeOptionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  leaveTypeText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurface,
    marginLeft: SPACING.sm,
  },
  leaveTypeTextSelected: {
    color: COLORS.white,
  },
  inputContainer: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.onSurface,
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.outline,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurface,
    backgroundColor: COLORS.surface,
  },
  textArea: {
    borderWidth: 1,
    borderColor: COLORS.outline,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurface,
    backgroundColor: COLORS.surface,
    minHeight: 100,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
  actions: {
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
});