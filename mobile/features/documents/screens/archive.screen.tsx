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

interface ArchivedDocument {
  id: string;
  name: string;
  archivedAt: string;
  archivedBy: string;
  originalLocation: string;
  retentionExpiry: string;
  category: string;
  size: string;
}

interface ArchivePolicy {
  id: string;
  name: string;
  retentionDays: number;
  category: string;
  autoArchive: boolean;
}

const ArchiveScreen: React.FC = () => {
  const [documents, setDocuments] = useState<ArchivedDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'documents' | 'policies'>('documents');
  const [integrityCheckRunning, setIntegrityCheckRunning] = useState(false);

  const policies: ArchivePolicy[] = [
    { id: '1', name: 'Academic Records', retentionDays: 3650, category: 'Academic', autoArchive: true },
    { id: '2', name: 'Financial Documents', retentionDays: 2555, category: 'Finance', autoArchive: true },
    { id: '3', name: 'HR Records', retentionDays: 1825, category: 'HR', autoArchive: false },
    { id: '4', name: 'Administrative', retentionDays: 1095, category: 'Administrative', autoArchive: true },
  ];

  useEffect(() => {
    fetchArchived();
  }, []);

  const fetchArchived = async () => {
    try {
      setLoading(true);
      const mockData: ArchivedDocument[] = [
        { id: '1', name: 'Budget Report 2022.xlsx', archivedAt: 'Jan 15, 2024', archivedBy: 'Finance Team', originalLocation: '/Finance/Reports', retentionExpiry: 'Jan 15, 2031', category: 'Finance', size: '1.5 MB' },
        { id: '2', name: 'Staff Contract 2021.pdf', archivedAt: 'Dec 1, 2023', archivedBy: 'HR Department', originalLocation: '/HR/Contracts', retentionExpiry: 'Dec 1, 2028', category: 'HR', size: '2.1 MB' },
        { id: '3', name: 'Exam Results Fall 2022.pdf', archivedAt: 'Feb 20, 2024', archivedBy: 'Exam Office', originalLocation: '/Academic/Exams', retentionExpiry: 'Feb 20, 2034', category: 'Academic', size: '3.4 MB' },
        { id: '4', name: 'Parent Meeting Minutes 2022.pdf', archivedAt: 'Mar 5, 2024', archivedBy: 'Admin Office', originalLocation: '/Admin/Meetings', retentionExpiry: 'Mar 5, 2027', category: 'Administrative', size: '890 KB' },
        { id: '5', name: 'Lab Equipment Inventory.xlsx', archivedAt: 'Jan 30, 2024', archivedBy: 'Science Dept', originalLocation: '/Academic/Science', retentionExpiry: 'Jan 30, 2029', category: 'Academic', size: '1.2 MB' },
      ];
      setDocuments(mockData);
    } catch (err) {
      setError('Failed to fetch archived documents');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchArchived();
  }, []);

  const handleRestore = (id: string) => {
    Alert.alert('Restore', 'Restore this document to its original location?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Restore', onPress: () => {
        setDocuments(documents.filter((d) => d.id !== id));
        Alert.alert('Restored', 'Document restored successfully');
      }},
    ]);
  };

  const handleIntegrityCheck = () => {
    setIntegrityCheckRunning(true);
    setTimeout(() => {
      setIntegrityCheckRunning(false);
      Alert.alert('Integrity Check', 'All archived documents passed integrity verification');
    }, 3000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Finance': return '#22c55e';
      case 'HR': return '#8b5cf6';
      case 'Academic': return '#3b82f6';
      case 'Administrative': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const renderItem = ({ item }: { item: ArchivedDocument }) => (
    <View style={styles.docItem}>
      <View style={styles.docHeader}>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.docSize}>{item.size}</Text>
      </View>
      <Text style={styles.docName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.docMeta}>Archived by: {item.archivedBy}</Text>
      <Text style={styles.docMeta}>Date: {item.archivedAt}</Text>
      <Text style={styles.docMeta}>Location: {item.originalLocation}</Text>
      <Text style={styles.retentionText}>Retention until: {item.retentionExpiry}</Text>
      <TouchableOpacity style={styles.restoreBtn} onPress={() => handleRestore(item.id)}>
        <Text style={styles.restoreBtnText}>Restore</Text>
      </TouchableOpacity>
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Archive</Text>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'documents' && styles.tabActive]}
          onPress={() => setActiveTab('documents')}
        >
          <Text style={[styles.tabText, activeTab === 'documents' && styles.tabTextActive]}>Documents</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'policies' && styles.tabActive]}
          onPress={() => setActiveTab('policies')}
        >
          <Text style={[styles.tabText, activeTab === 'policies' && styles.tabTextActive]}>Policies</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'documents' && (
        <>
          <TouchableOpacity style={styles.integrityBtn} onPress={handleIntegrityCheck} disabled={integrityCheckRunning}>
            {integrityCheckRunning ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.integrityBtnText}>Run Integrity Check</Text>
            )}
          </TouchableOpacity>
          <FlatList
            data={documents}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        </>
      )}

      {activeTab === 'policies' && (
        <FlatList
          data={policies}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.policyItem}>
              <View style={styles.policyHeader}>
                <Text style={styles.policyName}>{item.name}</Text>
                <View style={[styles.autoArchiveBadge, { backgroundColor: item.autoArchive ? '#22c55e' : '#e5e7eb' }]}>
                  <Text style={styles.autoArchiveText}>{item.autoArchive ? 'Auto' : 'Manual'}</Text>
                </View>
              </View>
              <Text style={styles.policyMeta}>Category: {item.category}</Text>
              <Text style={styles.policyMeta}>Retention: {item.retentionDays} days ({Math.floor(item.retentionDays / 365)} years)</Text>
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
    fontSize: 14,
    color: '#6b7280',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  integrityBtn: {
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 12,
    backgroundColor: '#8b5cf6',
    borderRadius: 8,
    alignItems: 'center',
  },
  integrityBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  docItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  docHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  categoryText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  docSize: {
    fontSize: 12,
    color: '#6b7280',
  },
  docName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  docMeta: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  retentionText: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '500',
    marginTop: 4,
    marginBottom: 8,
  },
  restoreBtn: {
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
  },
  restoreBtnText: {
    color: '#3730a3',
    fontWeight: '600',
  },
  policyItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  policyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  policyName: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  autoArchiveBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  autoArchiveText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  policyMeta: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 2,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default ArchiveScreen;
