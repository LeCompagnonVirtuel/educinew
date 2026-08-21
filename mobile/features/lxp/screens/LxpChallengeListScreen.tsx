import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  reward: number;
  deadline: string;
  progress: number;
}

export const LxpChallengeListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState<ChallengeItem[]>([]);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const response = await fetch('/api/lxp/challenges');
      const json = await response.json();
      setChallenges(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {challenges.map((challenge) => (
        <TouchableOpacity key={challenge.id} style={styles.card} onPress={() => navigation.navigate('ChallengeDetail', { id: challenge.id })}>
          <Text style={styles.title}>{challenge.title}</Text>
          <Text style={styles.description}>{challenge.description}</Text>
          <View style={styles.footer}>
            <Text style={styles.reward}>🎁 {challenge.reward} points</Text>
            <Text style={styles.deadline}>Due: {challenge.deadline}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${challenge.progress}%` }]} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 8, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: '600' },
  description: { fontSize: 14, color: '#666', marginTop: 4 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  reward: { fontSize: 12, color: '#FF9800', fontWeight: '500' },
  deadline: { fontSize: 12, color: '#999' },
  progressBar: { height: 4, backgroundColor: '#e0e0e0', borderRadius: 2, marginTop: 8 },
  progressFill: { height: 4, backgroundColor: '#E91E63', borderRadius: 2 },
});
