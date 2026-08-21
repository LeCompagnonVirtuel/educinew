import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScVisitorHistoryScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/smart-campus/visitors/history');
      const data = await response.json();
      setHistory(data.data);
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
      {history.map((record) => (
        <TouchableOpacity
          key={record.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScVisitorDetail', { id: record.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{record.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(record.status) }]}>
              <Text style={styles.statusText}>{record.status}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>{record.purpose}</Text>
          <Text style={styles.info}>Visit Date: {record.visitDate}</Text>
          <Text style={styles.info}>Check-in: {record.checkInTime}</Text>
          <Text style={styles.info}>Check-out: {record.checkOutTime || 'N/A'}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return '#4CAF50';
    case 'cancelled':
      return '#f44336';
    case 'pending':
      return '#FF9800';
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
