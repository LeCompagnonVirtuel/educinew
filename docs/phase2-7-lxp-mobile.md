# Phase 2.7 LXP Mobile Documentation

## Executive Summary

The EduCI LXP mobile application comprises 50 React Native screens providing learning experiences on iOS and Android platforms. This documentation covers mobile architecture, offline support, push notifications, and platform-specific implementations.

---

## Mobile Architecture

### Screen Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                    Mobile App Architecture                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Navigation Layer                      │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │    │
│  │  │  Auth    │ │  Main    │ │  Course  │ │  Profile │   │    │
│  │  │  Stack   │ │  Tab     │ │  Stack   │ │  Stack   │   │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Screen Layer                           │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │    │
│  │  │  Auth    │ │  Home    │ │  Course  │ │  Player  │   │    │
│  │  │  Screens │ │  Screens │ │  Screens │ │  Screens │   │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Service Layer                         │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │    │
│  │  │  API     │ │  Storage │ │  Push    │ │  Sync    │   │    │
│  │  │  Service │ │  Service │ │  Service │ │  Service │   │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Platform Layer                        │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │    │
│  │  │  iOS     │ │ Android  │ │  Camera  │ │  File    │   │    │
│  │  │  Native  │ │  Native  │ │  Access  │ │  System  │   │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Screen Inventory

### Authentication Screens (6)

| Screen | File Path | Description |
|--------|-----------|-------------|
| `LoginScreen` | `mobile/src/screens/auth/LoginScreen.tsx` | User login |
| `RegisterScreen` | `mobile/src/screens/auth/RegisterScreen.tsx` | User registration |
| `ForgotPasswordScreen` | `mobile/src/screens/auth/ForgotPasswordScreen.tsx` | Password reset request |
| `ResetPasswordScreen` | `mobile/src/screens/auth/ResetPasswordScreen.tsx` | Password reset |
| `EmailVerificationScreen` | `mobile/src/screens/auth/EmailVerificationScreen.tsx` | Email verification |
| `MFAScreen` | `mobile/src/screens/auth/MFAScreen.tsx` | MFA verification |

### Main Screens (8)

| Screen | File Path | Description |
|--------|-----------|-------------|
| `HomeScreen` | `mobile/src/screens/main/HomeScreen.tsx` | Dashboard |
| `ExploreScreen` | `mobile/src/screens/main/ExploreScreen.tsx` | Course discovery |
| `MyCoursesScreen` | `mobile/src/screens/main/MyCoursesScreen.tsx` | Enrolled courses |
| `NotificationsScreen` | `mobile/src/screens/main/NotificationsScreen.tsx` | Notifications |
| `ProfileScreen` | `mobile/src/screens/main/ProfileScreen.tsx` | User profile |
| `SettingsScreen` | `mobile/src/screens/main/SettingsScreen.tsx` | App settings |
| `SearchScreen` | `mobile/src/screens/main/SearchScreen.tsx` | Search courses |
| `BookmarksScreen` | `mobile/src/screens/main/BookmarksScreen.tsx` | Saved courses |

### Course Screens (12)

| Screen | File Path | Description |
|--------|-----------|-------------|
| `CourseListScreen` | `mobile/src/screens/courses/CourseListScreen.tsx` | Course listing |
| `CourseDetailScreen` | `mobile/src/screens/courses/CourseDetailScreen.tsx` | Course details |
| `CourseCurriculumScreen` | `mobile/src/screens/courses/CourseCurriculumScreen.tsx` | Course content |
| `CourseReviewsScreen` | `mobile/src/screens/courses/CourseReviewsScreen.tsx` | Course reviews |
| `InstructorProfileScreen` | `mobile/src/screens/courses/InstructorProfileScreen.tsx` | Instructor info |
| `CourseProgressScreen` | `mobile/src/screens/courses/CourseProgressScreen.tsx` | Progress tracking |
| `CertificateScreen` | `mobile/src/screens/courses/CertificateScreen.tsx` | Certificate view |
| `CourseNotesScreen` | `mobile/src/screens/courses/CourseNotesScreen.tsx` | Course notes |
| `CourseDiscussionScreen` | `mobile/src/screens/courses/CourseDiscussionScreen.tsx` | Discussions |
| `CourseResourcesScreen` | `mobile/src/screens/courses/CourseResourcesScreen.tsx` | Course resources |
| `CourseSettingsScreen` | `mobile/src/screens/courses/CourseSettingsScreen.tsx` | Course settings |
| `CourseCompletionScreen` | `mobile/src/screens/courses/CourseCompletionScreen.tsx` | Completion |

