import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  available: boolean;
  totalCopies: number;
  availableCopies: number;
}

export const ScBookListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/smart-campus/library/books');
      const json = await response.json();
      setBooks(json.data);
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
      {books.map((book) => (
        <TouchableOpacity
          key={book.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScBookDetail', { id: book.id })}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{book.title}</Text>
            <View style={[styles.availabilityBadge, book.available ? styles.available : styles.unavailable]}>
              <Text style={styles.availabilityText}>
                {book.available ? 'Available' : 'Unavailable'}
              </Text>
            </View>
          </View>
          <Text style={styles.author}>by {book.author}</Text>
          <Text style={styles.isbn}>ISBN: {book.isbn}</Text>
          <View style={styles.detailsRow}>
            <Text style={styles.category}>Category: {book.category}</Text>
            <Text style={styles.copies}>
              {book.availableCopies}/{book.totalCopies} copies
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: '600', flex: 1 },
  author: { fontSize: 14, color: '#666', marginBottom: 4 },
  isbn: { fontSize: 14, color: '#666', marginBottom: 8 },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: { fontSize: 14, color: '#666' },
  copies: { fontSize: 14, color: '#666' },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  available: { backgroundColor: '#d4edda' },
  unavailable: { backgroundColor: '#f8d7da' },
  availabilityText: { fontSize: 12, fontWeight: '600' },
});
