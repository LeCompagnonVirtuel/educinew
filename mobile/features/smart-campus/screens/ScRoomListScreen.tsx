import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScRoomListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/smart-campus/rooms');
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
          onPress={() => navigation.navigate('ScRoomDetail', { id: room.id })}
        >
          <View style={styles.roomHeader}>
            <Text style={styles.title}>{room.number}</Text>
            <View style={[styles.statusBadge, { backgroundColor: room.available ? '#4CAF50' : '#f44336' }]}>
              <Text style={styles.statusText}>{room.available ? 'Available' : 'Occupied'}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>{room.building}</Text>
          <Text style={styles.info}>{room.type} - Capacity: {room.capacity}</Text>
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
  roomHeader: {
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
  },
});
