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
import { useFolderDetail } from '@/features/documents/hooks';

interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'document';
  size?: string;
  updatedAt: string;
  color: string;
}

interface FolderPermission {
  id: string;
  userName: string;
  access: 'view' | 'edit' | 'admin';
}

interface FolderActivity {
  id: string;
  action: string;
  user: string;
  timestamp: string;
}

const FolderDetailScreen: React.FC = () => {
  const [items, setItems] = useState<FolderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'contents' | 'permissions' | 'activity'>('contents');
  const [permissions, setPermissions] = useState<FolderPermission[]>([]);
  const [activities, setActivities] = useState<FolderActivity[]>([]);
  const [folderName] = useState('Academic');

  useEffect(() => {
    fetchFolderDetail();
  }, []);

  const fetchFolderDetail = async () => {
    try {
      setLoading(true);
      const mockItems: FolderItem[] = [
        { id: '1', name: 'Curriculum', type: 'folder', updatedAt: '2 hours ago', color: '#3b82f6' },
        { id: '2', name: 'Exams', type: 'folder', updatedAt: 'Yesterday', color: '#3b82f6' },
        { id: '3', name: 'Lesson Plans', type: 'folder', updatedAt: '3 days ago', color: '#3b82f6' },
        { id: '4', name: 'Curriculum Plan 2024.pdf', type: 'document', size: '2.4 MB', updatedAt: '2 hours ago', color: '#ef4444' },
        { id: '5', name: 'Exam Schedule Fall.pdf', type: 'document', size: '420 KB', updatedAt: '1 day ago', color: '#ef4444' },
        { id: '6', name: 'Staff Handbook.docx', type: 'document', size: '3.2 MB', updatedAt: '1 week ago', color: '#3b82f6' },
        { id: '7', name: 'Budget Report Q4.xlsx', type: 'document', size: '1.8 MB', updatedAt: '5 hours ago', color: '#22c55e' },
      ];
      setItems(mockItems);

      const mockPermissions: FolderPermission[] = [
        { id: '1', userName: 'Dr. Smith', access: 'admin' },
        { id: '2', userName: 'Ms. Johnson', access: 'edit' },
        { id: '3', userName: 'All Teachers', access: 'view' },
      ];
      setPermissions(mockPermissions);

      const mockActivities: FolderActivity[] = [
        { id: '1', action: 'Document uploaded', user: 'Dr. Smith', timestamp: '2 hours ago' },
        { id: '2', action: 'Folder shared', user: 'Ms. Johnson', timestamp: 'Yesterday' },
        { id: '3', action: 'Permission updated', user: 'Admin', timestamp: '3 days ago' },
        { id: '4', action: 'Folder created', user: 'Dr. Smith', timestamp: '1 week ago' },
      ];
      setActivities(mockActivities);
    } catch (err) {
      setError('Failed to fetch folder details');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFolderDetail();
  }, []);

  const getAccessColor = (access: string) => {
    switch (access) {
      case 'admin': return '#ef4444';
      case 'edit': return '#f59e0b';
      case 'view': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const renderItem = ({ item }: { item: FolderItem }) => (
    <TouchableOpacity style={styles.itemRow}>
      <View style={[styles.itemIcon, { backgroundColor: item.color }]}>
        <Text style={styles.itemIconText}>{item.type === 'folder' ? '📁' : '📄'}</Text>
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemMeta}>
          {item.type === 'document' ? `${item.size} · ` : ''}{item.updatedAt}
        </Text>
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
      <Text style={styles.title}>{folderName}</Text>

      <View style={styles.tabBar}>
        {(['contents', 'permissions', 'activity'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'contents' && (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}

      {activeTab === 'permissions' && (
        <FlatList
          data={permissions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.permissionRow}>
              <Text style={styles.permissionName}>{item.userName}</Text>
              <View style={[styles.accessBadge, { backgroundColor: getAccessColor(item.access) }]}>
                <Text style={styles.accessText}>{item.access}</Text>
              </View>
            </View>
          )}
        />
      )}

      {activeTab === 'activity' && (
        <FlatList
          data={activities}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.activityRow}>
              <View style={styles.activityDot} />
              <View style={styles.activityInfo}>
                <Text style={styles.activityAction}>{item.action}</Text>
                <Text style={styles.activityMeta}>{item.user} · {item.timestamp}</Text>
              </View>
            </View>
          )}
        />
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginTop: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  tabTextActive: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  itemRow: {
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
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemIconText: {
    fontSize: 20,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  itemMeta: {
    fontSize: 12,
    color: '#6b7280',
  },
  chevron: {
    fontSize: 20,
    color: '#9ca3af',
  },
  permissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  permissionName: {
    fontSize: 15,
    fontWeight: '500',
  },
  accessBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  accessText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3b82f6',
    marginRight: 12,
    marginTop: 4,
  },
  activityInfo: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  activityMeta: {
    fontSize: 12,
    color: '#9ca3af',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default FolderDetailScreen;
