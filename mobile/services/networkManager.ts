import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { OfflineQueue } from './offlineQueue';

type NetworkListener = (online: boolean) => void;

class NetworkManager {
  private static _isOnline: boolean = true;
  private static listeners: NetworkListener[] = [];
  private static unsubscribe: (() => void) | null = null;

  static start() {
    NetworkManager.unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const online = !!(state.isConnected && state.isInternetReachable !== false);
      NetworkManager.setOnline(online);
    });
  }

  static stop() {
    if (NetworkManager.unsubscribe) {
      NetworkManager.unsubscribe();
      NetworkManager.unsubscribe = null;
    }
  }

  static get isOnline(): boolean {
    return NetworkManager._isOnline;
  }

  static addListener(fn: NetworkListener): () => void {
    NetworkManager.listeners.push(fn);
    return () => {
      NetworkManager.listeners = NetworkManager.listeners.filter(l => l !== fn);
    };
  }

  private static setOnline(value: boolean) {
    if (NetworkManager._isOnline !== value) {
      NetworkManager._isOnline = value;
      NetworkManager.listeners.forEach(fn => fn(value));

      if (value) {
        NetworkManager.onReconnect();
      }
    }
  }

  private static async onReconnect() {
    try {
      const result = await OfflineQueue.sync();
      if (result.synced > 0 && __DEV__) {
        console.log(`[NetworkManager] Synced ${result.synced} queued actions on reconnect`);
      }
    } catch (err) {
      console.error('[NetworkManager] Failed to sync offline queue on reconnect:', err);
    }
  }
}

export { NetworkManager };
