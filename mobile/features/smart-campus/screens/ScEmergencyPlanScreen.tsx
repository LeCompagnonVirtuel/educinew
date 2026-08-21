import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScEmergencyPlanScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/smart-campus/security/emergency-plans');
      const data = await response.json();
      setPlans(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      {plans.map((plan) => (
        <TouchableOpacity
          key={plan.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScEmergencyPlanDetail', { id: plan.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{plan.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(plan.status) }]}>
              <Text style={styles.statusText}>{plan.status}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Type: {plan.type}</Text>
          <Text style={styles.info}>Last Updated: {plan.lastUpdated}</Text>
          <Text style={styles.info}>Last Drilled: {plan.lastDrillDate}</Text>
          <Text style={styles.info}>Assigned Buildings: {plan.buildingCount}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return '#4CAF50';
    case 'under review':
      return '#FF9800';
    case 'outdated':
      return '#f44336';
    default:
      return '#9E9E9E';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  info: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
});
