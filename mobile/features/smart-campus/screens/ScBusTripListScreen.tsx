import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface BusTrip {
  id: string;
  busName: string;
  routeName: string;
  departureTime: string;
  arrivalTime: string;
  status: string;
  availableSeats: number;
}

export const ScBusTripListScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { routeId } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState<BusTrip[]>([]);

  useEffect(() => {
    fetchTrips();
  }, [routeId]);

  const fetchTrips = async () => {
    try {
      const url = routeId
        ? `/api/smart-campus/bus-trips?routeId=${routeId}`
        : '/api/smart-campus/bus-trips';
      const response = await fetch(url);
      const json = await response.json();
      setTrips(json.data);
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
      {trips.map((trip) => (
        <TouchableOpacity
          key={trip.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScBusDetail', { id: trip.id })}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{trip.busName}</Text>
            <View style={[styles.statusBadge, trip.status === 'scheduled' ? styles.statusScheduled : styles.statusDeparted]}>
              <Text style={styles.statusText}>{trip.status}</Text>
            </View>
          </View>
          <Text style={styles.routeName}>Route: {trip.routeName}</Text>
          <View style={styles.timeContainer}>
            <View style={styles.timeBlock}>
              <Text style={styles.timeLabel}>Departure</Text>
              <Text style={styles.timeValue}>{trip.departureTime}</Text>
            </View>
            <Text style={styles.timeArrow}>→</Text>
            <View style={styles.timeBlock}>
              <Text style={styles.timeLabel}>Arrival</Text>
              <Text style={styles.timeValue}>{trip.arrivalTime}</Text>
            </View>
          </View>
          <Text style={styles.seats}>Available Seats: {trip.availableSeats}</Text>
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
  routeName: { fontSize: 14, color: '#666', marginBottom: 8 },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeBlock: { flex: 1 },
  timeLabel: { fontSize: 12, color: '#999' },
  timeValue: { fontSize: 14, fontWeight: '500' },
  timeArrow: { fontSize: 16, color: '#007AFF', marginHorizontal: 8 },
  seats: { fontSize: 14, color: '#666' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusScheduled: { backgroundColor: '#d4edda' },
  statusDeparted: { backgroundColor: '#fff3cd' },
  statusText: { fontSize: 12, fontWeight: '600' },
});
