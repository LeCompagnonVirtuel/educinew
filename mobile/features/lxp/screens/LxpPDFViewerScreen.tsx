import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface PDFDetail {
  id: string;
  title: string;
  url: string;
  pages: number;
  currentPage: number;
}

export const LxpPDFViewerScreen: React.FC<{ navigation: unknown; route: { params: { id: string } } }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [pdf, setPdf] = useState<PDFDetail | null>(null);

  useEffect(() => {
    fetchPDFDetail();
  }, []);

  const fetchPDFDetail = async () => {
    try {
      const response = await fetch(`/api/lxp/pdf/${route.params.id}`);
      const json = await response.json();
      setPdf(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (!pdf) return <View style={styles.container}><Text>PDF not found</Text></View>;

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.pageInfo}>Page {pdf.currentPage} of {pdf.pages}</Text>
      </View>
      <View style={styles.pdfContainer}>
        <View style={styles.pdfPlaceholder}>
          <Text style={styles.pdfIcon}>PDF</Text>
          <Text style={styles.pdfTitle}>{pdf.title}</Text>
        </View>
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton} disabled={pdf.currentPage <= 1}>
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} disabled={pdf.currentPage >= pdf.pages}>
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  toolbar: { backgroundColor: '#fff', padding: 12, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  pageInfo: { fontSize: 14, color: '#666', textAlign: 'center' },
  pdfContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  pdfPlaceholder: { backgroundColor: '#fff', width: 200, height: 260, justifyContent: 'center', alignItems: 'center', borderRadius: 8, elevation: 2 },
  pdfIcon: { fontSize: 48, color: '#f44336', marginBottom: 8 },
  pdfTitle: { fontSize: 14, color: '#333', textAlign: 'center', padding: 8 },
  navigation: { flexDirection: 'row', justifyContent: 'space-around', padding: 16, backgroundColor: '#fff' },
  navButton: { backgroundColor: '#2196F3', padding: 12, borderRadius: 8, minWidth: 100, alignItems: 'center' },
  navButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
