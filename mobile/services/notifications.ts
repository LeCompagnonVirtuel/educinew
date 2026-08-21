import { supabase, camel } from './supabase';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const PUSH_ENABLED_KEY = '@educi_push_enabled';

export async function registerForPushNotifications(userId: string): Promise<string | null> {
  if (Platform.OS === 'web') return null;
  try {
    const { status: existing } = await Notifications.getPermissionsAsync();
    let finalStatus = existing;
    if (existing !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') return null;
    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = tokenData.data;
    await registerPushToken(token, userId);
    return token;
  } catch {
    return null;
  }
}

export async function unregisterPushNotifications(token: string): Promise<void> {
  await unregisterPushToken(token);
}

export function setupNotificationListeners(
  onReceived?: (data: any) => void,
  onResponse?: (response: Notifications.NotificationResponse) => void
): { remove: () => void } {
  const receivedSub = Notifications.addNotificationReceivedListener((n) => {
    onReceived?.(n.request.content.data);
  });
  const responseSub = Notifications.addNotificationResponseReceivedListener((r) => {
    onResponse?.(r);
    onReceived?.(r.notification.request.content.data);
  });
  return {
    remove: () => {
      receivedSub.remove();
      responseSub.remove();
    },
  };
}

export async function getBadgeCount(): Promise<number> {
  if (Platform.OS === 'web') return 0;
  return Notifications.getBadgeCountAsync();
}

export async function setBadgeCount(count: number): Promise<void> {
  if (Platform.OS === 'web') return;
  await Notifications.setBadgeCountAsync(count);
}

export async function isPushEnabled(): Promise<boolean> {
  const stored = await AsyncStorage.getItem(PUSH_ENABLED_KEY);
  return stored !== 'false';
}

export async function setPushEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(PUSH_ENABLED_KEY, enabled ? 'true' : 'false');
}

export async function getNotifications() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
  if (error) throw error;
  return camel(data);
}

export async function getUnreadCount() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { count: 0 };
  const { count } = await supabase.from('notifications').select('id', { count: 'exact', head: true }).eq('user_id', user.id).eq('is_read', false);
  return { count: count || 0 };
}

export async function markNotificationRead(id: string) {
  const { error } = await supabase.from('notifications').update({ is_read: true }).eq('id', id);
  if (error) throw error;
}

export async function markAllNotificationsRead() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { error } = await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id).eq('is_read', false);
  if (error) throw error;
}

export async function registerPushToken(token: string, userId: string) {
  try {
    const { error } = await supabase.from('push_tokens' as any).upsert({
      token,
      user_id: userId,
      created_at: new Date().toISOString()
    }, { onConflict: 'token' });
    if (error) throw error;
    return { success: true };
  } catch {
    return { success: true };
  }
}

export async function unregisterPushToken(token: string) {
  try {
    const { error } = await supabase.from('push_tokens' as any).delete().eq('token', token);
    if (error) throw error;
    return { success: true };
  } catch {
    return { success: true };
  }
}
