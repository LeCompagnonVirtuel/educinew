import { useEffect, useRef, useCallback, useState } from 'react';
import { Platform } from 'react-native';
import {
  registerForPushNotifications,
  unregisterPushNotifications,
  setupNotificationListeners,
  getBadgeCount,
  setBadgeCount,
  isPushEnabled,
  setPushEnabled,
} from '../../services/notifications';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import * as Notifications from 'expo-notifications';

let globalNavigate: ((route: string, params?: any) => void) | null = null;

export function setGlobalNavigator(navigate: (route: string, params?: any) => void) {
  globalNavigate = navigate;
}

type NotificationData = Record<string, any>;

function handleNotificationTap(data: NotificationData) {
  if (!globalNavigate) return;

  const { screen, params } = data;

  switch (screen) {
    case 'messages':
      globalNavigate('Messages');
      break;
    case 'grades':
      if (params?.studentId) {
        globalNavigate('ChildProfile', { studentId: params.studentId });
      } else {
        globalNavigate('Learning');
      }
      break;
    case 'payment':
      globalNavigate('Payments');
      break;
    case 'attendance':
      globalNavigate('AttendanceHistory');
      break;
    case 'transport':
      globalNavigate('Transport');
      break;
    case 'teacher_attendance':
      globalNavigate('TeacherAttendance');
      break;
    case 'teacher_checkin':
      globalNavigate('TeacherCheckin');
      break;
    case 'report':
      if (params?.studentId) {
        globalNavigate('ReportCard', { studentId: params.studentId });
      }
      break;
    default:
      if (params?.screen && params?.params) {
        globalNavigate(params.screen, params.params);
      }
      break;
  }
}

export function useNotifications() {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const listenerRef = useRef<{ remove: () => void } | null>(null);

  useEffect(() => {
    if (Platform.OS === 'web') return;

    try {
      const listeners = setupNotificationListeners(
        handleNotificationTap,
        () => {},
      );
      listenerRef.current = listeners;

      return () => {
        listeners.remove();
      };
    } catch {
      // Notifications not available in this build
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web') return;
    if (!user) return;

    registerForPushNotifications(user.id).catch(() => {});
  }, [user?.id]);

  const refreshBadgeCount = useCallback(async () => {
    const count = await getBadgeCount();
    setUnreadCount(count);
    await setBadgeCount(count);
  }, []);

  const updatePushEnabled = useCallback(async (enabled: boolean) => {
    if (Platform.OS === 'web') return;
    await setPushEnabled(enabled);
    if (enabled && user) {
      await registerForPushNotifications(user.id);
    }
  }, [user]);

  return {
    unreadCount,
    refreshBadgeCount,
    updatePushEnabled,
    isPushEnabled,
  };
}
