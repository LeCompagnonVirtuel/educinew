import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function TopicDetailScreen() {
  const [topic, setTopic] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadTopic();
  }, [id]);

  const loadTopic = async () => {
    try {
      const response = await fetch(`/api/integration/topics/${id}`);
      const json = await response.json();
      setTopic(json.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!topic) return <View style={styles.center}><Text>Topic not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{topic.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: topic.isActive ? '#4CAF50' : '#FF9800' }]}>
          <Text style={styles.statusText}>{topic.isActive ? 'Active' : 'Inactive'}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.detail}>Description: {topic.description}</Text>
        <Text style={styles.detail}>Created: {topic.createdAt}</Text>
        <Text style={styles.detail}>Last Updated: {topic.updatedAt}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <Text style={styles.detail}>Subscribers: {topic.subscriberCount}</Text>
        <Text style={styles.detail}>Total Messages: {topic.messageCount}</Text>
        <Text style={styles.detail}>Messages Today: {topic.messagesToday}</Text>
        <Text style={styles.detail}>Avg Message Size: {topic.avgMessageSize} bytes</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Messages</Text>
        {topic.recentMessages && topic.recentMessages.map((message: any, index: number) => (
          <View key={index} style={styles.messageItem}>
            <Text style={styles.messageId}>ID: {message.id}</Text>
            <Text style={styles.messagePayload}>Payload: {JSON.stringify(message.payload).substring(0, 50)}...</Text>
            <Text style={styles.messageDate}>Time: {message.timestamp}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push(`/integration/topics/${id}/edit`)}>
          <Text style={styles.actionButtonText}>Edit Topic</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.warningButton]} onPress={() => router.push(`/integration/topics/${id}/publish`)}>
          <Text style={styles.actionButtonText}>Publish Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.dangerButton]} onPress={() => router.push(`/integration/topics/${id}/delete`)}>
          <Text style={styles.actionButtonText}>Delete Topic</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', flex: 1 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  statusText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  section: { backgroundColor: '#fff', margin: 8, padding: 16, borderRadius: 8, elevation: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  detail: { fontSize: 14, color: '#333', marginBottom: 8 },
  messageItem: { backgroundColor: '#f0f0f0', padding: 8, borderRadius: 4, marginBottom: 8 },
  messageId: { fontSize: 12, color: '#666' },
  messagePayload: { fontSize: 14, color: '#333', marginTop: 4, fontFamily: 'monospace' },
  messageDate: { fontSize: 12, color: '#999', marginTop: 4 },
  actions: { padding: 16 },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  warningButton: { backgroundColor: '#FF9500' },
  dangerButton: { backgroundColor: '#FF3B30' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});