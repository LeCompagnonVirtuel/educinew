import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';

interface Setting {
  id: string;
  label: string;
  type: 'toggle' | 'select' | 'info';
  value: boolean | string;
  options?: string[];
}

export const AiSettingsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<Setting[]>([]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/ai/settings');
      const json = await response.json();
      setSettings(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id && setting.type === 'toggle'
          ? { ...setting, value: !setting.value }
          : setting
      )
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Paramètres IA</Text>
      <Text style={styles.subtitle}>Configurez votre assistant IA</Text>

      <Text style={styles.sectionTitle}>Général</Text>
      {settings.filter((s) => s.type === 'toggle').map((setting) => (
        <View key={setting.id} style={styles.settingRow}>
          <Text style={styles.settingLabel}>{setting.label}</Text>
          <Switch
            value={setting.value as boolean}
            onValueChange={() => toggleSetting(setting.id)}
            trackColor={{ false: '#ccc', true: '#81c784' }}
          />
        </View>
      ))}

      <Text style={styles.sectionTitle}>Modèle IA</Text>
      {settings.filter((s) => s.type === 'select').map((setting) => (
        <View key={setting.id} style={styles.settingCard}>
          <Text style={styles.settingLabel}>{setting.label}</Text>
          <View style={styles.optionsContainer}>
            {setting.options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.optionButton, setting.value === option && styles.optionButtonActive]}
              >
                <Text style={[styles.optionText, setting.value === option && styles.optionTextActive]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Informations</Text>
      {settings.filter((s) => s.type === 'info').map((setting) => (
        <View key={setting.id} style={styles.infoRow}>
          <Text style={styles.infoLabel}>{setting.label}</Text>
          <Text style={styles.infoValue}>{setting.value as string}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333', marginTop: 8 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 8 },
  settingLabel: { fontSize: 15, color: '#333', flex: 1 },
  settingCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12 },
  optionsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  optionButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#f5f5f5' },
  optionButtonActive: { backgroundColor: '#1565c0', borderColor: '#1565c0' },
  optionText: { fontSize: 14, color: '#666' },
  optionTextActive: { color: '#fff', fontWeight: '600' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 8 },
  infoLabel: { fontSize: 14, color: '#333' },
  infoValue: { fontSize: 14, color: '#666' },
});
