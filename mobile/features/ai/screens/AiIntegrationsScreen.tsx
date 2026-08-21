import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Switch } from 'react-native';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
  lastSync: string;
}

export const AiIntegrationsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [integrations, setIntegrations] = useState<Integration[]>([]);

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      const response = await fetch('/api/ai/integrations');
      const json = await response.json();
      setIntegrations(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id ? { ...integration, connected: !integration.connected } : integration
      )
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Intégrations</Text>
      <Text style={styles.subtitle}>Gérez vos connexions externes</Text>

      {integrations.map((integration) => (
        <View key={integration.id} style={[styles.integrationCard, !integration.connected && styles.disconnectedCard]}>
          <View style={styles.integrationHeader}>
            <Text style={styles.integrationIcon}>{integration.icon}</Text>
            <View style={styles.integrationInfo}>
              <Text style={styles.integrationName}>{integration.name}</Text>
              <Text style={styles.integrationDescription}>{integration.description}</Text>
            </View>
            <Switch
              value={integration.connected}
              onValueChange={() => toggleIntegration(integration.id)}
              trackColor={{ false: '#ccc', true: '#81c784' }}
            />
          </View>
          {integration.connected && (
            <Text style={styles.lastSync}>Dernière synchronisation : {integration.lastSync}</Text>
          )}
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
  integrationCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  disconnectedCard: { opacity: 0.7 },
  integrationHeader: { flexDirection: 'row', alignItems: 'center' },
  integrationIcon: { fontSize: 28, marginRight: 12 },
  integrationInfo: { flex: 1 },
  integrationName: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  integrationDescription: { fontSize: 13, color: '#666' },
  lastSync: { fontSize: 12, color: '#999', marginTop: 12, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 12 },
});
