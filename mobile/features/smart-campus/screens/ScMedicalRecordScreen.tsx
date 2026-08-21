import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface MedicalRecord {
  id: string;
  studentName: string;
  studentId: string;
  bloodType: string;
  allergies: string[];
  conditions: string[];
  emergencyContact: string;
  lastCheckup: string;
}

export const ScMedicalRecordScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<MedicalRecord[]>([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/smart-campus/medical/records');
      const json = await response.json();
      setRecords(json.data);
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
        <Text style={styles.headerTitle}>Medical Records</Text>
        <Text style={styles.headerCount}>{records.length} Records</Text>
      </View>

      {records.map((record) => (
        <View key={record.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.studentName}>{record.studentName}</Text>
            <Text style={styles.bloodType}>Blood: {record.bloodType}</Text>
          </View>
          <Text style={styles.studentId}>ID: {record.studentId}</Text>

          {record.allergies.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Allergies</Text>
              <View style={styles.tagContainer}>
                {record.allergies.map((allergy, index) => (
                  <View key={index} style={styles.allergyTag}>
                    <Text style={styles.allergyText}>{allergy}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {record.conditions.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Conditions</Text>
              <View style={styles.tagContainer}>
                {record.conditions.map((condition, index) => (
                  <View key={index} style={styles.conditionTag}>
                    <Text style={styles.conditionText}>{condition}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Emergency Contact</Text>
            <Text style={styles.infoValue}>{record.emergencyContact}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Last Checkup</Text>
            <Text style={styles.infoValue}>{record.lastCheckup}</Text>
          </View>
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
  bloodType: { fontSize: 14, color: '#dc3545', fontWeight: '600' },
  studentId: { fontSize: 14, color: '#666', marginBottom: 12 },
  section: { marginBottom: 12 },
  sectionLabel: { fontSize: 14, fontWeight: '500', marginBottom: 8 },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  allergyTag: {
    backgroundColor: '#f8d7da',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  allergyText: { fontSize: 12, color: '#721c24' },
  conditionTag: {
    backgroundColor: '#fff3cd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  conditionText: { fontSize: 12, color: '#856404' },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  infoLabel: { fontSize: 14, color: '#666' },
  infoValue: { fontSize: 14, fontWeight: '500' },
});
