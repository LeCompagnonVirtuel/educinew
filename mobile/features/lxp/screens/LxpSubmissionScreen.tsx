import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

interface SubmissionData {
  text: string;
  attachments: string[];
}

export const LxpSubmissionScreen: React.FC<{ navigation: unknown; route: { params: { assignmentId: string } } }> = ({ navigation, route }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submission, setSubmission] = useState<SubmissionData>({ text: '', attachments: [] });

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch(`/api/lxp/assignments/${route.params.assignmentId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
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
      <View style={styles.header}>
        <Text style={styles.title}>Submit Assignment</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Answer</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={10}
          placeholder="Enter your submission text here..."
          value={submission.text}
          onChangeText={(text) => setSubmission({ ...submission, text })}
        />
      </View>
      <TouchableOpacity style={styles.attachButton}>
        <Text style={styles.attachButtonText}>+ Add Attachment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: '700' },
  section: { backgroundColor: '#fff', padding: 16, marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  textInput: { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 12, fontSize: 14, minHeight: 200, textAlignVertical: 'top' },
  attachButton: { backgroundColor: '#fff', margin: 16, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#2196F3', borderStyle: 'dashed', alignItems: 'center' },
  attachButtonText: { color: '#2196F3', fontSize: 14 },
  submitButton: { backgroundColor: '#4CAF50', margin: 16, padding: 16, borderRadius: 8, alignItems: 'center' },
  submitButtonDisabled: { opacity: 0.6 },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
