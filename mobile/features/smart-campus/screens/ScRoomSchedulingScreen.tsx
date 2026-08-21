import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScRoomSchedulingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState<any[]>([]);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await fetch('/api/smart-campus/rooms/schedule');
      const data = await response.json();
      setSchedule(data.data);
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
      {schedule.map((slot) => (
        <TouchableOpacity
          key={slot.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScRoomScheduleDetail', { id: slot.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{slot.roomNumber}</Text>
            <View style={[styles.statusBadge, { backgroundColor: slot.available ? '#4CAF50' : '#f44336' }]}>
              <Text style={styles.statusText}>{slot.available ? 'Available' : 'Booked'}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Date: {slot.date}</Text>
          <Text style={styles.info}>Time: {slot.timeSlot}</Text>
          {slot.bookedBy && (
            <>
              <Text style={styles.info}>Booked By: {slot.bookedBy}</Text>
              <Text style={styles.info}>Event: {slot.eventName}</Text>
            </>
          )}
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
    marginBottom: 4,
  },
  info: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
});
