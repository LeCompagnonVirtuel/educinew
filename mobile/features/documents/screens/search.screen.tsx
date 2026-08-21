import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { useDocumentSearch } from '@/features/documents/hooks';

interface SearchResult {
  id: string;
  name: string;
  type: string;
  author: string;
  updatedAt: string;
  snippet: string;
  relevance: number;
}

const SearchScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [authorFilter, setAuthorFilter] = useState<string | null>(null);
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [classificationFilter, setClassificationFilter] = useState<string | null>(null);
  const [ocrEnabled, setOcrEnabled] = useState(false);

  const dateFilters = ['Today', 'This Week', 'This Month', 'This Year'];
  const authorFilters = ['Dr. Smith', 'Ms. Johnson', 'Mr. Lee', 'Admin'];
  const tagFilters = ['Important', 'Confidential', 'Template'];
  const categoryFilters = ['Academic', 'Finance', 'HR', 'Administrative'];
  const classificationFilters = ['Public', 'Internal', 'Confidential', 'Restricted'];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      setLoading(true);
      setHasSearched(true);
      const mockResults: SearchResult[] = [
        { id: '1', name: 'Curriculum Plan 2024.pdf', type: 'pdf', author: 'Dr. Smith', updatedAt: '2 hours ago', snippet: 'Comprehensive curriculum plan covering all departments...', relevance: 95 },
        { id: '2', name: 'Staff Handbook.docx', type: 'docx', author: 'HR Department', updatedAt: '1 week ago', snippet: 'Staff handbook with updated policies and guidelines...', relevance: 82 },
        { id: '3', name: 'Budget Report Q4.xlsx', type: 'xlsx', author: 'Finance Team', updatedAt: '5 hours ago', snippet: 'Quarterly budget report with expenditure breakdown...', relevance: 78 },
        { id: '4', name: 'Exam Schedule Fall.pdf', type: 'pdf', author: 'Exam Office', updatedAt: '1 day ago', snippet: 'Fall semester exam schedule for all departments...', relevance: 71 },
        { id: '5', name: 'Parent Meeting Minutes.pdf', type: 'pdf', author: 'Admin Office', updatedAt: '1 week ago', snippet: 'Minutes from parent-teacher association meeting...', relevance: 65 },
      ];
      setResults(mockResults);
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handleSearch();
  }, [searchQuery]);

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 80) return '#22c55e';
    if (relevance >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'docx': return '📝';
      case 'xlsx': return '📊';
      case 'pptx': return '📽';
      default: return '📁';
    }
  };

  const renderItem = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity style={styles.resultItem}>
      <View style={styles.resultHeader}>
        <Text style={styles.resultIcon}>{getTypeIcon(item.type)}</Text>
        <View style={styles.resultInfo}>
          <Text style={styles.resultName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.resultMeta}>{item.author} · {item.updatedAt}</Text>
        </View>
        <View style={[styles.relevanceBadge, { backgroundColor: getRelevanceColor(item.relevance) }]}>
          <Text style={styles.relevanceText}>{item.relevance}%</Text>
        </View>
      </View>
      <Text style={styles.resultSnippet} numberOfLines={2}>{item.snippet}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search documents, folders, content..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchBtnText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Date</Text>
        <View style={styles.filterRow}>
          {dateFilters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, dateFilter === f && styles.filterChipActive]}
              onPress={() => setDateFilter(dateFilter === f ? null : f)}
            >
              <Text style={[styles.filterText, dateFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Author</Text>
        <View style={styles.filterRow}>
          {authorFilters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, authorFilter === f && styles.filterChipActive]}
              onPress={() => setAuthorFilter(authorFilter === f ? null : f)}
            >
              <Text style={[styles.filterText, authorFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Category</Text>
        <View style={styles.filterRow}>
          {categoryFilters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, categoryFilter === f && styles.filterChipActive]}
              onPress={() => setCategoryFilter(categoryFilter === f ? null : f)}
            >
              <Text style={[styles.filterText, categoryFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Classification</Text>
        <View style={styles.filterRow}>
          {classificationFilters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, classificationFilter === f && styles.filterChipActive]}
              onPress={() => setClassificationFilter(classificationFilter === f ? null : f)}
            >
              <Text style={[styles.filterText, classificationFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.ocrRow}>
        <Text style={styles.ocrLabel}>Include OCR (scanned docs)</Text>
        <TouchableOpacity
          style={[styles.ocrToggle, ocrEnabled && styles.ocrToggleActive]}
          onPress={() => setOcrEnabled(!ocrEnabled)}
        >
          <Text style={styles.ocrToggleText}>{ocrEnabled ? 'ON' : 'OFF'}</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : hasSearched ? (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text style={styles.emptyText}>No results found</Text>
            </View>
          }
        />
      ) : (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>Enter a search query to find documents</Text>
        </View>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchBtn: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnText: {
    fontSize: 18,
  },
  filterSection: {
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: '#e5e7eb',
  },
  filterChipActive: {
    backgroundColor: '#3b82f6',
  },
  filterText: {
    fontSize: 12,
    color: '#374151',
  },
  filterTextActive: {
    color: '#fff',
  },
  ocrRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ocrLabel: {
    fontSize: 14,
    color: '#374151',
  },
  ocrToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#e5e7eb',
  },
  ocrToggleActive: {
    backgroundColor: '#22c55e',
  },
  ocrToggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  listContent: {
    paddingBottom: 80,
  },
  resultItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  resultMeta: {
    fontSize: 12,
    color: '#6b7280',
  },
  relevanceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  relevanceText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  resultSnippet: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default SearchScreen;
