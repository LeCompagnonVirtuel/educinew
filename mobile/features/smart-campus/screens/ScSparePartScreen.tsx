import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScSparePartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [spareParts, setSpareParts] = useState<any[]>([]);

  useEffect(() => {
    fetchSpareParts();
  }, []);

  const fetchSpareParts = async () => {
    try {
      const response = await fetch('/api/smart-campus/maintenance/spare-parts');
      const data = await response.json();
      setSpareParts(data.data);
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
      {spareParts.map((part) => (
        <TouchableOpacity
          key={part.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScSparePartDetail', { id: part.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{part.name}</Text>
            <View style={[styles.stockBadge, { backgroundColor: getStockColor(part.quantity, part.minStock) }]}>
              <Text style={styles.stockText}>{part.quantity < part.minStock ? 'Low Stock' : 'In Stock'}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Part: {part.partNumber}</Text>
          <Text style={styles.info}>Quantity: {part.quantity}</Text>
          <Text style={styles.info}>Min Stock: {part.minStock}</Text>
          <Text style={styles.info}>Unit Price: ${part.unitPrice}</Text>
          <Text style={styles.info}>Location: {part.storageLocation}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const getStockColor = (quantity: number, minStock: number) => {
  if (quantity <= 0) {
    return '#f44336';
  } else if (quantity < minStock) {
    return '#FF9800';
  } else {
    return '#4CAF50';
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
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stockText: {
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
