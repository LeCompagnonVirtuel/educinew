import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface ReviewItem {
  id: string;
  courseTitle: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
}

export const LxpReviewListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/lxp/reviews');
      const json = await response.json();
      setReviews(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {reviews.map((review) => (
        <View key={review.id} style={styles.card}>
          <Text style={styles.courseTitle}>{review.courseTitle}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>★ {review.rating}</Text>
            <Text style={styles.date}>{review.date}</Text>
          </View>
          <Text style={styles.comment}>{review.comment}</Text>
          <Text style={styles.author}>— {review.author}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 8, borderRadius: 8 },
  courseTitle: { fontSize: 16, fontWeight: '600' },
  ratingRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  rating: { fontSize: 14, color: '#FFC107' },
  date: { fontSize: 12, color: '#999' },
  comment: { fontSize: 14, color: '#333', marginTop: 8, lineHeight: 20 },
  author: { fontSize: 12, color: '#666', marginTop: 8, fontStyle: 'italic' },
});