### Player Screens (8)

| Screen | File Path | Description |
|--------|-----------|-------------|
| `VideoPlayerScreen` | `mobile/src/screens/player/VideoPlayerScreen.tsx` | Video player |
| `ArticleReaderScreen` | `mobile/src/screens/player/ArticleReaderScreen.tsx` | Article reader |
| `QuizScreen` | `mobile/src/screens/player/QuizScreen.tsx` | Quiz taking |
| `QuizResultScreen` | `mobile/src/screens/player/QuizResultScreen.tsx` | Quiz results |
| `AssignmentScreen` | `mobile/src/screens/player/AssignmentScreen.tsx` | Assignment view |
| `SubmissionScreen` | `mobile/src/screens/player/SubmissionScreen.tsx` | Submit work |
| `LiveSessionScreen` | `mobile/src/screens/player/LiveSessionScreen.tsx` | Live sessions |
| `InteractiveScreen` | `mobile/src/screens/player/InteractiveScreen.tsx` | Interactive content |

### Analytics Screens (6)

| Screen | File Path | Description |
|--------|-----------|-------------|
| `DashboardScreen` | `mobile/src/screens/analytics/DashboardScreen.tsx` | Analytics dashboard |
| `ProgressScreen` | `mobile/src/screens/analytics/ProgressScreen.tsx` | Learning progress |
| `AchievementsScreen` | `mobile/src/screens/analytics/AchievementsScreen.tsx` | Badges & achievements |
| `StreakScreen` | `mobile/src/screens/analytics/StreakScreen.tsx` | Learning streak |
| `LeaderboardScreen` | `mobile/src/screens/analytics/LeaderboardScreen.tsx` | Leaderboard |
| `GoalsScreen` | `mobile/src/screens/analytics/GoalsScreen.tsx` | Learning goals |

### Payment Screens (5)

| Screen | File Path | Description |
|--------|-----------|-------------|
| `PricingScreen` | `mobile/src/screens/payment/PricingScreen.tsx` | Course pricing |
| `CheckoutScreen` | `mobile/src/screens/payment/CheckoutScreen.tsx` | Payment checkout |
| `PaymentMethodsScreen` | `mobile/src/screens/payment/PaymentMethodsScreen.tsx` | Payment methods |
| `PurchaseHistoryScreen` | `mobile/src/screens/payment/PurchaseHistoryScreen.tsx` | Purchase history |
| `SubscriptionScreen` | `mobile/src/screens/payment/SubscriptionScreen.tsx` | Subscriptions |

### Settings Screens (5)

| Screen | File Path | Description |
|--------|-----------|-------------|
| `AccountSettingsScreen` | `mobile/src/screens/settings/AccountSettingsScreen.tsx` | Account settings |
| `NotificationSettingsScreen` | `mobile/src/screens/settings/NotificationSettingsScreen.tsx` | Notification prefs |
| `PrivacySettingsScreen` | `mobile/src/screens/settings/PrivacySettingsScreen.tsx` | Privacy settings |
| `AppearanceScreen` | `mobile/src/screens/settings/AppearanceScreen.tsx` | Theme settings |
| `AboutScreen` | `mobile/src/screens/settings/AboutScreen.tsx` | About app |

---

## Navigation Structure

