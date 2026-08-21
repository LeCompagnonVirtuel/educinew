import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function MarketplaceDetailScreen() {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    try {
      const response = await fetch(`/api/integration/marketplace/${id}`);
      const json = await response.json();
      setItem(json.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!item) return <View style={styles.center}><Text>Item not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>{item.price === 0 ? 'Free' : `$${item.price}`}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.detail}>Category: {item.category}</Text>
        <Text style={styles.detail}>Vendor: {item.vendor}</Text>
        <Text style={styles.detail}>Version: {item.version}</Text>
        <Text style={styles.detail}>Rating: {item.rating}/5 ({item.reviewCount} reviews)</Text>
        <Text style={styles.detail}>Installs: {item.installCount}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        {item.features && item.features.map((feature: string, index: number) => (
          <Text key={index} style={styles.featureItem}>• {feature}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Requirements</Text>
        {item.requirements && item.requirements.map((req: string, index: number) => (
          <Text key={index} style={styles.requirementItem}>• {req}</Text>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.installButton} onPress={() => router.push(`/integration/marketplace/${id}/install`)}>
          <Text style={styles.installButtonText}>{item.isInstalled ? 'Update' : 'Install'}</Text>
        </TouchableOpacity>
        {item.isInstalled && (
          <TouchableOpacity style={[styles.actionButton, styles.dangerButton]} onPress={() => router.push(`/integration/marketplace/${id}/uninstall`)}>
            <Text style={styles.actionButtonText}>Uninstall</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', flex: 1 },
  priceTag: { backgroundColor: '#4CAF50', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  priceText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  section: { backgroundColor: '#fff', margin: 8, padding: 16, borderRadius: 8, elevation: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  detail: { fontSize: 14, color: '#333', marginBottom: 8 },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  featureItem: { fontSize: 14, color: '#333', marginBottom: 4 },
  requirementItem: { fontSize: 14, color: '#666', marginBottom: 4 },
  actions: { padding: 16 },
  installButton: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  installButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  dangerButton: { backgroundColor: '#FF3B30' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});