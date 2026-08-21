import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function DeveloperAppDetailScreen() {
  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadApp();
  }, [id]);

  const loadApp = async () => {
    try {
      const response = await fetch(`/api/integration/developer/apps/${id}`);
      const json = await response.json();
      setApp(json.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!app) return <View style={styles.center}><Text>App not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{app.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: app.status === 'active' ? '#4CAF50' : '#FF9800' }]}>
          <Text style={styles.statusText}>{app.status}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.detail}>Type: {app.type}</Text>
        <Text style={styles.detail}>Description: {app.description}</Text>
        <Text style={styles.detail}>Created: {app.createdAt}</Text>
        <Text style={styles.detail}>Last Updated: {app.updatedAt}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>API Credentials</Text>
        <Text style={styles.credential}>Client ID: {app.clientId}</Text>
        <Text style={styles.credential}>Client Secret: {app.clientSecret ? '••••••••' : 'Not set'}</Text>
        <Text style={styles.credential}>Redirect URI: {app.redirectUri}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Permissions</Text>
        {app.permissions && app.permissions.map((permission: string, index: number) => (
          <View key={index} style={styles.permissionItem}>
            <Text style={styles.permissionText}>{permission}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Usage Statistics</Text>
        <Text style={styles.detail}>Total API Calls: {app.apiCallCount}</Text>
        <Text style={styles.detail}>API Calls Today: {app.apiCallsToday}</Text>
        <Text style={styles.detail}>Active Users: {app.userCount}</Text>
        <Text style={styles.detail}>Rate Limit: {app.rateLimit} req/min</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push(`/integration/developer/apps/${id}/edit`)}>
          <Text style={styles.actionButtonText}>Edit App</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.warningButton]} onPress={() => router.push(`/integration/developer/apps/${id}/regenerate-secret`)}>
          <Text style={styles.actionButtonText}>Regenerate Secret</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.dangerButton]} onPress={() => router.push(`/integration/developer/apps/${id}/delete`)}>
          <Text style={styles.actionButtonText}>Delete App</Text>
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
  credential: { fontSize: 14, color: '#666', marginBottom: 8, fontFamily: 'monospace' },
  permissionItem: { backgroundColor: '#f0f0f0', padding: 8, borderRadius: 4, marginBottom: 4 },
  permissionText: { fontSize: 14, color: '#333' },
  actions: { padding: 16 },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  warningButton: { backgroundColor: '#FF9500' },
  dangerButton: { backgroundColor: '#FF3B30' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});