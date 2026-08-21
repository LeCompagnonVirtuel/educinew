import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface RewardItem {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  isAvailable: boolean;
}

export const LxpRewardListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [rewards, setRewards] = useState<RewardItem[]>([]);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const response = await fetch('/api/lxp/rewards');
      const json = await response.json();
      setRewards(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {rewards.map((reward) => (
        <TouchableOpacity key={reward.id} style={styles.card} onPress={() => navigation.navigate('RewardDetail', { id: reward.id })}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{reward.icon}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{reward.title}</Text>
            <Text style={styles.description}>{reward.description}</Text>
            <Text style={styles.points}>{reward.points} points</Text>
          </View>
          <View style={[styles.statusBadge, reward.isAvailable ? styles.availableBadge : styles.unavailableBadge]}>
            <Text style={[styles.statusText, reward.isAvailable ? styles.availableText : styles.unavailableText]}>
              {reward.isAvailable ? 'Redeem' : 'Locked'}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 8, borderRadius: 8, flexDirection: 'row', alignItems: 'center' },
  iconContainer: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  icon: { fontSize: 24 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  description: { fontSize: 12, color: '#666', marginTop: 2 },
  points: { fontSize: 12, color: '#FF9800', marginTop: 4 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
  availableBadge: { backgroundColor: '#4CAF50' },
  unavailableBadge: { backgroundColor: '#e0e0e0' },
  statusText: { fontSize: 12, fontWeight: '500' },
  availableText: { color: '#fff' },
  unavailableText: { color: '#666' },
});
