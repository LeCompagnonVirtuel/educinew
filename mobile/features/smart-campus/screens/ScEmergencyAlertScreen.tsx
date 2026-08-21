import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

interface EmergencyAlert {
  id: string;
  title: string;
  message: string;
  type: string;
  severity: string;
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
  targetAudience: string;
}

export const ScEmergencyAlertScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch('/api/smart-campus/emergency-alerts');
      const json = await response.json();
      setAlerts(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcknowledge = (alertId: string) => {
    Alert.alert(
      'Acknowledge Alert',
      'Are you sure you want to acknowledge this alert?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Acknowledge',
          onPress: async () => {
            try {
              await fetch(`/api/smart-campus/emergency-alerts/${alertId}/acknowledge`, {
                method: 'POST',
              });
              fetchAlerts();
            } catch (error) {
              console.error(error);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const activeAlerts = alerts.filter((a) => a.isActive);
  const pastAlerts = alerts.filter((a) => !a.isActive);

  return (
    <ScrollView style={styles.container}>
      {activeAlerts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Alerts</Text>
          {activeAlerts.map((alert) => (
            <View key={alert.id} style={[styles.card, styles.activeCard]}>
              <View style={styles.cardHeader}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <View style={[styles.severityBadge, getSeverityStyle(alert.severity)]}>
                  <Text style={styles.severityText}>{alert.severity}</Text>
                </View>
              </View>
              <Text style={styles.alertMessage}>{alert.message}</Text>
              <View style={styles.detailsRow}>
                <Text style={styles.detailText}>Type: {alert.type}</Text>
                <Text style={styles.detailText}>Audience: {alert.targetAudience}</Text>
              </View>
              <Text style={styles.timestamp}>Created: {alert.createdAt}</Text>
              <Text style={styles.expires}>Expires: {alert.expiresAt}</Text>
              <TouchableOpacity
                style={styles.acknowledgeButton}
                onPress={() => handleAcknowledge(alert.id)}
              >
                <Text style={styles.acknowledgeButtonText}>Acknowledge</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {pastAlerts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Alerts</Text>
          {pastAlerts.map((alert) => (
            <View key={alert.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <View style={[styles.severityBadge, styles.severityLow]}>
                  <Text style={styles.severityText}>Inactive</Text>
                </View>
              </View>
              <Text style={styles.alertMessage}>{alert.message}</Text>
              <Text style={styles.timestamp}>Created: {alert.createdAt}</Text>
            </View>
          ))}
        </View>
      )}

      {alerts.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No emergency alerts</Text>
        </View>
      )}
    </ScrollView>
  );
};

const getSeverityStyle = (severity: string) => {
  switch (severity) {
    case 'critical':
      return styles.severityCritical;
    case 'high':
      return styles.severityHigh;
    case 'medium':
      return styles.severityMedium;
    default:
      return styles.severityLow;
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  section: { marginTop: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  activeCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: { fontSize: 16, fontWeight: '600', flex: 1 },
  alertMessage: { fontSize: 14, color: '#666', marginBottom: 8 },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailText: { fontSize: 14, color: '#666' },
  timestamp: { fontSize: 12, color: '#999', marginBottom: 4 },
  expires: { fontSize: 12, color: '#999', marginBottom: 12 },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  severityCritical: { backgroundColor: '#dc3545' },
  severityHigh: { backgroundColor: '#f8d7da' },
  severityMedium: { backgroundColor: '#fff3cd' },
  severityLow: { backgroundColor: '#d4edda' },
  severityText: { fontSize: 12, fontWeight: '600', color: '#fff' },
  acknowledgeButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  acknowledgeButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: { fontSize: 16, color: '#666' },
});
