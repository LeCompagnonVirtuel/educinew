import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface ParentNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  date: string;
}

export const AiParentNotificationsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<ParentNotification[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/ai/parent-notifications');
      const json = await response.json();
      setNotifications(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'note': return '📝';
      case 'absence': return '⚠️';
      case 'progrès': return '📈';
      case 'événement': return '📅';
      default: return '🔔';
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notifications Parent</Text>
      <Text style={styles.subtitle}>Restez informé de la scolarité de vos enfants</Text>

      {notifications.map((notification) => (
        <TouchableOpacity key={notification.id} style={[styles.notificationCard, !notification.read && styles.unreadNotification]}>
          <Text style={styles.notificationIcon}>{getTypeIcon(notification.type)}</Text>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationMessage}>{notification.message}</Text>
            <Text style={styles.notificationDate}>{notification.date}</Text>
          </View>
          {!notification.read && <View style={styles.unreadDot} />}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  notificationCard: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  unreadNotification: { borderLeftWidth: 4, borderLeftColor: '#1565c0' },
  notificationIcon: { fontSize: 24, marginRight: 12, marginTop: 2 },
  notificationContent: { flex: 1 },
  notificationTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  notificationMessage: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 4 },
  notificationDate: { fontSize: 12, color: '#999' },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#1565c0', marginTop: 6 },
});