```typescript
// mobile/src/navigation/AppNavigator.tsx

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../hooks/useAuth';

// Auth Stack
const AuthStack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <AuthStack.Screen name="EmailVerification" component={EmailVerificationScreen} />
      <AuthStack.Screen name="MFA" component={MFAScreen} />
    </AuthStack.Navigator>
  );
}

// Main Tab
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="MyCourses" component={MyCoursesScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Course Stack
const CourseStack = createNativeStackNavigator();

function CourseNavigator() {
  return (
    <CourseStack.Navigator>
      <CourseStack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <CourseStack.Screen name="CourseCurriculum" component={CourseCurriculumScreen} />
      <CourseStack.Screen name="CourseReviews" component={CourseReviewsScreen} />
      <CourseStack.Screen name="InstructorProfile" component={InstructorProfileScreen} />
      <CourseStack.Screen name="CourseProgress" component={CourseProgressScreen} />
      <CourseStack.Screen name="Certificate" component={CertificateScreen} />
    </CourseStack.Navigator>
  );
}

// Main Stack (contains all authenticated flows)
const MainStack = createNativeStackNavigator();

function MainNavigator() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="Course" component={CourseNavigator} />
      <MainStack.Screen name="Player" component={PlayerNavigator} />
      <MainStack.Screen name="Analytics" component={AnalyticsNavigator} />
      <MainStack.Screen name="Payment" component={PaymentNavigator} />
      <MainStack.Screen name="Settings" component={SettingsNavigator} />
    </MainStack.Navigator>
  );
}

// Root Navigator
export function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
```

---

## Offline Support

### Storage Strategy

```typescript
// mobile/src/services/StorageService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import MMKV from 'react-native-mmkv';

// Fast storage for frequently accessed data
const mmkv = new MMKV();

// Async storage for larger data
const ASYNC_KEYS = {
  USER_DATA: 'user_data',
  COURSE_DATA: 'course_data',
  PROGRESS_DATA: 'progress_data',
  SETTINGS: 'settings',
  OFFLINE_QUEUE: 'offline_queue',
};

export class StorageService {
  // Fast synchronous storage
  static setSync(key: string, value: unknown): void {
    mmkv.set(key, JSON.stringify(value));
  }

  static getSync<T>(key: string): T | null {
    const value = mmkv.getString(key);
    return value ? JSON.parse(value) : null;
  }

  static deleteSync(key: string): void {
    mmkv.delete(key);
  }

  // Async storage for larger data
  static async set(key: string, value: unknown): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  static async get<T>(key: string): Promise<T | null> {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  static async delete(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }

  // Offline queue
  static async addToOfflineQueue(action: OfflineAction): Promise<void> {
    const queue = await this.get<OfflineAction[]>(ASYNC_KEYS.OFFLINE_QUEUE) || [];
    queue.push({ ...action, timestamp: Date.now() });
    await this.set(ASYNC_KEYS.OFFLINE_QUEUE, queue);
  }

  static async processOfflineQueue(): Promise<void> {
    const queue = await this.get<OfflineAction[]>(ASYNC_KEYS.OFFLINE_QUEUE) || [];
    const processed: number[] = [];

    for (let i = 0; i < queue.length; i++) {
      try {
        await this.executeOfflineAction(queue[i]);
        processed.push(i);
      } catch (error) {
        console.error('Failed to process offline action:', error);
      }
    }

    // Remove processed items
    const remaining = queue.filter((_, index) => !processed.includes(index));
    await this.set(ASYNC_KEYS.OFFLINE_QUEUE, remaining);
  }

  private static async executeOfflineAction(action: OfflineAction): Promise<void> {
    // Execute the queued action
    switch (action.type) {
      case 'UPDATE_PROGRESS':
        await api.updateProgress(action.data);
        break;
      case 'SUBMIT_QUIZ':
        await api.submitQuiz(action.data);
        break;
      case 'ADD_NOTE':
        await api.addNote(action.data);
        break;
    }
  }
}

interface OfflineAction {
  type: string;
  data: Record<string, unknown>;
  timestamp: number;
}
```

### Sync Service

