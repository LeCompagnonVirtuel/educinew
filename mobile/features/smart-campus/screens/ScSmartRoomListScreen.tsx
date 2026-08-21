import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScSmartRoomListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/smart-campus/rooms/smart');
      const data = await response.json();
      setRooms(data.data);
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
      {rooms.map((room) => (
        <TouchableOpacity
          key={room.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScSmartRoomDetail', { id: room.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{room.number}</Text>
            <View style={[styles.statusBadge, { backgroundColor: room.occupied ? '#f44336' : '#4CAF50' }]}>
              <Text style={styles.statusText}>{room.occupied ? 'Occupied' : 'Available'}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>{room.building}</Text>
          <View style={styles.featuresRow}>
            <Text style={[styles.feature, { color: room.lights ? '#4CAF50' : '#f44336' }]}>
              Lights: {room.lights ? 'ON' : 'OFF'}
            </Text>
            <Text style={[styles.feature, { color: room.ac ? '#4CAF50' : '#f44336' }]}>
              AC: {room.ac ? 'ON' : 'OFF'}
            </Text>
          </View>
          <Text style={styles.info}>Temperature: {room.temperature}°C</Text>
          <Text style={styles.info}>Occupancy: {room.occupancy}/{room.capacity}</Text>
        </TouchableOpacity>
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
    marginBottom: 8,
  },
  featuresRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  feature: {
    fontSize: 12,
    fontWeight: '500',
    marginRight: 12,
  },
  info: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
});
