import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function AIAssistantScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadConversation();
  }, []);

  const loadConversation = async () => {
    try {
      const response = await fetch('/api/integration/ai/assistant/conversation');
      const json = await response.json();
      setMessages(json.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/integration/ai/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputText })
      });
      const json = await response.json();
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: json.data?.response || 'Sorry, I could not process your request.',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>AI Assistant</Text>
        <TouchableOpacity style={styles.clearButton} onPress={() => setMessages([])}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message) => (
          <View 
            key={message.id} 
            style={[styles.messageBubble, message.role === 'user' ? styles.userMessage : styles.assistantMessage]}
          >
            <Text style={[styles.messageText, message.role === 'user' ? styles.userMessageText : styles.assistantMessageText]}>
              {message.content}
            </Text>
            <Text style={styles.messageTime}>{new Date(message.timestamp).toLocaleTimeString()}</Text>
          </View>
        ))}
        {loading && (
          <View style={[styles.messageBubble, styles.assistantMessage]}>
            <ActivityIndicator size="small" color="#666" />
          </View>
        )}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me anything..."
          multiline
          maxLength={1000}
        />
        <TouchableOpacity 
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]} 
          onPress={sendMessage}
          disabled={!inputText.trim() || loading}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 24, fontWeight: 'bold' },
  clearButton: { backgroundColor: '#FF3B30', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  clearButtonText: { color: '#fff', fontWeight: '600' },
  messagesContainer: { flex: 1, padding: 16 },
  messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 16, marginBottom: 12 },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#007AFF' },
  assistantMessage: { alignSelf: 'flex-start', backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee' },
  messageText: { fontSize: 16, lineHeight: 22 },
  userMessageText: { color: '#fff' },
  assistantMessageText: { color: '#333' },
  messageTime: { fontSize: 10, color: '#999', marginTop: 4, textAlign: 'right' },
  inputContainer: { flexDirection: 'row', padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
  textInput: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginRight: 8, maxHeight: 100 },
  sendButton: { backgroundColor: '#007AFF', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, justifyContent: 'center' },
  sendButtonDisabled: { backgroundColor: '#ccc' },
  sendButtonText: { color: '#fff', fontWeight: '600' },
});