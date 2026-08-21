import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

interface Dashboard {
  id: string;
  name: string;
  description: string;
  widgets: number;
  lastAccessed: string;
  isDefault: boolean;
}

const DashboardsScreen: React.FC = () => {
  const [data, setData] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboards();
  }, []);

  const fetchDashboards = async () => {
    try {
      setLoading(true);
      const mockData: Dashboard[] = [
        { id: '1', name: 'Executive Overview', description: 'High-level KPIs and metrics', widgets: 8, lastAccessed: '2 hours ago', isDefault: true },
        { id: '2', name: 'Academic Performance', description: 'Student grades and progress', widgets: 12, lastAccessed: '1 day ago', isDefault: false },
        { id: '3', name: 'Financial Summary', description: 'Revenue and expense tracking', widgets: 6, lastAccessed: '3 hours ago', isDefault: false },
        { id: '4', name: 'HR Metrics', description: 'Staff and department analytics', widgets: 10, lastAccessed: '1 week ago', isDefault: false },
      ];
      setData(mockData);
    } catch (err) {
      setError('Failed to fetch dashboards');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Dashboard }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{item.name}</Text>
          {item.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
        </View>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Widgets</Text>
          <Text style={styles.footerValue}>{item.widgets}</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Last Accessed</Text>
          <Text style={styles.footerValue}>{item.lastAccessed}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboards</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  defaultBadge: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  defaultText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  footerValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default DashboardsScreen;
