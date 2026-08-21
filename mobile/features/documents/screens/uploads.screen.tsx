import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

interface UploadItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: 'queued' | 'uploading' | 'completed' | 'failed' | 'cancelled';
  uploadedAt?: string;
  error?: string;
  thumbnailColor: string;
}

const UploadsScreen: React.FC = () => {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      setLoading(true);
      const mockData: UploadItem[] = [
        { id: '1', name: 'Curriculum Plan 2025.pdf', size: '2.8 MB', progress: 100, status: 'completed', uploadedAt: '2 min ago', thumbnailColor: '#ef4444' },
        { id: '2', name: 'Budget Report Q1.xlsx', size: '1.5 MB', progress: 65, status: 'uploading', thumbnailColor: '#22c55e' },
        { id: '3', name: 'Staff Training Deck.pptx', size: '8.2 MB', progress: 30, status: 'uploading', thumbnailColor: '#3b82f6' },
        { id: '4', name: 'Meeting Recording.mp4', size: '125 MB', progress: 0, status: 'queued', thumbnailColor: '#f59e0b' },
        { id: '5', name: 'Exam Results Fall.xlsx', size: '1.1 MB', progress: 0, status: 'failed', error: 'Network timeout', thumbnailColor: '#8b5cf6' },
        { id: '6', name: 'Campus Photos.zip', size: '45.3 MB', progress: 0, status: 'cancelled', thumbnailColor: '#06b6d4' },
      ];
      setUploads(mockData);
    } catch (err) {
      setError('Failed to fetch uploads');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUploads();
  }, []);

  const handleRetry = (id: string) => {
    setUploads(uploads.map((u) => u.id === id ? { ...u, status: 'uploading', progress: 0 } : u));
    setTimeout(() => {
      setUploads(uploads.map((u) => u.id === id ? { ...u, status: 'completed', progress: 100, uploadedAt: 'Just now' } : u));
    }, 3000);
  };

  const handleCancel = (id: string) => {
    setUploads(uploads.map((u) => u.id === id ? { ...u, status: 'cancelled', progress: 0 } : u));
  };

  const handleRemove = (id: string) => {
    setUploads(uploads.filter((u) => u.id !== id));
  };

  const getTypeIcon = (name: string) => {
    if (name.endsWith('.pdf')) return '\u{1F4C4}';
    if (name.endsWith('.docx') || name.endsWith('.doc')) return '\u{1F4DD}';
    if (name.endsWith('.xlsx') || name.endsWith('.xls')) return '\u{1F4CA}';
    if (name.endsWith('.pptx') || name.endsWith('.ppt')) return '\u{1F4D1}';
    if (name.endsWith('.mp4') || name.endsWith('.mov')) return '\u{1F3AC}';
    if (name.endsWith('.zip')) return '\u{1F4E6}';
    return '\u{1F4C1}';
  };

  const renderItem = ({ item }: { item: UploadItem }) => (
    <View style={styles.uploadItem}>
      <View style={[styles.thumbnail, { backgroundColor: item.thumbnailColor }]}>
        <Text style={styles.thumbnailText}>{getTypeIcon(item.name)}</Text>
      </View>
      <View style={styles.uploadInfo}>
        <Text style={styles.uploadName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.uploadMeta}>{item.size}</Text>
        {item.status === 'uploading' && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${item.progress}%` as any }]} />
            </View>
            <Text style={styles.progressText}>{item.progress}%</Text>
          </View>
        )}
        {item.status === 'completed' && (
          <Text style={styles.completedText}>Uploaded {item.uploadedAt}</Text>
        )}
        {item.status === 'failed' && (
          <Text style={styles.failedText}>{item.error}</Text>
        )}
        {item.status === 'queued' && (
          <Text style={styles.queuedText}>Waiting to upload...</Text>
        )}
        {item.status === 'cancelled' && (
          <Text style={styles.cancelledText}>Upload cancelled</Text>
        )}
      </View>
      <View style={styles.actions}>
        {item.status === 'completed' && (
          <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemove(item.id)}>
            <Text style={styles.removeBtnText}>X</Text>
          </TouchableOpacity>
        )}
        {(item.status === 'uploading') && (
          <TouchableOpacity style={styles.cancelBtn} onPress={() => handleCancel(item.id)}>
            <Text style={styles.cancelBtnText}>X</Text>
          </TouchableOpacity>
        )}
        {(item.status === 'failed' || item.status === 'cancelled') && (
          <TouchableOpacity style={styles.retryBtn} onPress={() => handleRetry(item.id)}>
            <Text style={styles.retryBtnText}>R</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
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

  const completedCount = uploads.filter((u) => u.status === 'completed').length;
  const activeCount = uploads.filter((u) => u.status === 'uploading').length;
  const failedCount = uploads.filter((u) => u.status === 'failed').length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uploads</Text>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#22c55e' }]}>{completedCount}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#3b82f6' }]}>{activeCount}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#ef4444' }]}>{failedCount}</Text>
          <Text style={styles.statLabel}>Failed</Text>
        </View>
      </View>
      <FlatList
        data={uploads}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  statsRow: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 16, elevation: 2 },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#6b7280', marginTop: 4 },
  listContent: { paddingBottom: 80 },
  uploadItem: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 8, alignItems: 'center', elevation: 2 },
  thumbnail: { width: 48, height: 48, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  thumbnailText: { fontSize: 22 },
  uploadInfo: { flex: 1 },
  uploadName: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  uploadMeta: { fontSize: 12, color: '#6b7280', marginBottom: 4 },
  progressContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  progressBar: { flex: 1, height: 6, backgroundColor: '#e5e7eb', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#3b82f6', borderRadius: 3 },
  progressText: { fontSize: 12, color: '#3b82f6', fontWeight: '600', minWidth: 36 },
  completedText: { fontSize: 12, color: '#22c55e' },
  failedText: { fontSize: 12, color: '#ef4444' },
  queuedText: { fontSize: 12, color: '#f59e0b' },
  cancelledText: { fontSize: 12, color: '#6b7280' },
  actions: { gap: 4 },
  removeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center' },
  removeBtnText: { color: '#6b7280', fontWeight: '600' },
  cancelBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#fef2f2', justifyContent: 'center', alignItems: 'center' },
  cancelBtnText: { color: '#ef4444', fontWeight: '600' },
  retryBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#e0e7ff', justifyContent: 'center', alignItems: 'center' },
  retryBtnText: { color: '#3730a3', fontWeight: '600' },
  errorText: { color: '#ef4444', fontSize: 16 },
});

export default UploadsScreen;
