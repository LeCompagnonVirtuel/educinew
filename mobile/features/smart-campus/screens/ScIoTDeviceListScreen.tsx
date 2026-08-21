import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScIoTDeviceListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState<any[]>([]);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await fetch('/api/smart-campus/iot/devices');
      const data = await response.json();
      setDevices(data.data);
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
      {devices.map((device) => (
        <TouchableOpacity
          key={device.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScIoTDeviceDetail', { id: device.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{device.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: device.online ? '#4CAF50' : '#f44336' }]}>
              <Text style={styles.statusText}>{device.online ? 'Online' : 'Offline'}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Type: {device.type}</Text>
          <Text style={styles.info}>Location: {device.location}</Text>
          <Text style={styles.info}>Last Ping: {device.lastPing}</Text>
          <Text style={styles.info}>Battery: {device.batteryLevel}%</Text>
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
