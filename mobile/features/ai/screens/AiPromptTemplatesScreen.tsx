import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  usageCount: number;
  createdAt: string;
}

export const AiPromptTemplatesScreen: React.FC<{ navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/ai/prompt-templates');
      const json = await response.json();
      setTemplates(json.data);
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
      <Text style={styles.title}>Templates de Prompts</Text>
      <Text style={styles.subtitle}>Bibliothèque de modèles de prompts réutilisables</Text>
      {templates.map((template) => (
        <TouchableOpacity
          key={template.id}
          style={styles.card}
          onPress={() => navigation.navigate('AiPromptTemplateDetail', { id: template.id })}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{template.name}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{template.category}</Text>
            </View>
          </View>
          <Text style={styles.cardSubtitle}>{template.description}</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.footerText}>Utilisé {template.usageCount} fois</Text>
            <Text style={styles.footerText}>{template.createdAt}</Text>
          </View>
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
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: '600', flex: 1 },
  cardSubtitle: { fontSize: 14, color: '#666', marginBottom: 12 },
  categoryBadge: { backgroundColor: '#fff3cd', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  categoryText: { fontSize: 12, fontWeight: '600', color: '#856404' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 12, color: '#999' },
});
