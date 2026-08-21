import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScRoomReservationScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch('/api/smart-campus/rooms/reservations');
      const data = await response.json();
      setReservations(data.data);
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
      {reservations.map((reservation) => (
        <TouchableOpacity
          key={reservation.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScRoomReservationDetail', { id: reservation.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{reservation.roomNumber}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(reservation.status) }]}>
              <Text style={styles.statusText}>{reservation.status}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Event: {reservation.eventName}</Text>
          <Text style={styles.info}>Date: {reservation.date}</Text>
          <Text style={styles.info}>Time: {reservation.startTime} - {reservation.endTime}</Text>
          <Text style={styles.info}>Organizer: {reservation.organizer}</Text>
          <Text style={styles.info}>Attendees: {reservation.attendeeCount}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return '#4CAF50';
    case 'pending':
      return '#FF9800';
    case 'cancelled':
      return '#f44336';
    case 'completed':
      return '#2196F3';
    default:
      return '#9E9E9E';
  }
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
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  info: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
});
