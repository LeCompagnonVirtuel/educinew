import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDocumentPreview } from '@/features/documents/hooks';

interface Annotation {
  id: string;
  type: 'highlight' | 'note' | 'redact';
  content: string;
  page: number;
  color: string;
}

const DocumentPreviewScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(12);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [activeTool, setActiveTool] = useState<'none' | 'highlight' | 'note' | 'redact'>('none');
  const [documentName, setDocumentName] = useState('Curriculum Plan 2024.pdf');

  useEffect(() => {
    fetchPreview();
  }, []);

  const fetchPreview = async () => {
    try {
      setLoading(true);
      const mockAnnotations: Annotation[] = [
        { id: '1', type: 'highlight', content: 'Key curriculum change', page: 3, color: '#fbbf24' },
        { id: '2', type: 'note', content: 'Needs review from department head', page: 5, color: '#3b82f6' },
        { id: '3', type: 'redact', content: 'Confidential data', page: 8, color: '#000' },
      ];
      setAnnotations(mockAnnotations);
    } catch (err) {
      setError('Failed to load document preview');
    } finally {
      setLoading(false);
    }
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.25, 0.5));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleAddAnnotation = () => {
    if (activeTool === 'none') return;
    Alert.alert('Annotation', `${activeTool} added to page ${currentPage}`);
  };

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
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{documentName}</Text>
        <Text style={styles.pageInfo}>Page {currentPage} of {totalPages}</Text>
      </View>

      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolBtn} onPress={handleZoomOut}>
          <Text style={styles.toolText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.zoomText}>{Math.round(zoom * 100)}%</Text>
        <TouchableOpacity style={styles.toolBtn} onPress={handleZoomIn}>
          <Text style={styles.toolText}>+</Text>
        </TouchableOpacity>
        <View style={styles.toolDivider} />
        <TouchableOpacity
          style={[styles.toolBtn, activeTool === 'highlight' && styles.toolBtnActive]}
          onPress={() => setActiveTool(activeTool === 'highlight' ? 'none' : 'highlight')}
        >
          <Text style={styles.toolText}>🖍</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolBtn, activeTool === 'note' && styles.toolBtnActive]}
          onPress={() => setActiveTool(activeTool === 'note' ? 'none' : 'note')}
        >
          <Text style={styles.toolText}>📝</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolBtn, activeTool === 'redact' && styles.toolBtnActive]}
          onPress={() => setActiveTool(activeTool === 'redact' ? 'none' : 'redact')}
        >
          <Text style={styles.toolText}>⬛</Text>
        </TouchableOpacity>
        {activeTool !== 'none' && (
          <TouchableOpacity style={styles.toolBtn} onPress={handleAddAnnotation}>
            <Text style={styles.toolText}>✓</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.previewArea}>
        <View style={[styles.pagePreview, { transform: [{ scale: zoom }] }]}>
          <View style={styles.pageContent}>
            <Text style={styles.pageText}>Document Content Area</Text>
            <Text style={styles.pageSubtext}>Page {currentPage}</Text>
          </View>
        </View>
      </View>

      <View style={styles.pagination}>
        <TouchableOpacity
          style={[styles.pageBtn, currentPage === 1 && styles.pageBtnDisabled]}
          onPress={handlePrevPage}
          disabled={currentPage === 1}
        >
          <Text style={styles.pageBtnText}>← Prev</Text>
        </TouchableOpacity>
        <View style={styles.pageNumbers}>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + Math.max(1, currentPage - 2);
            if (pageNum > totalPages) return null;
            return (
              <TouchableOpacity
                key={pageNum}
                style={[styles.pageNum, pageNum === currentPage && styles.pageNumActive]}
                onPress={() => setCurrentPage(pageNum)}
              >
                <Text style={[styles.pageNumText, pageNum === currentPage && styles.pageNumTextActive]}>
                  {pageNum}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          style={[styles.pageBtn, currentPage === totalPages && styles.pageBtnDisabled]}
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <Text style={styles.pageBtnText}>Next →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.annotationsPanel}>
        <Text style={styles.annotationsTitle}>Annotations ({annotations.length})</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {annotations.map((ann) => (
            <TouchableOpacity key={ann.id} style={[styles.annotationChip, { borderColor: ann.color }]}>
              <Text style={styles.annotationType}>{ann.type}</Text>
              <Text style={styles.annotationPage}>p.{ann.page}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2937',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2937',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#111827',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  pageInfo: {
    fontSize: 13,
    color: '#9ca3af',
    marginLeft: 12,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    gap: 6,
  },
  toolBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolBtnActive: {
    backgroundColor: '#3b82f6',
  },
  toolText: {
    color: '#fff',
    fontSize: 16,
  },
  toolDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#4b5563',
    marginHorizontal: 4,
  },
  zoomText: {
    color: '#d1d5db',
    fontSize: 13,
    minWidth: 40,
    textAlign: 'center',
  },
  previewArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  pagePreview: {
    width: '85%',
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  pageContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pageText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  pageSubtext: {
    fontSize: 14,
    color: '#9ca3af',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#111827',
  },
  pageBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#374151',
    borderRadius: 6,
  },
  pageBtnDisabled: {
    opacity: 0.5,
  },
  pageBtnText: {
    color: '#fff',
    fontSize: 13,
  },
  pageNumbers: {
    flexDirection: 'row',
    gap: 6,
  },
  pageNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageNumActive: {
    backgroundColor: '#3b82f6',
  },
  pageNumText: {
    color: '#d1d5db',
    fontSize: 13,
  },
  pageNumTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  annotationsPanel: {
    padding: 12,
    backgroundColor: '#111827',
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  annotationsTitle: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 8,
  },
  annotationChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#374151',
    borderWidth: 1,
    marginRight: 8,
  },
  annotationType: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  annotationPage: {
    color: '#9ca3af',
    fontSize: 11,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default DocumentPreviewScreen;
