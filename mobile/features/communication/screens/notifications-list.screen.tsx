import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'message' | 'call' | 'email' | 'task' | 'announcement' | 'system';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

const NotificationsListScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const mockData: Notification[] = [
        { id: '1', title: 'New Message', message: 'Sarah Johnson sent you a message', type: 'message', timestamp: '2 min ago', isRead: false },
        { id: '2', title: 'Missed Call', message: 'Michael Chen called you', type: 'call', timestamp: '15 min ago', isRead: false },
        { id: '3', title: 'Email Received', message: 'New email from Dr. Smith', type: 'email', timestamp: '1 hour ago', isRead: false },
        { id: '4', title: 'Task Reminder', message: 'Budget report due tomorrow', type: 'task', timestamp: '2 hours ago', isRead: true },
        { id: '5', title: 'New Announcement', message: 'Campus closure notice', type: 'announcement', timestamp: 'Yesterday', isRead: true },
        { id: '6', title: 'System Update', message: 'System maintenance scheduled', type: 'system', timestamp: '2 days ago', isRead: true },
      ];
      setNotifications(mockData);
    } catch (err) {
      setError('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message': return '💬';
      case 'call': return '📞';
      case 'email': return '📧';
      case 'task': return '✅';
      case 'announcement': return '📢';
      case 'system': return '⚙️';
      default: return '🔔';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.card, !item.isRead && styles.unreadCard]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{getNotificationIcon(item.type)}</Text>
          {!item.isRead && <View style={styles.unreadDot} />}
        </View>
        <View style={styles.info}>
          <Text style={[styles.title, !item.isRead && styles.unreadTitle]}>{item.title}</Text>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
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
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  markAllButton: {
    backgroundColor: '#e0e7ff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  markAllText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    position: 'relative',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default NotificationsListScreen;
