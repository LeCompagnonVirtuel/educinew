import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export const LxpBadgeListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [badges, setBadges] = useState<BadgeItem[]>([]);

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      const response = await fetch('/api/lxp/badges');
      const json = await response.json();
      setBadges(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {badges.map((badge) => (
          <TouchableOpacity
            key={badge.id}
            style={[styles.card, !badge.earned && styles.cardLocked]}
            onPress={() => navigation.navigate('BadgeDetail', { id: badge.id })}
          >
            <Text style={[styles.icon, !badge.earned && styles.iconLocked]}>{badge.icon}</Text>
            <Text style={[styles.name, !badge.earned && styles.nameLocked]}>{badge.name}</Text>
            {badge.earned && <Text style={styles.earnedDate}>{badge.earnedDate}</Text>}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8 },
  card: { width: '45%', backgroundColor: '#fff', padding: 16, margin: 8, borderRadius: 8, alignItems: 'center' },
  cardLocked: { opacity: 0.5 },
  icon: { fontSize: 32, marginBottom: 8 },
  iconLocked: { grayscale: 1 },
  name: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
  nameLocked: { color: '#999' },
  earnedDate: { fontSize: 10, color: '#999', marginTop: 4 },
});
