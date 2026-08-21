import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Vaccination {
  id: string;
  studentName: string;
  vaccineName: string;
  doseNumber: number;
  totalDoses: number;
  dateAdministered: string;
  nextDoseDate: string | null;
  administeredBy: string;
  batchNumber: string;
  status: string;
}

export const ScVaccinationScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);

  useEffect(() => {
    fetchVaccinations();
  }, []);

  const fetchVaccinations = async () => {
    try {
      const response = await fetch('/api/smart-campus/medical/vaccinations');
      const json = await response.json();
      setVaccinations(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const completed = vaccinations.filter((v) => v.status === 'completed').length;
  const pending = vaccinations.filter((v) => v.status === 'pending').length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Vaccination Summary</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{vaccinations.length}</Text>
            <Text style={styles.summaryLabel}>Total</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: '#28a745' }]}>{completed}</Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: '#ffc107' }]}>{pending}</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>
        </View>
      </View>

      {vaccinations.map((vax) => (
        <View key={vax.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.studentName}>{vax.studentName}</Text>
            <View style={[styles.statusBadge, vax.status === 'completed' ? styles.statusCompleted : styles.statusPending]}>
              <Text style={styles.statusText}>{vax.status}</Text>
            </View>
          </View>
          <Text style={styles.vaccineName}>{vax.vaccineName}</Text>
          <View style={styles.doseInfo}>
            <Text style={styles.doseText}>
              Dose {vax.doseNumber} of {vax.totalDoses}
            </Text>
            <View style={styles.doseIndicator}>
              {Array.from({ length: vax.totalDoses }).map((_, index) => (
                <View
                  key={index}
                  style={[styles.doseDot, index < vax.doseNumber && styles.doseDotFilled]}
                />
              ))}
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date Administered</Text>
            <Text style={styles.infoValue}>{vax.dateAdministered}</Text>
          </View>
          {vax.nextDoseDate && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Next Dose</Text>
              <Text style={styles.infoValue}>{vax.nextDoseDate}</Text>
            </View>
          )}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Administered By</Text>
            <Text style={styles.infoValue}>{vax.administeredBy}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Batch Number</Text>
            <Text style={styles.infoValue}>{vax.batchNumber}</Text>
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
  vaccineName: { fontSize: 14, color: '#666', marginBottom: 12 },
  doseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  doseText: { fontSize: 14, fontWeight: '500' },
  doseIndicator: { flexDirection: 'row', gap: 4 },
  doseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  doseDotFilled: { backgroundColor: '#28a745' },
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
