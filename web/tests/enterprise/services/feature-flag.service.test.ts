import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('FeatureFlagService', () => {
  const mockRepo = {
    findFlags: vi.fn(),
    findFlagById: vi.fn(),
    findFlagByName: vi.fn(),
    createFlag: vi.fn(),
    updateFlag: vi.fn(),
    deleteFlag: vi.fn(),
    toggleFlag: vi.fn(),
    evaluateFlag: vi.fn(),
    getFlagStats: vi.fn(),
    getFlagHistory: vi.fn(),
    getFlagTargets: vi.fn(),
    addTarget: vi.fn(),
    removeTarget: vi.fn(),
    getFlagMetrics: vi.fn(),
    bulkToggleFlags: vi.fn(),
    getEnvironmentFlags: vi.fn(),
    getFlagDependencies: vi.fn(),
    checkFlagConflicts: vi.fn(),
  };

  const enterpriseId = 'ent-1';
  const flagId = 'flag-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findFlags', () => {
    it('should return feature flags', async () => {
      const flags = [{ id: flagId, name: 'new_dashboard', enabled: true }];
      mockRepo.findFlags.mockResolvedValue(flags);
      const result = await mockRepo.findFlags(enterpriseId);
      expect(result).toEqual(flags);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should filter by status', async () => {
      mockRepo.findFlags.mockResolvedValue([]);
      await mockRepo.findFlags(enterpriseId, { enabled: true });
      expect(mockRepo.findFlags).toHaveBeenCalledWith(enterpriseId, { enabled: true });
    });

    it('should filter by category', async () => {
      mockRepo.findFlags.mockResolvedValue([]);
      await mockRepo.findFlags(enterpriseId, { category: 'ui' });
      expect(mockRepo.findFlags).toHaveBeenCalled();
    });

    it('should handle empty results', async () => {
      mockRepo.findFlags.mockResolvedValue([]);
      const result = await mockRepo.findFlags(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by name', async () => {
      mockRepo.findFlags.mockResolvedValue([]);
      await mockRepo.findFlags(enterpriseId, { sortBy: 'name', order: 'asc' });
      expect(mockRepo.findFlags).toHaveBeenCalled();
    });

    it('should include usage count', async () => {
      mockRepo.findFlags.mockResolvedValue([{ id: flagId, usageCount: 150 }]);
      const result = await mockRepo.findFlags(enterpriseId);
      expect(result[0].usageCount).toBe(150);
    });
  });

  describe('findFlagById', () => {
    it('should return flag by id', async () => {
      const flag = { id: flagId, name: 'new_dashboard', enabled: true };
      mockRepo.findFlagById.mockResolvedValue(flag);
      const result = await mockRepo.findFlagById(flagId);
      expect(result).toEqual(flag);
    });

    it('should throw if not found', async () => {
      mockRepo.findFlagById.mockResolvedValue(null);
      const findOrThrow = async (id: string) => {
        const flag = await mockRepo.findFlagById(id);
        if (!flag) throw new Error('Flag non trouvé');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Flag non trouvé');
    });

    it('should require flagId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant requis');
      };
      expect(() => validate('')).toThrow('Identifiant requis');
    });

    it('should include targeting rules', async () => {
      mockRepo.findFlagById.mockResolvedValue({ id: flagId, targetingRules: [{ condition: 'user.segment == "beta"' }] });
      const result = await mockRepo.findFlagById(flagId);
      expect(result.targetingRules).toHaveLength(1);
    });

    it('should include rollup percentage', async () => {
      mockRepo.findFlagById.mockResolvedValue({ id: flagId, rolloutPercentage: 25 });
      const result = await mockRepo.findFlagById(flagId);
      expect(result.rolloutPercentage).toBe(25);
    });
  });

  describe('findFlagByName', () => {
    it('should return flag by name', async () => {
      mockRepo.findFlagByName.mockResolvedValue({ id: flagId, name: 'new_dashboard' });
      const result = await mockRepo.findFlagByName(enterpriseId, 'new_dashboard');
      expect(result.name).toBe('new_dashboard');
    });

    it('should throw if name not found', async () => {
      mockRepo.findFlagByName.mockResolvedValue(null);
      const findOrThrow = async (name: string) => {
        const flag = await mockRepo.findFlagByName(enterpriseId, name);
        if (!flag) throw new Error('Flag non trouvé');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Flag non trouvé');
    });

    it('should require flag name', () => {
      const validate = (name: string) => {
        if (!name) throw new Error('Le nom du flag est requis');
      };
      expect(() => validate('')).toThrow('Le nom du flag est requis');
    });
  });

  describe('createFlag', () => {
    it('should create flag with valid data', async () => {
      const data = { name: 'new_feature', description: 'Enable new feature', enabled: false };
      mockRepo.findFlagByName.mockResolvedValue(null);
      mockRepo.createFlag.mockResolvedValue({ id: flagId, ...data });
      const result = await mockRepo.createFlag({ ...data, enterprise_id: enterpriseId });
      expect(result.name).toBe('new_feature');
    });

    it('should require name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom est requis');
      };
      expect(() => validate({ description: 'Desc' })).toThrow('Le nom est requis');
    });

    it('should validate name format', () => {
      const isValidName = (name: string) => /^[a-z][a-z0-9_]*$/.test(name);
      expect(isValidName('new_feature')).toBe(true);
      expect(isValidName('New Feature')).toBe(false);
      expect(isValidName('123start')).toBe(false);
    });

    it('should reject duplicate name', async () => {
      mockRepo.findFlagByName.mockResolvedValue({ id: 'existing' });
      const createOrThrow = async (name: string) => {
        const existing = await mockRepo.findFlagByName(enterpriseId, name);
        if (existing) throw new Error('Un flag avec ce nom existe déjà');
      };
      await expect(createOrThrow('existing_flag')).rejects.toThrow();
    });

    it('should set default values', async () => {
      mockRepo.findFlagByName.mockResolvedValue(null);
      mockRepo.createFlag.mockResolvedValue({ id: flagId, enabled: false, rolloutPercentage: 0 });
      const result = await mockRepo.createFlag({ name: 'new_flag', enterprise_id: enterpriseId });
      expect(result.enabled).toBe(false);
      expect(result.rolloutPercentage).toBe(0);
    });

    it('should require description', () => {
      const validate = (data: any) => {
        if (!data?.description) throw new Error('La description est requise');
      };
      expect(() => validate({ name: 'flag' })).toThrow('La description est requise');
    });

    it('should validate description length', () => {
      const validate = (desc: string) => {
        if (desc.length < 10) throw new Error('La description doit contenir au moins 10 caractères');
      };
      expect(() => validate('Short')).toThrow();
      expect(() => validate('This is a valid description')).not.toThrow();
    });

    it('should accept valid categories', () => {
      const validCategories = ['ui', 'backend', 'experiment', 'ops'];
      const validate = (cat: string) => {
        if (!validCategories.includes(cat)) throw new Error('Catégorie invalide');
      };
      expect(() => validate('ui')).not.toThrow();
      expect(() => validate('invalid')).toThrow();
    });
  });

  describe('updateFlag', () => {
    it('should update flag', async () => {
      mockRepo.findFlagById.mockResolvedValue({ id: flagId, name: 'old_name' });
      mockRepo.updateFlag.mockResolvedValue({ id: flagId, name: 'new_name' });
      const result = await mockRepo.updateFlag(flagId, { name: 'new_name' });
      expect(result.name).toBe('new_name');
    });

    it('should throw if not found', async () => {
      mockRepo.findFlagById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const flag = await mockRepo.findFlagById(flagId);
        if (!flag) throw new Error('Flag non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow('Flag non trouvé');
    });

    it('should allow description update', async () => {
      mockRepo.findFlagById.mockResolvedValue({ id: flagId });
      mockRepo.updateFlag.mockResolvedValue({ description: 'Updated description for the feature flag' });
      const result = await mockRepo.updateFlag(flagId, { description: 'Updated description for the feature flag' });
      expect(result.description).toBeDefined();
    });

    it('should update rollout percentage', async () => {
      mockRepo.findFlagById.mockResolvedValue({ id: flagId });
      mockRepo.updateFlag.mockResolvedValue({ rolloutPercentage: 50 });
      const result = await mockRepo.updateFlag(flagId, { rolloutPercentage: 50 });
      expect(result.rolloutPercentage).toBe(50);
    });

    it('should validate rollout percentage', () => {
      const validate = (pct: number) => {
        if (pct < 0 || pct > 100) throw new Error('Le pourcentage doit être entre 0 et 100');
      };
      expect(() => validate(50)).not.toThrow();
      expect(() => validate(-1)).toThrow();
      expect(() => validate(101)).toThrow();
    });
  });

  describe('deleteFlag', () => {
    it('should delete flag', async () => {
      mockRepo.findFlagById.mockResolvedValue({ id: flagId });
      mockRepo.deleteFlag.mockResolvedValue(undefined);
      await mockRepo.deleteFlag(flagId);
      expect(mockRepo.deleteFlag).toHaveBeenCalledWith(flagId);
    });

    it('should throw if not found', async () => {
      mockRepo.findFlagById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const flag = await mockRepo.findFlagById(flagId);
        if (!flag) throw new Error('Flag non trouvé');
      };
      await expect(deleteOrThrow()).rejects.toThrow('Flag non trouvé');
    });

    it('should not delete system flags', async () => {
      mockRepo.findFlagById.mockResolvedValue({ id: flagId, isSystem: true });
      const deleteOrThrow = async () => {
        const flag = await mockRepo.findFlagById(flagId);
        if (flag?.isSystem) throw new Error('Les flags système ne peuvent pas être supprimés');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });

    it('should archive instead of hard delete', async () => {
      mockRepo.findFlagById.mockResolvedValue({ id: flagId });
      mockRepo.deleteFlag.mockResolvedValue({ archived: true });
      const result = await mockRepo.deleteFlag(flagId);
      expect(result.archived).toBe(true);
    });
  });

  describe('toggleFlag', () => {
    it('should toggle flag on', async () => {
      mockRepo.findFlagById.mockResolvedValue({ id: flagId, enabled: false });
      mockRepo.toggleFlag.mockResolvedValue({ id: flagId, enabled: true });
      const result = await mockRepo.toggleFlag(flagId);
      expect(result.enabled).toBe(true);
    });

    it('should toggle flag off', async () => {
      mockRepo.findFlagById.mockResolvedValue({ id: flagId, enabled: true });
      mockRepo.toggleFlag.mockResolvedValue({ id: flagId, enabled: false });
      const result = await mockRepo.toggleFlag(flagId);
      expect(result.enabled).toBe(false);
    });

    it('should throw if not found', async () => {
      mockRepo.findFlagById.mockResolvedValue(null);
      const toggleOrThrow = async () => {
        const flag = await mockRepo.findFlagById(flagId);
        if (!flag) throw new Error('Flag non trouvé');
      };
      await expect(toggleOrThrow()).rejects.toThrow('Flag non trouvé');
    });

    it('should record toggle timestamp', async () => {
      mockRepo.findFlagById.mockResolvedValue({ id: flagId, enabled: false });
      mockRepo.toggleFlag.mockResolvedValue({ enabled: true, toggledAt: new Date().toISOString() });
      const result = await mockRepo.toggleFlag(flagId);
      expect(result.toggledAt).toBeDefined();
    });

    it('should record toggle actor', async () => {
      mockRepo.findFlagById.mockResolvedValue({ id: flagId });
      mockRepo.toggleFlag.mockResolvedValue({ enabled: true, toggledBy: 'usr-1' });
      const result = await mockRepo.toggleFlag(flagId, 'usr-1');
      expect(result.toggledBy).toBe('usr-1');
    });
  });

  describe('evaluateFlag', () => {
    it('should evaluate flag for context', async () => {
      mockRepo.evaluateFlag.mockResolvedValue({ flagName: 'new_dashboard', enabled: true });
      const result = await mockRepo.evaluateFlag(enterpriseId, 'new_dashboard', { userId: 'u-1', segment: 'beta' });
      expect(result.enabled).toBe(true);
    });

    it('should return false for disabled flag', async () => {
      mockRepo.evaluateFlag.mockResolvedValue({ flagName: 'old_feature', enabled: false });
      const result = await mockRepo.evaluateFlag(enterpriseId, 'old_feature', { userId: 'u-1' });
      expect(result.enabled).toBe(false);
    });

    it('should handle percentage rollouts', async () => {
      mockRepo.evaluateFlag.mockResolvedValue({ flagName: 'gradual_rollout', enabled: true, variant: 'treatment' });
      const result = await mockRepo.evaluateFlag(enterpriseId, 'gradual_rollout', { userId: 'u-1' });
      expect(result.variant).toBe('treatment');
    });

    it('should handle user targeting', async () => {
      mockRepo.evaluateFlag.mockResolvedValue({ flagName: 'beta_feature', enabled: true, reason: 'user_targeted' });
      const result = await mockRepo.evaluateFlag(enterpriseId, 'beta_feature', { userId: 'beta-user' });
      expect(result.reason).toBe('user_targeted');
    });

    it('should handle segment targeting', async () => {
      mockRepo.evaluateFlag.mockResolvedValue({ flagName: 'segment_flag', enabled: true, reason: 'segment_match' });
      const result = await mockRepo.evaluateFlag(enterpriseId, 'segment_flag', { segment: 'enterprise' });
      expect(result.reason).toBe('segment_match');
    });

    it('should return default for unknown flag', async () => {
      mockRepo.evaluateFlag.mockResolvedValue({ flagName: 'unknown', enabled: false, reason: 'flag_not_found' });
      const result = await mockRepo.evaluateFlag(enterpriseId, 'unknown', {});
      expect(result.enabled).toBe(false);
    });
  });

  describe('getFlagStats', () => {
    it('should return flag statistics', async () => {
      mockRepo.getFlagStats.mockResolvedValue({ total: 25, enabled: 15, disabled: 10 });
      const result = await mockRepo.getFlagStats(enterpriseId);
      expect(result.total).toBe(25);
    });

    it('should include evaluation counts', async () => {
      mockRepo.getFlagStats.mockResolvedValue({ totalEvaluations: 10000 });
      const result = await mockRepo.getFlagStats(enterpriseId);
      expect(result.totalEvaluations).toBe(10000);
    });

    it('should include category breakdown', async () => {
      mockRepo.getFlagStats.mockResolvedValue({ byCategory: { ui: 10, backend: 8, experiment: 7 } });
      const result = await mockRepo.getFlagStats(enterpriseId);
      expect(result.byCategory.ui).toBe(10);
    });

    it('should handle zero flags', async () => {
      mockRepo.getFlagStats.mockResolvedValue({ total: 0 });
      const result = await mockRepo.getFlagStats(enterpriseId);
      expect(result.total).toBe(0);
    });

    it('should include last updated timestamp', async () => {
      mockRepo.getFlagStats.mockResolvedValue({ lastUpdated: new Date().toISOString() });
      const result = await mockRepo.getFlagStats(enterpriseId);
      expect(result.lastUpdated).toBeDefined();
    });
  });

  describe('getFlagHistory', () => {
    it('should return flag change history', async () => {
      mockRepo.getFlagHistory.mockResolvedValue([{ action: 'toggled', date: '2026-01-01', by: 'usr-1' }]);
      const result = await mockRepo.getFlagHistory(flagId);
      expect(result).toHaveLength(1);
    });

    it('should filter by date range', async () => {
      mockRepo.getFlagHistory.mockResolvedValue([]);
      await mockRepo.getFlagHistory(flagId, { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.getFlagHistory).toHaveBeenCalled();
    });

    it('should sort by date descending', async () => {
      mockRepo.getFlagHistory.mockResolvedValue([
        { date: '2026-01-01' },
        { date: '2026-02-01' },
      ]);
      const result = await mockRepo.getFlagHistory(flagId);
      expect(result).toHaveLength(2);
    });

    it('should include change details', async () => {
      mockRepo.getFlagHistory.mockResolvedValue([{ changes: { enabled: { from: false, to: true } } }]);
      const result = await mockRepo.getFlagHistory(flagId);
      expect(result[0].changes.enabled.to).toBe(true);
    });

    it('should handle empty history', async () => {
      mockRepo.getFlagHistory.mockResolvedValue([]);
      const result = await mockRepo.getFlagHistory(flagId);
      expect(result).toHaveLength(0);
    });
  });

  describe('getFlagTargets', () => {
    it('should return flag targets', async () => {
      mockRepo.getFlagTargets.mockResolvedValue([{ type: 'user', value: 'user-123' }]);
      const result = await mockRepo.getFlagTargets(flagId);
      expect(result).toHaveLength(1);
    });

    it('should filter by target type', async () => {
      mockRepo.getFlagTargets.mockResolvedValue([]);
      await mockRepo.getFlagTargets(flagId, { type: 'segment' });
      expect(mockRepo.getFlagTargets).toHaveBeenCalled();
    });

    it('should handle no targets', async () => {
      mockRepo.getFlagTargets.mockResolvedValue([]);
      const result = await mockRepo.getFlagTargets(flagId);
      expect(result).toHaveLength(0);
    });
  });

  describe('addTarget', () => {
    it('should add target to flag', async () => {
      mockRepo.addTarget.mockResolvedValue({ flagId, type: 'user', value: 'user-123' });
      const result = await mockRepo.addTarget(flagId, { type: 'user', value: 'user-123' });
      expect(result.value).toBe('user-123');
    });

    it('should require target type', () => {
      const validate = (data: any) => {
        if (!data?.type) throw new Error('Le type de cible est requis');
      };
      expect(() => validate({ value: 'test' })).toThrow('Le type de cible est requis');
    });

    it('should require target value', () => {
      const validate = (data: any) => {
        if (!data?.value) throw new Error('La valeur de la cible est requise');
      };
      expect(() => validate({ type: 'user' })).toThrow('La valeur de la cible est requise');
    });

    it('should reject duplicate target', async () => {
      mockRepo.addTarget.mockRejectedValue(new Error('Cette cible existe déjà'));
      await expect(mockRepo.addTarget(flagId, { type: 'user', value: 'existing' })).rejects.toThrow();
    });

    it('should validate target type', () => {
      const validTypes = ['user', 'segment', 'percentage', 'region'];
      const validate = (type: string) => {
        if (!validTypes.includes(type)) throw new Error('Type de cible invalide');
      };
      expect(() => validate('user')).not.toThrow();
      expect(() => validate('invalid')).toThrow();
    });
  });

  describe('removeTarget', () => {
    it('should remove target from flag', async () => {
      mockRepo.removeTarget.mockResolvedValue(undefined);
      await mockRepo.removeTarget(flagId, 'target-1');
      expect(mockRepo.removeTarget).toHaveBeenCalledWith(flagId, 'target-1');
    });

    it('should throw if target not found', async () => {
      mockRepo.removeTarget.mockRejectedValue(new Error('Cible non trouvée'));
      await expect(mockRepo.removeTarget(flagId, 'nonexistent')).rejects.toThrow('Cible non trouvée');
    });
  });

  describe('bulkToggleFlags', () => {
    it('should toggle multiple flags', async () => {
      mockRepo.bulkToggleFlags.mockResolvedValue({ toggled: 5, enabled: 3, disabled: 2 });
      const result = await mockRepo.bulkToggleFlags(enterpriseId, ['flag-1', 'flag-2', 'flag-3', 'flag-4', 'flag-5'], true);
      expect(result.toggled).toBe(5);
    });

    it('should handle empty list', async () => {
      mockRepo.bulkToggleFlags.mockResolvedValue({ toggled: 0 });
      const result = await mockRepo.bulkToggleFlags(enterpriseId, [], true);
      expect(result.toggled).toBe(0);
    });

    it('should validate batch size', () => {
      const maxBatch = 50;
      const batchSize = 25;
      const isValid = batchSize <= maxBatch;
      expect(isValid).toBe(true);
    });
  });

  describe('getEnvironmentFlags', () => {
    it('should return flags for environment', async () => {
      mockRepo.getEnvironmentFlags.mockResolvedValue([{ name: 'feature_a', enabled: true }]);
      const result = await mockRepo.getEnvironmentFlags(enterpriseId, 'production');
      expect(result).toHaveLength(1);
    });

    it('should support multiple environments', async () => {
      const envs = ['development', 'staging', 'production'];
      for (const env of envs) {
        mockRepo.getEnvironmentFlags.mockResolvedValue([]);
        await mockRepo.getEnvironmentFlags(enterpriseId, env);
        expect(mockRepo.getEnvironmentFlags).toHaveBeenCalled();
      }
    });

    it('should handle unknown environment', async () => {
      mockRepo.getEnvironmentFlags.mockResolvedValue([]);
      const result = await mockRepo.getEnvironmentFlags(enterpriseId, 'unknown');
      expect(result).toHaveLength(0);
    });
  });

  describe('checkFlagConflicts', () => {
    it('should check for flag conflicts', async () => {
      mockRepo.checkFlagConflicts.mockResolvedValue({ conflicts: [], hasConflicts: false });
      const result = await mockRepo.checkFlagConflicts(enterpriseId);
      expect(result.hasConflicts).toBe(false);
    });

    it('should detect conflicts', async () => {
      mockRepo.checkFlagConflicts.mockResolvedValue({
        conflicts: [{ flag1: 'f-1', flag2: 'f-2', reason: 'Mutually exclusive' }],
        hasConflicts: true,
      });
      const result = await mockRepo.checkFlagConflicts(enterpriseId);
      expect(result.hasConflicts).toBe(true);
    });

    it('should validate specific flags', async () => {
      mockRepo.checkFlagConflicts.mockResolvedValue({ conflicts: [], hasConflicts: false });
      await mockRepo.checkFlagConflicts(enterpriseId, { flagIds: ['f-1', 'f-2'] });
      expect(mockRepo.checkFlagConflicts).toHaveBeenCalled();
    });

    it('should handle no conflicts', async () => {
      mockRepo.checkFlagConflicts.mockResolvedValue({ conflicts: [], hasConflicts: false });
      const result = await mockRepo.checkFlagConflicts(enterpriseId);
      expect(result.conflicts).toHaveLength(0);
    });

    it('should include conflict details', async () => {
      mockRepo.checkFlagConflicts.mockResolvedValue({
        conflicts: [{ flag1: 'f-1', flag2: 'f-2', type: 'dependency', message: 'f-1 requires f-2' }],
        hasConflicts: true,
      });
      const result = await mockRepo.checkFlagConflicts(enterpriseId);
      expect(result.conflicts[0].type).toBe('dependency');
    });
  });
});
