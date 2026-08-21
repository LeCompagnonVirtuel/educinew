import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScTechnicianScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [technicians, setTechnicians] = useState<any[]>([]);

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const fetchTechnicians = async () => {
    try {
      const response = await fetch('/api/smart-campus/maintenance/technicians');
      const data = await response.json();
      setTechnicians(data.data);
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
      {technicians.map((tech) => (
        <TouchableOpacity
          key={tech.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScTechnicianDetail', { id: tech.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{tech.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: tech.available ? '#4CAF50' : '#FF9800' }]}>
              <Text style={styles.statusText}>{tech.available ? 'Available' : 'Busy'}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Specialization: {tech.specialization}</Text>
          <Text style={styles.info}>Active Tickets: {tech.activeTickets}</Text>
          <Text style={styles.info}>Completed Today: {tech.completedToday}</Text>
          <Text style={styles.info}>Rating: {tech.rating}/5</Text>
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