```typescript
// mobile/src/services/SyncService.ts

import NetInfo from '@react-native-community/netinfo';
import { StorageService } from './StorageService';
import { api } from '../api';

export class SyncService {
  private static isSyncing = false;
  private static syncInterval: NodeJS.Timeout | null = null;

  static initialize(): void {
    // Listen for network changes
    NetInfo.addEventListener((state) => {
      if (state.isConnected && !this.isSyncing) {
        this.sync();
      }
    });

    // Periodic sync attempt
    this.syncInterval = setInterval(() => {
      this.sync();
    }, 30000); // Every 30 seconds
  }

  static async sync(): Promise<void> {
    if (this.isSyncing) return;

    const networkState = await NetInfo.fetch();
    if (!networkState.isConnected) return;

    this.isSyncing = true;

    try {
      // Process offline queue
      await StorageService.processOfflineQueue();

      // Sync user data
      await this.syncUserData();

      // Sync course data
      await this.syncCourseData();

      // Sync progress data
      await this.syncProgressData();

      console.log('Sync completed successfully');
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      this.isSyncing = false;
    }
  }

  private static async syncUserData(): Promise<void> {
    const userData = await StorageService.get<UserData>('user_data');
    if (userData) {
      // Sync with server
      await api.syncUserData(userData);
    }
  }

  private static async syncCourseData(): Promise<void> {
    const courseData = await StorageService.get<CourseData[]>('course_data');
    if (courseData) {
      // Sync with server
      await api.syncCourseData(courseData);
    }
  }

  private static async syncProgressData(): Promise<void> {
    const progressData = await StorageService.get<ProgressData[]>('progress_data');
    if (progressData) {
      // Sync with server
      await api.syncProgressData(progressData);
    }
  }

  static destroy(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
  }
}
```

---

## Push Notifications

### Notification Service

```typescript
// mobile/src/services/NotificationService.ts

import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { Platform, Alert } from 'react-native';
import { api } from '../api';
import { StorageService } from './StorageService';

export class NotificationService {
  static async initialize(): Promise<void> {
    // Request permission
    await this.requestPermission();

    // Get FCM token
    const token = await this.getFCMToken();

    // Register token with server
    if (token) {
      await api.registerPushToken(token);
    }

    // Listen for messages
    this.setupListeners();

    // Create notification channels (Android)
    if (Platform.OS === 'android') {
      await this.createNotificationChannels();
    }
  }

  static async requestPermission(): Promise<boolean> {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  }

  static async getFCMToken(): Promise<string | null> {
    try {
      const token = await messaging().getToken();
      return token;
    } catch (error) {
      console.error('Failed to get FCM token:', error);
      return null;
    }
  }

  static setupListeners(): void {
    // Handle foreground messages
    messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground message:', remoteMessage);
      await this.showLocalNotification(remoteMessage);
    });

    // Handle background messages
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Background message:', remoteMessage);
      await this.handleBackgroundMessage(remoteMessage);
    });

    // Handle notification open
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification opened:', remoteMessage);
      this.handleNotificationOpen(remoteMessage);
    });

    // Handle initial notification
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('Initial notification:', remoteMessage);
          this.handleNotificationOpen(remoteMessage);
        }
      });
  }

  static async createNotificationChannels(): Promise<void> {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Notifications',
      importance: AndroidImportance.HIGH,
    });

    await notifee.createChannel({
      id: 'course_updates',
      name: 'Course Updates',
      importance: AndroidImportance.DEFAULT,
    });

    await notifee.createChannel({
      id: 'reminders',
      name: 'Learning Reminders',
      importance: AndroidImportance.LOW,
    });
  }

  static async showLocalNotification(remoteMessage: any): Promise<void> {
    await notifee.displayNotification({
      title: remoteMessage.notification?.title || 'EduCI LXP',
      body: remoteMessage.notification?.body || '',
      android: {
        channelId: remoteMessage.data?.channel || 'default',
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        sound: 'default',
      },
    });
  }

  private static async handleBackgroundMessage(remoteMessage: any): Promise<void> {
    // Store message for processing
    await StorageService.addToOfflineQueue({
      type: 'NOTIFICATION_RECEIVED',
      data: remoteMessage,
      timestamp: Date.now(),
    });
  }

  private static handleNotificationOpen(remoteMessage: any): void {
    const { type, courseId, lessonId } = remoteMessage.data || {};

    // Navigate based on notification type
    switch (type) {
      case 'course_update':
        // Navigate to course
        break;
      case 'new_lesson':
        // Navigate to lesson
        break;
      case 'quiz_reminder':
        // Navigate to quiz
        break;
      case 'achievement':
        // Navigate to achievements
        break;
    }
  }

  static async scheduleLocalNotification(
    title: string,
    body: string,
    data?: Record<string, unknown>,
    trigger?: Date
  ): Promise<void> {
    await notifee.displayNotification({
      title,
      body,
      data,
      android: {
        channelId: 'default',
      },
    });
  }

  static async cancelAllNotifications(): Promise<void> {
    await notifee.cancelAllNotifications();
  }
}
```

