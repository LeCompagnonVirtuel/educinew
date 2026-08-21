import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function IntegrationSettingsScreen() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/integration/settings');
      const json = await response.json();
      setSettings(json.data || {});
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      await fetch('/api/integration/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Integration Settings</Text>
        <TouchableOpacity 
          style={[styles.saveButton, saving && styles.saveButtonDisabled]} 
          onPress={saveSettings}
          disabled={saving}
        >
          <Text style={styles.saveButtonText}>{saving ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Settings</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Enable Integrations</Text>
          <Switch value={settings.enableIntegrations} onValueChange={() => toggleSetting('enableIntegrations')} />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Debug Mode</Text>
          <Switch value={settings.debugMode} onValueChange={() => toggleSetting('debugMode')} />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Auto-reconnect</Text>
          <Switch value={settings.autoReconnect} onValueChange={() => toggleSetting('autoReconnect')} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security Settings</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Require HTTPS</Text>
          <Switch value={settings.requireHttps} onValueChange={() => toggleSetting('requireHttps')} />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Enable CORS</Text>
          <Switch value={settings.enableCors} onValueChange={() => toggleSetting('enableCors')} />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Rate Limiting</Text>
          <Switch value={settings.rateLimiting} onValueChange={() => toggleSetting('rateLimiting')} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Settings</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Email Notifications</Text>
          <Switch value={settings.emailNotifications} onValueChange={() => toggleSetting('emailNotifications')} />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Webhook Notifications</Text>
          <Switch value={settings.webhookNotifications} onValueChange={() => toggleSetting('webhookNotifications')} />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Slack Notifications</Text>
          <Switch value={settings.slackNotifications} onValueChange={() => toggleSetting('slackNotifications')} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Advanced Settings</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Enable Logging</Text>
          <Switch value={settings.enableLogging} onValueChange={() => toggleSetting('enableLogging')} />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Analytics Collection</Text>
          <Switch value={settings.analyticsCollection} onValueChange={() => toggleSetting('analyticsCollection')} />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Beta Features</Text>
          <Switch value={settings.betaFeatures} onValueChange={() => toggleSetting('betaFeatures')} />
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/integration/settings/advanced')}>
          <Text style={styles.actionButtonText}>Advanced Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.dangerButton]} onPress={() => router.push('/integration/settings/reset')}>
          <Text style={styles.actionButtonText}>Reset to Defaults</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  saveButton: { backgroundColor: '#4CAF50', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  saveButtonDisabled: { backgroundColor: '#ccc' },
  saveButtonText: { color: '#fff', fontWeight: '600' },
  section: { backgroundColor: '#fff', margin: 8, padding: 16, borderRadius: 8, elevation: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  settingLabel: { fontSize: 16, color: '#333' },
  actions: { padding: 16 },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  dangerButton: { backgroundColor: '#FF3B30' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});