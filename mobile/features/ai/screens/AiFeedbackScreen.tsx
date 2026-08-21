import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Feedback {
  id: string;
  studentName: string;
  subject: string;
  type: string;
  content: string;
  rating: number;
  date: string;
}

export const AiFeedbackScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/ai/feedback');
      const json = await response.json();
      setFeedbacks(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Retours</Text>
      <Text style={styles.subtitle}>Retours et commentaires IA</Text>

      {feedbacks.map((feedback) => (
        <View key={feedback.id} style={styles.feedbackCard}>
          <View style={styles.feedbackHeader}>
            <Text style={styles.studentName}>{feedback.studentName}</Text>
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{feedback.type}</Text>
            </View>
          </View>
          <Text style={styles.subject}>{feedback.subject}</Text>
          <Text style={styles.content}>{feedback.content}</Text>
          <View style={styles.feedbackFooter}>
            <Text style={styles.stars}>{renderStars(feedback.rating)}</Text>
            <Text style={styles.date}>{feedback.date}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  feedbackCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  feedbackHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  studentName: { fontSize: 16, fontWeight: '600', color: '#333' },
  typeBadge: { backgroundColor: '#e3f2fd', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  typeText: { fontSize: 12, fontWeight: '600', color: '#1565c0' },
  subject: { fontSize: 14, color: '#666', marginBottom: 8 },
  content: { fontSize: 14, color: '#333', lineHeight: 20, marginBottom: 12 },
  feedbackFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stars: { fontSize: 14, color: '#ffc107' },
  date: { fontSize: 12, color: '#999' },
});
