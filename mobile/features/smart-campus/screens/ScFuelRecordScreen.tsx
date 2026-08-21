import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

interface FuelRecord {
  id: string;
  busName: string;
  date: string;
  liters: number;
  cost: number;
  mileage: number;
  fuelType: string;
  station: string;
}

export const ScFuelRecordScreen: React.FC<{ route: any }> = ({ route }) => {
  const { busId } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<FuelRecord[]>([]);

  useEffect(() => {
    fetchFuelRecords();
  }, [busId]);

  const fetchFuelRecords = async () => {
    try {
      const url = busId
        ? `/api/smart-campus/fuel-records?busId=${busId}`
        : '/api/smart-campus/fuel-records';
      const response = await fetch(url);
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

  const totalCost = records.reduce((sum, r) => sum + r.cost, 0);
  const totalLiters = records.reduce((sum, r) => sum + r.liters, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Fuel Summary</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{records.length}</Text>
            <Text style={styles.summaryLabel}>Records</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{totalLiters.toFixed(1)}</Text>
            <Text style={styles.summaryLabel}>Total Liters</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>${totalCost.toFixed(2)}</Text>
            <Text style={styles.summaryLabel}>Total Cost</Text>
          </View>
        </View>
      </View>

      {records.map((record) => (
        <View key={record.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.busName}>{record.busName}</Text>
            <Text style={styles.date}>{record.date}</Text>
          </View>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Liters</Text>
              <Text style={styles.detailValue}>{record.liters}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Cost</Text>
              <Text style={styles.detailValue}>${record.cost.toFixed(2)}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Mileage</Text>
              <Text style={styles.detailValue}>{record.mileage} km</Text>
            </View>
          </View>
          <Text style={styles.fuelType}>Fuel Type: {record.fuelType}</Text>
          <Text style={styles.station}>Station: {record.station}</Text>
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
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    elevation: 2,
  },
  summaryTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  summaryGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  summaryItem: { alignItems: 'center' },
  summaryValue: { fontSize: 20, fontWeight: '700' },
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
    marginBottom: 12,
  },
  busName: { fontSize: 16, fontWeight: '600' },
  date: { fontSize: 14, color: '#666' },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailItem: { alignItems: 'center' },
  detailLabel: { fontSize: 12, color: '#999' },
  detailValue: { fontSize: 14, fontWeight: '500' },
  fuelType: { fontSize: 14, color: '#666', marginBottom: 4 },
  station: { fontSize: 14, color: '#666' },
});
