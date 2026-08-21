import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScWorkOrderScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [workOrders, setWorkOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  const fetchWorkOrders = async () => {
    try {
      const response = await fetch('/api/smart-campus/maintenance/work-orders');
      const data = await response.json();
      setWorkOrders(data.data);
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
      {workOrders.map((order) => (
        <TouchableOpacity
          key={order.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScWorkOrderDetail', { id: order.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{order.title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
              <Text style={styles.statusText}>{order.status}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Order: {order.orderNumber}</Text>
          <Text style={styles.info}>Type: {order.type}</Text>
          <Text style={styles.info}>Scheduled: {order.scheduledDate}</Text>
          <Text style={styles.info}>Estimated Cost: ${order.estimatedCost}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return '#4CAF50';
    case 'in progress':
      return '#2196F3';
    case 'pending':
      return '#FF9800';
    case 'on hold':
      return '#9E9E9E';
    case 'cancelled':
      return '#f44336';
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
    flex: 1,
    marginRight: 8,
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
