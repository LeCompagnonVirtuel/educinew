import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

interface TicketData {
  subject: string;
  message: string;
  category: string;
}

export const LxpSupportScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [submitting, setSubmitting] = useState(false);
  const [ticket, setTicket] = useState<TicketData>({ subject: '', message: '', category: 'general' });

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch('/api/lxp/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket),
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help Center</Text>
        <TouchableOpacity style={styles.helpItem}>
          <Text style={styles.helpText}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.helpItem}>
          <Text style={styles.helpText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.helpItem}>
          <Text style={styles.helpText}>Report a Bug</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Submit a Ticket</Text>
        <TextInput
          style={styles.input}
          placeholder="Subject"
          value={ticket.subject}
          onChangeText={(subject) => setTicket({ ...ticket, subject })}
        />
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Describe your issue..."
          multiline
          numberOfLines={6}
          value={ticket.message}
          onChangeText={(message) => setTicket({ ...ticket, message })}
        />
        <TouchableOpacity
          style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Ticket</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  section: { backgroundColor: '#fff', padding: 16, marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  helpItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  helpText: { fontSize: 16 },
  input: { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 14 },
  messageInput: { minHeight: 120, textAlignVertical: 'top' },
  submitButton: { backgroundColor: '#2196F3', padding: 16, borderRadius: 8, alignItems: 'center' },
  submitButtonDisabled: { opacity: 0.6 },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