---

## Video Player

```typescript
// mobile/src/screens/player/VideoPlayerScreen.tsx

import React, { useState, useRef, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Video, { OnProgressData } from 'react-native-video';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useLesson } from '../../hooks/useLesson';
import { useEnrollment } from '../../hooks/useEnrollment';
import { StorageService } from '../../services/StorageService';

export function VideoPlayerScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const videoRef = useRef<Video>(null);

  const { lessonId, courseId } = route.params as {
    lessonId: string;
    courseId: string;
  };

  const { lesson, isLoading } = useLesson(lessonId);
  const { updateProgress } = useEnrollment(courseId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);

  const handleProgress = useCallback(
    (data: OnProgressData) => {
      setCurrentTime(data.currentTime);

      // Save progress every 30 seconds
      if (Math.floor(data.currentTime) % 30 === 0) {
        saveProgress(data.currentTime);
      }
    },
    [lessonId, updateProgress]
  );

  const handleLoad = useCallback((data: { duration: number }) => {
    setDuration(data.duration);
    setIsBuffering(false);
  }, []);

  const handleBuffer = useCallback(({ isBuffering: buffering }) => {
    setIsBuffering(buffering);
  }, []);

  const saveProgress = useCallback(
    async (time: number) => {
      try {
        // Save to local storage
        await StorageService.set(`progress:${lessonId}`, {
          currentTime: time,
          lastUpdated: Date.now(),
        });

        // Update server
        await updateProgress(lessonId, Math.floor(time));
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
    },
    [lessonId, updateProgress]
  );

  const handlePlaybackEnd = useCallback(async () => {
    // Mark lesson as completed
    await updateProgress(lessonId, duration);

    // Navigate to next lesson or course completion
    navigation.goBack();
  }, [lessonId, duration, updateProgress, navigation]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isBuffering && (
        <View style={styles.bufferingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}

      <Video
        ref={videoRef}
        source={{ uri: lesson?.content?.videoUrl || '' }}
        style={styles.video}
        resizeMode="contain"
        paused={!isPlaying}
        onProgress={handleProgress}
        onLoad={handleLoad}
        onBuffer={handleBuffer}
        onEnd={handlePlaybackEnd}
        controls
      />

      {/* Custom controls overlay */}
      <View style={styles.controls}>
        {/* Progress bar, play/pause, etc. */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    flex: 1,
  },
  bufferingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
```

---

## Course List Screen

```typescript
// mobile/src/screens/courses/CourseListScreen.tsx

import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { CourseCard } from '../../components/CourseCard';
import { SearchBar } from '../../components/SearchBar';
import { FilterChips } from '../../components/FilterChips';
import { useCourses } from '../../hooks/useCourse';
import { Course } from '../../types/course.types';

export function CourseListScreen({ navigation }) {
  const [filters, setFilters] = useState({
    category: undefined,
    level: undefined,
    language: undefined,
  });

  const {
    courses,
    total,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCourses(filters);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleCoursePress = useCallback(
    (course: Course) => {
      navigation.navigate('CourseDetail', { courseId: course.id });
    },
    [navigation]
  );

  const renderCourse = useCallback(
    ({ item }: { item: Course }) => (
      <CourseCard course={item} onPress={() => handleCoursePress(item)} />
    ),
    [handleCoursePress]
  );

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  }, [isFetchingNextPage]);

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No courses found</Text>
      </View>
    );
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search courses..."
        onSearch={(query) => handleFilterChange({ ...filters, q: query })}
      />

      <FilterChips
        filters={[
          { key: 'category', label: 'Category', options: categories },
          { key: 'level', label: 'Level', options: levels },
          { key: 'language', label: 'Language', options: languages },
        ]}
        selectedFilters={filters}
        onFilterChange={handleFilterChange}
      />

      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  list: {
    padding: 16,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
  },
});
```

