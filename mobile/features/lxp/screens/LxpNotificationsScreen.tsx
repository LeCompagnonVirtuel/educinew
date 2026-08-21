import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  timestamp: string;
}

export const LxpNotificationsScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/lxp/notifications');
      const json = await response.json();
      setNotifications(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/lxp/notifications/${id}/read`, { method: 'PUT' });
      setNotifications(notifications.map((n) => n.id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {notifications.map((notification) => (
        <TouchableOpacity
          key={notification.id}
          style={[styles.card, !notification.read && styles.unreadCard]}
          onPress={() => markAsRead(notification.id)}
        >
          <View style={styles.header}>
            <Text style={styles.type}>{notification.type}</Text>
            <Text style={styles.timestamp}>{notification.timestamp}</Text>
          </View>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.message}>{notification.message}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 4, borderRadius: 8 },
  unreadCard: { borderLeftWidth: 4, borderLeftColor: '#2196F3' },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  type: { fontSize: 10, color: '#2196F3', fontWeight: '600', textTransform: 'uppercase' },
  timestamp: { fontSize: 10, color: '#999' },
  title: { fontSize: 16, fontWeight: '600', marginTop: 4 },
  message: { fontSize: 14, color: '#666', marginTop: 4 },
});
