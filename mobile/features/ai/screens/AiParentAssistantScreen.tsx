import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface ParentFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  screen: string;
}

export const AiParentAssistantScreen: React.FC<{ navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState<ParentFeature[]>([]);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await fetch('/api/ai/parent-assistant/features');
      const json = await response.json();
      setFeatures(json.data);
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
      <Text style={styles.title}>Assistant Parent</Text>
      <Text style={styles.subtitle}>Suivez la progression de vos enfants</Text>

      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Espace Parent</Text>
        <Text style={styles.welcomeText}>Restez informé du parcours éducatif de vos enfants</Text>
      </View>

      {features.map((feature) => (
        <TouchableOpacity
          key={feature.id}
          style={styles.featureCard}
          onPress={() => navigation.navigate(feature.screen)}
        >
          <Text style={styles.featureIcon}>{feature.icon}</Text>
          <View style={styles.featureInfo}>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  welcomeCard: { backgroundColor: '#9c27b0', borderRadius: 12, padding: 20, marginBottom: 20 },
  welcomeTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  welcomeText: { fontSize: 14, color: 'rgba(255,255,255,0.9)' },
  featureCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  featureIcon: { fontSize: 24, marginRight: 12 },
  featureInfo: { flex: 1 },
  featureTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4, color: '#333' },
  featureDescription: { fontSize: 13, color: '#666' },
  arrow: { fontSize: 18, color: '#999' },
});
