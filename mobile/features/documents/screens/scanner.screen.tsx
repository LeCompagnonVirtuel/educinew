import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useScanner } from '@/features/documents/hooks';

interface ScanPage {
  id: string;
  pageNumber: number;
  thumbnail: string;
  enhanced: boolean;
}

const ScannerScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [pages, setPages] = useState<ScanPage[]>([]);
  const [autoCrop, setAutoCrop] = useState(true);
  const [enhancement, setEnhancement] = useState<'none' | 'auto' | 'high'>('auto');
  const [multiPage, setMultiPage] = useState(false);
  const [ocrPending, setOcrPending] = useState(false);

  useEffect(() => {
    return () => {
      setIsScanning(false);
    };
  }, []);

  const handleCapture = () => {
    setIsScanning(true);
    setTimeout(() => {
      const newPage: ScanPage = {
        id: String(pages.length + 1),
        pageNumber: pages.length + 1,
        thumbnail: 'scan_preview',
        enhanced: enhancement !== 'none',
      };
      setPages([...pages, newPage]);
      setIsScanning(false);
      Alert.alert('Captured', `Page ${newPage.pageNumber} captured successfully`);
    }, 1500);
  };

  const handleEnhance = (pageId: string) => {
    setPages(pages.map((p) => (p.id === pageId ? { ...p, enhanced: true } : p)));
    Alert.alert('Enhanced', 'Page enhanced successfully');
  };

  const handleRemovePage = (pageId: string) => {
    setPages(pages.filter((p) => p.id !== pageId));
  };

  const handleOCR = () => {
    setOcrPending(true);
    setTimeout(() => {
      setOcrPending(false);
      Alert.alert('OCR Complete', 'Text recognition completed for all pages');
    }, 2000);
  };

  const handleSave = () => {
    if (pages.length === 0) {
      Alert.alert('No Pages', 'Capture at least one page before saving');
      return;
    }
    Alert.alert('Saved', `Document saved with ${pages.length} page(s)`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanner</Text>

      <View style={styles.previewArea}>
        {isScanning ? (
          <View style={styles.scanningOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.scanningText}>Scanning...</Text>
          </View>
        ) : pages.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pagesScroll}>
            {pages.map((page) => (
              <View key={page.id} style={styles.pageThumb}>
                <View style={styles.thumbPlaceholder}>
                  <Text style={styles.thumbText}>Page {page.pageNumber}</Text>
                  {page.enhanced && <Text style={styles.enhancedBadge}>✓ Enhanced</Text>}
                </View>
                <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemovePage(page.id)}>
                  <Text style={styles.removeBtnText}>✕</Text>
                </TouchableOpacity>
                {!page.enhanced && (
                  <TouchableOpacity style={styles.enhanceBtn} onPress={() => handleEnhance(page.id)}>
                    <Text style={styles.enhanceBtnText}>Enhance</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyPreview}>
            <Text style={styles.emptyIcon}>📷</Text>
            <Text style={styles.emptyText}>Point camera at document</Text>
          </View>
        )}
      </View>

      <View style={styles.settingsSection}>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Auto-Crop</Text>
          <TouchableOpacity
            style={[styles.toggle, autoCrop && styles.toggleActive]}
            onPress={() => setAutoCrop(!autoCrop)}
          >
            <Text style={styles.toggleText}>{autoCrop ? 'ON' : 'OFF'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Enhancement</Text>
          <View style={styles.optionGroup}>
            {(['none', 'auto', 'high'] as const).map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[styles.optionBtn, enhancement === opt && styles.optionBtnActive]}
                onPress={() => setEnhancement(opt)}
              >
                <Text style={[styles.optionText, enhancement === opt && styles.optionTextActive]}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Multi-Page</Text>
          <TouchableOpacity
            style={[styles.toggle, multiPage && styles.toggleActive]}
            onPress={() => setMultiPage(!multiPage)}
          >
            <Text style={styles.toggleText}>{multiPage ? 'ON' : 'OFF'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.pageCount}>
        <Text style={styles.pageCountText}>{pages.length} page(s) captured</Text>
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.captureBtn} onPress={handleCapture}>
          <View style={styles.captureBtnInner} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={[styles.ocrBtn, (pages.length === 0 || ocrPending) && styles.btnDisabled]}
          onPress={handleOCR}
          disabled={pages.length === 0 || ocrPending}
        >
          {ocrPending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.ocrBtnText}>Run OCR</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveBtn, pages.length === 0 && styles.btnDisabled]}
          onPress={handleSave}
          disabled={pages.length === 0}
        >
          <Text style={styles.saveBtnText}>Save Document</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2937',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    padding: 16,
    paddingBottom: 8,
  },
  previewArea: {
    flex: 1,
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#111827',
    overflow: 'hidden',
  },
  scanningOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
  },
  pagesScroll: {
    flex: 1,
    padding: 12,
  },
  pageThumb: {
    width: 120,
    height: 160,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: '#374151',
    overflow: 'hidden',
  },
  thumbPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  thumbText: {
    color: '#d1d5db',
    fontSize: 12,
    textAlign: 'center',
  },
  enhancedBadge: {
    color: '#22c55e',
    fontSize: 10,
    marginTop: 4,
  },
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeBtnText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  enhanceBtn: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    right: 4,
    paddingVertical: 4,
    backgroundColor: '#3b82f6',
    borderRadius: 4,
    alignItems: 'center',
  },
  enhanceBtnText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  emptyPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 16,
  },
  settingsSection: {
    padding: 16,
    backgroundColor: '#111827',
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingLabel: {
    color: '#d1d5db',
    fontSize: 14,
  },
  toggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#374151',
  },
  toggleActive: {
    backgroundColor: '#22c55e',
  },
  toggleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  optionGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  optionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: '#374151',
  },
  optionBtnActive: {
    backgroundColor: '#3b82f6',
  },
  optionText: {
    color: '#9ca3af',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  optionTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  pageCount: {
    padding: 12,
    alignItems: 'center',
  },
  pageCountText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  actionBar: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureBtnInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#ef4444',
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  ocrBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
  },
  ocrBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  saveBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  btnDisabled: {
    opacity: 0.5,
  },
});

export default ScannerScreen;
