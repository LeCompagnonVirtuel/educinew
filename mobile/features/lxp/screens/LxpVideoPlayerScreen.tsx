import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface VideoDetail {
  id: string;
  title: string;
  url: string;
  duration: string;
  currentTime: number;
  notes: { id: string; text: string; timestamp: number; }[];
}

export const LxpVideoPlayerScreen: React.FC<{ navigation: unknown; route: { params: { id: string } } }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState<VideoDetail | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchVideoDetail();
  }, []);

  const fetchVideoDetail = async () => {
    try {
      const response = await fetch(`/api/lxp/videos/${route.params.id}`);
      const json = await response.json();
      setVideo(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (!video) return <View style={styles.container}><Text>Video not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.playerContainer}>
        <View style={styles.videoPlaceholder}>
          <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
            <Text style={styles.playButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.duration}>{video.duration}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notes</Text>
        {video.notes.map((note) => (
          <View key={note.id} style={styles.noteCard}>
            <Text style={styles.noteTimestamp}>@{note.timestamp}s</Text>
            <Text style={styles.noteText}>{note.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  playerContainer: { backgroundColor: '#000' },
  videoPlaceholder: { height: 200, justifyContent: 'center', alignItems: 'center' },
  playIcon: { fontSize: 48, color: '#fff' },
  controls: { padding: 16 },
  playButton: { backgroundColor: '#2196F3', padding: 12, borderRadius: 8, alignItems: 'center' },
  playButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  info: { backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 18, fontWeight: '600' },
  duration: { fontSize: 14, color: '#666', marginTop: 4 },
  section: { backgroundColor: '#fff', padding: 16, marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  noteCard: { backgroundColor: '#f5f5f5', padding: 12, borderRadius: 8, marginBottom: 8 },
  noteTimestamp: { fontSize: 12, color: '#2196F3', marginBottom: 4 },
  noteText: { fontSize: 14, color: '#333' },
});
