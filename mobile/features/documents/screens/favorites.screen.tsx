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
} from 'react-native';

interface FavoriteDocument {
  id: string;
  name: string;
  type: string;
  author: string;
  addedAt: string;
  size: string;
  thumbnailColor: string;
}

const FavoritesScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const mockData: FavoriteDocument[] = [
        { id: '1', name: 'Curriculum Plan 2024.pdf', type: 'pdf', author: 'Dr. Smith', addedAt: '2 hours ago', size: '2.4 MB', thumbnailColor: '#ef4444' },
        { id: '2', name: 'Staff Handbook.docx', type: 'docx', author: 'HR Department', addedAt: 'Yesterday', size: '3.2 MB', thumbnailColor: '#3b82f6' },
        { id: '3', name: 'Budget Report Q4.xlsx', type: 'xlsx', author: 'Finance Team', addedAt: '3 days ago', size: '1.8 MB', thumbnailColor: '#22c55e' },
        { id: '4', name: 'Exam Schedule Fall.pdf', type: 'pdf', author: 'Exam Office', addedAt: '1 week ago', size: '420 KB', thumbnailColor: '#f59e0b' },
        { id: '5', name: 'Parent Meeting Minutes.pdf', type: 'pdf', author: 'Admin Office', addedAt: '2 weeks ago', size: '890 KB', thumbnailColor: '#8b5cf6' },
      ];
      setFavorites(mockData);
    } catch (err) {
      setError('Failed to fetch favorites');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFavorites();
  }, []);

  const handleRemove = (id: string, name: string) => {
    Alert.alert('Remove', `Remove "${name}" from favorites?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => {
        setFavorites(favorites.filter((f) => f.id !== id));
      }},
    ]);
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

  const renderItem = ({ item }: { item: FavoriteDocument }) => (
    <TouchableOpacity style={styles.favoriteItem}>
      <View style={[styles.thumbnail, { backgroundColor: item.thumbnailColor }]}>
        <Text style={styles.thumbnailText}>{getTypeIcon(item.type)}</Text>
      </View>
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.favoriteMeta}>{item.author} · {item.size}</Text>
        <Text style={styles.favoriteTime}>Added {item.addedAt}</Text>
      </View>
      <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemove(item.id, item.name)}>
        <Text style={styles.removeBtnText}>★</Text>
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
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.subtitle}>{favorites.length} documents</Text>

      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No favorite documents</Text>
          </View>
        }
      />
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 80,
  },
  favoriteItem: {
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
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  favoriteMeta: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  favoriteTime: {
    fontSize: 11,
    color: '#9ca3af',
  },
  removeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeBtnText: {
    fontSize: 16,
    color: '#f59e0b',
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

export default FavoritesScreen;
