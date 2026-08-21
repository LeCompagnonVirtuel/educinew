import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  lastActivity: string;
  color: string;
  isJoined: boolean;
}

const GroupsListScreen: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const mockData: Group[] = [
        { id: '1', name: 'Math Department', description: 'Collaboration space for math educators', memberCount: 12, lastActivity: '2 min ago', color: '#3b82f6', isJoined: true },
        { id: '2', name: 'Science Department', description: 'Lab resources and curriculum sharing', memberCount: 8, lastActivity: '1 hour ago', color: '#22c55e', isJoined: true },
        { id: '3', name: 'Parent Committee', description: 'Parent engagement and events', memberCount: 24, lastActivity: 'Yesterday', color: '#f59e0b', isJoined: false },
        { id: '4', name: 'Student Council', description: 'Student leadership and activities', memberCount: 15, lastActivity: '3 days ago', color: '#8b5cf6', isJoined: false },
        { id: '5', name: 'Admin Team', description: 'Administrative coordination', memberCount: 6, lastActivity: '5 hours ago', color: '#ef4444', isJoined: true },
      ];
      setGroups(mockData);
    } catch (err) {
      setError('Failed to fetch groups');
    } finally {
      setLoading(false);
    }
  };

  const toggleJoin = (groupId: string) => {
    setGroups(groups.map((g) => (g.id === groupId ? { ...g, isJoined: !g.isJoined, memberCount: g.isJoined ? g.memberCount - 1 : g.memberCount + 1 } : g)));
  };

  const renderItem = ({ item }: { item: Group }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Text style={styles.iconText}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.memberCount}>{item.memberCount} members</Text>
        </View>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.lastActivity}>Active: {item.lastActivity}</Text>
        <TouchableOpacity
          style={[styles.joinButton, item.isJoined && styles.joinedButton]}
          onPress={() => toggleJoin(item.id)}
        >
          <Text style={[styles.joinButtonText, item.isJoined && styles.joinedButtonText]}>
            {item.isJoined ? 'Joined' : 'Join'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Groups</Text>
      <FlatList
        data={groups}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>+ Create Group</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
  },
  lastActivity: {
    fontSize: 12,
    color: '#666',
  },
  joinButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  joinedButton: {
    backgroundColor: '#e0e7ff',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  joinedButtonText: {
    color: '#3b82f6',
  },
  createButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#3b82f6',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default GroupsListScreen;
