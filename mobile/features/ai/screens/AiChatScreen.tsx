import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export const AiChatScreen: React.FC<{ route: { params: { sessionId: string } } }> = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/ai/sessions/${route.params.sessionId}/messages`);
      const json = await response.json();
      setMessages(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (inputText.trim() === '' || sending) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputText.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setSending(true);

    try {
      const response = await fetch(`/api/ai/sessions/${route.params.sessionId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: userMessage.content }),
      });
      const json = await response.json();
      setMessages((prev) => [...prev, json.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[styles.messageBubble, message.sender === 'user' ? styles.userMessage : styles.aiMessage]}
          >
            <Text style={[styles.messageText, message.sender === 'user' ? styles.userMessageText : styles.aiMessageText]}>
              {message.content}
            </Text>
            <Text style={[styles.timestamp, message.sender === 'user' ? styles.userTimestamp : styles.aiTimestamp]}>
              {message.timestamp}
            </Text>
          </View>
        ))}
        {sending && (
          <View style={[styles.messageBubble, styles.aiMessage]}>
            <ActivityIndicator size="small" color="#1565c0" />
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Tapez votre message..."
          placeholderTextColor="#999"
          multiline
          maxLength={2000}
        />
        <TouchableOpacity
          style={[styles.sendButton, inputText.trim() === '' && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={inputText.trim() === '' || sending}
        >
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  messagesContainer: { flex: 1, padding: 16 },
  messagesContent: { paddingBottom: 16 },
  messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 16, marginBottom: 12 },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#1565c0', borderBottomRightRadius: 4 },
  aiMessage: { alignSelf: 'flex-start', backgroundColor: '#fff', borderBottomLeftRadius: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  messageText: { fontSize: 14, lineHeight: 20 },
  userMessageText: { color: '#fff' },
  aiMessageText: { color: '#333' },
  timestamp: { fontSize: 10, marginTop: 4 },
  userTimestamp: { color: 'rgba(255,255,255,0.7)' },
  aiTimestamp: { color: '#999' },
  inputContainer: { flexDirection: 'row', alignItems: 'flex-end', padding: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
  textInput: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, maxHeight: 100, marginRight: 12 },
  sendButton: { backgroundColor: '#1565c0', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  sendButtonDisabled: { backgroundColor: '#ccc' },
  sendButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
