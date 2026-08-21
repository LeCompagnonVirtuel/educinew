import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Switch } from 'react-native';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  enabled: boolean;
  lastRun: string;
}

export const AiAutomationScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [rules, setRules] = useState<AutomationRule[]>([]);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await fetch('/api/ai/automation');
      const json = await response.json();
      setRules(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRule = (id: string) => {
    setRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)));
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Automatisation</Text>
      <Text style={styles.subtitle}>Règles d'automatisation IA</Text>

      {rules.map((rule) => (
        <View key={rule.id} style={[styles.ruleCard, !rule.enabled && styles.disabledRule]}>
          <View style={styles.ruleHeader}>
            <View style={styles.ruleInfo}>
              <Text style={styles.ruleName}>{rule.name}</Text>
              <Text style={styles.ruleDescription}>{rule.description}</Text>
            </View>
            <Switch value={rule.enabled} onValueChange={() => toggleRule(rule.id)} trackColor={{ false: '#ccc', true: '#81c784' }} />
          </View>

          <View style={styles.ruleBody}>
            <View style={styles.ruleStep}>
              <Text style={styles.stepLabel}>Déclencheur :</Text>
              <Text style={styles.stepValue}>{rule.trigger}</Text>
            </View>
            <Text style={styles.arrow}>↓</Text>
            <View style={styles.ruleStep}>
              <Text style={styles.stepLabel}>Action :</Text>
              <Text style={styles.stepValue}>{rule.action}</Text>
            </View>
          </View>

          <Text style={styles.lastRun}>Dernière exécution : {rule.lastRun}</Text>
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
  ruleCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  disabledRule: { opacity: 0.6 },
  ruleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  ruleInfo: { flex: 1, marginRight: 12 },
  ruleName: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  ruleDescription: { fontSize: 13, color: '#666' },
  ruleBody: { backgroundColor: '#f8f9fa', borderRadius: 8, padding: 12, marginBottom: 12 },
  ruleStep: { marginVertical: 4 },
  stepLabel: { fontSize: 12, fontWeight: '600', color: '#1565c0', marginBottom: 2 },
  stepValue: { fontSize: 14, color: '#333' },
  arrow: { fontSize: 16, color: '#999', textAlign: 'center', marginVertical: 4 },
  lastRun: { fontSize: 12, color: '#999' },
});
