import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

export const ScVisitorApprovalScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [pendingVisitors, setPendingVisitors] = useState<any[]>([]);

  useEffect(() => {
    fetchPendingVisitors();
  }, []);

  const fetchPendingVisitors = async () => {
    try {
      const response = await fetch('/api/smart-campus/visitors/pending');
      const data = await response.json();
      setPendingVisitors(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (visitorId: string, approved: boolean) => {
    try {
      const response = await fetch(`/api/smart-campus/visitors/${visitorId}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved }),
      });
      const data = await response.json();
      if (data.success) {
        Alert.alert('Success', approved ? 'Visitor approved' : 'Visitor rejected');
        fetchPendingVisitors();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to process approval');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      {pendingVisitors.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No pending approvals</Text>
        </View>
      ) : (
        pendingVisitors.map((visitor) => (
          <View key={visitor.id} style={styles.card}>
            <Text style={styles.title}>{visitor.name}</Text>
            <Text style={styles.subtitle}>Purpose: {visitor.purpose}</Text>
            <Text style={styles.info}>Host: {visitor.hostName}</Text>
            <Text style={styles.info}>Date: {visitor.visitDate}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.approveButton]}
                onPress={() => handleApproval(visitor.id, true)}
              >
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.rejectButton]}
                onPress={() => handleApproval(visitor.id, false)}
              >
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  rejectButton: {
    backgroundColor: '#f44336',
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
