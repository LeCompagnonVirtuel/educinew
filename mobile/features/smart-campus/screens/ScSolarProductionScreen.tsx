import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

export const ScSolarProductionScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [solarData, setSolarData] = useState<any>(null);

  useEffect(() => {
    fetchSolarData();
  }, []);

  const fetchSolarData = async () => {
    try {
      const response = await fetch('/api/smart-campus/environment/solar');
      const data = await response.json();
      setSolarData(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!solarData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No solar data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Solar Production Overview</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{solarData.totalProduction}</Text>
            <Text style={styles.statLabel}>Total kWh</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{solarData.currentOutput}</Text>
            <Text style={styles.statLabel}>Current kW</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{solarData.savings}</Text>
            <Text style={styles.statLabel}>Savings $</Text>
          </View>
        </View>
      </View>

      <View style={styles.panelSection}>
        <Text style={styles.sectionTitle}>Panel Status</Text>
        {solarData.panels.map((panel: any) => (
          <View key={panel.id} style={styles.panelItem}>
            <Text style={styles.panelName}>{panel.name}</Text>
            <Text style={styles.panelInfo}>Output: {panel.output}kW | Efficiency: {panel.efficiency}%</Text>
          </View>
        ))}
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Environmental Impact</Text>
        <Text style={styles.info}>CO2 Offset: {solarData.co2Offset} kg</Text>
        <Text style={styles.info}>Trees Equivalent: {solarData.treesEquivalent}</Text>
        <Text style={styles.info}>Grid Independence: {solarData.gridIndependence}%</Text>
      </View>
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
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  panelSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  panelItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  panelName: {
    fontSize: 14,
    fontWeight: '500',
  },
  panelInfo: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statsSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  info: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
});
