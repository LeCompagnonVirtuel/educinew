import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface MedicalVisit {
  id: string;
  studentName: string;
  visitDate: string;
  reason: string;
  diagnosis: string;
  treatment: string;
  doctor: string;
  followUp: string | null;
  status: string;
}

export const ScMedicalVisitScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState<MedicalVisit[]>([]);

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    try {
      const response = await fetch('/api/smart-campus/medical/visits');
      const json = await response.json();
      setVisits(json.data);
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
        <Text style={styles.headerTitle}>Medical Visits</Text>
        <Text style={styles.headerCount}>{visits.length} Visits</Text>
      </View>

      {visits.map((visit) => (
        <View key={visit.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.studentName}>{visit.studentName}</Text>
            <View style={[styles.statusBadge, visit.status === 'completed' ? styles.statusCompleted : styles.statusPending]}>
              <Text style={styles.statusText}>{visit.status}</Text>
            </View>
          </View>
          <Text style={styles.visitDate}>{visit.visitDate}</Text>
          <View style={styles.section}>
            <Text style={styles.label}>Reason</Text>
            <Text style={styles.value}>{visit.reason}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Diagnosis</Text>
            <Text style={styles.value}>{visit.diagnosis}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Treatment</Text>
            <Text style={styles.value}>{visit.treatment}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Doctor</Text>
            <Text style={styles.infoValue}>{visit.doctor}</Text>
          </View>
          {visit.followUp && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Follow Up</Text>
              <Text style={styles.infoValue}>{visit.followUp}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
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
    marginBottom: 4,
  },
  studentName: { fontSize: 16, fontWeight: '600' },
  visitDate: { fontSize: 14, color: '#666', marginBottom: 12 },
  section: { marginBottom: 8 },
  label: { fontSize: 12, color: '#999', marginBottom: 2 },
  value: { fontSize: 14, color: '#333' },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  infoLabel: { fontSize: 14, color: '#666' },
  infoValue: { fontSize: 14, fontWeight: '500' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusCompleted: { backgroundColor: '#d4edda' },
  statusPending: { backgroundColor: '#fff3cd' },
  statusText: { fontSize: 12, fontWeight: '600' },
});
