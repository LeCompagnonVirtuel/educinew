import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';

interface Settings {
  notificationsEnabled: boolean;
  darkModeEnabled: boolean;
  autoDownloadEnabled: boolean;
  language: string;
  fontSize: string;
}

export const LxpSettingsScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<Settings>({
    notificationsEnabled: true,
    darkModeEnabled: false,
    autoDownloadEnabled: true,
    language: 'English',
    fontSize: 'Medium',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/lxp/settings');
      const json = await response.json();
      setSettings(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSetting = (key: keyof Settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Push Notifications</Text>
          <Switch value={settings.notificationsEnabled} onValueChange={() => toggleSetting('notificationsEnabled')} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch value={settings.darkModeEnabled} onValueChange={() => toggleSetting('darkModeEnabled')} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Font Size</Text>
          <Text style={styles.value}>{settings.fontSize}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Downloads</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Auto-Download</Text>
          <Switch value={settings.autoDownloadEnabled} onValueChange={() => toggleSetting('autoDownloadEnabled')} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language</Text>
        <View style={styles.row}>
          <Text style={styles.label}>App Language</Text>
          <Text style={styles.value}>{settings.language}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  section: { backgroundColor: '#fff', padding: 16, marginTop: 8 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  label: { fontSize: 16 },
  value: { fontSize: 14, color: '#666' },
});
