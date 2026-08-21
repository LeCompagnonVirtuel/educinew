import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

export const ScBuildingDetailScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [building, setBuilding] = useState<any>(null);
  const { id } = route.params;

  useEffect(() => {
    fetchBuildingDetail();
  }, [id]);

  const fetchBuildingDetail = async () => {
    try {
      const response = await fetch(`/api/smart-campus/buildings/${id}`);
      const data = await response.json();
      setBuilding(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!building) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Building not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{building.name}</Text>
        <Text style={styles.subtitle}>{building.location}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{building.totalRooms}</Text>
            <Text style={styles.statLabel}>Rooms</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{building.occupiedRooms}</Text>
            <Text style={styles.statLabel}>Occupied</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{building.availableRooms}</Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Energy Usage</Text>
        <Text style={styles.info}>{building.energyUsage} kWh</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Maintenance Status</Text>
        <Text style={styles.info}>{building.maintenanceStatus}</Text>
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
  header: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
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
  statRow: {
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
  info: {
    fontSize: 14,
    color: '#333',
  },
});
