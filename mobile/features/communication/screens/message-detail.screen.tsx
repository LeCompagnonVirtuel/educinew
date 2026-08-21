import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

interface Reaction {
  emoji: string;
  count: number;
  reacted: boolean;
}

interface Reply {
  id: string;
  senderName: string;
  text: string;
  timestamp: string;
  avatarColor: string;
}

interface MessageDetail {
  id: string;
  text: string;
  senderName: string;
  senderAvatar: string;
  timestamp: string;
  reactions: Reaction[];
  replies: Reply[];
  threadCount: number;
}

interface MessageDetailProps {
  messageId: string;
}

const MessageDetailScreen: React.FC<MessageDetailProps> = ({ messageId }) => {
  const [message, setMessage] = useState<MessageDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessageDetail();
  }, [messageId]);

  const fetchMessageDetail = async () => {
    try {
      setLoading(true);
      const mockData: MessageDetail = {
        id: messageId,
        text: 'I wanted to share my thoughts on the new curriculum proposal. After reviewing the materials, I believe we should focus more on practical applications rather than theoretical concepts. This aligns better with our students\' learning objectives.',
        senderName: 'Dr. Smith',
        senderAvatar: '#3b82f6',
        timestamp: 'January 15, 2024 at 2:30 PM',
        reactions: [
          { emoji: '👍', count: 8, reacted: true },
          { emoji: '❤️', count: 5, reacted: false },
          { emoji: '💡', count: 3, reacted: true },
          { emoji: '🎯', count: 2, reacted: false },
        ],
        replies: [
          { id: '1', senderName: 'Sarah Johnson', text: 'Great point! I completely agree with the practical focus.', timestamp: '2:45 PM', avatarColor: '#22c55e' },
          { id: '2', senderName: 'Michael Chen', text: 'Can we discuss this further in the next meeting?', timestamp: '3:00 PM', avatarColor: '#8b5cf6' },
          { id: '3', senderName: 'Lisa Wang', text: 'I have some resources that could help with the practical applications.', timestamp: '3:15 PM', avatarColor: '#f59e0b' },
        ],
        threadCount: 3,
      };
      setMessage(mockData);
    } catch (err) {
      setError('Failed to fetch message details');
    } finally {
      setLoading(false);
    }
  };

  const addReaction = (emoji: string) => {
    if (!message) return;
    const updatedReactions = message.reactions.map((r) =>
      r.emoji === emoji ? { ...r, count: r.reacted ? r.count - 1 : r.count + 1, reacted: !r.reacted } : r
    );
    setMessage({ ...message, reactions: updatedReactions });
  };

  const renderReply = ({ item }: { item: Reply }) => (
    <View style={styles.replyItem}>
      <View style={[styles.replyAvatar, { backgroundColor: item.avatarColor }]}>
        <Text style={styles.replyAvatarText}>{item.senderName.charAt(0)}</Text>
      </View>
      <View style={styles.replyContent}>
        <View style={styles.replyHeader}>
          <Text style={styles.replySender}>{item.senderName}</Text>
          <Text style={styles.replyTime}>{item.timestamp}</Text>
        </View>
        <Text style={styles.replyText}>{item.text}</Text>
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

  if (error || !message) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || 'Message not found'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.messageCard}>
        <View style={styles.messageHeader}>
          <View style={[styles.avatar, { backgroundColor: message.senderAvatar }]}>
            <Text style={styles.avatarText}>{message.senderName.charAt(0)}</Text>
          </View>
          <View style={styles.senderInfo}>
            <Text style={styles.senderName}>{message.senderName}</Text>
            <Text style={styles.timestamp}>{message.timestamp}</Text>
          </View>
        </View>
        <Text style={styles.messageText}>{message.text}</Text>
        <View style={styles.reactionsContainer}>
          {message.reactions.map((reaction, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.reactionChip, reaction.reacted && styles.reactionChipActive]}
              onPress={() => addReaction(reaction.emoji)}
            >
              <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
              <Text style={[styles.reactionCount, reaction.reacted && styles.reactionCountActive]}>{reaction.count}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.threadSection}>
        <View style={styles.threadHeader}>
          <Text style={styles.threadTitle}>Thread ({message.threadCount} replies)</Text>
          <TouchableOpacity style={styles.replyButton}>
            <Text style={styles.replyButtonText}>Reply</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={message.replies}
          renderItem={renderReply}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
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
  messageCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  senderInfo: {
    flex: 1,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 16,
  },
  reactionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  reactionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  reactionChipActive: {
    backgroundColor: '#e0e7ff',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  reactionEmoji: {
    fontSize: 16,
  },
  reactionCount: {
    fontSize: 14,
    color: '#666',
  },
  reactionCountActive: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  threadSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  threadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  threadTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  replyButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  replyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  replyItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  replyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  replyAvatarText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  replyContent: {
    flex: 1,
  },
  replyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  replySender: {
    fontSize: 14,
    fontWeight: '600',
  },
  replyTime: {
    fontSize: 12,
    color: '#666',
  },
  replyText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default MessageDetailScreen;
