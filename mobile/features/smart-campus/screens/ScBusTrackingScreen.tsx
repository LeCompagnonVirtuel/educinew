import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

interface BusLocation {
  id: string;
  busName: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  lastUpdated: string;
}

export const ScBusTrackingScreen: React.FC<{ route: any }> = ({ route }) => {
  const { busId } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<BusLocation | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchLocation();
    const interval = setInterval(fetchLocation, 10000);
    return () => clearInterval(interval);
  }, [busId]);

  const fetchLocation = async () => {
    try {
      const response = await fetch(`/api/smart-campus/buses/${busId || 'current'}/location`);
      const json = await response.json();
      setLocation(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchLocation();
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Location data unavailable</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Map View</Text>
        <Text style={styles.coordinates}>
          {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
        </Text>
      </View>

      <View style={styles.infoPanel}>
        <Text style={styles.busName}>{location.busName}</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Speed</Text>
            <Text style={styles.infoValue}>{location.speed} km/h</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Heading</Text>
            <Text style={styles.infoValue}>{location.heading}°</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Last Updated</Text>
            <Text style={styles.infoValue}>{location.lastUpdated}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <Text style={styles.refreshButtonText}>
            {refreshing ? 'Refreshing...' : 'Refresh Location'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 40 },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: { fontSize: 18, color: '#666', marginBottom: 8 },
  coordinates: { fontSize: 14, color: '#999' },
  infoPanel: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  busName: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: { flex: 1, alignItems: 'center' },
  infoLabel: { fontSize: 12, color: '#999', marginBottom: 4 },
  infoValue: { fontSize: 14, fontWeight: '500' },
  refreshButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  refreshButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
