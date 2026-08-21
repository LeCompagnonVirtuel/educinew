import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScWasteManagementScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [wasteData, setWasteData] = useState<any[]>([]);

  useEffect(() => {
    fetchWasteData();
  }, []);

  const fetchWasteData = async () => {
    try {
      const response = await fetch('/api/smart-campus/environment/waste');
      const data = await response.json();
      setWasteData(data.data);
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
      {wasteData.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScWasteManagementDetail', { id: item.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{item.area}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Bin Type: {item.binType}</Text>
          <Text style={styles.info}>Capacity: {item.capacity}L</Text>
          <Text style={styles.info}>Current Level: {item.currentLevel}%</Text>
          <Text style={styles.info}>Last Collected: {item.lastCollected}</Text>
          <Text style={styles.info}>Next Collection: {item.nextCollection}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'empty':
      return '#4CAF50';
    case 'partial':
      return '#FF9800';
    case 'full':
      return '#f44336';
    case 'overflowing':
      return '#b71c1c';
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
