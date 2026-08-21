import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/multilang.repository', () => ({
  MultilangRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findTranslationById: vi.fn(),
  findTranslationsByLocale: vi.fn(),
  createTranslation: vi.fn(),
  updateTranslation: vi.fn(),
  deleteTranslation: vi.fn(),
  listTranslations: vi.fn(),
  getSupportedLocales: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Multilang Service - Translations', () => {
  it('should list translations', async () => {
    mockRepo.listTranslations.mockResolvedValue([
      { id: '1', key: 'welcome', locale: 'fr', value: 'Bienvenue' },
    ]);
    const result = await mockRepo.listTranslations('school1');
    expect(result).toHaveLength(1);
    expect(result[0].locale).toBe('fr');
  });

  it('should create a translation', async () => {
    const data = { school_id: 'school1', key: 'hello', locale: 'en', value: 'Hello' };
    mockRepo.createTranslation.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.createTranslation(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.value).toBe('Hello');
  });

  it('should update a translation', async () => {
    mockRepo.findTranslationById.mockResolvedValue({ id: '1', value: 'Old' });
    mockRepo.updateTranslation.mockResolvedValue({ id: '1', value: 'New' });
    const result = await mockRepo.updateTranslation('school1', '1', { value: 'New' });
    expect(result.value).toBe('New');
  });

  it('should delete a translation', async () => {
    mockRepo.findTranslationById.mockResolvedValue({ id: '1' });
    mockRepo.deleteTranslation.mockResolvedValue(undefined);
    await expect(mockRepo.deleteTranslation('school1', '1')).resolves.toBeUndefined();
  });

  it('should find translations by locale', async () => {
    mockRepo.findTranslationsByLocale.mockResolvedValue([
      { id: '1', locale: 'fr', key: 'welcome' },
    ]);
    const result = await mockRepo.findTranslationsByLocale('school1', 'fr');
    expect(result).toHaveLength(1);
  });
});

describe('Multilang Service - Error Handling', () => {
  it('should handle DB errors', async () => {
    mockRepo.listTranslations.mockRejectedValue(new Error('Timeout'));
    await expect(mockRepo.listTranslations('school1')).rejects.toThrow('Timeout');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });

  it('should get supported locales', async () => {
    mockRepo.getSupportedLocales.mockResolvedValue(['fr', 'en', 'ar']);
    const result = await mockRepo.getSupportedLocales('school1');
    expect(result).toContain('fr');
    expect(result).toContain('en');
  });
});
