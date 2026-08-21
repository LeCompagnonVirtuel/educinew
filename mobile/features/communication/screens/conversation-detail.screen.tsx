import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

interface Message {
  id: string;
  text: string;
  senderName: string;
  senderAvatar: string;
  timestamp: string;
  isOwn: boolean;
  status: 'sent' | 'delivered' | 'read';
  attachments: string[];
}

interface ConversationDetailProps {
  conversationId: string;
  conversationName: string;
}

const ConversationDetailScreen: React.FC<ConversationDetailProps> = ({ conversationId, conversationName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const mockData: Message[] = [
        { id: '1', text: 'Good morning everyone! Quick reminder about the staff meeting at 3 PM today.', senderName: 'Dr. Smith', senderAvatar: '#3b82f6', timestamp: '9:00 AM', isOwn: false, status: 'read', attachments: [] },
        { id: '2', text: 'Thanks for the reminder. I\'ll be there.', senderName: 'You', senderAvatar: '#22c55e', timestamp: '9:05 AM', isOwn: true, status: 'read', attachments: [] },
        { id: '3', text: 'Can someone share the agenda beforehand?', senderName: 'Sarah Johnson', senderAvatar: '#f59e0b', timestamp: '9:10 AM', isOwn: false, status: 'read', attachments: [] },
        { id: '4', text: 'I\'ll send it out shortly. Here\'s the preliminary draft.', senderName: 'Dr. Smith', senderAvatar: '#3b82f6', timestamp: '9:15 AM', isOwn: false, status: 'read', attachments: ['meeting_agenda.pdf'] },
        { id: '5', text: 'Perfect, thank you!', senderName: 'You', senderAvatar: '#22c55e', timestamp: '9:20 AM', isOwn: true, status: 'delivered', attachments: [] },
      ];
      setMessages(mockData);
    } catch (err) {
      setError('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: String(messages.length + 1),
      text: inputText,
      senderName: 'You',
      senderAvatar: '#22c55e',
      timestamp: 'Now',
      isOwn: true,
      status: 'sent',
      attachments: [],
    };
    setMessages([...messages, newMessage]);
    setInputText('');
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return '✓';
      case 'delivered': return '✓✓';
      case 'read': return '✓✓';
      default: return '';
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.isOwn ? styles.ownMessage : styles.otherMessage]}>
      {!item.isOwn && (
        <View style={[styles.messageAvatar, { backgroundColor: item.senderAvatar }]}>
          <Text style={styles.avatarText}>{item.senderName.charAt(0)}</Text>
        </View>
      )}
      <View style={styles.messageContent}>
        {!item.isOwn && <Text style={styles.senderName}>{item.senderName}</Text>}
        <Text style={[styles.messageText, item.isOwn && styles.ownMessageText]}>{item.text}</Text>
        {item.attachments.length > 0 && (
          <View style={styles.attachments}>
            {item.attachments.map((attachment, index) => (
              <View key={index} style={styles.attachmentChip}>
                <Text style={styles.attachmentText}>📎 {attachment}</Text>
              </View>
            ))}
          </View>
        )}
        <View style={styles.messageFooter}>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
          {item.isOwn && (
            <Text style={[styles.statusIcon, item.status === 'read' && styles.readStatus]}>
              {getStatusIcon(item.status)}
            </Text>
          )}
        </View>
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
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{conversationName}</Text>
        {isTyping && <Text style={styles.typingIndicator}>Someone is typing...</Text>}
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Text style={styles.attachButtonText}>+</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>↑</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  typingIndicator: {
    fontSize: 12,
    color: '#3b82f6',
    marginTop: 4,
  },
  messageList: {
    padding: 16,
    paddingBottom: 8,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 12,
    maxWidth: '80%',
  },
  ownMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  messageContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  ownMessage: {
    backgroundColor: '#3b82f6',
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    color: '#3b82f6',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  ownMessageText: {
    color: '#fff',
  },
  attachments: {
    marginTop: 8,
  },
  attachmentChip: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 4,
  },
  attachmentText: {
    fontSize: 12,
    color: '#333',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
  },
  statusIcon: {
    fontSize: 10,
    color: '#999',
  },
  readStatus: {
    color: '#3b82f6',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  attachButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  attachButtonText: {
    fontSize: 20,
    color: '#666',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default ConversationDetailScreen;
