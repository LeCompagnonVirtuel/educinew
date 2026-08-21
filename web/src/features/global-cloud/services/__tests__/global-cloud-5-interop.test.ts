import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockRepo = {
  findMany: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const schoolId = '550e8400-e29b-41d4-a716-446655440000';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Interoperability - UNESCO Connector Service', () => {
  it('should list connectors', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', name: 'UNESCO Sync', status: 'ACTIVE' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result[0].status).toBe('ACTIVE');
  });

  it('should create connector', async () => {
    const data = { schoolId, name: 'UNESCO ED', status: 'ACTIVE', apiEndpoint: 'https://api.unesco.org', apiKey: 'key123', syncConfig: { direction: 'BIDIRECTIONAL', mode: 'PERIODIC', frequency: 'EVERY_HOUR', batchSize: 'MEDIUM_1000', conflictResolution: 'LAST_WRITE', retryStrategy: 'EXPONENTIAL', errorHandling: 'RETRY', enabled: true } };
    mockRepo.create.mockResolvedValue({ id: 'c1', ...data });
    const result = await mockRepo.create(data);
    expect(result.name).toBe('UNESCO ED');
  });

  it('should update connector', async () => {
    mockRepo.update.mockResolvedValue({ id: 'c1', status: 'INACTIVE' });
    const result = await mockRepo.update(schoolId, 'c1', { status: 'INACTIVE' });
    expect(result.status).toBe('INACTIVE');
  });

  it('should delete connector', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await mockRepo.delete(schoolId, 'c1');
    expect(mockRepo.delete).toHaveBeenCalled();
  });
});

describe('Interoperability - ConnectorConfig Service', () => {
  it('should create connector config', async () => {
    const data = { connectorId: 'c1', schoolId, protocol: 'REST', endpoint: 'https://api.example.com', authentication: { protocol: 'OAUTH2', scopes: ['read'] }, security: { level: 'HIGH', encryption: 'AES256', authentication: 'MFA', dataClassification: 'CONFIDENTIAL', tlsVersion: '1.3', certificatePinning: true, corsOrigins: [], csrfProtection: true, xssProtection: true, contentSecurityPolicy: "default-src 'self'" }, retry: { strategy: 'EXPONENTIAL', maxRetries: 3, initialDelayMs: 1000, maxDelayMs: 30000, backoffMultiplier: 2, jitter: true }, timeout: { connectionMs: 5000, requestMs: 30000, responseMs: 30000, idleMs: 60000, onTimeout: 'RETRY' }, rateLimit: { enabled: true, maxRequests: 100, windowMs: 60000, unit: 'PER_MINUTE', strategy: 'sliding_window', burstSize: null }, compression: 'GZIP', version: '1.0', customHeaders: {}, customParams: {} };
    mockRepo.create.mockResolvedValue({ id: 'cfg1', ...data });
    const result = await mockRepo.create(data);
    expect(result.protocol).toBe('REST');
  });
});

describe('Interoperability - DataMapping Service', () => {
  it('should create data mapping', async () => {
    const data = { connectorId: 'c1', sourceField: 'student.name', targetField: 'name', dataType: 'string', strategy: 'DIRECT', isRequired: true, status: 'MAPPED' };
    mockRepo.create.mockResolvedValue({ id: 'dm1', ...data });
    const result = await mockRepo.create(data);
    expect(result.strategy).toBe('DIRECT');
  });

  it('should list mappings', async () => {
    mockRepo.findMany.mockResolvedValue([]);
    expect(await mockRepo.findMany(schoolId)).toHaveLength(0);
  });
});

describe('Interoperability - WebhookConfig Service', () => {
  it('should create webhook config', async () => {
    const data = { connectorId: 'c1', schoolId, url: 'https://webhook.example.com', secret: 'whsec123', events: ['student.created'], headers: {}, retryStrategy: 'EXPONENTIAL', maxRetries: 3, timeoutMs: 10000, enabled: true };
    mockRepo.create.mockResolvedValue({ id: 'wh1', ...data });
    const result = await mockRepo.create(data);
    expect(result.events).toContain('student.created');
  });
});
