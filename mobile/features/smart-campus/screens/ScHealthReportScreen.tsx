import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

interface HealthReport {
  id: string;
  studentName: string;
  reportDate: string;
  height: number;
  weight: number;
  bmi: number;
  bloodPressure: string;
  heartRate: number;
  vision: string;
  hearing: string;
  generalHealth: string;
  recommendations: string[];
}

export const ScHealthReportScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<HealthReport[]>([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/smart-campus/medical/health-reports');
      const json = await response.json();
      setReports(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: '#ffc107' };
    if (bmi < 25) return { label: 'Normal', color: '#28a745' };
    if (bmi < 30) return { label: 'Overweight', color: '#ffc107' };
    return { label: 'Obese', color: '#dc3545' };
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Health Reports</Text>
        <Text style={styles.headerCount}>{reports.length} Reports</Text>
      </View>

      {reports.map((report) => {
        const bmiCategory = getBMICategory(report.bmi);
        return (
          <View key={report.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.studentName}>{report.studentName}</Text>
              <Text style={styles.reportDate}>{report.reportDate}</Text>
            </View>

            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{report.height} cm</Text>
                <Text style={styles.metricLabel}>Height</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{report.weight} kg</Text>
                <Text style={styles.metricLabel}>Weight</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={[styles.metricValue, { color: bmiCategory.color }]}>{report.bmi.toFixed(1)}</Text>
                <Text style={styles.metricLabel}>BMI</Text>
              </View>
            </View>

            <View style={styles.bmiTag}>
              <Text style={[styles.bmiText, { color: bmiCategory.color }]}>{bmiCategory.label}</Text>
            </View>

            <View style={styles.vitalsSection}>
              <Text style={styles.sectionTitle}>Vitals</Text>
              <View style={styles.vitalsGrid}>
                <View style={styles.vitalItem}>
                  <Text style={styles.vitalLabel}>Blood Pressure</Text>
                  <Text style={styles.vitalValue}>{report.bloodPressure}</Text>
                </View>
                <View style={styles.vitalItem}>
                  <Text style={styles.vitalLabel}>Heart Rate</Text>
                  <Text style={styles.vitalValue}>{report.heartRate} bpm</Text>
                </View>
                <View style={styles.vitalItem}>
                  <Text style={styles.vitalLabel}>Vision</Text>
                  <Text style={styles.vitalValue}>{report.vision}</Text>
                </View>
                <View style={styles.vitalItem}>
                  <Text style={styles.vitalLabel}>Hearing</Text>
                  <Text style={styles.vitalValue}>{report.hearing}</Text>
                </View>
              </View>
            </View>

            <View style={styles.generalSection}>
              <Text style={styles.sectionTitle}>General Health</Text>
              <Text style={styles.generalText}>{report.generalHealth}</Text>
            </View>

            {report.recommendations.length > 0 && (
              <View style={styles.recommendationsSection}>
                <Text style={styles.sectionTitle}>Recommendations</Text>
                {report.recommendations.map((rec, index) => (
                  <Text key={index} style={styles.recommendation}>• {rec}</Text>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  headerCount: { fontSize: 14, color: '#666' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentName: { fontSize: 16, fontWeight: '600' },
  reportDate: { fontSize: 14, color: '#666' },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  metricItem: { alignItems: 'center' },
  metricValue: { fontSize: 18, fontWeight: '700' },
  metricLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  bmiTag: {
    alignSelf: 'center',
    marginBottom: 12,
  },
  bmiText: { fontSize: 14, fontWeight: '600' },
  vitalsSection: { marginBottom: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  vitalItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 6,
  },
  vitalLabel: { fontSize: 12, color: '#999', marginBottom: 4 },
  vitalValue: { fontSize: 14, fontWeight: '500' },
  generalSection: { marginBottom: 12 },
  generalText: { fontSize: 14, color: '#666', lineHeight: 20 },
  recommendationsSection: {},
  recommendation: { fontSize: 14, color: '#666', marginBottom: 6 },
});
