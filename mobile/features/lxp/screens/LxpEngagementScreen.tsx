import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface EngagementData {
  totalPoints: number;
  rank: number;
  activities: { id: string; type: string; description: string; points: number; date: string; }[];
}

export const LxpEngagementScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [engagement, setEngagement] = useState<EngagementData | null>(null);

  useEffect(() => {
    fetchEngagement();
  }, []);

  const fetchEngagement = async () => {
    try {
      const response = await fetch('/api/lxp/engagement');
      const json = await response.json();
      setEngagement(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (!engagement) return <View style={styles.container}><Text>No data</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.pointsCard}>
          <Text style={styles.pointsValue}>{engagement.totalPoints}</Text>
          <Text style={styles.pointsLabel}>Total Points</Text>
        </View>
        <View style={styles.rankCard}>
          <Text style={styles.rankValue}>#{engagement.rank}</Text>
          <Text style={styles.rankLabel}>Your Rank</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {engagement.activities.map((activity) => (
          <View key={activity.id} style={styles.activityCard}>
            <View style={styles.activityInfo}>
              <Text style={styles.activityType}>{activity.type}</Text>
              <Text style={styles.activityDesc}>{activity.description}</Text>
              <Text style={styles.activityDate}>{activity.date}</Text>
            </View>
            <Text style={styles.activityPoints}>+{activity.points}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', padding: 16, gap: 12 },
  pointsCard: { flex: 1, backgroundColor: '#FF9800', padding: 16, borderRadius: 8, alignItems: 'center' },
  pointsValue: { fontSize: 24, fontWeight: '700', color: '#fff' },
  pointsLabel: { fontSize: 12, color: '#fff', marginTop: 4 },
  rankCard: { flex: 1, backgroundColor: '#9C27B0', padding: 16, borderRadius: 8, alignItems: 'center' },
  rankValue: { fontSize: 24, fontWeight: '700', color: '#fff' },
  rankLabel: { fontSize: 12, color: '#fff', marginTop: 4 },
  section: { backgroundColor: '#fff', padding: 16, margin: 16, marginTop: 0, borderRadius: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  activityCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  activityInfo: { flex: 1 },
  activityType: { fontSize: 12, color: '#2196F3', fontWeight: '500' },
  activityDesc: { fontSize: 14, color: '#333', marginTop: 2 },
  activityDate: { fontSize: 10, color: '#999', marginTop: 2 },
  activityPoints: { fontSize: 16, fontWeight: '600', color: '#4CAF50' },
});
