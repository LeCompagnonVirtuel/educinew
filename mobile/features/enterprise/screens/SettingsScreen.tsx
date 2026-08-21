import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card } from '../../../components/ui';

interface EnterpriseSettings {
  company_name: string;
  admin_email: string;
  default_theme: 'light' | 'dark' | 'system';
  email_notifications: boolean;
  sms_notifications: boolean;
  two_factor_enabled: boolean;
  session_timeout: number;
  max_login_attempts: number;
  password_expiry_days: number;
}

export default function SettingsScreen({ navigation }: any) {
  const [settings, setSettings] = useState<EnterpriseSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const loadSettings = useCallback(async () => {
    try {
      setSettings({
        company_name: 'EduCI Platform',
        admin_email: 'admin@educi.com',
        default_theme: 'system',
        email_notifications: true,
        sms_notifications: false,
        two_factor_enabled: true,
        session_timeout: 30,
        max_login_attempts: 5,
        password_expiry_days: 90,
      });
    } catch (error) {
      console.error('[SettingsScreen] Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadSettings(); }, [loadSettings]);

  const toggleSetting = (key: keyof EnterpriseSettings) => {
    setSettings(prev => prev ? { ...prev, [key]: !prev[key] } : null);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading settings...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.title}>Enterprise Settings</Text>
        <TouchableOpacity>
          <Ionicons name="save" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Company Name</Text>
              <Text style={styles.settingValue}>{settings?.company_name}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color={COLORS.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Admin Email</Text>
              <Text style={styles.settingValue}>{settings?.admin_email}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color={COLORS.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Default Theme</Text>
              <Text style={styles.settingValue}>{settings?.default_theme.charAt(0).toUpperCase() + (settings?.default_theme?.slice(1) || '')}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color={COLORS.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
        </Card>

        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Email Notifications</Text>
              <Text style={styles.settingDescription}>Receive email alerts for important events</Text>
            </View>
            <Switch
              value={settings?.email_notifications}
              onValueChange={() => toggleSetting('email_notifications')}
              trackColor={{ false: COLORS.surfaceVariant, true: COLORS.primaryContainer }}
              thumbColor={settings?.email_notifications ? COLORS.primary : COLORS.onSurfaceVariant}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>SMS Notifications</Text>
              <Text style={styles.settingDescription}>Receive SMS alerts for critical issues</Text>
            </View>
            <Switch
              value={settings?.sms_notifications}
              onValueChange={() => toggleSetting('sms_notifications')}
              trackColor={{ false: COLORS.surfaceVariant, true: COLORS.primaryContainer }}
              thumbColor={settings?.sms_notifications ? COLORS.primary : COLORS.onSurfaceVariant}
            />
          </View>
        </Card>

        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Two-Factor Authentication</Text>
              <Text style={styles.settingDescription}>Require 2FA for all admin accounts</Text>
            </View>
            <Switch
              value={settings?.two_factor_enabled}
              onValueChange={() => toggleSetting('two_factor_enabled')}
              trackColor={{ false: COLORS.surfaceVariant, true: COLORS.primaryContainer }}
              thumbColor={settings?.two_factor_enabled ? COLORS.primary : COLORS.onSurfaceVariant}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Session Timeout</Text>
              <Text style={styles.settingValue}>{settings?.session_timeout} minutes</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color={COLORS.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Max Login Attempts</Text>
              <Text style={styles.settingValue}>{settings?.max_login_attempts}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color={COLORS.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Password Expiry</Text>
              <Text style={styles.settingValue}>{settings?.password_expiry_days} days</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color={COLORS.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
        </Card>

        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>
          <TouchableOpacity style={styles.dangerButton}>
            <Ionicons name="trash-outline" size={20} color={SEMANTIC_COLORS.error.main} />
            <Text style={styles.dangerButtonText}>Delete Enterprise Account</Text>
          </TouchableOpacity>
        </Card>
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
    borderBottomColor: COLORS.surfaceVariant,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.onSurface,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurfaceVariant,
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
  },
  settingInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  settingLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.onSurface,
  },
  settingValue: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  settingDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: SEMANTIC_COLORS.error.main,
    borderRadius: BORDER_RADIUS.md,
  },
  dangerButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: SEMANTIC_COLORS.error.main,
  },
});
