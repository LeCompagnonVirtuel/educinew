import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

interface SearchResult {
  id: string;
  title: string;
  author: string;
  type: string;
  category: string;
  available: boolean;
}

export const ScLibrarySearchScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchType, setSearchType] = useState<string>('all');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ q: query, type: searchType });
      const response = await fetch(`/api/smart-campus/library/search?${params.toString()}`);
      const json = await response.json();
      setResults(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResultPress = (item: SearchResult) => {
    if (item.type === 'book') {
      navigation.navigate('ScBookDetail', { id: item.id });
    } else if (item.type === 'ebook') {
      navigation.navigate('ScEBookReader', { bookId: item.id });
    } else if (item.type === 'audiobook') {
      navigation.navigate('ScAudiobookPlayer', { bookId: item.id });
    }
  };

  const searchTypes = [
    { key: 'all', label: 'All' },
    { key: 'books', label: 'Books' },
    { key: 'ebooks', label: 'E-Books' },
    { key: 'audiobooks', label: 'Audiobooks' },
  ];

  const renderItem = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => handleResultPress(item)}>
      <View style={styles.resultHeader}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <View style={[styles.typeBadge, item.type === 'book' ? styles.typeBook : item.type === 'ebook' ? styles.typeEBook : styles.typeAudio]}>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
      </View>
      <Text style={styles.resultAuthor}>by {item.author}</Text>
      <View style={styles.resultFooter}>
        <Text style={styles.resultCategory}>{item.category}</Text>
        <View style={[styles.availabilityBadge, item.available ? styles.available : styles.unavailable]}>
          <Text style={styles.availabilityText}>{item.available ? 'Available' : 'Unavailable'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search books, e-books, audiobooks..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {searchTypes.map((type) => (
          <TouchableOpacity
            key={type.key}
            style={[styles.filterButton, searchType === type.key && styles.filterButtonActive]}
            onPress={() => setSearchType(type.key)}
          >
            <Text style={[styles.filterText, searchType === type.key && styles.filterTextActive]}>
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {query ? 'No results found' : 'Search for books, e-books, or audiobooks'}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  filterContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  filterButtonActive: { backgroundColor: '#007AFF' },
  filterText: { fontSize: 14, color: '#666' },
  filterTextActive: { color: '#fff' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  resultsList: { padding: 16 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: { fontSize: 16, color: '#666' },
  resultItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultTitle: { fontSize: 16, fontWeight: '600', flex: 1 },
  resultAuthor: { fontSize: 14, color: '#666', marginBottom: 8 },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultCategory: { fontSize: 14, color: '#666' },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  typeBook: { backgroundColor: '#e3f2fd' },
  typeEBook: { backgroundColor: '#f3e5f5' },
  typeAudio: { backgroundColor: '#e8f5e9' },
  typeText: { fontSize: 12, fontWeight: '600' },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  available: { backgroundColor: '#d4edda' },
  unavailable: { backgroundColor: '#f8d7da' },
  availabilityText: { fontSize: 12, fontWeight: '600' },
});
