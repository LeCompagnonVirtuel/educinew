import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  avatar: string;
  isCurrentUser: boolean;
}

export const AiLeaderboardScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/ai/leaderboard');
      const json = await response.json();
      setLeaderboard(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return '#ffd700';
      case 2: return '#c0c0c0';
      case 3: return '#cd7f32';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Classement</Text>
      <Text style={styles.subtitle}>Classement des meilleurs apprenants</Text>

      {leaderboard.slice(0, 3).map((entry, index) => (
        <View key={index} style={[styles.podiumCard, { borderLeftColor: getRankColor(entry.rank) }]}>
          <View style={styles.podiumRank}>
            <Text style={[styles.rankBadge, { backgroundColor: getRankColor(entry.rank) }]}>{entry.rank}</Text>
          </View>
          <Text style={styles.podiumAvatar}>{entry.avatar}</Text>
          <View style={styles.podiumInfo}>
            <Text style={styles.podiumName}>{entry.name}</Text>
            <Text style={styles.podiumScore}>{entry.score} points</Text>
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Autres participants</Text>
      {leaderboard.slice(3).map((entry, index) => (
        <View key={index} style={[styles.leaderboardRow, entry.isCurrentUser && styles.currentUserRow]}>
          <Text style={styles.rankNumber}>{entry.rank}</Text>
          <Text style={styles.rowAvatar}>{entry.avatar}</Text>
          <Text style={[styles.rowName, entry.isCurrentUser && styles.currentUserText]}>{entry.name}</Text>
          <Text style={styles.rowScore}>{entry.score}</Text>
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
  podiumCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderLeftWidth: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  podiumRank: { marginRight: 12 },
  rankBadge: { width: 32, height: 32, borderRadius: 16, textAlign: 'center', lineHeight: 32, color: '#fff', fontWeight: 'bold', fontSize: 14 },
  podiumAvatar: { fontSize: 32, marginRight: 12 },
  podiumInfo: { flex: 1 },
  podiumName: { fontSize: 16, fontWeight: '600', color: '#333' },
  podiumScore: { fontSize: 14, color: '#1565c0', marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333', marginTop: 8 },
  leaderboardRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 8 },
  currentUserRow: { backgroundColor: '#e3f2fd', borderWidth: 2, borderColor: '#1565c0' },
  rankNumber: { width: 30, fontSize: 14, fontWeight: '600', color: '#666' },
  rowAvatar: { fontSize: 24, marginRight: 12 },
  rowName: { flex: 1, fontSize: 14, color: '#333' },
  currentUserText: { fontWeight: '600', color: '#1565c0' },
  rowScore: { fontSize: 14, fontWeight: '600', color: '#666' },
});
