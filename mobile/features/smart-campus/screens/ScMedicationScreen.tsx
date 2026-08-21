import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Medication {
  id: string;
  studentName: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string | null;
  prescribedBy: string;
  instructions: string;
  status: string;
}

export const ScMedicationScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const response = await fetch('/api/smart-campus/medical/medications');
      const json = await response.json();
      setMedications(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const active = medications.filter((m) => m.status === 'active').length;
  const completed = medications.filter((m) => m.status === 'completed').length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Medication Overview</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{medications.length}</Text>
            <Text style={styles.summaryLabel}>Total</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: '#28a745' }]}>{active}</Text>
            <Text style={styles.summaryLabel}>Active</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: '#6c757d' }]}>{completed}</Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>
        </View>
      </View>

      {medications.map((med) => (
        <View key={med.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.studentName}>{med.studentName}</Text>
            <View style={[styles.statusBadge, med.status === 'active' ? styles.statusActive : styles.statusCompleted]}>
              <Text style={styles.statusText}>{med.status}</Text>
            </View>
          </View>
          <Text style={styles.medName}>{med.medicationName}</Text>
          <View style={styles.dosageInfo}>
            <Text style={styles.dosageText}>Dosage: {med.dosage}</Text>
            <Text style={styles.frequencyText}>Frequency: {med.frequency}</Text>
          </View>
          <View style={styles.dateRow}>
            <View style={styles.dateBlock}>
              <Text style={styles.dateLabel}>Start Date</Text>
              <Text style={styles.dateValue}>{med.startDate}</Text>
            </View>
            <View style={styles.dateBlock}>
              <Text style={styles.dateLabel}>End Date</Text>
              <Text style={styles.dateValue}>{med.endDate || 'Ongoing'}</Text>
            </View>
          </View>
          <Text style={styles.instructions}>Instructions: {med.instructions}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Prescribed By</Text>
            <Text style={styles.infoValue}>{med.prescribedBy}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 2,
  },
  summaryTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  summaryGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  summaryItem: { alignItems: 'center' },
  summaryValue: { fontSize: 24, fontWeight: '700' },
  summaryLabel: { fontSize: 12, color: '#666', marginTop: 4 },
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
  medName: { fontSize: 14, color: '#007AFF', fontWeight: '500', marginBottom: 8 },
  dosageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dosageText: { fontSize: 14, color: '#666' },
  frequencyText: { fontSize: 14, color: '#666' },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateBlock: { flex: 1 },
  dateLabel: { fontSize: 12, color: '#999', marginBottom: 2 },
  dateValue: { fontSize: 14, fontWeight: '500' },
  instructions: { fontSize: 14, color: '#666', marginBottom: 8 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
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
  statusActive: { backgroundColor: '#d4edda' },
  statusCompleted: { backgroundColor: '#e2e3e5' },
  statusText: { fontSize: 12, fontWeight: '600' },
});
