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

interface OfflineDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  syncStatus: 'synced' | 'pending' | 'conflict' | 'error';
  lastSynced: string;
  downloadProgress?: number;
  thumbnailColor: string;
}

const OfflineScreen: React.FC = () => {
  const [documents, setDocuments] = useState<OfflineDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchOfflineDocs();
  }, []);

  const fetchOfflineDocs = async () => {
    try {
      setLoading(true);
      const mockData: OfflineDocument[] = [
        { id: '1', name: 'Curriculum Plan 2024.pdf', type: 'pdf', size: '2.4 MB', syncStatus: 'synced', lastSynced: '2 min ago', thumbnailColor: '#ef4444' },
        { id: '2', name: 'Staff Handbook.docx', type: 'docx', size: '3.2 MB', syncStatus: 'synced', lastSynced: '1 hour ago', thumbnailColor: '#3b82f6' },
        { id: '3', name: 'Budget Report Q4.xlsx', type: 'xlsx', size: '1.8 MB', syncStatus: 'pending', lastSynced: '3 hours ago', thumbnailColor: '#22c55e' },
        { id: '4', name: 'Exam Schedule Fall.pdf', type: 'pdf', size: '420 KB', syncStatus: 'conflict', lastSynced: 'Yesterday', thumbnailColor: '#f59e0b' },
        { id: '5', name: 'Parent Meeting Minutes.pdf', type: 'pdf', size: '890 KB', syncStatus: 'error', lastSynced: '3 days ago', thumbnailColor: '#8b5cf6' },
        { id: '6', name: 'Lab Safety Guidelines.pptx', type: 'pptx', size: '5.1 MB', syncStatus: 'synced', lastSynced: '5 min ago', thumbnailColor: '#06b6d4' },
      ];
      setDocuments(mockData);
    } catch (err) {
      setError('Failed to fetch offline documents');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOfflineDocs();
  }, []);

  const handleSync = (id: string) => {
    setDocuments(documents.map((d) => d.id === id ? { ...d, syncStatus: 'pending' } : d));
    setTimeout(() => {
      setDocuments(documents.map((d) => d.id === id ? { ...d, syncStatus: 'synced', lastSynced: 'Just now' } : d));
    }, 2000);
  };

  const handleDownloadForOffline = (id: string, name: string) => {
    Alert.alert('Download', `Download "${name}" for offline access?`);
  };

  const handleResolveConflict = (id: string, name: string) => {
    Alert.alert('Resolve Conflict', `Choose resolution for "${name}":`, [
      { text: 'Keep Local', onPress: () => {
        setDocuments(documents.map((d) => d.id === id ? { ...d, syncStatus: 'synced' } : d));
      }},
      { text: 'Keep Server', onPress: () => {
        setDocuments(documents.map((d) => d.id === id ? { ...d, syncStatus: 'synced' } : d));
      }},
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const getSyncStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return '#22c55e';
      case 'pending': return '#f59e0b';
      case 'conflict': return '#ef4444';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getSyncStatusIcon = (status: string) => {
    switch (status) {
      case 'synced': return '✓';
      case 'pending': return '⟳';
      case 'conflict': return '⚠';
      case 'error': return '✕';
      default: return '?';
    }
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

  const renderItem = ({ item }: { item: OfflineDocument }) => (
    <View style={styles.offlineItem}>
      <View style={[styles.thumbnail, { backgroundColor: item.thumbnailColor }]}>
        <Text style={styles.thumbnailText}>{getTypeIcon(item.type)}</Text>
      </View>
      <View style={styles.offlineInfo}>
        <Text style={styles.offlineName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.offlineMeta}>{item.size} · Last synced: {item.lastSynced}</Text>
        <View style={styles.statusRow}>
          <View style={[styles.statusDot, { backgroundColor: getSyncStatusColor(item.syncStatus) }]} />
          <Text style={[styles.statusText, { color: getSyncStatusColor(item.syncStatus) }]}>{item.syncStatus}</Text>
          {item.syncStatus === 'pending' && <ActivityIndicator size="small" color="#f59e0b" style={{ marginLeft: 6 }} />}
        </View>
      </View>
      <View style={styles.actions}>
        {item.syncStatus === 'synced' && (
          <TouchableOpacity style={styles.actionBtn} onPress={() => handleSync(item.id)}>
            <Text style={styles.actionIcon}>⟳</Text>
          </TouchableOpacity>
        )}
        {item.syncStatus === 'conflict' && (
          <TouchableOpacity style={[styles.actionBtn, styles.conflictBtn]} onPress={() => handleResolveConflict(item.id, item.name)}>
            <Text style={styles.actionIcon}>⚠</Text>
          </TouchableOpacity>
        )}
        {item.syncStatus === 'error' && (
          <TouchableOpacity style={[styles.actionBtn, styles.errorBtn]} onPress={() => handleSync(item.id)}>
            <Text style={styles.actionIcon}>↻</Text>
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

  const syncedCount = documents.filter((d) => d.syncStatus === 'synced').length;
  const conflictCount = documents.filter((d) => d.syncStatus === 'conflict').length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Offline</Text>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{documents.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#22c55e' }]}>{syncedCount}</Text>
          <Text style={styles.statLabel}>Synced</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#ef4444' }]}>{conflictCount}</Text>
          <Text style={styles.statLabel}>Conflicts</Text>
        </View>
      </View>

      <FlatList
        data={documents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 80,
  },
  offlineItem: {
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
  offlineInfo: {
    flex: 1,
  },
  offlineName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  offlineMeta: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 6,
    textTransform: 'capitalize',
  },
  actions: {
    gap: 4,
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  conflictBtn: {
    backgroundColor: '#fef2f2',
  },
  errorBtn: {
    backgroundColor: '#fef2f2',
  },
  actionIcon: {
    fontSize: 14,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default OfflineScreen;
