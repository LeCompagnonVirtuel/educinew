import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface AchievementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
}

export const LxpAchievementScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/lxp/achievements');
      const json = await response.json();
      setAchievements(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {achievements.map((achievement) => (
        <TouchableOpacity key={achievement.id} style={styles.card} onPress={() => navigation.navigate('AchievementDetail', { id: achievement.id })}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{achievement.icon}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{achievement.title}</Text>
            <Text style={styles.description}>{achievement.description}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(achievement.progress / achievement.target) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>{achievement.progress}/{achievement.target}</Text>
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
  iconContainer: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  icon: { fontSize: 24 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  description: { fontSize: 12, color: '#666', marginTop: 2 },
  progressBar: { height: 4, backgroundColor: '#e0e0e0', borderRadius: 2, marginTop: 8 },
  progressFill: { height: 4, backgroundColor: '#FF9800', borderRadius: 2 },
  progressText: { fontSize: 10, color: '#999', marginTop: 4 },
});
