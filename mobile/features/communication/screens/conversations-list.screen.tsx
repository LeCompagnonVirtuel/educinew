import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, RefreshControl } from 'react-native';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  participantCount: number;
  avatarColor: string;
  isPinned: boolean;
  type: 'direct' | 'group';
}

const ConversationsListScreen: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const mockData: Conversation[] = [
        { id: '1', name: 'Math Department', lastMessage: 'Meeting scheduled for Friday', lastMessageTime: '2 min ago', unreadCount: 3, participantCount: 12, avatarColor: '#3b82f6', isPinned: true, type: 'group' },
        { id: '2', name: 'Sarah Johnson', lastMessage: 'Thanks for the update!', lastMessageTime: '15 min ago', unreadCount: 0, participantCount: 2, avatarColor: '#22c55e', isPinned: false, type: 'direct' },
        { id: '3', name: 'Science Department', lastMessage: 'Lab equipment order approved', lastMessageTime: '1 hour ago', unreadCount: 1, participantCount: 8, avatarColor: '#f59e0b', isPinned: false, type: 'group' },
        { id: '4', name: 'Michael Chen', lastMessage: 'Can we discuss the curriculum?', lastMessageTime: '3 hours ago', unreadCount: 0, participantCount: 2, avatarColor: '#8b5cf6', isPinned: true, type: 'direct' },
        { id: '5', name: 'Parent Committee', lastMessage: 'Event details attached', lastMessageTime: 'Yesterday', unreadCount: 5, participantCount: 24, avatarColor: '#ef4444', isPinned: false, type: 'group' },
      ];
      setConversations(mockData);
    } catch (err) {
      setError('Failed to fetch conversations');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchConversations();
  }, []);

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity style={styles.conversationItem}>
      <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.conversationInfo}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationName} numberOfLines={1}>{item.name}</Text>
          {item.isPinned && <Text style={styles.pinIcon}>📌</Text>}
          <Text style={styles.time}>{item.lastMessageTime}</Text>
        </View>
        <View style={styles.conversationFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
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
      <Text style={styles.title}>Conversations</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredConversations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
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
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  listContent: {
    paddingBottom: 80,
  },
  conversationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  pinIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default ConversationsListScreen;
