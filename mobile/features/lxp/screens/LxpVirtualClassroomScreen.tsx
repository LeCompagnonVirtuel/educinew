import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isVideoOn: boolean;
}

export const LxpVirtualClassroomScreen: React.FC<{ navigation: unknown; route: { params: { id: string } } }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await fetch(`/api/lxp/live-sessions/${route.params.id}/participants`);
      const json = await response.json();
      setParticipants(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <View style={styles.mainVideo}>
          <Text style={styles.videoPlaceholder}>Main Video</Text>
        </View>
        <ScrollView horizontal style={styles.participantVideos}>
          {participants.map((p) => (
            <View key={p.id} style={styles.participantVideo}>
              <Text style={styles.participantName}>{p.name.charAt(0)}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={[styles.controlButton, isMuted && styles.controlActive]} onPress={() => setIsMuted(!isMuted)}>
          <Text style={styles.controlText}>{isMuted ? '🔇' : '🎤'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, !isVideoOn && styles.controlActive]} onPress={() => setIsVideoOn(!isVideoOn)}>
          <Text style={styles.controlText}>{isVideoOn ? '📹' : '📷'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlText}>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlText}>📋</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, styles.leaveButton]} onPress={() => navigation.goBack()}>
          <Text style={styles.leaveText}>Leave</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  videoContainer: { flex: 1 },
  mainVideo: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a2e' },
  videoPlaceholder: { color: '#fff', fontSize: 16 },
  participantVideos: { height: 80, backgroundColor: '#111', paddingHorizontal: 8 },
  participantVideo: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', marginHorizontal: 4 },
  participantName: { color: '#fff', fontSize: 18, fontWeight: '600' },
  controls: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#1a1a2e', gap: 12 },
  controlButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' },
  controlActive: { backgroundColor: '#f44336' },
  controlText: { fontSize: 20 },
  leaveButton: { backgroundColor: '#f44336', paddingHorizontal: 16 },
  leaveText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
