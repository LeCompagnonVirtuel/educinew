import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface BookmarkItem {
  id: string;
  title: string;
  type: string;
  addedDate: string;
}

export const LxpBookmarkScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await fetch('/api/lxp/bookmarks');
      const json = await response.json();
      setBookmarks(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = async (id: string) => {
    try {
      await fetch(`/api/lxp/bookmarks/${id}`, { method: 'DELETE' });
      setBookmarks(bookmarks.filter((b) => b.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {bookmarks.length === 0 && (
        <Text style={styles.empty}>No bookmarks yet</Text>
      )}
      {bookmarks.map((bookmark) => (
        <View key={bookmark.id} style={styles.card}>
          <TouchableOpacity style={styles.content} onPress={() => navigation.navigate(bookmark.type, { id: bookmark.id })}>
            <Text style={styles.type}>{bookmark.type}</Text>
            <Text style={styles.title}>{bookmark.title}</Text>
            <Text style={styles.date}>Added: {bookmark.addedDate}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={() => removeBookmark(bookmark.id)}>
            <Text style={styles.removeText}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { textAlign: 'center', color: '#666', marginTop: 32 },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 8, borderRadius: 8, flexDirection: 'row', alignItems: 'center' },
  content: { flex: 1 },
  type: { fontSize: 10, color: '#2196F3', fontWeight: '600', textTransform: 'uppercase' },
  title: { fontSize: 16, fontWeight: '600', marginTop: 4 },
  date: { fontSize: 12, color: '#999', marginTop: 4 },
  removeButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFEBEE', justifyContent: 'center', alignItems: 'center' },
  removeText: { fontSize: 14, color: '#f44336' },
});
