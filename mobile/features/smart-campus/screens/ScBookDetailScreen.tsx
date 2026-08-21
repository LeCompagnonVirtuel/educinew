import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface BookDetail {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  description: string;
  publisher: string;
  publicationYear: number;
  totalCopies: number;
  availableCopies: number;
  location: string;
}

export const ScBookDetailScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState<BookDetail | null>(null);

  useEffect(() => {
    fetchBookDetail();
  }, [id]);

  const fetchBookDetail = async () => {
    try {
      const response = await fetch(`/api/smart-campus/library/books/${id}`);
      const json = await response.json();
      setBook(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Book not found</Text>
      </View>
    );
  }

  const isAvailable = book.availableCopies > 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>ISBN</Text>
          <Text style={styles.value}>{book.isbn}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.value}>{book.category}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Publisher</Text>
          <Text style={styles.value}>{book.publisher}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Year</Text>
          <Text style={styles.value}>{book.publicationYear}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{book.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Availability</Text>
          <Text style={styles.value}>
            {book.availableCopies}/{book.totalCopies} copies
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{book.description}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, !isAvailable && styles.buttonDisabled]}
          onPress={() => isAvailable && navigation.navigate('ScBookLoan', { bookId: book.id })}
          disabled={!isAvailable}
        >
          <Text style={styles.buttonText}>{isAvailable ? 'Borrow Book' : 'Not Available'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate('ScBookReservation', { bookId: book.id })}
        >
          <Text style={styles.buttonSecondaryText}>Reserve</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 40 },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  author: { fontSize: 16, color: '#666' },
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    padding: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: { fontSize: 14, color: '#666' },
  value: { fontSize: 14, fontWeight: '500' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  buttonContainer: {
    padding: 16,
    gap: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  buttonSecondary: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonSecondaryText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
});
