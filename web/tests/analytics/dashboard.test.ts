import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createDashboardService } from '../../src/features/analytics/services/dashboard.service';

const mockRepository = {
  createDashboard: vi.fn(),
  updateDashboard: vi.fn(),
  deleteDashboard: vi.fn(),
  getDashboard: vi.fn(),
  listDashboards: vi.fn(),
  shareDashboard: vi.fn(),
};

describe('DashboardService', () => {
  let service: ReturnType<typeof createDashboardService>;

  beforeEach(() => {
    vi.clearAllMocks();
    service = createDashboardService(mockRepository as any);
  });

  it('should call createDashboard with data', async () => {
    const data = { name: 'Executive Dashboard', description: 'Overview dashboard' };
    mockRepository.createDashboard.mockResolvedValue({ id: 'dash-1', ...data });
    const result = await service.createDashboard(data);
    expect(mockRepository.createDashboard).toHaveBeenCalledWith(data);
    expect(result).toHaveProperty('id');
  });

  it('should propagate errors from createDashboard', async () => {
    mockRepository.createDashboard.mockRejectedValue(new Error('Create error'));
    await expect(service.createDashboard({})).rejects.toThrow('Create error');
  });

  it('should call updateDashboard with id and data', async () => {
    const data = { name: 'Updated Dashboard' };
    mockRepository.updateDashboard.mockResolvedValue({ id: 'dash-1', ...data });
    const result = await service.updateDashboard('dash-1', data);
    expect(mockRepository.updateDashboard).toHaveBeenCalledWith('dash-1', data);
    expect(result).toHaveProperty('id');
  });

  it('should propagate errors from updateDashboard', async () => {
    mockRepository.updateDashboard.mockRejectedValue(new Error('Update error'));
    await expect(service.updateDashboard('dash-1', {})).rejects.toThrow('Update error');
  });

  it('should call deleteDashboard with id', async () => {
    mockRepository.deleteDashboard.mockResolvedValue(undefined);
    await service.deleteDashboard('dash-1');
    expect(mockRepository.deleteDashboard).toHaveBeenCalledWith('dash-1');
  });

  it('should propagate errors from deleteDashboard', async () => {
    mockRepository.deleteDashboard.mockRejectedValue(new Error('Delete error'));
    await expect(service.deleteDashboard('dash-1')).rejects.toThrow('Delete error');
  });

  it('should call getDashboard with id', async () => {
    mockRepository.getDashboard.mockResolvedValue({ id: 'dash-1', name: 'Test Dashboard' });
    const result = await service.getDashboard('dash-1');
    expect(mockRepository.getDashboard).toHaveBeenCalledWith('dash-1');
    expect(result).toHaveProperty('name');
  });

  it('should propagate errors from getDashboard', async () => {
    mockRepository.getDashboard.mockRejectedValue(new Error('Get error'));
    await expect(service.getDashboard('dash-1')).rejects.toThrow('Get error');
  });

  it('should call listDashboards with filters', async () => {
    const filters = { userId: 'user-1' };
    mockRepository.listDashboards.mockResolvedValue([]);
    const result = await service.listDashboards(filters);
    expect(mockRepository.listDashboards).toHaveBeenCalledWith(filters);
    expect(result).toEqual([]);
  });

  it('should call listDashboards without filters', async () => {
    mockRepository.listDashboards.mockResolvedValue([]);
    await service.listDashboards();
    expect(mockRepository.listDashboards).toHaveBeenCalledWith(undefined);
  });

  it('should propagate errors from listDashboards', async () => {
    mockRepository.listDashboards.mockRejectedValue(new Error('List error'));
    await expect(service.listDashboards()).rejects.toThrow('List error');
  });

  it('should call shareDashboard with id and userIds', async () => {
    const userIds = ['user-2', 'user-3'];
    mockRepository.shareDashboard.mockResolvedValue({ id: 'dash-1', isShared: true, sharedWith: userIds });
    const result = await service.shareDashboard('dash-1', userIds);
    expect(mockRepository.shareDashboard).toHaveBeenCalledWith('dash-1', userIds);
    expect(result.isShared).toBe(true);
  });

  it('should propagate errors from shareDashboard', async () => {
    mockRepository.shareDashboard.mockRejectedValue(new Error('Share error'));
    await expect(service.shareDashboard('dash-1', ['user-2'])).rejects.toThrow('Share error');
  });

  it('should create dashboard with widgets', async () => {
    const data = { name: 'Widget Dashboard', widgets: [{ type: 'kpi', title: 'Revenue KPI' }] };
    mockRepository.createDashboard.mockResolvedValue({ id: 'dash-2', ...data });
    const result = await service.createDashboard(data);
    expect(result.widgets).toHaveLength(1);
  });

  it('should update dashboard widgets successfully', async () => {
    mockRepository.updateDashboard.mockResolvedValue({ id: 'dash-1', widgets: [{ type: 'chart', title: 'Sales Chart' }] });
    const result = await service.updateDashboard('dash-1', { widgets: [{ type: 'chart', title: 'Sales Chart' }] });
    expect(result.widgets).toHaveLength(1);
  });

  it('should list multiple dashboards', async () => {
    mockRepository.listDashboards.mockResolvedValue([{ id: 'dash-1' }, { id: 'dash-2' }]);
    const result = await service.listDashboards();
    expect(result).toHaveLength(2);
  });

  it('should share dashboard with multiple users', async () => {
    mockRepository.shareDashboard.mockResolvedValue({ id: 'dash-1', sharedWith: ['u1', 'u2', 'u3'] });
    const result = await service.shareDashboard('dash-1', ['u1', 'u2', 'u3']);
    expect(result.sharedWith).toHaveLength(3);
  });

  it('should return null for getDashboard with non-existent id', async () => {
    mockRepository.getDashboard.mockResolvedValue(null);
    const result = await service.getDashboard('non-existent');
    expect(result).toBeNull();
  });

  it('should create dashboard with isDefault flag', async () => {
    const data = { name: 'Default Dashboard', isDefault: true };
    mockRepository.createDashboard.mockResolvedValue({ id: 'dash-3', ...data });
    const result = await service.createDashboard(data);
    expect(result.isDefault).toBe(true);
  });

  it('should create dashboard with isShared flag', async () => {
    const data = { name: 'Shared Dashboard', isShared: true, sharedWith: ['user-1'] };
    mockRepository.createDashboard.mockResolvedValue({ id: 'dash-4', ...data });
    const result = await service.createDashboard(data);
    expect(result.isShared).toBe(true);
  });

  it('should delete dashboard returning void', async () => {
    mockRepository.deleteDashboard.mockResolvedValue(undefined);
    const result = await service.deleteDashboard('dash-1');
    expect(result).toBeUndefined();
  });

  it('should handle updateDashboard with isDefault', async () => {
    mockRepository.updateDashboard.mockResolvedValue({ id: 'dash-1', isDefault: true });
    const result = await service.updateDashboard('dash-1', { isDefault: true });
    expect(result.isDefault).toBe(true);
  });

  it('should handle shareDashboard adding to existing shared list', async () => {
    mockRepository.shareDashboard.mockResolvedValue({ id: 'dash-1', sharedWith: ['existing-user', 'new-user'] });
    const result = await service.shareDashboard('dash-1', ['new-user']);
    expect(result.sharedWith).toContain('existing-user');
    expect(result.sharedWith).toContain('new-user');
  });

  it('should create dashboard with description', async () => {
    const data = { name: 'Described Dashboard', description: 'A dashboard with a description' };
    mockRepository.createDashboard.mockResolvedValue({ id: 'dash-5', ...data });
    const result = await service.createDashboard(data);
    expect(result.description).toBe('A dashboard with a description');
  });

  it('should return empty array for listDashboards with no results', async () => {
    mockRepository.listDashboards.mockResolvedValue([]);
    const result = await service.listDashboards();
    expect(result).toEqual([]);
  });

  it('should propagate error from shareDashboard with empty array', async () => {
    mockRepository.shareDashboard.mockRejectedValue(new Error('Invalid users'));
    await expect(service.shareDashboard('dash-1', [])).rejects.toThrow('Invalid users');
  });

  it('should handle updateDashboard with partial data', async () => {
    mockRepository.updateDashboard.mockResolvedValue({ id: 'dash-1', description: 'Updated' });
    const result = await service.updateDashboard('dash-1', { description: 'Updated' });
    expect(result.description).toBe('Updated');
  });

  it('should handle getDashboard returning complete object', async () => {
    mockRepository.getDashboard.mockResolvedValue({ id: 'dash-1', name: 'Full Dashboard', widgets: [], createdAt: '2025-07-24T00:00:00Z' });
    const result = await service.getDashboard('dash-1');
    expect(result).toHaveProperty('createdAt');
  });
});
