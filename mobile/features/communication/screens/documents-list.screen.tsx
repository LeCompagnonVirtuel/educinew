import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'xls' | 'img' | 'folder';
  size: string;
  modifiedAt: string;
  owner: string;
  isShared: boolean;
}

const DocumentsListScreen: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string[]>(['Root']);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const mockData: Document[] = [
        { id: '1', name: 'Academic Reports', type: 'folder', size: '--', modifiedAt: 'Jan 15', owner: 'Admin', isShared: true },
        { id: '2', name: 'Student Records', type: 'folder', size: '--', modifiedAt: 'Jan 14', owner: 'Admin', isShared: false },
        { id: '3', name: 'Budget 2024.xlsx', type: 'xls', size: '2.4 MB', modifiedAt: 'Jan 13', owner: 'Finance', isShared: true },
        { id: '4', name: 'Curriculum Guide.pdf', type: 'pdf', size: '5.1 MB', modifiedAt: 'Jan 12', owner: 'Academic', isShared: true },
        { id: '5', name: 'Event Photos', type: 'folder', size: '--', modifiedAt: 'Jan 11', owner: 'Events', isShared: false },
        { id: '6', name: 'Staff Directory.doc', type: 'doc', size: '890 KB', modifiedAt: 'Jan 10', owner: 'HR', isShared: true },
        { id: '7', name: 'Campus Map.png', type: 'img', size: '3.2 MB', modifiedAt: 'Jan 9', owner: 'Admin', isShared: false },
      ];
      setDocuments(mockData);
    } catch (err) {
      setError('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder': return '📁';
      case 'pdf': return '📄';
      case 'doc': return '📝';
      case 'xls': return '📊';
      case 'img': return '🖼️';
      default: return '📄';
    }
  };

  const navigateToFolder = (folderName: string) => {
    setCurrentPath([...currentPath, folderName]);
  };

  const renderItem = ({ item }: { item: Document }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => item.type === 'folder' && navigateToFolder(item.name)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.fileIcon}>{getFileIcon(item.type)}</Text>
        <View style={styles.fileInfo}>
          <Text style={styles.fileName}>{item.name}</Text>
          <Text style={styles.fileMeta}>{item.size} • {item.modifiedAt}</Text>
        </View>
        {item.isShared && (
          <View style={styles.sharedBadge}>
            <Text style={styles.sharedText}>Shared</Text>
          </View>
        )}
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.owner}>{item.owner}</Text>
        {item.type === 'folder' && <Text style={styles.arrow}>→</Text>}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
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
      <Text style={styles.title}>Documents</Text>
      <View style={styles.breadcrumb}>
        {currentPath.map((path, index) => (
          <React.Fragment key={index}>
            {index > 0 && <Text style={styles.breadcrumbSeparator}>/</Text>}
            <TouchableOpacity onPress={() => setCurrentPath(currentPath.slice(0, index + 1))}>
              <Text style={[styles.breadcrumbText, index === currentPath.length - 1 && styles.activeBreadcrumb]}>
                {path}
              </Text>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </View>
      <FlatList
        data={documents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>⬆️ Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newFolderButton}>
          <Text style={styles.newFolderButtonText}>📁 New Folder</Text>
        </TouchableOpacity>
      </View>
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
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  breadcrumbText: {
    fontSize: 14,
    color: '#3b82f6',
  },
  activeBreadcrumb: {
    color: '#333',
    fontWeight: '600',
  },
  breadcrumbSeparator: {
    marginHorizontal: 8,
    color: '#666',
  },
  listContent: {
    paddingBottom: 100,
  },
  card: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fileIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
  },
  fileMeta: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  sharedBadge: {
    backgroundColor: '#e0e7ff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  sharedText: {
    color: '#3b82f6',
    fontSize: 10,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 8,
  },
  owner: {
    fontSize: 12,
    color: '#666',
  },
  arrow: {
    fontSize: 16,
    color: '#3b82f6',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    flexDirection: 'row',
    gap: 12,
  },
  uploadButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    borderRadius: 28,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  newFolderButton: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    borderRadius: 28,
    paddingVertical: 12,
    alignItems: 'center',
  },
  newFolderButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default DocumentsListScreen;
