import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

export const ScEnergyMonitorScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [energyData, setEnergyData] = useState<any>(null);

  useEffect(() => {
    fetchEnergyData();
  }, []);

  const fetchEnergyData = async () => {
    try {
      const response = await fetch('/api/smart-campus/iot/energy');
      const data = await response.json();
      setEnergyData(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!energyData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No energy data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Energy Overview</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{energyData.totalConsumption}</Text>
            <Text style={styles.statLabel}>Total kWh</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{energyData.peakDemand}</Text>
            <Text style={styles.statLabel}>Peak kW</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{energyData.cost}</Text>
            <Text style={styles.statLabel}>Cost $</Text>
          </View>
        </View>
      </View>

      {energyData.buildings.map((building: any) => (
        <View key={building.id} style={styles.buildingCard}>
          <Text style={styles.buildingName}>{building.name}</Text>
          <Text style={styles.info}>Consumption: {building.consumption} kWh</Text>
          <Text style={styles.info}>Efficiency: {building.efficiency}%</Text>
          <Text style={styles.info}>Status: {building.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
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
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  buildingCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  buildingName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});
