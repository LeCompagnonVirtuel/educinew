import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

export const ScAssetDetailScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [asset, setAsset] = useState<any>(null);
  const { id } = route.params;

  useEffect(() => {
    fetchAssetDetail();
  }, [id]);

  const fetchAssetDetail = async () => {
    try {
      const response = await fetch(`/api/smart-campus/assets/${id}`);
      const data = await response.json();
      setAsset(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!asset) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Asset not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{asset.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getConditionColor(asset.condition) }]}>
          <Text style={styles.statusText}>{asset.condition}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Asset Code:</Text>
          <Text style={styles.infoValue}>{asset.assetCode}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Category:</Text>
          <Text style={styles.infoValue}>{asset.category}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Purchase Date:</Text>
          <Text style={styles.infoValue}>{asset.purchaseDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Warranty Expiry:</Text>
          <Text style={styles.infoValue}>{asset.warrantyExpiry}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location & Assignment</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Location:</Text>
          <Text style={styles.infoValue}>{asset.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Assigned To:</Text>
          <Text style={styles.infoValue}>{asset.assignedTo || 'Unassigned'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Department:</Text>
          <Text style={styles.infoValue}>{asset.department}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Maintenance</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Last Service:</Text>
          <Text style={styles.infoValue}>{asset.lastServiceDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Next Service:</Text>
          <Text style={styles.infoValue}>{asset.nextServiceDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Total Maintenance Cost:</Text>
          <Text style={styles.infoValue}>${asset.totalMaintenanceCost}</Text>
        </View>
      </View>
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
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
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
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
});
