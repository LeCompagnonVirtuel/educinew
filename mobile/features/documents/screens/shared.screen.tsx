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

interface SharedDocument {
  id: string;
  name: string;
  type: string;
  sharedBy: string;
  sharedAt: string;
  shareType: 'with_me' | 'by_me' | 'public';
  permission: 'view' | 'edit';
  size: string;
  thumbnailColor: string;
}

const SharedScreen: React.FC = () => {
  const [documents, setDocuments] = useState<SharedDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'with_me' | 'by_me' | 'public'>('with_me');

  useEffect(() => {
    fetchShared();
  }, []);

  const fetchShared = async () => {
    try {
      setLoading(true);
      const mockData: SharedDocument[] = [
        { id: '1', name: 'Budget Report Q4.xlsx', type: 'xlsx', sharedBy: 'Finance Team', sharedAt: '2 hours ago', shareType: 'with_me', permission: 'view', size: '1.8 MB', thumbnailColor: '#22c55e' },
        { id: '2', name: 'Staff Handbook.docx', type: 'docx', sharedBy: 'HR Department', sharedAt: 'Yesterday', shareType: 'with_me', permission: 'edit', size: '3.2 MB', thumbnailColor: '#3b82f6' },
        { id: '3', name: 'Meeting Notes.pdf', type: 'pdf', sharedBy: 'Ms. Johnson', sharedAt: '3 days ago', shareType: 'with_me', permission: 'view', size: '560 KB', thumbnailColor: '#f59e0b' },
        { id: '4', name: 'Curriculum Plan 2024.pdf', type: 'pdf', sharedBy: 'Dr. Smith', sharedAt: '1 week ago', shareType: 'by_me', permission: 'view', size: '2.4 MB', thumbnailColor: '#ef4444' },
        { id: '5', name: 'Exam Schedule Fall.pdf', type: 'pdf', sharedBy: 'Dr. Smith', sharedAt: '2 weeks ago', shareType: 'by_me', permission: 'edit', size: '420 KB', thumbnailColor: '#f59e0b' },
        { id: '6', name: 'School Calendar.xlsx', type: 'xlsx', sharedBy: 'Admin', sharedAt: '1 month ago', shareType: 'public', permission: 'view', size: '1.2 MB', thumbnailColor: '#8b5cf6' },
        { id: '7', name: 'Campus Map.pdf', type: 'pdf', sharedBy: 'Marketing', sharedAt: '3 months ago', shareType: 'public', permission: 'view', size: '3.8 MB', thumbnailColor: '#06b6d4' },
      ];
      setDocuments(mockData);
    } catch (err) {
      setError('Failed to fetch shared documents');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchShared();
  }, []);

  const handleCopyLink = (name: string) => {
    Alert.alert('Link Copied', `Share link for "${name}" copied to clipboard`);
  };

  const handleRevokeAccess = (id: string, name: string) => {
    Alert.alert('Revoke', `Revoke access for "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Revoke', style: 'destructive', onPress: () => {
        setDocuments(documents.filter((d) => d.id !== id));
      }},
    ]);
  };

  const getShareTypeLabel = (shareType: string) => {
    switch (shareType) {
      case 'with_me': return 'Shared with me';
      case 'by_me': return 'Shared by me';
      case 'public': return 'Public';
      default: return shareType;
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

  const filteredDocs = documents.filter((d) => d.shareType === activeTab);

  const renderItem = ({ item }: { item: SharedDocument }) => (
    <TouchableOpacity style={styles.sharedItem}>
      <View style={[styles.thumbnail, { backgroundColor: item.thumbnailColor }]}>
        <Text style={styles.thumbnailText}>{getTypeIcon(item.type)}</Text>
      </View>
      <View style={styles.sharedInfo}>
        <Text style={styles.sharedName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.sharedMeta}>
          {activeTab === 'with_me' ? `From: ${item.sharedBy}` : `To: ${item.sharedBy}`} · {item.sharedAt}
        </Text>
        <View style={styles.sharedFooter}>
          <Text style={styles.sharedSize}>{item.size}</Text>
          <View style={[styles.permissionBadge, { backgroundColor: item.permission === 'edit' ? '#f59e0b' : '#e5e7eb' }]}>
            <Text style={[styles.permissionText, { color: item.permission === 'edit' ? '#fff' : '#374151' }]}>{item.permission}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.linkBtn} onPress={() => handleCopyLink(item.name)}>
        <Text style={styles.linkBtnText}>🔗</Text>
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
      <Text style={styles.title}>Shared</Text>

      <View style={styles.tabBar}>
        {(['with_me', 'by_me', 'public'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {getShareTypeLabel(tab)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredDocs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No shared documents</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 16,
    paddingBottom: 0,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: '#3b82f6',
  },
  tabText: {
    fontSize: 12,
    color: '#6b7280',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  sharedItem: {
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
  sharedInfo: {
    flex: 1,
  },
  sharedName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  sharedMeta: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  sharedFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sharedSize: {
    fontSize: 12,
    color: '#9ca3af',
  },
  permissionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  permissionText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  linkBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkBtnText: {
    fontSize: 14,
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

export default SharedScreen;
