import { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../services/api';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../../constants/colors';
import {
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADIUS,
} from '../../constants/theme';
import { Card, Badge, EmptyState, SkeletonList } from '../../components/ui';
import { useLanguage } from '../context/LanguageContext';

export default function NotificationsScreen({ navigation }: any) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadNotifications = useCallback(async () => {
    try {
      const data = await api.getNotifications();
      setNotifications(data || []);
    } catch (error) {
      console.error('[Notifications]', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.id]);

  useEffect(() => { loadNotifications(); }, [loadNotifications]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadNotifications();
  }, [loadNotifications]);

  const handleNotificationPress = async (item: any) => {
    if (!item.is_read) {
      try {
        await api.markNotificationRead(item.id);
        setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, is_read: true } : n));
      } catch (error) { console.error('[NotificationsScreen] Error marking notification read:', error); }
    }
    switch (item.type) {
      case 'grade': navigation.navigate('Learning'); break;
      case 'payment': navigation.navigate('Payments'); break;
      case 'attendance': navigation.navigate('AttendanceHistory'); break;
      case 'message': navigation.navigate('Messages'); break;
      case 'announcement': navigation.navigate('Announcements'); break;
      case 'bulletin': navigation.navigate('StudentDocuments'); break;
      default: break;
    }
  };

  const markAllRead = async () => {
    try {
      await api.markAllNotificationsRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (error) {
      console.error('[Notifications] markAllRead', error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'grade': return 'school-outline';
      case 'payment': return 'card-outline';
      case 'attendance': return 'checkmark-circle-outline';
      case 'message': return 'chatbubble-outline';
      default: return 'notifications-outline';
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <Card
      variant={item.is_read ? 'default' : 'elevated'}
      padding="md"
      onPress={() => handleNotificationPress(item)}
      style={styles.itemCard}
    >
      <View style={styles.itemRow}>
        <View style={styles.iconCircle}>
          <Ionicons name={getIcon(item.type) as any} size={FONT_SIZES.lg} color="#6366f1" />
        </View>
        <View style={styles.itemContent}>
          <Text style={[styles.itemTitle, !item.is_read && styles.itemTitleBold]}>{item.title}</Text>
          <Text style={styles.itemMessage} numberOfLines={2}>{item.message}</Text>
          <Text style={styles.itemDate}>{item.created_at ? new Date(item.created_at).toLocaleDateString('fr-FR') : ''}</Text>
        </View>
        {!item.is_read && (
          <Badge label={t('notifications.new')} variant="info" dot size="sm" />
        )}
      </View>
    </Card>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>{t('settings_screen.notifications')}</Text>
          </View>
        </View>
        <View style={{ padding: SPACING.lg }}>
          <SkeletonList count={6} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>{t('settings_screen.notifications')}</Text>
          {notifications.some(n => !n.is_read) && (
            <Badge
              label={`${notifications.filter(n => !n.is_read).length} ${t('notifications.unread')}`}
              variant="info"
              size="sm"
            />
          )}
        </View>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <EmptyState
            icon={<Ionicons name="notifications-off-outline" size={40} color="#d1d5db" />}
            title={t('notifications.empty')}
            subtitle={t('notifications.emptySubtitle')}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { backgroundColor: COLORS.white, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  listContent: { padding: SPACING.lg },
  itemCard: { marginBottom: SPACING.sm },
  itemRow: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 40, height: 40, borderRadius: BORDER_RADIUS.xl, backgroundColor: '#e0e7ff', alignItems: 'center', justifyContent: 'center', marginRight: SPACING.md },
  itemContent: { flex: 1 },
  itemTitle: { fontSize: FONT_SIZES.sm + 1, color: COLORS.onSurface },
  itemTitleBold: { fontWeight: FONT_WEIGHTS.bold },
  itemMessage: { fontSize: FONT_SIZES.xs + 1, color: COLORS.onSurfaceVariant, marginTop: SPACING.xs },
  itemDate: { fontSize: FONT_SIZES.xs + 1, color: COLORS.onSurfaceVariant, marginTop: SPACING.xs },
});
