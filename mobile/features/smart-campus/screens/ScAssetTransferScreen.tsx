import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScAssetTransferScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [transfers, setTransfers] = useState<any[]>([]);

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      const response = await fetch('/api/smart-campus/assets/transfers');
      const data = await response.json();
      setTransfers(data.data);
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
      {transfers.map((transfer) => (
        <TouchableOpacity
          key={transfer.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScAssetTransferDetail', { id: transfer.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{transfer.assetName}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transfer.status) }]}>
              <Text style={styles.statusText}>{transfer.status}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Transfer Code: {transfer.transferCode}</Text>
          <Text style={styles.info}>From: {transfer.fromLocation}</Text>
          <Text style={styles.info}>To: {transfer.toLocation}</Text>
          <Text style={styles.info}>Date: {transfer.transferDate}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return '#4CAF50';
    case 'pending':
      return '#FF9800';
    case 'in transit':
      return '#2196F3';
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
