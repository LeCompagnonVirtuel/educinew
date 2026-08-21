import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

interface CallRecord {
  id: string;
  callerName: string;
  callerAvatar: string;
  type: 'audio' | 'video' | 'missed';
  duration: string;
  timestamp: string;
  direction: 'incoming' | 'outgoing';
}

const CallsListScreen: React.FC = () => {
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    try {
      setLoading(true);
      const mockData: CallRecord[] = [
        { id: '1', callerName: 'Dr. Smith', callerAvatar: '#3b82f6', type: 'video', duration: '15:32', timestamp: 'Today, 2:30 PM', direction: 'incoming' },
        { id: '2', callerName: 'Sarah Johnson', callerAvatar: '#22c55e', type: 'audio', duration: '8:45', timestamp: 'Today, 11:20 AM', direction: 'outgoing' },
        { id: '3', callerName: 'Michael Chen', callerAvatar: '#8b5cf6', type: 'missed', duration: '', timestamp: 'Yesterday, 4:15 PM', direction: 'incoming' },
        { id: '4', callerName: 'Lisa Wang', callerAvatar: '#f59e0b', type: 'video', duration: '22:10', timestamp: 'Yesterday, 10:00 AM', direction: 'outgoing' },
        { id: '5', callerName: 'James Wilson', callerAvatar: '#ef4444', type: 'audio', duration: '5:20', timestamp: 'Jan 13, 3:45 PM', direction: 'incoming' },
      ];
      setCalls(mockData);
    } catch (err) {
      setError('Failed to fetch calls');
    } finally {
      setLoading(false);
    }
  };

  const getCallIcon = (type: string, direction: string) => {
    if (type === 'missed') return '📵';
    if (type === 'video') return '📹';
    return '📞';
  };

  const getDirectionIcon = (direction: string) => {
    return direction === 'incoming' ? '↙️' : '↗️';
  };

  const getStatusColor = (type: string) => {
    return type === 'missed' ? '#ef4444' : '#22c55e';
  };

  const renderItem = ({ item }: { item: CallRecord }) => (
    <TouchableOpacity style={styles.callItem}>
      <View style={[styles.avatar, { backgroundColor: item.callerAvatar }]}>
        <Text style={styles.avatarText}>{item.callerName.charAt(0)}</Text>
      </View>
      <View style={styles.callInfo}>
        <Text style={[styles.callerName, item.type === 'missed' && styles.missedText]}>{item.callerName}</Text>
        <View style={styles.callMeta}>
          <Text style={styles.directionIcon}>{getDirectionIcon(item.direction)}</Text>
          <Text style={styles.callType}>{item.type === 'video' ? 'Video' : 'Audio'}</Text>
          {item.duration ? <Text style={styles.duration}>{item.duration}</Text> : null}
        </View>
      </View>
      <View style={styles.callRight}>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        <View style={[styles.callStatusIcon, { backgroundColor: getStatusColor(item.type) }]}>
          <Text style={styles.callStatusText}>{getCallIcon(item.type, item.direction)}</Text>
        </View>
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
      <Text style={styles.title}>Calls</Text>
      <FlatList
        data={calls}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity style={styles.callButton}>
        <Text style={styles.callButtonText}>📞 New Call</Text>
      </TouchableOpacity>
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
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 80,
  },
  callItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  callInfo: {
    flex: 1,
  },
  callerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  missedText: {
    color: '#ef4444',
  },
  callMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  directionIcon: {
    fontSize: 12,
  },
  callType: {
    fontSize: 12,
    color: '#666',
  },
  duration: {
    fontSize: 12,
    color: '#666',
  },
  callRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  callStatusIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callStatusText: {
    fontSize: 14,
  },
  callButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#22c55e',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default CallsListScreen;
