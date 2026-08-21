import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScGuardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [guards, setGuards] = useState<any[]>([]);

  useEffect(() => {
    fetchGuards();
  }, []);

  const fetchGuards = async () => {
    try {
      const response = await fetch('/api/smart-campus/security/guards');
      const data = await response.json();
      setGuards(data.data);
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
      {guards.map((guard) => (
        <TouchableOpacity
          key={guard.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScGuardDetail', { id: guard.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{guard.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: guard.onDuty ? '#4CAF50' : '#9E9E9E' }]}>
              <Text style={styles.statusText}>{guard.onDuty ? 'On Duty' : 'Off Duty'}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Badge: {guard.badgeNumber}</Text>
          <Text style={styles.info}>Current Post: {guard.currentPost}</Text>
          <Text style={styles.info}>Shift: {guard.shift}</Text>
          <Text style={styles.info}>Check-in Time: {guard.checkInTime}</Text>
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
