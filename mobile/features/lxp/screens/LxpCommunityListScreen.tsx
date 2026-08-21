import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface CommunityItem {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isJoined: boolean;
}

export const LxpCommunityListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [communities, setCommunities] = useState<CommunityItem[]>([]);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await fetch('/api/lxp/communities');
      const json = await response.json();
      setCommunities(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {communities.map((community) => (
        <TouchableOpacity key={community.id} style={styles.card} onPress={() => navigation.navigate('CommunityDetail', { id: community.id })}>
          <Text style={styles.name}>{community.name}</Text>
          <Text style={styles.description}>{community.description}</Text>
          <View style={styles.footer}>
            <Text style={styles.members}>{community.memberCount} members</Text>
            <View style={[styles.joinBadge, community.isJoined && styles.joinedBadge]}>
              <Text style={[styles.joinText, community.isJoined && styles.joinedText]}>
                {community.isJoined ? 'Joined' : 'Join'}
              </Text>
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
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 8, borderRadius: 8 },
  name: { fontSize: 16, fontWeight: '600' },
  description: { fontSize: 14, color: '#666', marginTop: 4 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  members: { fontSize: 12, color: '#999' },
  joinBadge: { backgroundColor: '#e0e0e0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
  joinedBadge: { backgroundColor: '#4CAF50' },
  joinText: { fontSize: 12, color: '#666' },
  joinedText: { color: '#fff' },
});
