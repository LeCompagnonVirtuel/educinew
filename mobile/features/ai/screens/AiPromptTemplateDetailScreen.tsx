import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

interface TemplateDetail {
  id: string;
  name: string;
  description: string;
  category: string;
  content: string;
  variables: { name: string; description: string; defaultValue: string }[];
  usageCount: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export const AiPromptTemplateDetailScreen: React.FC<{ route: { params: { id: string } } }> = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<TemplateDetail | null>(null);

  useEffect(() => {
    fetchTemplateDetail();
  }, []);

  const fetchTemplateDetail = async () => {
    try {
      const response = await fetch(`/api/ai/prompt-templates/${route.params.id}`);
      const json = await response.json();
      setTemplate(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!template) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Template non trouvé</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{template.name}</Text>
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{template.category}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.sectionText}>{template.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contenu du Template</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>{template.content}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Variables</Text>
        {template.variables.map((variable, index) => (
          <View key={index} style={styles.variableCard}>
            <Text style={styles.variableName}>{`{{${variable.name}}}`}</Text>
            <Text style={styles.variableDescription}>{variable.description}</Text>
            <Text style={styles.variableDefault}>Valeur par défaut: {variable.defaultValue}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tags</Text>
        <View style={styles.tagsContainer}>
          {template.tags.map((tag, index) => (
            <View key={index} style={styles.tagBadge}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statistiques</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{template.usageCount}</Text>
            <Text style={styles.statLabel}>Utilisations</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{template.variables.length}</Text>
            <Text style={styles.statLabel}>Variables</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{template.tags.length}</Text>
            <Text style={styles.statLabel}>Tags</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  categoryBadge: { alignSelf: 'flex-start', backgroundColor: '#fff3cd', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginBottom: 16 },
  categoryText: { fontSize: 14, fontWeight: '600', color: '#856404' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333' },
  sectionText: { fontSize: 14, color: '#666', lineHeight: 20 },
  codeBlock: { backgroundColor: '#1e1e1e', borderRadius: 12, padding: 16 },
  codeText: { fontFamily: 'monospace', fontSize: 13, color: '#d4d4d4', lineHeight: 18 },
  variableCard: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 8 },
  variableName: { fontFamily: 'monospace', fontSize: 14, color: '#e91e63', fontWeight: '600', marginBottom: 4 },
  variableDescription: { fontSize: 14, color: '#333', marginBottom: 4 },
  variableDefault: { fontSize: 12, color: '#999' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagBadge: { backgroundColor: '#e8eaf6', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  tagText: { fontSize: 12, color: '#3f51b5' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 12, backgroundColor: '#fff', borderRadius: 12, marginHorizontal: 4 },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#1565c0' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 4 },
});
