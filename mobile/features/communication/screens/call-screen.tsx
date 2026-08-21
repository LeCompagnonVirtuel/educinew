import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

interface CallState {
  status: 'connecting' | 'ringing' | 'active' | 'ended';
  duration: number;
  isMuted: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;
  callerName: string;
  callerAvatar: string;
}

interface CallScreenProps {
  callId: string;
  callerName: string;
  type: 'audio' | 'video';
}

const CallScreen: React.FC<CallScreenProps> = ({ callId, callerName, type }) => {
  const [callState, setCallState] = useState<CallState>({
    status: 'connecting',
    duration: 0,
    isMuted: false,
    isVideoOn: type === 'video',
    isScreenSharing: false,
    callerName,
    callerAvatar: '#3b82f6',
  });

  useEffect(() => {
    if (callState.status === 'connecting') {
      const connectTimer = setTimeout(() => setCallState((prev) => ({ ...prev, status: 'ringing' })), 2000);
      return () => clearTimeout(connectTimer);
    }
    if (callState.status === 'ringing') {
      const ringTimer = setTimeout(() => setCallState((prev) => ({ ...prev, status: 'active' })), 3000);
      return () => clearTimeout(ringTimer);
    }
    if (callState.status === 'active') {
      const interval = setInterval(() => setCallState((prev) => ({ ...prev, duration: prev.duration + 1 })), 1000);
      return () => clearInterval(interval);
    }
  }, [callState.status]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleMute = () => setCallState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  const toggleVideo = () => setCallState((prev) => ({ ...prev, isVideoOn: !prev.isVideoOn }));
  const toggleScreenShare = () => setCallState((prev) => ({ ...prev, isScreenSharing: !prev.isScreenSharing }));
  const endCall = () => setCallState((prev) => ({ ...prev, status: 'ended' }));

  const getStatusText = () => {
    switch (callState.status) {
      case 'connecting': return 'Connecting...';
      case 'ringing': return 'Ringing...';
      case 'active': return formatDuration(callState.duration);
      case 'ended': return 'Call Ended';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.callerInfo}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: callState.callerAvatar }]}>
            <Text style={styles.avatarText}>{callState.callerName.charAt(0)}</Text>
          </View>
          {callState.status === 'active' && <View style={styles.activeIndicator} />}
        </View>
        <Text style={styles.callerName}>{callState.callerName}</Text>
        <Text style={styles.callStatus}>{getStatusText()}</Text>
        {callState.status === 'ringing' && (
          <ActivityIndicator size="small" color="#22c55e" style={styles.ringingIndicator} />
        )}
      </View>
      {callState.status === 'active' && (
        <View style={styles.videoContainer}>
          {callState.isVideoOn ? (
            <View style={styles.videoPlaceholder}>
              <Text style={styles.videoPlaceholderText}>Video Feed</Text>
            </View>
          ) : (
            <View style={styles.audioPlaceholder}>
              <Text style={styles.audioPlaceholderText}>Audio Only</Text>
            </View>
          )}
        </View>
      )}
      {callState.status !== 'ended' && (
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.controlButton, callState.isMuted && styles.controlButtonActive]}
            onPress={toggleMute}
          >
            <Text style={styles.controlIcon}>{callState.isMuted ? '🔇' : '🎤'}</Text>
            <Text style={styles.controlLabel}>{callState.isMuted ? 'Unmute' : 'Mute'}</Text>
          </TouchableOpacity>
          {type === 'video' && (
            <TouchableOpacity
              style={[styles.controlButton, !callState.isVideoOn && styles.controlButtonActive]}
              onPress={toggleVideo}
            >
              <Text style={styles.controlIcon}>{callState.isVideoOn ? '📹' : '📷'}</Text>
              <Text style={styles.controlLabel}>{callState.isVideoOn ? 'Video Off' : 'Video On'}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.controlButton, callState.isScreenSharing && styles.controlButtonActive]}
            onPress={toggleScreenShare}
          >
            <Text style={styles.controlIcon}>🖥️</Text>
            <Text style={styles.controlLabel}>{callState.isScreenSharing ? 'Stop Share' : 'Share'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlButton, styles.endCallButton]} onPress={endCall}>
            <Text style={[styles.controlIcon, styles.endCallIcon]}>📞</Text>
            <Text style={[styles.controlLabel, styles.endCallLabel]}>End</Text>
          </TouchableOpacity>
        </View>
      )}
      {callState.status === 'ended' && (
        <TouchableOpacity style={styles.recallButton} onPress={() => setCallState((prev) => ({ ...prev, status: 'connecting', duration: 0 }))}>
          <Text style={styles.recallButtonText}>Call Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'space-between',
    padding: 24,
  },
  callerInfo: {
    alignItems: 'center',
    marginTop: 60,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#22c55e',
    borderWidth: 3,
    borderColor: '#1a1a2e',
  },
  callerName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  callStatus: {
    color: '#a0a0a0',
    fontSize: 18,
  },
  ringingIndicator: {
    marginTop: 16,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholder: {
    width: '100%',
    height: 300,
    backgroundColor: '#2a2a4a',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholderText: {
    color: '#666',
    fontSize: 18,
  },
  audioPlaceholder: {
    width: 160,
    height: 160,
    backgroundColor: '#2a2a4a',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioPlaceholderText: {
    color: '#666',
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 40,
  },
  controlButton: {
    alignItems: 'center',
    gap: 4,
  },
  controlButtonActive: {
    opacity: 0.6,
  },
  controlIcon: {
    fontSize: 28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#333',
    textAlign: 'center',
    lineHeight: 56,
  },
  controlLabel: {
    color: '#fff',
    fontSize: 12,
  },
  endCallButton: {
    // no extra styles needed
  },
  endCallIcon: {
    backgroundColor: '#ef4444',
  },
  endCallLabel: {
    color: '#ef4444',
  },
  recallButton: {
    backgroundColor: '#22c55e',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  recallButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CallScreen;
