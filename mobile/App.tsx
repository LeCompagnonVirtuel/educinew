import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Audio } from 'expo-av';
import { NetworkManager } from './services/networkManager';
import { OfflineQueue } from './services/offlineQueue';

// Keep native splash visible until our custom animated splash mounts
SplashScreen.preventAutoHideAsync().catch(() => {});

// Preload audio globally so SplashScreen can use it immediately
async function preloadAnnouncement(): Promise<boolean> {
  try {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const sound = new Audio.Sound();
    await sound.loadAsync(require('./assets/announcement.mp3'), { shouldPlay: false });
    await sound.unloadAsync();
    return true;
  } catch {
    // Audio file not found — TTS fallback will be used by SplashScreen
    return false;
  }
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Une erreur est survenue</Text>
          <Text style={styles.errorMessage}>{this.state.error.message}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Preload audio and navigation in parallel
        await Promise.all([
          preloadAnnouncement(),
          import('./app/navigation'),
        ]);

        NetworkManager.start();
        await OfflineQueue.init();
      } catch (e) {
        console.error('[App] Preparation failed:', e);
      } finally {
        setAppReady(true);
        // Hide native splash once our custom animated splash is mounted
        SplashScreen.hideAsync().catch(() => {});
      }
    }
    prepare();
  }, []);

  if (!appReady) return null;

  const AppNavigator = require('./app/navigation').default;

  return (
    <ErrorBoundary>
      <AppNavigator />
    </ErrorBoundary>
  );
}

export default App;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTitle: { color: '#dc2626', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  errorMessage: { color: '#64748b', fontSize: 13, textAlign: 'center' },
});
