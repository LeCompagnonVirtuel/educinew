export interface DeviceInfo {
  id: string;
  userAgent: string;
  browser: string;
  os: string;
  lastActive: string;
  createdAt: string;
}

function generateDeviceId(): string {
  const stored = localStorage.getItem('educi_device_id');
  if (stored) return stored;
  const id = (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b => b.toString(16).padStart(2, '0')).join('');
  localStorage.setItem('educi_device_id', id);
  return id;
}

function parseUserAgent(ua: string): { browser: string; os: string } {
  let browser = 'Unknown';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';

  let os = 'Unknown';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  return { browser, os };
}

export const sessionManager = {
  getDeviceId(): string {
    return generateDeviceId();
  },

  trackSession(): DeviceInfo {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
    const { browser, os } = parseUserAgent(ua);
    const now = new Date().toISOString();
    const deviceId = generateDeviceId();

    const sessions = this.getSessions();
    const existing = sessions.find(s => s.id === deviceId);

    const device: DeviceInfo = {
      id: deviceId,
      userAgent: ua,
      browser,
      os,
      lastActive: now,
      createdAt: existing?.createdAt || now,
    };

    const updated = existing
      ? sessions.map(s => s.id === deviceId ? device : s)
      : [...sessions, device];

    localStorage.setItem('educi_sessions', JSON.stringify(updated));
    return device;
  },

  getSessions(): DeviceInfo[] {
    try {
      const stored = localStorage.getItem('educi_sessions');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  removeSession(deviceId: string) {
    const sessions = this.getSessions().filter(s => s.id !== deviceId);
    localStorage.setItem('educi_sessions', JSON.stringify(sessions));
  },

  clearAllSessions() {
    localStorage.removeItem('educi_sessions');
  },
};
