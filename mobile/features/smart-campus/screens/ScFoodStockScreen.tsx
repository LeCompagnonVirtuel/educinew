import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

interface StockItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  lastUpdated: string;
}

export const ScFoodStockScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const response = await fetch('/api/smart-campus/canteen/stock');
      const json = await response.json();
      setStockItems(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (item: StockItem) => {
    const percentage = (item.currentStock / item.maxStock) * 100;
    if (percentage <= 20) return '#dc3545';
    if (percentage <= 50) return '#ffc107';
    return '#28a745';
  };

  const getStatusLabel = (item: StockItem) => {
    const percentage = (item.currentStock / item.maxStock) * 100;
    if (percentage <= 20) return 'Critical';
    if (percentage <= 50) return 'Low';
    return 'Good';
  };

  const filteredItems = filter === 'all'
    ? stockItems
    : stockItems.filter((item) => {
        const p = (item.currentStock / item.maxStock) * 100;
        if (filter === 'critical') return p <= 20;
        if (filter === 'low') return p > 20 && p <= 50;
        return p > 50;
      });

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const criticalCount = stockItems.filter((i) => (i.currentStock / i.maxStock) * 100 <= 20).length;
  const lowCount = stockItems.filter((i) => {
    const p = (i.currentStock / i.maxStock) * 100;
    return p > 20 && p <= 50;
  }).length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Stock Overview</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{stockItems.length}</Text>
            <Text style={styles.summaryLabel}>Total Items</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: '#dc3545' }]}>{criticalCount}</Text>
            <Text style={styles.summaryLabel}>Critical</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: '#ffc107' }]}>{lowCount}</Text>
            <Text style={styles.summaryLabel}>Low Stock</Text>
          </View>
        </View>
      </View>

      <View style={styles.filterRow}>
        {['all', 'critical', 'low', 'good'].map((option) => (
          <View key={option} style={[styles.filterBtn, filter === option && styles.filterBtnActive]}>
            <Text style={[styles.filterBtnText, filter === option && styles.filterBtnTextActive]}>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
          </View>
        ))}
      </View>

      {filteredItems.map((item) => {
        const percentage = (item.currentStock / item.maxStock) * 100;
        return (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item) }]}>
                <Text style={styles.statusText}>{getStatusLabel(item)}</Text>
              </View>
            </View>
            <Text style={styles.category}>{item.category}</Text>
            <View style={styles.stockInfo}>
              <Text style={styles.stockValue}>{item.currentStock} {item.unit}</Text>
              <Text style={styles.stockRange}>Min: {item.minStock} | Max: {item.maxStock}</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: getStatusColor(item) }]} />
            </View>
            <Text style={styles.lastUpdated}>Updated: {item.lastUpdated}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 2,
  },
  summaryTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  summaryGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  summaryItem: { alignItems: 'center' },
  summaryValue: { fontSize: 24, fontWeight: '700' },
  summaryLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  filterBtnActive: { backgroundColor: '#007AFF' },
  filterBtnText: { fontSize: 14, color: '#666' },
  filterBtnTextActive: { color: '#fff' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: { fontSize: 16, fontWeight: '600' },
  category: { fontSize: 14, color: '#666', marginBottom: 8 },
  stockInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  stockValue: { fontSize: 14, fontWeight: '500' },
  stockRange: { fontSize: 14, color: '#666' },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: { height: '100%', borderRadius: 3 },
  lastUpdated: { fontSize: 12, color: '#999' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: { fontSize: 12, fontWeight: '600', color: '#fff' },
});
