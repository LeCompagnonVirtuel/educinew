import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface AudioDetail {
  id: string;
  title: string;
  url: string;
  duration: string;
  currentTime: number;
  transcript: string;
}

export const LxpAudioPlayerScreen: React.FC<{ navigation: unknown; route: { params: { id: string } } }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [audio, setAudio] = useState<AudioDetail | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    fetchAudioDetail();
  }, []);

  const fetchAudioDetail = async () => {
    try {
      const response = await fetch(`/api/lxp/audio/${route.params.id}`);
      const json = await response.json();
      setAudio(json.data);
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
  if (!audio) return <View style={styles.container}><Text>Audio not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.playerContainer}>
        <View style={styles.audioPlaceholder}>
          <Text style={styles.audioIcon}>♪</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
            <Text style={styles.playButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.transcriptButton} onPress={() => setShowTranscript(!showTranscript)}>
            <Text style={styles.transcriptButtonText}>{showTranscript ? 'Hide' : 'Show'} Transcript</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{audio.title}</Text>
        <Text style={styles.duration}>{audio.duration}</Text>
      </View>
      {showTranscript && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transcript</Text>
          <Text style={styles.transcript}>{audio.transcript}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  playerContainer: { backgroundColor: '#1a1a2e', padding: 16 },
  audioPlaceholder: { height: 120, justifyContent: 'center', alignItems: 'center' },
  audioIcon: { fontSize: 48, color: '#fff' },
  controls: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 16 },
  playButton: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 8, minWidth: 100, alignItems: 'center' },
  playButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  transcriptButton: { backgroundColor: '#2196F3', padding: 12, borderRadius: 8, minWidth: 100, alignItems: 'center' },
  transcriptButtonText: { color: '#fff', fontSize: 14 },
  info: { backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 18, fontWeight: '600' },
  duration: { fontSize: 14, color: '#666', marginTop: 4 },
  section: { backgroundColor: '#fff', padding: 16, marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  transcript: { fontSize: 14, color: '#333', lineHeight: 20 },
});
