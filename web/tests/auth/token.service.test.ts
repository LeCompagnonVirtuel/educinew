import { describe, it, expect } from 'vitest';
import { TokenService } from '../../src/features/auth/services/token.service';

describe('TokenService', () => {
  const service = new TokenService();

  describe('decodePayload', () => {
    it('decodes valid JWT payload', () => {
      const payload = { sub: '123', exp: 9999999999 };
      const encoded = btoa(JSON.stringify(payload));
      const token = `header.${encoded}.signature`;
      expect(service.decodePayload(token)).toEqual(payload);
    });
    it('returns null for invalid token', () => {
      expect(service.decodePayload('invalid')).toBeNull();
    });
    it('returns null for token with wrong number of parts', () => {
      expect(service.decodePayload('a.b')).toBeNull();
    });
  });

  describe('isExpired', () => {
    it('detects expired token', () => {
      const payload = { exp: 1000000000 };
      const encoded = btoa(JSON.stringify(payload));
      const token = `header.${encoded}.signature`;
      expect(service.isExpired(token)).toBe(true);
    });
    it('detects valid token', () => {
      const payload = { exp: 9999999999 };
      const encoded = btoa(JSON.stringify(payload));
      const token = `header.${encoded}.signature`;
      expect(service.isExpired(token)).toBe(false);
    });
  });

  describe('generateDeviceId', () => {
    it('generates unique device IDs', () => {
      const id1 = service.generateDeviceId();
      const id2 = service.generateDeviceId();
      expect(id1).not.toBe(id2);
      expect(id1.length).toBe(32);
    });
  });

  describe('parseUserAgent', () => {
    it('detects Chrome on Windows', () => {
      const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
      expect(service.parseUserAgent(ua)).toEqual({ browser: 'Chrome', os: 'Windows' });
    });
    it('detects Safari on macOS', () => {
      const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';
      expect(service.parseUserAgent(ua)).toEqual({ browser: 'Safari', os: 'macOS' });
    });
  });
});
