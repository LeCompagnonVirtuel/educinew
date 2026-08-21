import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface PublisherItem {
  id: string;
  name: string;
  description: string;
  courseCount: number;
  rating: number;
}

export const LxpPublisherListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [publishers, setPublishers] = useState<PublisherItem[]>([]);

  useEffect(() => {
    fetchPublishers();
  }, []);

  const fetchPublishers = async () => {
    try {
      const response = await fetch('/api/lxp/publishers');
      const json = await response.json();
      setPublishers(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {publishers.map((publisher) => (
        <TouchableOpacity key={publisher.id} style={styles.card} onPress={() => navigation.navigate('PublisherDetail', { id: publisher.id })}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{publisher.name.charAt(0)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{publisher.name}</Text>
            <Text style={styles.description}>{publisher.description}</Text>
            <View style={styles.meta}>
              <Text style={styles.courses}>{publisher.courseCount} courses</Text>
              <Text style={styles.rating}>★ {publisher.rating.toFixed(1)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 8, borderRadius: 8, flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#9C27B0', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  description: { fontSize: 12, color: '#666', marginTop: 2 },
  meta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  courses: { fontSize: 12, color: '#999' },
  rating: { fontSize: 12, color: '#FFC107' },
});
