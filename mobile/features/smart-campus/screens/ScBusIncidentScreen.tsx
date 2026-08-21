import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Incident {
  id: string;
  busName: string;
  type: string;
  description: string;
  date: string;
  time: string;
  location: string;
  severity: string;
  status: string;
  reportedBy: string;
}

export const ScBusIncidentScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { busId } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    fetchIncidents();
  }, [busId]);

  const fetchIncidents = async () => {
    try {
      const url = busId
        ? `/api/smart-campus/bus-incidents?busId=${busId}`
        : '/api/smart-campus/bus-incidents';
      const response = await fetch(url);
      const json = await response.json();
      setIncidents(json.data);
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bus Incidents</Text>
        <Text style={styles.headerCount}>{incidents.length} Reports</Text>
      </View>

      {incidents.map((incident) => (
        <TouchableOpacity
          key={incident.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScBusIncidentDetail', { id: incident.id })}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.busName}>{incident.busName}</Text>
            <View style={[styles.severityBadge, getSeverityStyle(incident.severity)]}>
              <Text style={styles.severityText}>{incident.severity}</Text>
            </View>
          </View>
          <Text style={styles.type}>{incident.type}</Text>
          <Text style={styles.description}>{incident.description}</Text>
          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>{incident.date} {incident.time}</Text>
            <Text style={styles.detailText}>{incident.location}</Text>
          </View>
          <View style={styles.footerRow}>
            <Text style={styles.reportedBy}>Reported by: {incident.reportedBy}</Text>
            <View style={[styles.statusBadge, incident.status === 'resolved' ? styles.statusResolved : styles.statusOpen]}>
              <Text style={styles.statusText}>{incident.status}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const getSeverityStyle = (severity: string) => {
  switch (severity) {
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
  header: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  headerCount: { fontSize: 14, color: '#666' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  busName: { fontSize: 16, fontWeight: '600' },
  type: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
  description: { fontSize: 14, color: '#666', marginBottom: 8 },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailText: { fontSize: 14, color: '#666' },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportedBy: { fontSize: 14, color: '#666' },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityHigh: { backgroundColor: '#f8d7da' },
  severityMedium: { backgroundColor: '#fff3cd' },
  severityLow: { backgroundColor: '#d4edda' },
  severityText: { fontSize: 12, fontWeight: '600' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusOpen: { backgroundColor: '#fff3cd' },
  statusResolved: { backgroundColor: '#d4edda' },
  statusText: { fontSize: 12, fontWeight: '600' },
});