---

## Platform-Specific Code

### iOS Configuration

```typescript
// mobile/ios/EduCILXP/AppDelegate.mm

#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <Firebase.h>
#import <ReactNativeNavigation.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Initialize Firebase
  [FIRApp configure];

  // Initialize React Native Navigation
  NSURL *jsCodeLocation = [self sourceURLForBridge:nil];
  [ReactNativeNavigation bootstrapWithDelegate:self launchOptions:launchOptions];

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
```

### Android Configuration

```xml
<!-- mobile/android/app/src/main/AndroidManifest.xml -->

<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.educi.lxp">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <application
        android:name=".MainApplication"
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:allowBackup="true"
        android:theme="@style/AppTheme">

        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|screenSize|smallestScreenSize|uiMode"
            android:launchMode="singleTask"
            android:windowSoftInputMode="adjustResize"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- Firebase Messaging Service -->
        <service
            android:name=".firebase.MyFirebaseMessagingService"
            android:exported="false">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>

    </application>
</manifest>
```

---

## Best Practices

### 1. Optimize FlatList Performance

```typescript
<FlatList
  data={courses}
  renderItem={renderCourse}
  keyExtractor={(item) => item.id}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  windowSize={5}
  maxToRenderPerBatch={10}
  removeClippedSubviews={true}
/>
```

### 2. Use Memoization

```typescript
const renderCourse = useCallback(
  ({ item }: { item: Course }) => (
    <CourseCard course={item} onPress={() => handleCoursePress(item)} />
  ),
  [handleCoursePress]
);
```

### 3. Handle Network States

```typescript
const networkState = await NetInfo.fetch();
if (!networkState.isConnected) {
  // Use cached data
  const cachedData = await StorageService.get('courses');
  setCourses(cachedData);
}
```

### 4. Optimize Images

```typescript
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: course.thumbnail, priority: FastImage.priority.normal }}
  style={styles.thumbnail}
  resizeMode={FastImage.resizeMode.cover}
/>
```

### 5. Use Native Modules for Performance

```typescript
// For heavy computations, use native modules
import { NativeModules } from 'react-native';

const { VideoProcessor } = NativeModules;
const processedVideo = await VideoProcessor.process(sourceUri);
```

---

## Security Considerations

### 1. Secure Storage

```typescript
// Use Keychain for iOS and EncryptedSharedPreferences for Android
import * as Keychain from 'react-native-keychain';

// Store sensitive data
await Keychain.setGenericPassword('authToken', token);

// Retrieve sensitive data
const credentials = await Keychain.getGenericPassword();
```

### 2. Certificate Pinning

```typescript
// Implement certificate pinning for API calls
import { Platform } from 'react-native';
import { NativeModules } from 'react-native';

if (Platform.OS === 'ios') {
  NativeModules.SSLPinning.enableSSLPinning({
    certificates: ['cert1.pem', 'cert2.pem'],
  });
}
```

### 3. Code Obfuscation

```javascript
// metro.config.js
module.exports = {
  transformer: {
    minifierConfig: {
      mangle: {
        toplevel: true,
      },
    },
  },
};
```

---

## References

- `mobile/src/screens/` - All screen components
- `mobile/src/components/` - Reusable components
- `mobile/src/hooks/` - Custom hooks
- `mobile/src/services/` - Service layer
- `mobile/src/api/` - API client
- `mobile/src/navigation/` - Navigation configuration
- `mobile/ios/` - iOS native code
- `mobile/android/` - Android native code

---

*Last Updated: Phase 2.7 - LXP Mobile Documentation*
