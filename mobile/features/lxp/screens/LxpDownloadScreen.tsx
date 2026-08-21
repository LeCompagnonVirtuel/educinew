import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface DownloadItem {
  id: string;
  title: string;
  type: string;
  progress: number;
  status: string;
}

export const LxpDownloadScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      const response = await fetch('/api/lxp/downloads');
      const json = await response.json();
      setDownloads(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelDownload = async (id: string) => {
    try {
      await fetch(`/api/lxp/downloads/${id}/cancel`, { method: 'POST' });
      setDownloads(downloads.map((d) => d.id === id ? { ...d, status: 'cancelled' } : d));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {downloads.length === 0 && (
        <Text style={styles.empty}>No downloads</Text>
      )}
      {downloads.map((download) => (
        <View key={download.id} style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.type}>{download.type}</Text>
            <Text style={styles.title}>{download.title}</Text>
            {download.status === 'downloading' && (
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${download.progress}%` }]} />
              </View>
            )}
            <Text style={styles.status}>{download.status} {download.status === 'downloading' ? `${download.progress}%` : ''}</Text>
          </View>
          {download.status === 'downloading' && (
            <TouchableOpacity style={styles.cancelButton} onPress={() => cancelDownload(download.id)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { textAlign: 'center', color: '#666', marginTop: 32 },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 4, borderRadius: 8, flexDirection: 'row', alignItems: 'center' },
  info: { flex: 1 },
  type: { fontSize: 10, color: '#2196F3', fontWeight: '600', textTransform: 'uppercase' },
  title: { fontSize: 16, fontWeight: '600', marginTop: 4 },
  progressBar: { height: 4, backgroundColor: '#e0e0e0', borderRadius: 2, marginTop: 8 },
  progressFill: { height: 4, backgroundColor: '#2196F3', borderRadius: 2 },
  status: { fontSize: 12, color: '#999', marginTop: 4 },
  cancelButton: { backgroundColor: '#FFEBEE', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
  cancelText: { fontSize: 12, color: '#f44336' },
});
