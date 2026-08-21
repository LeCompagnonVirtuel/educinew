import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  category: string;
}

export const AiAchievementsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('toutes');

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/ai/achievements');
      const json = await response.json();
      setAchievements(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['toutes', ...new Set(achievements.map((a) => a.category))];

  const filteredAchievements = selectedCategory === 'toutes'
    ? achievements
    : achievements.filter((a) => a.category === selectedCategory);

  const unlockedCount = achievements.filter((a) => a.unlockedAt !== null).length;

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Réalisations</Text>
      <Text style={styles.subtitle}>Débloquez des récompenses pour vos progrès</Text>

      <View style={styles.statsCard}>
        <Text style={styles.statsValue}>{unlockedCount}/{achievements.length}</Text>
        <Text style={styles.statsLabel}>Réalisations débloquées</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(unlockedCount / achievements.length) * 100}%` }]} />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.filterButton, selectedCategory === category && styles.filterButtonActive]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.filterText, selectedCategory === category && styles.filterTextActive]}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredAchievements.map((achievement) => (
        <View
          key={achievement.id}
          style={[styles.achievementCard, !achievement.unlockedAt && styles.lockedAchievement]}
        >
          <Text style={[styles.achievementIcon, !achievement.unlockedAt && styles.lockedIcon]}>
            {achievement.icon}
          </Text>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementName}>{achievement.name}</Text>
            <Text style={styles.achievementDescription}>{achievement.description}</Text>
            {achievement.unlockedAt && (
              <Text style={styles.achievementDate}>Débloquée le {achievement.unlockedAt}</Text>
            )}
          </View>
          {achievement.unlockedAt ? (
            <Text style={styles.checkmark}>✓</Text>
          ) : (
            <Text style={styles.lockIcon}>🔒</Text>
          )}
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
  statsCard: { backgroundColor: '#1565c0', borderRadius: 12, padding: 20, marginBottom: 16, alignItems: 'center' },
  statsValue: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  statsLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 12 },
  progressBar: { height: 8, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 4, overflow: 'hidden', width: '100%' },
  progressFill: { height: '100%', backgroundColor: '#fff', borderRadius: 4 },
  filterContainer: { marginBottom: 16 },
  filterButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', marginRight: 8, borderWidth: 1, borderColor: '#ddd' },
  filterButtonActive: { backgroundColor: '#1565c0', borderColor: '#1565c0' },
  filterText: { fontSize: 14, color: '#666' },
  filterTextActive: { color: '#fff', fontWeight: '600' },
  achievementCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  lockedAchievement: { opacity: 0.6 },
  achievementIcon: { fontSize: 32, marginRight: 12 },
  lockedIcon: { fontSize: 32, marginRight: 12, grayscale: 1 },
  achievementInfo: { flex: 1 },
  achievementName: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  achievementDescription: { fontSize: 13, color: '#666', marginBottom: 4 },
  achievementDate: { fontSize: 11, color: '#999' },
  checkmark: { fontSize: 18, color: '#28a745', fontWeight: 'bold' },
  lockIcon: { fontSize: 16, color: '#999' },
});
