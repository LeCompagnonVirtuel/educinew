import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

interface Reservation {
  id: string;
  bookTitle: string;
  reservedBy: string;
  reservedAt: string;
  expiresAt: string;
  status: string;
  queuePosition: number;
}

export const ScBookReservationScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { bookId } = route.params;
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetchReservations();
  }, [bookId]);

  const fetchReservations = async () => {
    try {
      const response = await fetch(`/api/smart-campus/library/reservations?bookId=${bookId}`);
      const json = await response.json();
      setReservations(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async () => {
    try {
      await fetch('/api/smart-campus/library/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId }),
      });
      Alert.alert('Success', 'Book reserved successfully');
      fetchReservations();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to reserve book');
    }
  };

  const handleCancel = (reservationId: string) => {
    Alert.alert(
      'Cancel Reservation',
      'Are you sure you want to cancel this reservation?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              await fetch(`/api/smart-campus/library/reservations/${reservationId}`, {
                method: 'DELETE',
              });
              fetchReservations();
            } catch (error) {
              console.error(error);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reservations</Text>
        <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
          <Text style={styles.reserveButtonText}>New Reservation</Text>
        </TouchableOpacity>
      </View>

      {reservations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No reservations yet</Text>
        </View>
      ) : (
        reservations.map((reservation) => (
          <View key={reservation.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.bookTitle}>{reservation.bookTitle}</Text>
              <View style={[styles.statusBadge, getStatusStyle(reservation.status)]}>
                <Text style={styles.statusText}>{reservation.status}</Text>
              </View>
            </View>
            <Text style={styles.reservedBy}>Reserved by: {reservation.reservedBy}</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.detailText}>Reserved: {reservation.reservedAt}</Text>
              <Text style={styles.detailText}>Expires: {reservation.expiresAt}</Text>
            </View>
            <View style={styles.queueInfo}>
              <Text style={styles.queueText}>Queue Position: #{reservation.queuePosition}</Text>
            </View>
            {reservation.status === 'pending' && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancel(reservation.id)}
              >
                <Text style={styles.cancelButtonText}>Cancel Reservation</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'ready':
      return styles.statusReady;
    case 'pending':
      return styles.statusPending;
    case 'expired':
      return styles.statusExpired;
    default:
      return styles.statusPending;
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: { fontSize: 16, color: '#666' },
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
  bookTitle: { fontSize: 16, fontWeight: '600', flex: 1 },
  reservedBy: { fontSize: 14, color: '#666', marginBottom: 8 },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailText: { fontSize: 14, color: '#666' },
  queueInfo: { marginBottom: 12 },
  queueText: { fontSize: 14, color: '#007AFF', fontWeight: '500' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusReady: { backgroundColor: '#d4edda' },
  statusPending: { backgroundColor: '#fff3cd' },
  statusExpired: { backgroundColor: '#f8d7da' },
  statusText: { fontSize: 12, fontWeight: '600' },
  reserveButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  reserveButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
