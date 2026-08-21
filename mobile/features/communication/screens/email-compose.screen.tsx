import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

interface EmailComposeProps {
  replyTo?: {
    to: string;
    subject: string;
  };
}

const EmailComposeScreen: React.FC<EmailComposeProps> = ({ replyTo }) => {
  const [to, setTo] = useState(replyTo?.to || '');
  const [subject, setSubject] = useState(replyTo?.subject || '');
  const [body, setBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleSend = async () => {
    if (!to.trim() || !subject.trim() || !body.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      Alert.alert('Success', 'Email sent successfully');
    }, 2000);
  };

  const handleSaveDraft = () => {
    Alert.alert('Draft Saved', 'Your email has been saved as a draft');
  };

  const addAttachment = () => {
    setAttachments([...attachments, `document_${attachments.length + 1}.pdf`]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{replyTo ? 'Reply' : 'Compose Email'}</Text>
      <View style={styles.formSection}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>To</Text>
          <TextInput
            style={styles.input}
            placeholder="recipient@email.com"
            value={to}
            onChangeText={setTo}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={styles.input}
            placeholder="Email subject"
            value={subject}
            onChangeText={setSubject}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.input, styles.bodyInput]}
            placeholder="Write your message..."
            value={body}
            onChangeText={setBody}
            multiline
            textAlignVertical="top"
          />
        </View>
        <View style={styles.attachmentsSection}>
          <View style={styles.attachmentsHeader}>
            <Text style={styles.label}>Attachments</Text>
            <TouchableOpacity style={styles.addAttachmentButton} onPress={addAttachment}>
              <Text style={styles.addAttachmentText}>+ Add</Text>
            </TouchableOpacity>
          </View>
          {attachments.map((attachment, index) => (
            <View key={index} style={styles.attachmentItem}>
              <Text style={styles.attachmentName}>📎 {attachment}</Text>
              <TouchableOpacity onPress={() => removeAttachment(index)}>
                <Text style={styles.removeAttachment}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveDraftButton} onPress={handleSaveDraft}>
          <Text style={styles.saveDraftButtonText}>Save Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sendButton, isSending && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={isSending}
        >
          {isSending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.sendButtonText}>Send</Text>
          )}
        </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formSection: {
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
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  bodyInput: {
    height: 200,
    textAlignVertical: 'top',
  },
  attachmentsSection: {
    marginTop: 8,
  },
  attachmentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addAttachmentButton: {
    backgroundColor: '#e0e7ff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addAttachmentText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '600',
  },
  attachmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  attachmentName: {
    fontSize: 14,
    color: '#333',
  },
  removeAttachment: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  saveDraftButton: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveDraftButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  sendButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.7,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EmailComposeScreen;
