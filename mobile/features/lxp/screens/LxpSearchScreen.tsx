import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

interface SearchResult {
  id: string;
  title: string;
  type: string;
  description: string;
}

export const LxpSearchScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/lxp/search?q=${encodeURIComponent(query)}`);
      const json = await response.json();
      setResults(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search courses, lessons, topics..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <ScrollView style={styles.results}>
          {results.length === 0 && query.length > 0 && (
            <Text style={styles.noResults}>No results found</Text>
          )}
          {results.map((result) => (
            <TouchableOpacity key={result.id} style={styles.resultCard} onPress={() => navigation.navigate(result.type, { id: result.id })}>
              <Text style={styles.resultType}>{result.type}</Text>
              <Text style={styles.resultTitle}>{result.title}</Text>
              <Text style={styles.resultDescription}>{result.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  searchBar: { flexDirection: 'row', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  searchInput: { flex: 1, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8 },
  searchButton: { backgroundColor: '#2196F3', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, justifyContent: 'center' },
  searchButtonText: { color: '#fff', fontWeight: '600' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  results: { flex: 1, padding: 16 },
  noResults: { textAlign: 'center', color: '#666', marginTop: 32 },
  resultCard: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12 },
  resultType: { fontSize: 10, color: '#2196F3', fontWeight: '600', textTransform: 'uppercase' },
  resultTitle: { fontSize: 16, fontWeight: '600', marginTop: 4 },
  resultDescription: { fontSize: 14, color: '#666', marginTop: 4 },
});
