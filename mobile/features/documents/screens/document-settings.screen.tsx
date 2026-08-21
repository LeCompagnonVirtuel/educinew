import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';

interface StorageInfo {
  used: string;
  total: string;
  percentage: number;
}

const DocumentSettingsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storageInfo, setStorageInfo] = useState<StorageInfo>({ used: '0 GB', total: '0 GB', percentage: 0 });

  const [autoVersioning, setAutoVersioning] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);
  const [defaultPermission, setDefaultPermission] = useState<'view' | 'edit' | 'none'>('view');
  const [retentionPeriod, setRetentionPeriod] = useState('3 years');
  const [classification, setClassification] = useState('Internal');
  const [enableWatermark, setEnableWatermark] = useState(false);
  const [enableBranding, setEnableBranding] = useState(true);
  const [maxFileSize, setMaxFileSize] = useState('50 MB');
  const [allowedTypes, setAllowedTypes] = useState('All');
  const [notifyOnUpload, setNotifyOnUpload] = useState(true);
  const [notifyOnComment, setNotifyOnComment] = useState(true);
  const [notifyOnShare, setNotifyOnShare] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setStorageInfo({ used: '12.5 GB', total: '50 GB', percentage: 25 });
    } catch (err) {
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    Alert.alert('Saved', 'Document settings saved successfully');
  };

  const permissionOptions = ['view', 'edit', 'none'] as const;
  const retentionOptions = ['1 year', '3 years', '5 years', '7 years', '10 years', 'Forever'];
  const classificationOptions = ['Public', 'Internal', 'Confidential', 'Restricted'];
  const fileSizeOptions = ['10 MB', '25 MB', '50 MB', '100 MB', '250 MB'];
  const fileTypeOptions = ['All', 'Documents Only', 'Images Only', 'Custom'];

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Loading settings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Document Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Storage</Text>
        <View style={styles.storageCard}>
          <View style={styles.storageHeader}>
            <Text style={styles.storageLabel}>Storage Used</Text>
            <Text style={styles.storageValue}>{storageInfo.used} / {storageInfo.total}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${storageInfo.percentage}%` as any }]} />
          </View>
          <Text style={styles.storagePercent}>{storageInfo.percentage}% used</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Default Permissions</Text>
        <View style={styles.optionGroup}>
          {permissionOptions.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[styles.optionBtn, defaultPermission === opt && styles.optionBtnActive]}
              onPress={() => setDefaultPermission(opt)}
            >
              <Text style={[styles.optionText, defaultPermission === opt && styles.optionTextActive]}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Versioning & Approval</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Auto-Versioning</Text>
          <Switch value={autoVersioning} onValueChange={setAutoVersioning} />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Require Approval</Text>
          <Switch value={requireApproval} onValueChange={setRequireApproval} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Retention Policy</Text>
        <View style={styles.optionGroup}>
          {retentionOptions.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[styles.optionBtn, retentionPeriod === opt && styles.optionBtnActive]}
              onPress={() => setRetentionPeriod(opt)}
            >
              <Text style={[styles.optionText, retentionPeriod === opt && styles.optionTextActive]}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Classification</Text>
        <View style={styles.optionGroup}>
          {classificationOptions.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[styles.optionBtn, classification === opt && styles.optionBtnActive]}
              onPress={() => setClassification(opt)}
            >
              <Text style={[styles.optionText, classification === opt && styles.optionTextActive]}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upload Limits</Text>
        <View style={styles.optionGroup}>
          {fileSizeOptions.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[styles.optionBtn, maxFileSize === opt && styles.optionBtnActive]}
              onPress={() => setMaxFileSize(opt)}
            >
              <Text style={[styles.optionText, maxFileSize === opt && styles.optionTextActive]}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Branding</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Enable Watermark</Text>
          <Switch value={enableWatermark} onValueChange={setEnableWatermark} />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Enable School Branding</Text>
          <Switch value={enableBranding} onValueChange={setEnableBranding} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>On Upload</Text>
          <Switch value={notifyOnUpload} onValueChange={setNotifyOnUpload} />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>On Comment</Text>
          <Switch value={notifyOnComment} onValueChange={setNotifyOnComment} />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>On Share</Text>
          <Switch value={notifyOnShare} onValueChange={setNotifyOnShare} />
        </View>
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Settings</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16, color: '#6b7280' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 10, textTransform: 'uppercase' },
  storageCard: { backgroundColor: '#fff', borderRadius: 8, padding: 16, elevation: 2 },
  storageHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  storageLabel: { fontSize: 14, color: '#6b7280' },
  storageValue: { fontSize: 14, fontWeight: '600', color: '#111827' },
  progressBar: { height: 8, backgroundColor: '#e5e7eb', borderRadius: 4, overflow: 'hidden', marginBottom: 6 },
  progressFill: { height: '100%', backgroundColor: '#3b82f6', borderRadius: 4 },
  storagePercent: { fontSize: 12, color: '#9ca3af' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, padding: 14, marginBottom: 6, elevation: 1 },
  settingLabel: { fontSize: 15, color: '#374151' },
  optionGroup: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16, backgroundColor: '#e5e7eb' },
  optionBtnActive: { backgroundColor: '#3b82f6' },
  optionText: { fontSize: 13, color: '#374151', textTransform: 'capitalize' },
  optionTextActive: { color: '#fff', fontWeight: '600' },
  saveBtn: { backgroundColor: '#3b82f6', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  errorText: { color: '#ef4444', fontSize: 16 },
});

export default DocumentSettingsScreen;
