import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface ForumItem {
  id: string;
  title: string;
  description: string;
  postCount: number;
  lastActivity: string;
}

export const LxpForumListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [forums, setForums] = useState<ForumItem[]>([]);

  useEffect(() => {
    fetchForums();
  }, []);

  const fetchForums = async () => {
    try {
      const response = await fetch('/api/lxp/forums');
      const json = await response.json();
      setForums(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {forums.map((forum) => (
        <TouchableOpacity key={forum.id} style={styles.card} onPress={() => navigation.navigate('ForumPost', { forumId: forum.id })}>
          <Text style={styles.title}>{forum.title}</Text>
          <Text style={styles.description}>{forum.description}</Text>
          <View style={styles.footer}>
            <Text style={styles.meta}>{forum.postCount} posts</Text>
            <Text style={styles.meta}>Last: {forum.lastActivity}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 8, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: '600' },
  description: { fontSize: 14, color: '#666', marginTop: 4 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  meta: { fontSize: 12, color: '#999' },
});
