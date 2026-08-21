import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBusAssignmentService } from '@/features/smart-campus/services/sc-bus-assignment.service';

describe('ScBusAssignmentService', () => {
  let service: ScBusAssignmentService;
  const mockSupabase = {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
          then: vi.fn()
        })),
        then: vi.fn()
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn()
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn()
          }))
        }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn()
      }))
    }))
  } as any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ScBusAssignmentService(mockSupabase);
  });

  it('should get assignment by id', async () => {
    const result = await service.getAssignment('school-1', 'assignment-1');
    expect(result).toBeDefined();
  });

  it('should return assignment with correct data', async () => {
    const mockAssignment = { id: 'assignment-1', bus_id: 'bus-1', driver_id: 'driver-1' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockAssignment, error: null });
    const result = await service.getAssignment('school-1', 'assignment-1');
    expect(result).toEqual(mockAssignment);
  });

  it('should handle error when getting assignment', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getAssignment('school-1', 'assignment-1');
    expect(result).toBeNull();
  });

  it('should get all assignments for a school', async () => {
    const mockAssignments = [{ id: 'assignment-1' }, { id: 'assignment-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAssignments, error: null });
    const result = await service.getAssignments('school-1');
    expect(result).toEqual(mockAssignments);
  });

  it('should create a new assignment', async () => {
    const newAssignment = { bus_id: 'bus-1', driver_id: 'driver-1', route_id: 'route-1' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'assignment-3', ...newAssignment }, error: null });
    const result = await service.createAssignment('school-1', newAssignment);
    expect(result).toBeDefined();
  });

  it('should update an assignment', async () => {
    const updates = { route_id: 'route-2' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'assignment-1', ...updates }, error: null });
    const result = await service.updateAssignment('school-1', 'assignment-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete an assignment', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteAssignment('school-1', 'assignment-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteAssignment('school-1', 'assignment-1');
    expect(result).toBe(false);
  });

  it('should get active assignments', async () => {
    const mockAssignments = [{ id: 'assignment-1', status: 'active' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAssignments, error: null });
    const result = await service.getActiveAssignments('school-1');
    expect(result).toEqual(mockAssignments);
  });

  it('should get assignments by bus', async () => {
    const mockAssignments = [{ id: 'assignment-1', bus_id: 'bus-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAssignments, error: null });
    const result = await service.getAssignmentsByBus('school-1', 'bus-1');
    expect(result).toEqual(mockAssignments);
  });

  it('should get assignments by driver', async () => {
    const mockAssignments = [{ id: 'assignment-1', driver_id: 'driver-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAssignments, error: null });
    const result = await service.getAssignmentsByDriver('school-1', 'driver-1');
    expect(result).toEqual(mockAssignments);
  });

  it('should get assignments by route', async () => {
    const mockAssignments = [{ id: 'assignment-1', route_id: 'route-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAssignments, error: null });
    const result = await service.getAssignmentsByRoute('school-1', 'route-1');
    expect(result).toEqual(mockAssignments);
  });

  it('should activate assignment', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'assignment-1', status: 'active' }, error: null });
    const result = await service.activateAssignment('school-1', 'assignment-1');
    expect(result).toBeDefined();
  });

  it('should deactivate assignment', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'assignment-1', status: 'inactive' }, error: null });
    const result = await service.deactivateAssignment('school-1', 'assignment-1');
    expect(result).toBeDefined();
  });

  it('should check for conflicting assignments', async () => {
    const mockAssignments = [];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAssignments, error: null });
    const result = await service.hasConflict('school-1', 'bus-1', 'driver-1', '2026-08-03');
    expect(result).toBe(false);
  });
});
