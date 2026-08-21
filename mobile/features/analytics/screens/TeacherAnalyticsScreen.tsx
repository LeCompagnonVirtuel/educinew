import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

interface TeacherMetric {
  id: string;
  teacherName: string;
  subject: string;
  studentCount: number;
  avgPerformance: number;
  attendanceRate: number;
}

const TeacherAnalyticsScreen: React.FC = () => {
  const [data, setData] = useState<TeacherMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const fetchTeacherData = async () => {
    try {
      setLoading(true);
      const mockData: TeacherMetric[] = [
        { id: '1', teacherName: 'Dr. Sarah Johnson', subject: 'Mathematics', studentCount: 120, avgPerformance: 82.5, attendanceRate: 96.2 },
        { id: '2', teacherName: 'Prof. Michael Chen', subject: 'Science', studentCount: 95, avgPerformance: 85.1, attendanceRate: 94.8 },
        { id: '3', teacherName: 'Ms. Emily Davis', subject: 'English', studentCount: 110, avgPerformance: 78.3, attendanceRate: 97.1 },
        { id: '4', teacherName: 'Mr. James Wilson', subject: 'History', studentCount: 88, avgPerformance: 80.7, attendanceRate: 93.5 },
      ];
      setData(mockData);
    } catch (err) {
      setError('Failed to fetch teacher data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Teacher Analytics</Text>
      {data.map((teacher) => (
        <View key={teacher.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.teacherName}>{teacher.teacherName}</Text>
            <Text style={styles.subject}>{teacher.subject}</Text>
          </View>
          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Students</Text>
              <Text style={styles.metricValue}>{teacher.studentCount}</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Avg Performance</Text>
              <Text style={styles.metricValue}>{teacher.avgPerformance}%</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Attendance</Text>
              <Text style={styles.metricValue}>{teacher.attendanceRate}%</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subject: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default TeacherAnalyticsScreen;
