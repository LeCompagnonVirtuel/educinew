import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

interface BusDetail {
  id: string;
  name: string;
  plateNumber: string;
  route: string;
  status: string;
  capacity: number;
  currentPassengers: number;
  driver: string;
  driverPhone: string;
  lastMaintenance: string;
  nextMaintenance: string;
}

export const ScBusDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [bus, setBus] = useState<BusDetail | null>(null);

  useEffect(() => {
    fetchBusDetail();
  }, [id]);

  const fetchBusDetail = async () => {
    try {
      const response = await fetch(`/api/smart-campus/buses/${id}`);
      const json = await response.json();
      setBus(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!bus) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Bus not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{bus.name}</Text>
        <View style={[styles.statusBadge, bus.status === 'active' ? styles.statusActive : styles.statusInactive]}>
          <Text style={styles.statusText}>{bus.status}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bus Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Plate Number</Text>
          <Text style={styles.value}>{bus.plateNumber}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Route</Text>
          <Text style={styles.value}>{bus.route}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Capacity</Text>
          <Text style={styles.value}>{bus.currentPassengers}/{bus.capacity}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Driver Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Driver Name</Text>
          <Text style={styles.value}>{bus.driver}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{bus.driverPhone}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Maintenance</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Last Maintenance</Text>
          <Text style={styles.value}>{bus.lastMaintenance}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Next Maintenance</Text>
          <Text style={styles.value}>{bus.nextMaintenance}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 40 },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    padding: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: { fontSize: 14, color: '#666' },
  value: { fontSize: 14, fontWeight: '500' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: { backgroundColor: '#d4edda' },
  statusInactive: { backgroundColor: '#f8d7da' },
  statusText: { fontSize: 12, fontWeight: '600' },
});
