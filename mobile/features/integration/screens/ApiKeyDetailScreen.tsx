import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ApiKeyDetailScreen() {
  const [apiKey, setApiKey] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadApiKey();
  }, [id]);

  const loadApiKey = async () => {
    try {
      const response = await fetch(`/api/integration/api-keys/${id}`);
      const json = await response.json();
      setApiKey(json.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!apiKey) return <View style={styles.center}><Text>API key not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{apiKey.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: apiKey.isActive ? '#4CAF50' : '#FF9800' }]}>
          <Text style={styles.statusText}>{apiKey.isActive ? 'Active' : 'Inactive'}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Information</Text>
        <Text style={styles.detail}>Key Prefix: {apiKey.keyPrefix}</Text>
        <Text style={styles.detail}>Scope: {apiKey.scope}</Text>
        <Text style={styles.detail}>Description: {apiKey.description}</Text>
        <Text style={styles.detail}>Created: {apiKey.createdAt}</Text>
        <Text style={styles.detail}>Expires: {apiKey.expiresAt || 'Never'}</Text>
        <Text style={styles.detail}>Last Used: {apiKey.lastUsedAt || 'Never'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Permissions</Text>
        {apiKey.permissions && apiKey.permissions.map((permission: string, index: number) => (
          <View key={index} style={styles.permissionItem}>
            <Text style={styles.permissionText}>{permission}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Usage Statistics</Text>
        <Text style={styles.detail}>Total Requests: {apiKey.usage?.totalRequests || 0}</Text>
        <Text style={styles.detail}>Requests Today: {apiKey.usage?.requestsToday || 0}</Text>
        <Text style={styles.detail}>Rate Limit: {apiKey.rateLimit || 'Unlimited'}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push(`/integration/api-keys/${id}/edit`)}>
          <Text style={styles.actionButtonText}>Edit Key</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.warningButton]} onPress={() => router.push(`/integration/api-keys/${id}/regenerate`)}>
          <Text style={styles.actionButtonText}>Regenerate Key</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.dangerButton]} onPress={() => router.push(`/integration/api-keys/${id}/delete`)}>
          <Text style={styles.actionButtonText}>Delete Key</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', flex: 1 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  statusText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  section: { backgroundColor: '#fff', margin: 8, padding: 16, borderRadius: 8, elevation: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  detail: { fontSize: 14, color: '#333', marginBottom: 8 },
  permissionItem: { backgroundColor: '#f0f0f0', padding: 8, borderRadius: 4, marginBottom: 4 },
  permissionText: { fontSize: 14, color: '#333' },
  actions: { padding: 16 },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  warningButton: { backgroundColor: '#FF9500' },
  dangerButton: { backgroundColor: '#FF3B30' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});