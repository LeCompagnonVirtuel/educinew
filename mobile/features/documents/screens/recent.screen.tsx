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

interface RecentDocument {
  id: string;
  name: string;
  type: string;
  author: string;
  accessedAt: string;
  size: string;
  thumbnailColor: string;
}

const RecentScreen: React.FC = () => {
  const [recentDocs, setRecentDocs] = useState<RecentDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchRecent();
  }, []);

  const fetchRecent = async () => {
    try {
      setLoading(true);
      const mockData: RecentDocument[] = [
        { id: '1', name: 'Curriculum Plan 2024.pdf', type: 'pdf', author: 'Dr. Smith', accessedAt: '2 minutes ago', size: '2.4 MB', thumbnailColor: '#ef4444' },
        { id: '2', name: 'Budget Report Q4.xlsx', type: 'xlsx', author: 'Finance Team', accessedAt: '15 minutes ago', size: '1.8 MB', thumbnailColor: '#22c55e' },
        { id: '3', name: 'Staff Handbook.docx', type: 'docx', author: 'HR Department', accessedAt: '1 hour ago', size: '3.2 MB', thumbnailColor: '#3b82f6' },
        { id: '4', name: 'Exam Schedule Fall.pdf', type: 'pdf', author: 'Exam Office', accessedAt: '3 hours ago', size: '420 KB', thumbnailColor: '#f59e0b' },
        { id: '5', name: 'Parent Meeting Minutes.pdf', type: 'pdf', author: 'Admin Office', accessedAt: 'Yesterday', size: '890 KB', thumbnailColor: '#8b5cf6' },
        { id: '6', name: 'Lab Safety Guidelines.pptx', type: 'pptx', author: 'Science Dept', accessedAt: '2 days ago', size: '5.1 MB', thumbnailColor: '#06b6d4' },
        { id: '7', name: 'Student Report Template.docx', type: 'docx', author: 'Academic Office', accessedAt: '3 days ago', size: '1.1 MB', thumbnailColor: '#ec4899' },
        { id: '8', name: 'Campus Tour Video.mp4', type: 'video', author: 'Marketing', accessedAt: '1 week ago', size: '48.5 MB', thumbnailColor: '#14b8a6' },
      ];
      setRecentDocs(mockData);
    } catch (err) {
      setError('Failed to fetch recent documents');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRecent();
  }, []);

  const handleClearHistory = () => {
    Alert.alert('Clear History', 'Clear all recent documents?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: () => setRecentDocs([]) },
    ]);
  };

  const getTimeColor = (accessedAt: string) => {
    if (accessedAt.includes('minute') || accessedAt.includes('hour')) return '#22c55e';
    if (accessedAt.includes('day')) return '#f59e0b';
    return '#6b7280';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'docx': return '📝';
      case 'xlsx': return '📊';
      case 'pptx': return '📽';
      case 'video': return '🎬';
      default: return '📁';
    }
  };

  const renderItem = ({ item }: { item: RecentDocument }) => (
    <TouchableOpacity style={styles.recentItem}>
      <View style={[styles.thumbnail, { backgroundColor: item.thumbnailColor }]}>
        <Text style={styles.thumbnailText}>{getTypeIcon(item.type)}</Text>
      </View>
      <View style={styles.recentInfo}>
        <Text style={styles.recentName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.recentMeta}>{item.author} · {item.size}</Text>
        <Text style={[styles.recentTime, { color: getTimeColor(item.accessedAt) }]}>{item.accessedAt}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
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
        <View>
          <Text style={styles.title}>Recent</Text>
          <Text style={styles.subtitle}>{recentDocs.length} documents</Text>
        </View>
        <TouchableOpacity style={styles.clearBtn} onPress={handleClearHistory}>
          <Text style={styles.clearBtnText}>Clear History</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={recentDocs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No recent documents</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#fef2f2',
  },
  clearBtnText: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 80,
  },
  recentItem: {
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
  recentInfo: {
    flex: 1,
  },
  recentName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  recentMeta: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  recentTime: {
    fontSize: 12,
    fontWeight: '500',
  },
  chevron: {
    fontSize: 20,
    color: '#9ca3af',
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

export default RecentScreen;
