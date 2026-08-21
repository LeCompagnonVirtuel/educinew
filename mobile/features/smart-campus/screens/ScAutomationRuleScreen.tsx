import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScAutomationRuleScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [rules, setRules] = useState<any[]>([]);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await fetch('/api/smart-campus/iot/automation-rules');
      const data = await response.json();
      setRules(data.data);
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
      {rules.map((rule) => (
        <TouchableOpacity
          key={rule.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScAutomationRuleDetail', { id: rule.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{rule.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: rule.enabled ? '#4CAF50' : '#9E9E9E' }]}>
              <Text style={styles.statusText}>{rule.enabled ? 'Enabled' : 'Disabled'}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Trigger: {rule.triggerType}</Text>
          <Text style={styles.info}>Condition: {rule.condition}</Text>
          <Text style={styles.info}>Action: {rule.action}</Text>
          <Text style={styles.info}>Last Triggered: {rule.lastTriggered}</Text>
          <Text style={styles.info}>Trigger Count: {rule.triggerCount}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
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
