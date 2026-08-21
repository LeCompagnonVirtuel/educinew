import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScSensorDataScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [sensors, setSensors] = useState<any[]>([]);

  useEffect(() => {
    fetchSensorData();
  }, []);

  const fetchSensorData = async () => {
    try {
      const response = await fetch('/api/smart-campus/iot/sensors');
      const data = await response.json();
      setSensors(data.data);
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
      {sensors.map((sensor) => (
        <TouchableOpacity
          key={sensor.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScSensorDataDetail', { id: sensor.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{sensor.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getAlertColor(sensor.alertLevel) }]}>
              <Text style={styles.statusText}>{sensor.alertLevel}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Type: {sensor.type}</Text>
          <Text style={styles.info}>Current Value: {sensor.currentValue} {sensor.unit}</Text>
          <Text style={styles.info}>Min: {sensor.minValue} | Max: {sensor.maxValue}</Text>
          <Text style={styles.info}>Last Updated: {sensor.lastUpdated}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const getAlertColor = (level: string) => {
  switch (level.toLowerCase()) {
    case 'critical':
      return '#f44336';
    case 'warning':
      return '#FF9800';
    case 'normal':
      return '#4CAF50';
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
