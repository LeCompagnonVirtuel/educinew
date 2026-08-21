import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  date: string;
  type: string;
  duration: number;
}

export const AiScheduleScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await fetch('/api/ai/schedule');
      const json = await response.json();
      setSchedule(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cours': return '#1565c0';
      case 'évaluation': return '#dc3545';
      case 'réunion': return '#28a745';
      case 'activité': return '#9c27b0';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Planification</Text>
      <Text style={styles.subtitle}>Votre emploi du temps intelligent</Text>

      {schedule.map((item) => (
        <View key={item.id} style={styles.scheduleCard}>
          <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(item.type) }]} />
          <View style={styles.scheduleContent}>
            <View style={styles.scheduleHeader}>
              <Text style={styles.scheduleTitle}>{item.title}</Text>
              <Text style={styles.scheduleTime}>{item.time}</Text>
            </View>
            <Text style={styles.scheduleDate}>{item.date}</Text>
            <View style={styles.scheduleFooter}>
              <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) + '20' }]}>
                <Text style={[styles.typeText, { color: getTypeColor(item.type) }]}>{item.type}</Text>
              </View>
              <Text style={styles.duration}>{item.duration} min</Text>
            </View>
          </View>
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
  scheduleCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  typeIndicator: { width: 4 },
  scheduleContent: { flex: 1, padding: 16 },
  scheduleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  scheduleTitle: { fontSize: 16, fontWeight: '600', color: '#333', flex: 1 },
  scheduleTime: { fontSize: 14, fontWeight: '600', color: '#1565c0' },
  scheduleDate: { fontSize: 13, color: '#666', marginBottom: 8 },
  scheduleFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  typeText: { fontSize: 12, fontWeight: '600' },
  duration: { fontSize: 12, color: '#999' },
});
