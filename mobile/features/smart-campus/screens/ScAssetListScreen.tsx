import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScAssetListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await fetch('/api/smart-campus/assets');
      const data = await response.json();
      setAssets(data.data);
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
      {assets.map((asset) => (
        <TouchableOpacity
          key={asset.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScAssetDetail', { id: asset.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{asset.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getConditionColor(asset.condition) }]}>
              <Text style={styles.statusText}>{asset.condition}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Asset Code: {asset.assetCode}</Text>
          <Text style={styles.info}>Location: {asset.location}</Text>
          <Text style={styles.info}>Assigned To: {asset.assignedTo || 'Unassigned'}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const getConditionColor = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'excellent':
      return '#4CAF50';
    case 'good':
      return '#8BC34A';
    case 'fair':
      return '#FF9800';
    case 'poor':
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
