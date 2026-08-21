import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface GroupItem {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  activity: string;
}

export const LxpGroupListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<GroupItem[]>([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/lxp/groups');
      const json = await response.json();
      setGroups(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {groups.map((group) => (
        <TouchableOpacity key={group.id} style={styles.card} onPress={() => navigation.navigate('GroupDetail', { id: group.id })}>
          <Text style={styles.name}>{group.name}</Text>
          <Text style={styles.description}>{group.description}</Text>
          <View style={styles.footer}>
            <Text style={styles.meta}>{group.memberCount} members</Text>
            <Text style={styles.meta}>{group.activity}</Text>
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
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  meta: { fontSize: 12, color: '#999' },
});
