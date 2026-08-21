import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface EBookContent {
  id: string;
  title: string;
  author: string;
  chapters: Chapter[];
  currentPage: number;
  totalPages: number;
}

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export const ScEBookReaderScreen: React.FC<{ route: any }> = ({ route }) => {
  const { bookId } = route.params;
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState<EBookContent | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    fetchBookContent();
  }, [bookId]);

  const fetchBookContent = async () => {
    try {
      const response = await fetch(`/api/smart-campus/library/ebooks/${bookId}/content`);
      const json = await response.json();
      setBook(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const handleNextChapter = () => {
    if (book && currentChapter < book.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const handleIncreaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 2);
    }
  };

  const handleDecreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 2);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Book content unavailable</Text>
      </View>
    );
  }

  const chapter = book.chapters[currentChapter];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle} numberOfLines={1}>{book.title}</Text>
        <Text style={styles.chapterTitle}>{chapter?.title}</Text>
      </View>

      <View style={styles.fontSizeControls}>
        <TouchableOpacity style={styles.fontSizeButton} onPress={handleDecreaseFontSize}>
          <Text style={styles.fontSizeButtonText}>A-</Text>
        </TouchableOpacity>
        <Text style={styles.fontSizeLabel}>{fontSize}px</Text>
        <TouchableOpacity style={styles.fontSizeButton} onPress={handleIncreaseFontSize}>
          <Text style={styles.fontSizeButtonText}>A+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>
        <Text style={[styles.content, { fontSize }]}>{chapter?.content}</Text>
      </ScrollView>

      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentChapter === 0 && styles.navButtonDisabled]}
          onPress={handlePreviousChapter}
          disabled={currentChapter === 0}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageIndicator}>
          {currentChapter + 1} / {book.chapters.length}
        </Text>
        <TouchableOpacity
          style={[styles.navButton, currentChapter === book.chapters.length - 1 && styles.navButtonDisabled]}
          onPress={handleNextChapter}
          disabled={currentChapter === book.chapters.length - 1}
        >
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 40 },
  header: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  chapterTitle: { fontSize: 14, color: '#666' },
  fontSizeControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  fontSizeButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  fontSizeButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  fontSizeLabel: { fontSize: 14, marginHorizontal: 16, color: '#666' },
  contentContainer: { flex: 1, padding: 16 },
  content: { lineHeight: 24, color: '#333' },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#f8f8f8',
  },
  navButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  navButtonDisabled: { backgroundColor: '#ccc' },
  navButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  pageIndicator: { fontSize: 14, color: '#666' },
});
