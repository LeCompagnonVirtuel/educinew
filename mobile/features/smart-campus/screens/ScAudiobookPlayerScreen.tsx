import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Audiobook {
  id: string;
  title: string;
  author: string;
  narrator: string;
  duration: string;
  currentTime: string;
  isPlaying: boolean;
  progress: number;
  chapters: AudiobookChapter[];
  currentChapter: number;
}

interface AudiobookChapter {
  id: string;
  title: string;
  duration: string;
}

export const ScAudiobookPlayerScreen: React.FC<{ route: any }> = ({ route }) => {
  const { bookId } = route.params;
  const [loading, setLoading] = useState(true);
  const [audiobook, setAudiobook] = useState<Audiobook | null>(null);

  useEffect(() => {
    fetchAudiobook();
  }, [bookId]);

  const fetchAudiobook = async () => {
    try {
      const response = await fetch(`/api/smart-campus/library/audiobooks/${bookId}`);
      const json = await response.json();
      setAudiobook(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPause = async () => {
    if (!audiobook) return;
    try {
      const action = audiobook.isPlaying ? 'pause' : 'play';
      await fetch(`/api/smart-campus/library/audiobooks/${bookId}/${action}`, {
        method: 'POST',
      });
      setAudiobook({ ...audiobook, isPlaying: !audiobook.isPlaying });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeekForward = async () => {
    try {
      await fetch(`/api/smart-campus/library/audiobooks/${bookId}/seek`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seconds: 30 }),
      });
      fetchAudiobook();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeekBackward = async () => {
    try {
      await fetch(`/api/smart-campus/library/audiobooks/${bookId}/seek`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seconds: -15 }),
      });
      fetchAudiobook();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreviousChapter = async () => {
    try {
      await fetch(`/api/smart-campus/library/audiobooks/${bookId}/chapter/previous`, {
        method: 'POST',
      });
      fetchAudiobook();
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextChapter = async () => {
    try {
      await fetch(`/api/smart-campus/library/audiobooks/${bookId}/chapter/next`, {
        method: 'POST',
      });
      fetchAudiobook();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlaybackSpeed = async (speed: number) => {
    try {
      await fetch(`/api/smart-campus/library/audiobooks/${bookId}/speed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ speed }),
      });
      fetchAudiobook();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!audiobook) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Audiobook unavailable</Text>
      </View>
    );
  }

  const chapter = audiobook.chapters[audiobook.currentChapter];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{audiobook.title}</Text>
        <Text style={styles.author}>by {audiobook.author}</Text>
        <Text style={styles.narrator}>Narrated by {audiobook.narrator}</Text>
      </View>

      <View style={styles.chapterInfo}>
        <Text style={styles.chapterTitle}>{chapter?.title}</Text>
        <Text style={styles.chapterDuration}>{chapter?.duration}</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${audiobook.progress}%` }]} />
        </View>
        <View style={styles.timeInfo}>
          <Text style={styles.timeText}>{audiobook.currentTime}</Text>
          <Text style={styles.timeText}>{audiobook.duration}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={handleSeekBackward}>
          <Text style={styles.controlButtonText}>-15s</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handlePreviousChapter}>
          <Text style={styles.controlButtonText}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <Text style={styles.playButtonText}>{audiobook.isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleNextChapter}>
          <Text style={styles.controlButtonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleSeekForward}>
          <Text style={styles.controlButtonText}>+30s</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.speedControls}>
        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
          <TouchableOpacity
            key={speed}
            style={styles.speedButton}
            onPress={() => handlePlaybackSpeed(speed)}
          >
            <Text style={styles.speedButtonText}>{speed}x</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' },
  errorText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 40 },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: '700', color: '#fff', marginBottom: 8 },
  author: { fontSize: 16, color: '#999', marginBottom: 4 },
  narrator: { fontSize: 14, color: '#666' },
  chapterInfo: {
    padding: 16,
    alignItems: 'center',
  },
  chapterTitle: { fontSize: 16, color: '#fff', marginBottom: 4 },
  chapterDuration: { fontSize: 14, color: '#999' },
  progressContainer: {
    padding: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: { fontSize: 12, color: '#999' },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
  controlButton: {
    padding: 12,
  },
  controlButtonText: { color: '#fff', fontSize: 14 },
  playButton: {
    backgroundColor: '#007AFF',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  speedControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingBottom: 32,
  },
  speedButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  speedButtonText: { color: '#fff', fontSize: 12 },
});
