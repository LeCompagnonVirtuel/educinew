import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
  TextInput,
} from 'react-native';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  usageCount: number;
  createdAt: string;
  thumbnailColor: string;
}

const TemplatesScreen: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['Academic', 'Administrative', 'Finance', 'HR', 'Legal'];

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const mockData: Template[] = [
        { id: '1', name: 'Report Card Template', category: 'Academic', description: 'Standard report card format for all grade levels', usageCount: 156, createdAt: 'Jan 15, 2024', thumbnailColor: '#3b82f6' },
        { id: '2', name: 'Meeting Agenda', category: 'Administrative', description: 'Standard agenda format for department meetings', usageCount: 89, createdAt: 'Feb 1, 2024', thumbnailColor: '#22c55e' },
        { id: '3', name: 'Invoice Template', category: 'Finance', description: 'Official invoice format for vendor payments', usageCount: 234, createdAt: 'Jan 10, 2024', thumbnailColor: '#f59e0b' },
        { id: '4', name: 'Employment Contract', category: 'HR', description: 'Standard employment agreement template', usageCount: 45, createdAt: 'Mar 1, 2024', thumbnailColor: '#8b5cf6' },
        { id: '5', name: 'Parent Letter', category: 'Academic', description: 'Standard parent communication letter', usageCount: 312, createdAt: 'Jan 20, 2024', thumbnailColor: '#ef4444' },
        { id: '6', name: 'Purchase Order', category: 'Finance', description: 'Standard purchase order form', usageCount: 78, createdAt: 'Feb 15, 2024', thumbnailColor: '#06b6d4' },
        { id: '7', name: 'Disciplinary Notice', category: 'HR', description: 'Student disciplinary action form', usageCount: 34, createdAt: 'Mar 10, 2024', thumbnailColor: '#ec4899' },
        { id: '8', name: 'Event Budget', category: 'Administrative', description: 'Event planning budget template', usageCount: 67, createdAt: 'Feb 20, 2024', thumbnailColor: '#14b8a6' },
      ];
      setTemplates(mockData);
    } catch (err) {
      setError('Failed to fetch templates');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTemplates();
  }, []);

  const handleCreateFromTemplate = (template: Template) => {
    Alert.alert('Create Document', `Create a new document from "${template.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Create', onPress: () => {
        Alert.alert('Created', 'New document created from template');
      }},
    ]);
  };

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderItem = ({ item }: { item: Template }) => (
    <TouchableOpacity style={styles.templateItem} onPress={() => handleCreateFromTemplate(item)}>
      <View style={[styles.thumbnail, { backgroundColor: item.thumbnailColor }]}>
        <Text style={styles.thumbnailText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.templateInfo}>
        <Text style={styles.templateName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.templateCategory}>{item.category}</Text>
        <Text style={styles.templateDesc} numberOfLines={2}>{item.description}</Text>
        <View style={styles.templateMeta}>
          <Text style={styles.metaText}>Used {item.usageCount} times</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{item.createdAt}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.useBtn}>
        <Text style={styles.useBtnText}>Use</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
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
    <View style={styles.container}>
      <Text style={styles.title}>Templates</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search templates..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterRow}>
        <FlatList
          horizontal
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.filterChip, selectedCategory === item && styles.filterChipActive]}
              onPress={() => setSelectedCategory(selectedCategory === item ? null : item)}
            >
              <Text style={[styles.filterText, selectedCategory === item && styles.filterTextActive]}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        data={filteredTemplates}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  searchContainer: { marginBottom: 12 },
  searchInput: { backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 16, borderWidth: 1, borderColor: '#e5e7eb' },
  filterRow: { marginBottom: 12 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: '#e5e7eb', marginRight: 8 },
  filterChipActive: { backgroundColor: '#3b82f6' },
  filterText: { fontSize: 13, color: '#374151' },
  filterTextActive: { color: '#fff' },
  listContent: { paddingBottom: 80 },
  templateItem: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 8, alignItems: 'center', elevation: 2 },
  thumbnail: { width: 52, height: 52, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  thumbnailText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  templateInfo: { flex: 1 },
  templateName: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  templateCategory: { fontSize: 12, color: '#3b82f6', marginBottom: 4 },
  templateDesc: { fontSize: 13, color: '#6b7280', marginBottom: 4 },
  templateMeta: { flexDirection: 'row', alignItems: 'center' },
  metaText: { fontSize: 11, color: '#9ca3af' },
  metaDot: { fontSize: 11, color: '#9ca3af', marginHorizontal: 4 },
  useBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, backgroundColor: '#3b82f6' },
  useBtnText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  errorText: { color: '#ef4444', fontSize: 16 },
});

export default TemplatesScreen;
