import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScSecurityIncidentScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState<any[]>([]);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await fetch('/api/smart-campus/security/incidents');
      const data = await response.json();
      setIncidents(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      {incidents.map((incident) => (
        <TouchableOpacity
          key={incident.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScSecurityIncidentDetail', { id: incident.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{incident.title}</Text>
            <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(incident.severity) }]}>
              <Text style={styles.severityText}>{incident.severity}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Incident: {incident.incidentNumber}</Text>
          <Text style={styles.info}>Location: {incident.location}</Text>
          <Text style={styles.info}>Reported By: {incident.reportedBy}</Text>
          <Text style={styles.info}>Date: {incident.reportedAt}</Text>
          <Text style={styles.info}>Status: {incident.status}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return '#b71c1c';
    case 'high':
      return '#f44336';
    case 'medium':
      return '#FF9800';
    case 'low':
      return '#4CAF50';
    default:
      return '#9E9E9E';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  info: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
});
