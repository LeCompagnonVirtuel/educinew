import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  TextInput,
  Alert,
} from 'react-native';
import { useFolders } from '@/features/documents/hooks';

interface Folder {
  id: string;
  name: string;
  documentCount: number;
  subfolderCount: number;
  updatedAt: string;
  color: string;
  isShared: boolean;
}

interface Breadcrumb {
  id: string;
  name: string;
}

const FoldersListScreen: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([
    { id: 'root', name: 'Documents' },
  ]);
  const [sortBy, setSortBy] = useState<'name' | 'date'>('name');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      const mockData: Folder[] = [
        { id: '1', name: 'Academic', documentCount: 24, subfolderCount: 5, updatedAt: '2 hours ago', color: '#3b82f6', isShared: false },
        { id: '2', name: 'Administration', documentCount: 18, subfolderCount: 3, updatedAt: 'Yesterday', color: '#22c55e', isShared: true },
        { id: '3', name: 'Finance', documentCount: 12, subfolderCount: 2, updatedAt: '3 days ago', color: '#f59e0b', isShared: false },
        { id: '4', name: 'Human Resources', documentCount: 15, subfolderCount: 4, updatedAt: '1 week ago', color: '#8b5cf6', isShared: false },
        { id: '5', name: 'Student Records', documentCount: 42, subfolderCount: 8, updatedAt: '5 hours ago', color: '#ef4444', isShared: true },
        { id: '6', name: 'Legal & Compliance', documentCount: 8, subfolderCount: 1, updatedAt: '2 weeks ago', color: '#06b6d4', isShared: false },
      ];
      setFolders(mockData);
    } catch (err) {
      setError('Failed to fetch folders');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFolders();
  }, []);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      Alert.alert('Created', `Folder "${newFolderName}" created`);
      setNewFolderName('');
      setShowCreateModal(false);
    }
  };

  const handleBreadcrumbPress = (breadcrumb: Breadcrumb) => {
    const idx = breadcrumbs.findIndex((b) => b.id === breadcrumb.id);
    setBreadcrumbs(breadcrumbs.slice(0, idx + 1));
  };

  const sortedFolders = [...folders].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const renderItem = ({ item }: { item: Folder }) => (
    <TouchableOpacity style={styles.folderItem}>
      <View style={[styles.folderIcon, { backgroundColor: item.color }]}>
        <Text style={styles.folderIconText}>📁</Text>
      </View>
      <View style={styles.folderInfo}>
        <View style={styles.folderHeader}>
          <Text style={styles.folderName} numberOfLines={1}>{item.name}</Text>
          {item.isShared && <Text style={styles.sharedIcon}>👥</Text>}
        </View>
        <View style={styles.folderMeta}>
          <Text style={styles.metaText}>{item.documentCount} documents</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{item.subfolderCount} folders</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{item.updatedAt}</Text>
        </View>
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
      <Text style={styles.title}>Folders</Text>

      <View style={styles.breadcrumbContainer}>
        {breadcrumbs.map((bc, idx) => (
          <View key={bc.id} style={styles.breadcrumbItem}>
            {idx > 0 && <Text style={styles.breadcrumbSep}>/</Text>}
            <TouchableOpacity onPress={() => handleBreadcrumbPress(bc)}>
              <Text style={[styles.breadcrumbText, idx === breadcrumbs.length - 1 && styles.breadcrumbActive]}>
                {bc.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Sort:</Text>
        {(['name', 'date'] as const).map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.sortChip, sortBy === option && styles.sortChipActive]}
            onPress={() => setSortBy(option)}
          >
            <Text style={[styles.sortText, sortBy === option && styles.sortTextActive]}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={sortedFolders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setShowCreateModal(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {showCreateModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Create Folder</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Folder name"
              value={newFolderName}
              onChangeText={setNewFolderName}
              autoFocus
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setShowCreateModal(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirm} onPress={handleCreateFolder}>
                <Text style={styles.modalConfirmText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    marginBottom: 12,
  },
  breadcrumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  breadcrumbItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbSep: {
    marginHorizontal: 6,
    color: '#9ca3af',
  },
  breadcrumbText: {
    fontSize: 14,
    color: '#3b82f6',
  },
  breadcrumbActive: {
    color: '#111827',
    fontWeight: '600',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sortLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 8,
  },
  sortChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
    marginRight: 6,
  },
  sortChipActive: {
    backgroundColor: '#3b82f6',
  },
  sortText: {
    fontSize: 12,
    color: '#374151',
    textTransform: 'capitalize',
  },
  sortTextActive: {
    color: '#fff',
  },
  listContent: {
    paddingBottom: 80,
  },
  folderItem: {
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
  folderIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  folderIconText: {
    fontSize: 24,
  },
  folderInfo: {
    flex: 1,
  },
  folderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  folderName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  sharedIcon: {
    fontSize: 14,
    marginLeft: 6,
  },
  folderMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
  },
  metaDot: {
    fontSize: 12,
    color: '#9ca3af',
    marginHorizontal: 4,
  },
  chevron: {
    fontSize: 20,
    color: '#9ca3af',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  modalCancel: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
  },
  modalCancelText: {
    color: '#374151',
    fontWeight: '600',
  },
  modalConfirm: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#3b82f6',
  },
  modalConfirmText: {
    color: '#fff',
    fontWeight: '600',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default FoldersListScreen;
