import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createOAuthService } from '../../src/features/integration/services/oauth.service';

describe('OAuthService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getOAuthProviders: vi.fn(),
      getOAuthProviderById: vi.fn(),
      createOAuthProvider: vi.fn(),
      updateOAuthProvider: vi.fn(),
      deleteOAuthProvider: vi.fn(),
      authorize: vi.fn(),
      getAccessToken: vi.fn(),
      revokeToken: vi.fn(),
      refreshToken: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createOAuthService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getOAuthProviders).toBeInstanceOf(Function);
    expect(service.getOAuthProviderById).toBeInstanceOf(Function);
    expect(service.createOAuthProvider).toBeInstanceOf(Function);
    expect(service.updateOAuthProvider).toBeInstanceOf(Function);
    expect(service.deleteOAuthProvider).toBeInstanceOf(Function);
    expect(service.authorize).toBeInstanceOf(Function);
    expect(service.getAccessToken).toBeInstanceOf(Function);
    expect(service.revokeToken).toBeInstanceOf(Function);
    expect(service.refreshToken).toBeInstanceOf(Function);
  });

  describe('getOAuthProviders', () => {
    it('should return providers list', async () => {
      mockRepository.getOAuthProviders.mockResolvedValue([{ id: 'oa-1', name: 'Google', status: 'active' }]);
      const service = createOAuthService(mockRepository);
      const result = await service.getOAuthProviders('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return providers with filters', async () => {
      mockRepository.getOAuthProviders.mockResolvedValue([{ id: 'oa-1' }]);
      const service = createOAuthService(mockRepository);
      await service.getOAuthProviders('school-1', { status: 'active' });
      expect(mockRepository.getOAuthProviders).toHaveBeenCalledWith('school-1', { status: 'active' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.getOAuthProviders('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getOAuthProviders.mockResolvedValue([]);
      const service = createOAuthService(mockRepository);
      const result = await service.getOAuthProviders('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated providers', async () => {
      mockRepository.getOAuthProviders.mockResolvedValue({ data: [{ id: 'oa-1' }], total: 5 });
      const service = createOAuthService(mockRepository);
      const result = await service.getOAuthProviders('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by type', async () => {
      mockRepository.getOAuthProviders.mockResolvedValue([{ id: 'oa-1', type: 'google' }]);
      const service = createOAuthService(mockRepository);
      const result = await service.getOAuthProviders('school-1', { type: 'google' });
      expect(result).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getOAuthProviders.mockRejectedValue(new Error('DB error'));
      const service = createOAuthService(mockRepository);
      await expect(service.getOAuthProviders('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getOAuthProviderById', () => {
    it('should return a single provider', async () => {
      mockRepository.getOAuthProviderById.mockResolvedValue({ id: 'oa-1', name: 'Google', clientId: '***' });
      const service = createOAuthService(mockRepository);
      const result = await service.getOAuthProviderById('oa-1');
      expect(result.id).toBe('oa-1');
    });

    it('should throw if provider not found', async () => {
      mockRepository.getOAuthProviderById.mockResolvedValue(null);
      const service = createOAuthService(mockRepository);
      await expect(service.getOAuthProviderById('nonexistent')).rejects.toThrow('OAuth provider not found');
    });

    it('should throw if id is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.getOAuthProviderById('')).rejects.toThrow('Provider ID is required');
    });

    it('should return provider with config', async () => {
      mockRepository.getOAuthProviderById.mockResolvedValue({ id: 'oa-1', config: { clientId: '***', scopes: ['read', 'write'] } });
      const service = createOAuthService(mockRepository);
      const result = await service.getOAuthProviderById('oa-1');
      expect(result.config.scopes).toHaveLength(2);
    });

    it('should return provider with endpoints', async () => {
      mockRepository.getOAuthProviderById.mockResolvedValue({ id: 'oa-1', endpoints: { authorize: 'https://accounts.google.com/o/oauth2/auth', token: 'https://oauth2.googleapis.com/token' } });
      const service = createOAuthService(mockRepository);
      const result = await service.getOAuthProviderById('oa-1');
      expect(result.endpoints.authorize).toBeDefined();
    });

    it('should handle repository errors', async () => {
      mockRepository.getOAuthProviderById.mockRejectedValue(new Error('Query timeout'));
      const service = createOAuthService(mockRepository);
      await expect(service.getOAuthProviderById('oa-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createOAuthProvider', () => {
    it('should create a provider', async () => {
      mockRepository.createOAuthProvider.mockResolvedValue({ id: 'oa-1', name: 'Google', status: 'active' });
      const service = createOAuthService(mockRepository);
      const result = await service.createOAuthProvider('school-1', 'user-1', { name: 'Google', type: 'google', clientId: '***', clientSecret: '***' });
      expect(result.id).toBe('oa-1');
      expect(mockRepository.createOAuthProvider).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.createOAuthProvider('', 'user-1', { name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.createOAuthProvider('school-1', '', { name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if name is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.createOAuthProvider('school-1', 'user-1', { name: '' })).rejects.toThrow('Provider name is required');
    });

    it('should create provider with endpoints', async () => {
      mockRepository.createOAuthProvider.mockResolvedValue({ id: 'oa-1', endpoints: { authorize: 'https://example.com/auth' } });
      const service = createOAuthService(mockRepository);
      const result = await service.createOAuthProvider('school-1', 'user-1', { name: 'T', type: 'custom', endpoints: { authorize: 'https://example.com/auth' } });
      expect(result.endpoints.authorize).toBeDefined();
    });

    it('should create provider with scopes', async () => {
      mockRepository.createOAuthProvider.mockResolvedValue({ id: 'oa-1', scopes: ['read', 'write'] });
      const service = createOAuthService(mockRepository);
      const result = await service.createOAuthProvider('school-1', 'user-1', { name: 'T', type: 'google', scopes: ['read', 'write'] });
      expect(result.scopes).toHaveLength(2);
    });

    it('should handle creation failure', async () => {
      mockRepository.createOAuthProvider.mockRejectedValue(new Error('Invalid credentials'));
      const service = createOAuthService(mockRepository);
      await expect(service.createOAuthProvider('school-1', 'user-1', { name: 'T', type: 'google' })).rejects.toThrow('Invalid credentials');
    });
  });

  describe('updateOAuthProvider', () => {
    it('should update a provider', async () => {
      mockRepository.getOAuthProviderById.mockResolvedValue({ id: 'oa-1', name: 'Old' });
      mockRepository.updateOAuthProvider.mockResolvedValue({ id: 'oa-1', name: 'Updated' });
      const service = createOAuthService(mockRepository);
      const result = await service.updateOAuthProvider('oa-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if provider not found', async () => {
      mockRepository.getOAuthProviderById.mockResolvedValue(null);
      const service = createOAuthService(mockRepository);
      await expect(service.updateOAuthProvider('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.updateOAuthProvider('', 'user-1', { name: 'New' })).rejects.toThrow('Provider ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.updateOAuthProvider('oa-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update provider config', async () => {
      mockRepository.getOAuthProviderById.mockResolvedValue({ id: 'oa-1' });
      mockRepository.updateOAuthProvider.mockResolvedValue({ id: 'oa-1', config: { clientId: 'new-id' } });
      const service = createOAuthService(mockRepository);
      const result = await service.updateOAuthProvider('oa-1', 'user-1', { config: { clientId: 'new-id' } });
      expect(result.config.clientId).toBe('new-id');
    });

    it('should handle update failure', async () => {
      mockRepository.getOAuthProviderById.mockResolvedValue({ id: 'oa-1' });
      mockRepository.updateOAuthProvider.mockRejectedValue(new Error('Cannot update'));
      const service = createOAuthService(mockRepository);
      await expect(service.updateOAuthProvider('oa-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteOAuthProvider', () => {
    it('should delete a provider', async () => {
      mockRepository.getOAuthProviderById.mockResolvedValue({ id: 'oa-1' });
      mockRepository.deleteOAuthProvider.mockResolvedValue({ success: true });
      const service = createOAuthService(mockRepository);
      await service.deleteOAuthProvider('oa-1', 'user-1');
      expect(mockRepository.deleteOAuthProvider).toHaveBeenCalledWith('oa-1');
    });

    it('should throw if provider not found', async () => {
      mockRepository.getOAuthProviderById.mockResolvedValue(null);
      const service = createOAuthService(mockRepository);
      await expect(service.deleteOAuthProvider('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.deleteOAuthProvider('', 'user-1')).rejects.toThrow('Provider ID is required');
    });

    it('should handle deletion with active tokens', async () => {
      mockRepository.getOAuthProviderById.mockResolvedValue({ id: 'oa-1' });
      mockRepository.deleteOAuthProvider.mockRejectedValue(new Error('Provider has active tokens'));
      const service = createOAuthService(mockRepository);
      await expect(service.deleteOAuthProvider('oa-1', 'user-1')).rejects.toThrow('Provider has active tokens');
    });

    it('should force delete provider', async () => {
      mockRepository.getOAuthProviderById.mockResolvedValue({ id: 'oa-1' });
      mockRepository.deleteOAuthProvider.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createOAuthService(mockRepository);
      const result = await service.deleteOAuthProvider('oa-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('authorize', () => {
    it('should generate authorization URL', async () => {
      mockRepository.authorize.mockResolvedValue({ authorizationUrl: 'https://accounts.google.com/o/oauth2/auth?client_id=***', state: 'random-state' });
      const service = createOAuthService(mockRepository);
      const result = await service.authorize('oa-1', 'user-1', { redirectUri: 'https://example.com/callback' });
      expect(result.authorizationUrl).toBeDefined();
      expect(result.state).toBeDefined();
    });

    it('should throw if providerId is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.authorize('', 'user-1', {})).rejects.toThrow('Provider ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.authorize('oa-1', '', {})).rejects.toThrow('userId is required');
    });

    it('should throw if redirectUri is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.authorize('oa-1', 'user-1', {})).rejects.toThrow('Redirect URI is required');
    });

    it('should return authorization URL with scopes', async () => {
      mockRepository.authorize.mockResolvedValue({ authorizationUrl: 'https://example.com/auth?scope=read+write', state: 'state' });
      const service = createOAuthService(mockRepository);
      const result = await service.authorize('oa-1', 'user-1', { redirectUri: 'https://example.com/callback', scopes: ['read', 'write'] });
      expect(result.authorizationUrl).toContain('scope');
    });

    it('should handle authorization failure', async () => {
      mockRepository.authorize.mockRejectedValue(new Error('Provider not active'));
      const service = createOAuthService(mockRepository);
      await expect(service.authorize('oa-1', 'user-1', { redirectUri: 'https://example.com/callback' })).rejects.toThrow('Provider not active');
    });
  });

  describe('getAccessToken', () => {
    it('should exchange code for access token', async () => {
      mockRepository.getAccessToken.mockResolvedValue({ accessToken: 'access-***', refreshToken: 'refresh-***', expiresIn: 3600 });
      const service = createOAuthService(mockRepository);
      const result = await service.getAccessToken('oa-1', 'user-1', { code: 'auth-code', redirectUri: 'https://example.com/callback' });
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });

    it('should throw if providerId is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.getAccessToken('', 'user-1', { code: 'c' })).rejects.toThrow('Provider ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.getAccessToken('oa-1', '', { code: 'c' })).rejects.toThrow('userId is required');
    });

    it('should throw if code is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.getAccessToken('oa-1', 'user-1', { code: '' })).rejects.toThrow('Authorization code is required');
    });

    it('should return token details', async () => {
      mockRepository.getAccessToken.mockResolvedValue({ accessToken: 'access-***', refreshToken: 'refresh-***', expiresIn: 3600, tokenType: 'Bearer', scope: 'read write' });
      const service = createOAuthService(mockRepository);
      const result = await service.getAccessToken('oa-1', 'user-1', { code: 'auth-code', redirectUri: 'https://example.com/callback' });
      expect(result.tokenType).toBe('Bearer');
    });

    it('should handle token exchange failure', async () => {
      mockRepository.getAccessToken.mockRejectedValue(new Error('Invalid code'));
      const service = createOAuthService(mockRepository);
      await expect(service.getAccessToken('oa-1', 'user-1', { code: 'invalid', redirectUri: 'https://example.com/callback' })).rejects.toThrow('Invalid code');
    });
  });

  describe('revokeToken', () => {
    it('should revoke an access token', async () => {
      mockRepository.revokeToken.mockResolvedValue({ success: true });
      const service = createOAuthService(mockRepository);
      await service.revokeToken('oa-1', 'user-1', 'access-***');
      expect(mockRepository.revokeToken).toHaveBeenCalledWith('oa-1', 'user-1', 'access-***');
    });

    it('should throw if providerId is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.revokeToken('', 'user-1', 'token')).rejects.toThrow('Provider ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.revokeToken('oa-1', '', 'token')).rejects.toThrow('userId is required');
    });

    it('should throw if token is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.revokeToken('oa-1', 'user-1', '')).rejects.toThrow('Token is required');
    });

    it('should handle revocation failure', async () => {
      mockRepository.revokeToken.mockRejectedValue(new Error('Token already revoked'));
      const service = createOAuthService(mockRepository);
      await expect(service.revokeToken('oa-1', 'user-1', 'token')).rejects.toThrow('Token already revoked');
    });
  });

  describe('refreshToken', () => {
    it('should refresh an access token', async () => {
      mockRepository.refreshToken.mockResolvedValue({ accessToken: 'new-access-***', refreshToken: 'new-refresh-***', expiresIn: 3600 });
      const service = createOAuthService(mockRepository);
      const result = await service.refreshToken('oa-1', 'user-1', 'old-refresh-***');
      expect(result.accessToken).toBeDefined();
    });

    it('should throw if providerId is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.refreshToken('', 'user-1', 'token')).rejects.toThrow('Provider ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.refreshToken('oa-1', '', 'token')).rejects.toThrow('userId is required');
    });

    it('should throw if refreshToken is missing', async () => {
      const service = createOAuthService(mockRepository);
      await expect(service.refreshToken('oa-1', 'user-1', '')).rejects.toThrow('Refresh token is required');
    });

    it('should return new token details', async () => {
      mockRepository.refreshToken.mockResolvedValue({ accessToken: 'new-access', refreshToken: 'new-refresh', expiresIn: 7200, tokenType: 'Bearer' });
      const service = createOAuthService(mockRepository);
      const result = await service.refreshToken('oa-1', 'user-1', 'old-refresh');
      expect(result.tokenType).toBe('Bearer');
    });

    it('should handle refresh failure', async () => {
      mockRepository.refreshToken.mockRejectedValue(new Error('Refresh token expired'));
      const service = createOAuthService(mockRepository);
      await expect(service.refreshToken('oa-1', 'user-1', 'expired-token')).rejects.toThrow('Refresh token expired');
    });
  });
});
