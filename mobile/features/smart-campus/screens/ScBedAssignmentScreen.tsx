import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScBedAssignmentScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await fetch('/api/smart-campus/bed-assignments');
      const data = await response.json();
      setAssignments(data.data);
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
      {assignments.map((assignment) => (
        <TouchableOpacity
          key={assignment.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScBedAssignmentDetail', { id: assignment.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{assignment.studentName}</Text>
            <View style={[styles.statusBadge, { backgroundColor: assignment.active ? '#4CAF50' : '#f44336' }]}>
              <Text style={styles.statusText}>{assignment.active ? 'Active' : 'Inactive'}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Room {assignment.roomNumber} - Bed {assignment.bedNumber}</Text>
          <Text style={styles.info}>Building: {assignment.buildingName}</Text>
          <Text style={styles.info}>Check-in: {assignment.checkInDate}</Text>
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
