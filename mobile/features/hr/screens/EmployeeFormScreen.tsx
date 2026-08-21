import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Button } from '../../../components/ui';

interface EmployeeFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hire_date: string;
  address: string;
  emergency_contact: string;
  emergency_phone: string;
  salary: string;
  contract_type: string;
}

export default function EmployeeFormScreen({ navigation, route }: any) {
  const { employeeId } = route.params || {};
  const isEditing = !!employeeId;

  const [formData, setFormData] = useState<EmployeeFormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    hire_date: '',
    address: '',
    emergency_contact: '',
    emergency_phone: '',
    salary: '',
    contract_type: 'FULL_TIME',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof EmployeeFormData, string>>>({});

  useEffect(() => {
    if (isEditing) {
      loadEmployeeData();
    }
  }, [employeeId]);

  const loadEmployeeData = async () => {
    try {
      // Replace with actual API call
      // const data = await api.getEmployee(employeeId);
      // setFormData(data);
    } catch (error) {
      console.error('[EmployeeFormScreen] Error loading employee:', error);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof EmployeeFormData, string>> = {};

    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.hire_date.trim()) newErrors.hire_date = 'Hire date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Replace with actual API call
      // if (isEditing) {
      //   await api.updateEmployee(employeeId, formData);
      // } else {
      //   await api.createEmployee(formData);
      // }
      Alert.alert('Success', isEditing ? 'Employee updated successfully' : 'Employee created successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save employee');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof EmployeeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const renderInput = (
    label: string,
    field: keyof EmployeeFormData,
    placeholder: string,
    keyboardType: 'default' | 'email-address' | 'numeric' | 'phone-pad' = 'default',
    secureTextEntry = false
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, errors[field] && styles.inputError]}
        value={formData[field]}
        onChangeText={(value) => updateFormData(field, value)}
        placeholder={placeholder}
        placeholderTextColor={COLORS.onSurfaceVariant}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={FONT_SIZES.lg} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.title}>{isEditing ? 'Edit Employee' : 'Add Employee'}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Personal Information */}
        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          {renderInput('First Name', 'first_name', 'Enter first name')}
          {renderInput('Last Name', 'last_name', 'Enter last name')}
          {renderInput('Email', 'email', 'Enter email address', 'email-address')}
          {renderInput('Phone', 'phone', 'Enter phone number', 'phone-pad')}
          {renderInput('Address', 'address', 'Enter address')}
        </Card>

        {/* Employment Information */}
        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Employment Information</Text>
          {renderInput('Position', 'position', 'Enter position')}
          {renderInput('Department', 'department', 'Enter department')}
          {renderInput('Hire Date', 'hire_date', 'YYYY-MM-DD')}
          {renderInput('Salary', 'salary', 'Enter salary', 'numeric')}
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contract Type</Text>
            <View style={styles.contractOptions}>
              {['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.contractOption,
                    formData.contract_type === type && styles.contractOptionSelected,
                  ]}
                  onPress={() => updateFormData('contract_type', type)}
                >
                  <Text
                    style={[
                      styles.contractOptionText,
                      formData.contract_type === type && styles.contractOptionTextSelected,
                    ]}
                  >
                    {type.replace('_', ' ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Card>

        {/* Emergency Contact */}
        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          {renderInput('Contact Name', 'emergency_contact', 'Enter emergency contact name')}
          {renderInput('Contact Phone', 'emergency_phone', 'Enter emergency contact phone', 'phone-pad')}
        </Card>

        {/* Submit Button */}
        <View style={styles.actions}>
          <Button
            title={isEditing ? 'Update Employee' : 'Create Employee'}
            variant="primary"
            fullWidth
            loading={loading}
            onPress={handleSubmit}
            iconLeft={<Ionicons name="checkmark" size={FONT_SIZES.md} color={COLORS.white} />}
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
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
  contractOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  contractOption: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.outline,
    backgroundColor: COLORS.surface,
  },
  contractOptionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  contractOptionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurface,
  },
  contractOptionTextSelected: {
    color: COLORS.white,
  },
  actions: {
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
});