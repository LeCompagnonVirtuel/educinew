import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Switch } from 'react-native';

interface SettingsState {
  notifications: {
    messages: boolean;
    calls: boolean;
    emails: boolean;
    announcements: boolean;
    tasks: boolean;
  };
  presence: {
    showOnlineStatus: boolean;
    showLastSeen: boolean;
  };
  preferences: {
    darkMode: boolean;
    compactMode: boolean;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
  };
}

const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    notifications: {
      messages: true,
      calls: true,
      emails: true,
      announcements: true,
      tasks: false,
    },
    presence: {
      showOnlineStatus: true,
      showLastSeen: true,
    },
    preferences: {
      darkMode: false,
      compactMode: false,
      soundEnabled: true,
      vibrationEnabled: true,
    },
  });
  const [loading, setLoading] = useState(false);

  const toggleSetting = (category: keyof SettingsState, key: string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !(prev[category] as Record<string, boolean>)[key],
      },
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.card}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Messages</Text>
            <Switch value={settings.notifications.messages} onValueChange={() => toggleSetting('notifications', 'messages')} />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Calls</Text>
            <Switch value={settings.notifications.calls} onValueChange={() => toggleSetting('notifications', 'calls')} />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Emails</Text>
            <Switch value={settings.notifications.emails} onValueChange={() => toggleSetting('notifications', 'emails')} />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Announcements</Text>
            <Switch value={settings.notifications.announcements} onValueChange={() => toggleSetting('notifications', 'announcements')} />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Tasks</Text>
            <Switch value={settings.notifications.tasks} onValueChange={() => toggleSetting('notifications', 'tasks')} />
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Presence</Text>
        <View style={styles.card}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Show Online Status</Text>
            <Switch value={settings.presence.showOnlineStatus} onValueChange={() => toggleSetting('presence', 'showOnlineStatus')} />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Show Last Seen</Text>
            <Switch value={settings.presence.showLastSeen} onValueChange={() => toggleSetting('presence', 'showLastSeen')} />
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch value={settings.preferences.darkMode} onValueChange={() => toggleSetting('preferences', 'darkMode')} />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Compact Mode</Text>
            <Switch value={settings.preferences.compactMode} onValueChange={() => toggleSetting('preferences', 'compactMode')} />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Sound</Text>
            <Switch value={settings.preferences.soundEnabled} onValueChange={() => toggleSetting('preferences', 'soundEnabled')} />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Vibration</Text>
            <Switch value={settings.preferences.vibrationEnabled} onValueChange={() => toggleSetting('preferences', 'vibrationEnabled')} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  settingLabel: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen;
