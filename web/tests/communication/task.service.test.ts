import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTaskService } from '../../src/features/communication/services/task.service';

const mockRepository = {
  getTasks: vi.fn(),
  getTask: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
  addTaskComment: vi.fn(),
  getTaskStats: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('TaskService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create TaskService with all methods', () => {
    const service = createTaskService(mockRepository as any);
    expect(typeof service.getTasks).toBe('function');
    expect(typeof service.getTask).toBe('function');
    expect(typeof service.createTask).toBe('function');
    expect(typeof service.updateTask).toBe('function');
    expect(typeof service.deleteTask).toBe('function');
    expect(typeof service.assignTask).toBe('function');
    expect(typeof service.addTaskComment).toBe('function');
    expect(typeof service.toggleTaskChecklist).toBe('function');
    expect(typeof service.getTaskStats).toBe('function');
    expect(typeof service.getOverdueTasks).toBe('function');
  });

  it('should fetch tasks', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.getTasks.mockResolvedValue([{ id: 't1' }]);
    const result = await service.getTasks('school1', 'user1');
    expect(result).toEqual([{ id: 't1' }]);
  });

  it('should throw if schoolId missing for getTasks', async () => {
    const service = createTaskService(mockRepository as any);
    await expect(service.getTasks('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should fetch a single task', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.getTask.mockResolvedValue({ id: 't1', title: 'Do laundry' });
    const result = await service.getTask('t1', 'user1');
    expect(result).toEqual({ id: 't1', title: 'Do laundry' });
  });

  it('should throw if task not found', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.getTask.mockResolvedValue(null);
    await expect(service.getTask('t1', 'user1')).rejects.toThrow();
  });

  it('should create a task', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.createTask.mockResolvedValue({ id: 't1', title: 'New Task' });
    const result = await service.createTask('school1', 'user1', { title: 'New Task' });
    expect(result.title).toBe('New Task');
  });

  it('should throw if title missing for createTask', async () => {
    const service = createTaskService(mockRepository as any);
    await expect(service.createTask('school1', 'user1', {})).rejects.toThrow('task title is required');
  });

  it('should throw if data missing for createTask', async () => {
    const service = createTaskService(mockRepository as any);
    await expect(service.createTask('school1', 'user1', null)).rejects.toThrow('task title is required');
  });

  it('should throw if past deadline for createTask', async () => {
    const service = createTaskService(mockRepository as any);
    await expect(service.createTask('school1', 'user1', { title: 'T', deadline: '2020-01-01' })).rejects.toThrow();
  });

  it('should update a task', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.getTask.mockResolvedValue({ id: 't1', schoolId: 'school1', status: 'pending' });
    mockRepository.updateTask.mockResolvedValue({ id: 't1', title: 'Updated' });
    const result = await service.updateTask('t1', 'user1', { title: 'Updated' });
    expect(result.title).toBe('Updated');
  });

  it('should throw if task not found for update', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.getTask.mockResolvedValue(null);
    await expect(service.updateTask('t1', 'user1', { title: 'X' })).rejects.toThrow();
  });

  it('should throw if data missing for updateTask', async () => {
    const service = createTaskService(mockRepository as any);
    await expect(service.updateTask('t1', 'user1', undefined)).rejects.toThrow('update data is required');
  });

  it('should throw if already completed for updateTask', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.getTask.mockResolvedValue({ id: 't1', status: 'completed' });
    await expect(service.updateTask('t1', 'user1', { status: 'completed' })).rejects.toThrow();
  });

  it('should delete a task', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.getTask.mockResolvedValue({ id: 't1', schoolId: 'school1' });
    await service.deleteTask('t1', 'user1');
    expect(mockRepository.deleteTask).toHaveBeenCalledWith('t1');
  });

  it('should throw if task not found for delete', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.getTask.mockResolvedValue(null);
    await expect(service.deleteTask('t1', 'user1')).rejects.toThrow();
  });

  it('should assign a task', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.getTask.mockResolvedValue({ id: 't1', schoolId: 'school1', assignees: [] });
    mockRepository.updateTask.mockResolvedValue({ id: 't1', assignees: [{ userId: 'user2' }] });
    const result = await service.assignTask('t1', 'user1', 'user2');
    expect(result.assignees).toHaveLength(1);
  });

  it('should throw if assigneeId missing for assignTask', async () => {
    const service = createTaskService(mockRepository as any);
    await expect(service.assignTask('t1', 'user1', '')).rejects.toThrow('assigneeId is required');
  });

  it('should add a task comment', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.getTask.mockResolvedValue({ id: 't1', schoolId: 'school1' });
    mockRepository.addTaskComment.mockResolvedValue({ id: 'c1', content: 'Looks good' });
    const result = await service.addTaskComment('t1', 'user1', 'Looks good');
    expect(result.content).toBe('Looks good');
  });

  it('should throw if content missing for addTaskComment', async () => {
    const service = createTaskService(mockRepository as any);
    await expect(service.addTaskComment('t1', 'user1', '')).rejects.toThrow('comment content is required');
  });

  it('should throw if content whitespace for addTaskComment', async () => {
    const service = createTaskService(mockRepository as any);
    await expect(service.addTaskComment('t1', 'user1', '   ')).rejects.toThrow('comment content is required');
  });

  it('should toggle task checklist', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.getTask.mockResolvedValue({ id: 't1', schoolId: 'school1', checklist: [{ id: 'cl1', completed: false }] });
    mockRepository.updateTask.mockResolvedValue({ id: 't1', checklist: [{ id: 'cl1', completed: true }] });
    const result = await service.toggleTaskChecklist('t1', 'user1', 'cl1', true);
    expect(result.checklist[0].completed).toBe(true);
  });

  it('should get task stats', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.getTaskStats.mockResolvedValue({ total: 30 });
    const result = await service.getTaskStats('school1');
    expect(result).toEqual({ total: 30 });
  });

  it('should get overdue tasks', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.getTasks.mockResolvedValue([{ id: 't1', deadline: '2020-01-01' }]);
    const result = await service.getOverdueTasks('school1', 'user1');
    expect(result).toHaveLength(1);
  });

  it('should handle getTasks with filters', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.getTasks.mockResolvedValue([]);
    await service.getTasks('school1', 'user1', { status: 'pending' });
    expect(mockRepository.getTasks).toHaveBeenCalledWith('school1', 'user1', { status: 'pending' });
  });

  it('should handle getTaskStats with date range', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.getTaskStats.mockResolvedValue({ total: 10 });
    await service.getTaskStats('school1', '2024-01-01', '2024-12-31');
    expect(mockRepository.getTaskStats).toHaveBeenCalledWith('school1', '2024-01-01', '2024-12-31');
  });

  it('should log event on createTask', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.createTask.mockResolvedValue({ id: 't1' });
    await service.createTask('school1', 'user1', { title: 'T' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'task.created', expect.any(Object));
  });

  it('should log event on deleteTask', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.getTask.mockResolvedValue({ id: 't1', schoolId: 'school1' });
    await service.deleteTask('t1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'task.deleted', expect.any(Object));
  });

  it('should log event on addTaskComment', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.getTask.mockResolvedValue({ id: 't1', schoolId: 'school1' });
    mockRepository.addTaskComment.mockResolvedValue({ id: 'c1' });
    await service.addTaskComment('t1', 'user1', 'Comment');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'task.comment_added', expect.any(Object));
  });

  it('should throw if taskId missing for getTask', async () => {
    const service = createTaskService(mockRepository as any);
    await expect(service.getTask('', 'user1')).rejects.toThrow('taskId is required');
  });

  it('should throw if taskId missing for updateTask', async () => {
    const service = createTaskService(mockRepository as any);
    await expect(service.updateTask('', 'user1', { title: 'X' })).rejects.toThrow('taskId is required');
  });

  it('should throw if taskId missing for deleteTask', async () => {
    const service = createTaskService(mockRepository as any);
    await expect(service.deleteTask('', 'user1')).rejects.toThrow('taskId is required');
  });

  it('should throw if taskId missing for assignTask', async () => {
    const service = createTaskService(mockRepository as any);
    await expect(service.assignTask('', 'user1', 'user2')).rejects.toThrow('taskId is required');
  });

  it('should throw if taskId missing for addTaskComment', async () => {
    const service = createTaskService(mockRepository as any);
    await expect(service.addTaskComment('', 'user1', 'C')).rejects.toThrow('taskId is required');
  });

  it('should throw if checklistId missing for toggleTaskChecklist', async () => {
    const service = createTaskService(mockRepository as any);
    await expect(service.toggleTaskChecklist('t1', 'user1', '', true)).rejects.toThrow('checklistId is required');
  });

  it('should throw if schoolId missing for getOverdueTasks', async () => {
    const service = createTaskService(mockRepository as any);
    await expect(service.getOverdueTasks('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if schoolId missing for getTaskStats', async () => {
    const service = createTaskService(mockRepository as any);
    await expect(service.getTaskStats('')).rejects.toThrow('schoolId is required');
  });

  it('should create task with default pending status', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.createTask.mockResolvedValue({ id: 't1' });
    await service.createTask('school1', 'user1', { title: 'T' });
    expect(mockRepository.createTask).toHaveBeenCalledWith(expect.objectContaining({ status: 'pending' }));
  });

  it('should create task with custom status', async () => {
    const service = createTaskService(mockRepository as any);
    mockRepository.createTask.mockResolvedValue({ id: 't1' });
    await service.createTask('school1', 'user1', { title: 'T', status: 'in_progress' });
    expect(mockRepository.createTask).toHaveBeenCalledWith(expect.objectContaining({ status: 'in_progress' }));
  });
});
