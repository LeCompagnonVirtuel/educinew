import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function ApprovalListScreen() {
  const [approvals, setApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadApprovals();
  }, []);

  const loadApprovals = async () => {
    try {
      const response = await fetch('/api/integration/approvals');
      const json = await response.json();
      setApprovals(json.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Approvals</Text>
      {approvals.map((approval) => (
        <View key={approval.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{approval.title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: approval.status === 'approved' ? '#4CAF50' : approval.status === 'rejected' ? '#FF3B30' : '#FF9800' }]}>
              <Text style={styles.statusText}>{approval.status}</Text>
            </View>
          </View>
          <Text style={styles.cardDescription}>{approval.description}</Text>
          <Text style={styles.cardRequester}>Requested by: {approval.requester}</Text>
          <Text style={styles.cardDate}>Created: {approval.createdAt}</Text>
          {approval.status === 'pending' && (
            <View style={styles.approvalActions}>
              <TouchableOpacity style={styles.approveButton} onPress={() => router.push(`/integration/approvals/${approval.id}/approve`)}>
                <Text style={styles.approveButtonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rejectButton} onPress={() => router.push(`/integration/approvals/${approval.id}/reject`)}>
                <Text style={styles.rejectButtonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', padding: 16 },
  card: { backgroundColor: '#fff', margin: 8, padding: 16, borderRadius: 8, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  cardDescription: { fontSize: 14, color: '#666', marginTop: 8 },
  cardRequester: { fontSize: 14, color: '#888', marginTop: 4 },
  cardDate: { fontSize: 12, color: '#999', marginTop: 4 },
  approvalActions: { flexDirection: 'row', marginTop: 12 },
  approveButton: { backgroundColor: '#4CAF50', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, marginRight: 8 },
  approveButtonText: { color: '#fff', fontWeight: '600' },
  rejectButton: { backgroundColor: '#FF3B30', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  rejectButtonText: { color: '#fff', fontWeight: '600' },
});