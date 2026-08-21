import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useDocuments } from '@/features/documents/hooks';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'image' | 'video' | 'other';
  category: string;
  status: 'draft' | 'published' | 'archived' | 'pending';
  tags: string[];
  size: string;
  author: string;
  updatedAt: string;
  thumbnailColor: string;
}

const DocumentsListScreen: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');

  const typeFilters = ['pdf', 'docx', 'xlsx', 'pptx', 'image', 'video'];
  const categoryFilters = ['Academic', 'Administrative', 'Finance', 'HR', 'Legal'];
  const statusFilters = ['draft', 'published', 'archived', 'pending'];
  const tagFilters = ['Important', 'Confidential', 'Template', 'Archived'];

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const mockData: Document[] = [
        { id: '1', name: 'Curriculum Plan 2024.pdf', type: 'pdf', category: 'Academic', status: 'published', tags: ['Important'], size: '2.4 MB', author: 'Dr. Smith', updatedAt: '2 hours ago', thumbnailColor: '#ef4444' },
        { id: '2', name: 'Budget Report Q4.xlsx', type: 'xlsx', category: 'Finance', status: 'draft', tags: ['Confidential'], size: '1.8 MB', author: 'Finance Team', updatedAt: '5 hours ago', thumbnailColor: '#22c55e' },
        { id: '3', name: 'Staff Handbook.docx', type: 'docx', category: 'HR', status: 'published', tags: ['Template'], size: '3.2 MB', author: 'HR Department', updatedAt: 'Yesterday', thumbnailColor: '#3b82f6' },
        { id: '4', name: 'Lab Safety Guidelines.pptx', type: 'pptx', category: 'Academic', status: 'published', tags: [], size: '5.1 MB', author: 'Science Dept', updatedAt: '2 days ago', thumbnailColor: '#f59e0b' },
        { id: '5', name: 'Parent Meeting Minutes.pdf', type: 'pdf', category: 'Administrative', status: 'archived', tags: ['Archived'], size: '890 KB', author: 'Admin Office', updatedAt: '1 week ago', thumbnailColor: '#8b5cf6' },
        { id: '6', name: 'Student Report Template.docx', type: 'docx', category: 'Academic', status: 'published', tags: ['Template'], size: '1.1 MB', author: 'Academic Office', updatedAt: '3 days ago', thumbnailColor: '#ec4899' },
        { id: '7', name: 'Campus Tour Video.mp4', type: 'video', category: 'Administrative', status: 'published', tags: [], size: '48.5 MB', author: 'Marketing', updatedAt: '1 week ago', thumbnailColor: '#06b6d4' },
        { id: '8', name: 'Exam Schedule Fall.pdf', type: 'pdf', category: 'Academic', status: 'pending', tags: ['Important'], size: '420 KB', author: 'Exam Office', updatedAt: '1 day ago', thumbnailColor: '#14b8a6' },
      ];
      setDocuments(mockData);
    } catch (err) {
      setError('Failed to fetch documents');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || doc.type === selectedType;
    const matchesCategory = !selectedCategory || doc.category === selectedCategory;
    const matchesStatus = !selectedStatus || doc.status === selectedStatus;
    const matchesTag = !selectedTag || doc.tags.includes(selectedTag);
    return matchesSearch && matchesType && matchesCategory && matchesStatus && matchesTag;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'size') return a.size.localeCompare(b.size);
    return 0;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return '#22c55e';
      case 'draft': return '#f59e0b';
      case 'archived': return '#6b7280';
      case 'pending': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'docx': return '📝';
      case 'xlsx': return '📊';
      case 'pptx': return '📽';
      case 'image': return '🖼';
      case 'video': return '🎬';
      default: return '📁';
    }
  };

  const renderItem = ({ item }: { item: Document }) => (
    <TouchableOpacity style={styles.documentItem}>
      <View style={[styles.thumbnail, { backgroundColor: item.thumbnailColor }]}>
        <Text style={styles.thumbnailText}>{getTypeIcon(item.type)}</Text>
      </View>
      <View style={styles.documentInfo}>
        <View style={styles.documentHeader}>
          <Text style={styles.documentName} numberOfLines={1}>{item.name}</Text>
        </View>
        <View style={styles.documentMeta}>
          <Text style={styles.metaText}>{item.author}</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{item.size}</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{item.updatedAt}</Text>
        </View>
        <View style={styles.documentFooter}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
          {item.tags.map((tag) => (
            <View key={tag} style={styles.tagBadge}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderGridItem = ({ item }: { item: Document }) => (
    <TouchableOpacity style={styles.gridItem}>
      <View style={[styles.gridThumbnail, { backgroundColor: item.thumbnailColor }]}>
        <Text style={styles.gridThumbnailText}>{getTypeIcon(item.type)}</Text>
      </View>
      <Text style={styles.gridName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.gridMeta}>{item.size}</Text>
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
      <View style={styles.header}>
        <Text style={styles.title}>Documents</Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleBtn, viewMode === 'list' && styles.toggleBtnActive]}
            onPress={() => setViewMode('list')}
          >
            <Text style={[styles.toggleText, viewMode === 'list' && styles.toggleTextActive]}>☰</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, viewMode === 'grid' && styles.toggleBtnActive]}
            onPress={() => setViewMode('grid')}
          >
            <Text style={[styles.toggleText, viewMode === 'grid' && styles.toggleTextActive]}>⊞</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search documents..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterRow}>
        <FlatList
          horizontal
          data={typeFilters}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.filterChip, selectedType === item && styles.filterChipActive]}
              onPress={() => setSelectedType(selectedType === item ? null : item)}
            >
              <Text style={[styles.filterText, selectedType === item && styles.filterTextActive]}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.filterRow}>
        <FlatList
          horizontal
          data={categoryFilters}
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

      <View style={styles.filterRow}>
        <FlatList
          horizontal
          data={statusFilters}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.filterChip, selectedStatus === item && styles.filterChipActive]}
              onPress={() => setSelectedStatus(selectedStatus === item ? null : item)}
            >
              <Text style={[styles.filterText, selectedStatus === item && styles.filterTextActive]}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        {(['name', 'date', 'size'] as const).map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.sortChip, sortBy === option && styles.sortChipActive]}
            onPress={() => setSortBy(option)}
          >
            <Text style={[styles.sortText, sortBy === option && styles.sortTextActive]}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {viewMode === 'list' ? (
        <FlatList
          data={sortedDocuments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      ) : (
        <FlatList
          data={sortedDocuments}
          renderItem={renderGridItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}

      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 2,
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  toggleBtnActive: {
    backgroundColor: '#fff',
  },
  toggleText: {
    fontSize: 16,
    color: '#6b7280',
  },
  toggleTextActive: {
    color: '#3b82f6',
  },
  searchContainer: {
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterRow: {
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#3b82f6',
  },
  filterText: {
    fontSize: 13,
    color: '#374151',
  },
  filterTextActive: {
    color: '#fff',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sortLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 8,
  },
  sortChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
    marginRight: 6,
  },
  sortChipActive: {
    backgroundColor: '#3b82f6',
  },
  sortText: {
    fontSize: 12,
    color: '#374151',
    textTransform: 'capitalize',
  },
  sortTextActive: {
    color: '#fff',
  },
  listContent: {
    paddingBottom: 80,
  },
  documentItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  thumbnailText: {
    fontSize: 22,
  },
  documentInfo: {
    flex: 1,
  },
  documentHeader: {
    marginBottom: 4,
  },
  documentName: {
    fontSize: 15,
    fontWeight: '600',
  },
  documentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
  },
  metaDot: {
    fontSize: 12,
    color: '#9ca3af',
    marginHorizontal: 4,
  },
  documentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
  },
  tagText: {
    fontSize: 11,
    color: '#374151',
  },
  gridItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    margin: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  gridThumbnail: {
    width: 64,
    height: 64,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridThumbnailText: {
    fontSize: 28,
  },
  gridName: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  gridMeta: {
    fontSize: 11,
    color: '#6b7280',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default DocumentsListScreen;
