import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  avatar: string;
}

export const LxpLeaderboardScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/lxp/leaderboard');
      const json = await response.json();
      setEntries(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {entries.map((entry) => (
        <View key={entry.rank} style={styles.card}>
          <View style={[styles.rankBadge, entry.rank <= 3 && styles.topRankBadge]}>
            <Text style={[styles.rankText, entry.rank <= 3 && styles.topRankText]}>{entry.rank}</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{entry.name.charAt(0)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{entry.name}</Text>
            <Text style={styles.points}>{entry.points} points</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 4, borderRadius: 8, flexDirection: 'row', alignItems: 'center' },
  rankBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  topRankBadge: { backgroundColor: '#FFC107' },
  rankText: { fontSize: 14, fontWeight: '700', color: '#666' },
  topRankText: { color: '#fff' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#2196F3', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '500' },
  points: { fontSize: 12, color: '#666', marginTop: 2 },
});
