import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface StudyGroupItem {
  id: string;
  name: string;
  subject: string;
  memberCount: number;
  nextSession: string;
  isOpen: boolean;
}

export const LxpStudyGroupListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<StudyGroupItem[]>([]);

  useEffect(() => {
    fetchStudyGroups();
  }, []);

  const fetchStudyGroups = async () => {
    try {
      const response = await fetch('/api/lxp/study-groups');
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
        <TouchableOpacity key={group.id} style={styles.card} onPress={() => navigation.navigate('StudyGroupDetail', { id: group.id })}>
          <View style={styles.header}>
            <Text style={styles.name}>{group.name}</Text>
            <View style={[styles.statusBadge, group.isOpen ? styles.openBadge : styles.closedBadge]}>
              <Text style={[styles.statusText, group.isOpen ? styles.openText : styles.closedText]}>
                {group.isOpen ? 'Open' : 'Full'}
              </Text>
            </View>
          </View>
          <Text style={styles.subject}>{group.subject}</Text>
          <View style={styles.footer}>
            <Text style={styles.meta}>{group.memberCount} members</Text>
            <Text style={styles.meta}>Next: {group.nextSession}</Text>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '600', flex: 1 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  openBadge: { backgroundColor: '#E8F5E9' },
  closedBadge: { backgroundColor: '#FFEBEE' },
  statusText: { fontSize: 12, fontWeight: '500' },
  openText: { color: '#4CAF50' },
  closedText: { color: '#f44336' },
  subject: { fontSize: 14, color: '#666', marginTop: 4 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  meta: { fontSize: 12, color: '#999' },
});
