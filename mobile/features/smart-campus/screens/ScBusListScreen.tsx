import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Bus {
  id: string;
  name: string;
  plateNumber: string;
  route: string;
  status: string;
  capacity: number;
  currentPassengers: number;
}

export const ScBusListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [buses, setBuses] = useState<Bus[]>([]);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await fetch('/api/smart-campus/buses');
      const json = await response.json();
      setBuses(json.data);
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
      {buses.map((bus) => (
        <TouchableOpacity
          key={bus.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScBusDetail', { id: bus.id })}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{bus.name}</Text>
            <View style={[styles.statusBadge, bus.status === 'active' ? styles.statusActive : styles.statusInactive]}>
              <Text style={styles.statusText}>{bus.status}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Plate: {bus.plateNumber}</Text>
          <Text style={styles.route}>Route: {bus.route}</Text>
          <Text style={styles.capacity}>
            Passengers: {bus.currentPassengers}/{bus.capacity}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 4 },
  route: { fontSize: 14, color: '#666', marginBottom: 4 },
  capacity: { fontSize: 14, color: '#666' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: { backgroundColor: '#d4edda' },
  statusInactive: { backgroundColor: '#f8d7da' },
  statusText: { fontSize: 12, fontWeight: '600' },
});
