import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface MentoringItem {
  id: string;
  mentorName: string;
  expertise: string[];
  rating: number;
  availability: string;
}

export const LxpMentoringListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState<MentoringItem[]>([]);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await fetch('/api/lxp/mentoring');
      const json = await response.json();
      setMentors(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {mentors.map((mentor) => (
        <TouchableOpacity key={mentor.id} style={styles.card} onPress={() => navigation.navigate('MentorDetail', { id: mentor.id })}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{mentor.mentorName.charAt(0)}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{mentor.mentorName}</Text>
              <Text style={styles.rating}>★ {mentor.rating.toFixed(1)}</Text>
            </View>
          </View>
          <View style={styles.expertiseContainer}>
            {mentor.expertise.map((exp, index) => (
              <View key={index} style={styles.expertiseBadge}>
                <Text style={styles.expertiseText}>{exp}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.availability}>{mentor.availability}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 8, borderRadius: 8 },
  header: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#2196F3', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  rating: { fontSize: 14, color: '#FFC107', marginTop: 4 },
  expertiseContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, gap: 8 },
  expertiseBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  expertiseText: { fontSize: 12, color: '#4CAF50' },
  availability: { fontSize: 12, color: '#666', marginTop: 8 },
});
