import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface BusRoute {
  id: string;
  name: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  duration: string;
  stops: number;
}

export const ScBusRouteListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [routes, setRoutes] = useState<BusRoute[]>([]);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await fetch('/api/smart-campus/bus-routes');
      const json = await response.json();
      setRoutes(json.data);
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
      {routes.map((route) => (
        <TouchableOpacity
          key={route.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScBusTripList', { routeId: route.id })}
        >
          <Text style={styles.title}>{route.name}</Text>
          <View style={styles.routeInfo}>
            <Text style={styles.routeText}>{route.startLocation}</Text>
            <Text style={styles.arrow}>→</Text>
            <Text style={styles.routeText}>{route.endLocation}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailText}>Distance: {route.distance} km</Text>
            <Text style={styles.detailText}>Duration: {route.duration}</Text>
            <Text style={styles.detailText}>Stops: {route.stops}</Text>
          </View>
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
  title: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeText: { fontSize: 14, color: '#333' },
  arrow: { fontSize: 16, color: '#007AFF', marginHorizontal: 8 },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: { fontSize: 12, color: '#666' },
});
