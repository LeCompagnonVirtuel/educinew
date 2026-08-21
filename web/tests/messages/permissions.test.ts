import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockLogger = { info: vi.fn(), error: vi.fn(), warn: vi.fn(), debug: vi.fn() };
vi.mock('@educi/logger', () => ({ logger: mockLogger }));

describe('PermissionService', () => {
  let service: InstanceType<typeof import('../../src/features/messages/services/permission.service').PermissionService>;

  beforeEach(async () => {
    vi.clearAllMocks();
    const { PermissionService } = await import('../../src/features/messages/services/permission.service');
    service = new PermissionService({ repository: {}, schoolId: 's1' });
  });

  it('should instantiate PermissionService', () => {
    expect(service).toBeDefined();
  });

  it('should allow ADMIN to send message', async () => {
    const result = await service.canSendMessage('u1', 'ADMIN', 'c1');
    expect(result.allowed).toBe(true);
  });

  it('should allow SUPER_ADMIN to send message', async () => {
    const result = await service.canSendMessage('u1', 'SUPER_ADMIN', 'c1');
    expect(result.allowed).toBe(true);
  });

  it('should allow TEACHER to send message', async () => {
    const result = await service.canSendMessage('u1', 'TEACHER', 'c1');
    expect(result.allowed).toBe(true);
  });

  it('should allow DIRECTOR to send message', async () => {
    const result = await service.canSendMessage('u1', 'DIRECTOR', 'c1');
    expect(result.allowed).toBe(true);
  });

  it('should allow STUDENT to send message', async () => {
    const result = await service.canSendMessage('u1', 'STUDENT', 'c1');
    expect(result.allowed).toBe(true);
  });

  it('should allow PARENT to send message', async () => {
    const result = await service.canSendMessage('u1', 'PARENT', 'c1');
    expect(result.allowed).toBe(true);
  });

  it('should allow SECRETARY to send message', async () => {
    const result = await service.canSendMessage('u1', 'SECRETARY', 'c1');
    expect(result.allowed).toBe(true);
  });

  it('should allow ACCOUNTANT to send message', async () => {
    const result = await service.canSendMessage('u1', 'ACCOUNTANT', 'c1');
    expect(result.allowed).toBe(true);
  });

  it('should allow STAFF to send message', async () => {
    const result = await service.canSendMessage('u1', 'STAFF', 'c1');
    expect(result.allowed).toBe(true);
  });

  it('should deny GUEST role to send message', async () => {
    const result = await service.canSendMessage('u1', 'GUEST', 'c1');
    expect(result.allowed).toBe(false);
  });

  it('should allow ADMIN to create conversation', async () => {
    const result = await service.canCreateConversation('u1', 'ADMIN');
    expect(result.allowed).toBe(true);
  });

  it('should allow STUDENT to create conversation', async () => {
    const result = await service.canCreateConversation('u1', 'STUDENT');
    expect(result.allowed).toBe(true);
  });

  it('should allow PARENT to create conversation', async () => {
    const result = await service.canCreateConversation('u1', 'PARENT');
    expect(result.allowed).toBe(true);
  });

  it('should deny GUEST to create conversation', async () => {
    const result = await service.canCreateConversation('u1', 'GUEST');
    expect(result.allowed).toBe(false);
  });

  it('should allow ADMIN to create group', async () => {
    const result = await service.canCreateGroup('u1', 'ADMIN');
    expect(result.allowed).toBe(true);
  });

  it('should allow TEACHER to create group', async () => {
    const result = await service.canCreateGroup('u1', 'TEACHER');
    expect(result.allowed).toBe(true);
  });

  it('should allow DIRECTOR to create group', async () => {
    const result = await service.canCreateGroup('u1', 'DIRECTOR');
    expect(result.allowed).toBe(true);
  });

  it('should deny STUDENT to create group', async () => {
    const result = await service.canCreateGroup('u1', 'STUDENT');
    expect(result.allowed).toBe(false);
  });

  it('should deny PARENT to create group', async () => {
    const result = await service.canCreateGroup('u1', 'PARENT');
    expect(result.allowed).toBe(false);
  });

  it('should allow ADMIN to create announcement', async () => {
    const result = await service.canCreateAnnouncement('u1', 'ADMIN');
    expect(result.allowed).toBe(true);
  });

  it('should allow SUPER_ADMIN to create announcement', async () => {
    const result = await service.canCreateAnnouncement('u1', 'SUPER_ADMIN');
    expect(result.allowed).toBe(true);
  });

  it('should allow DIRECTOR to create announcement', async () => {
    const result = await service.canCreateAnnouncement('u1', 'DIRECTOR');
    expect(result.allowed).toBe(true);
  });

  it('should allow ACADEMIC_DIRECTOR to create announcement', async () => {
    const result = await service.canCreateAnnouncement('u1', 'ACADEMIC_DIRECTOR');
    expect(result.allowed).toBe(true);
  });

  it('should deny TEACHER to create announcement', async () => {
    const result = await service.canCreateAnnouncement('u1', 'TEACHER');
    expect(result.allowed).toBe(false);
  });

  it('should deny STUDENT to create announcement', async () => {
    const result = await service.canCreateAnnouncement('u1', 'STUDENT');
    expect(result.allowed).toBe(false);
  });

  it('should deny PARENT to create announcement', async () => {
    const result = await service.canCreateAnnouncement('u1', 'PARENT');
    expect(result.allowed).toBe(false);
  });

  it('should allow ADMIN to create broadcast', async () => {
    const result = await service.canCreateBroadcast('u1', 'ADMIN');
    expect(result.allowed).toBe(true);
  });

  it('should allow SUPER_ADMIN to create broadcast', async () => {
    const result = await service.canCreateBroadcast('u1', 'SUPER_ADMIN');
    expect(result.allowed).toBe(true);
  });

  it('should allow DIRECTOR to create broadcast', async () => {
    const result = await service.canCreateBroadcast('u1', 'DIRECTOR');
    expect(result.allowed).toBe(true);
  });

  it('should deny TEACHER to create broadcast', async () => {
    const result = await service.canCreateBroadcast('u1', 'TEACHER');
    expect(result.allowed).toBe(false);
  });

  it('should deny STUDENT to create broadcast', async () => {
    const result = await service.canCreateBroadcast('u1', 'STUDENT');
    expect(result.allowed).toBe(false);
  });

  it('should allow ADMIN to moderate', async () => {
    const result = await service.canModerate('u1', 'ADMIN');
    expect(result.allowed).toBe(true);
  });

  it('should allow SUPER_ADMIN to moderate', async () => {
    const result = await service.canModerate('u1', 'SUPER_ADMIN');
    expect(result.allowed).toBe(true);
  });

  it('should allow DIRECTOR to moderate', async () => {
    const result = await service.canModerate('u1', 'DIRECTOR');
    expect(result.allowed).toBe(true);
  });

  it('should deny TEACHER to moderate', async () => {
    const result = await service.canModerate('u1', 'TEACHER');
    expect(result.allowed).toBe(false);
  });

  it('should deny STUDENT to moderate', async () => {
    const result = await service.canModerate('u1', 'STUDENT');
    expect(result.allowed).toBe(false);
  });

  it('should allow ADMIN to delete any message', async () => {
    const result = await service.canDeleteMessage('admin1', 'ADMIN', 'user2');
    expect(result.allowed).toBe(true);
  });

  it('should allow SUPER_ADMIN to delete any message', async () => {
    const result = await service.canDeleteMessage('admin1', 'SUPER_ADMIN', 'user2');
    expect(result.allowed).toBe(true);
  });

  it('should allow owner to delete own message', async () => {
    const result = await service.canDeleteMessage('u1', 'STUDENT', 'u1');
    expect(result.allowed).toBe(true);
  });

  it('should deny non-owner non-admin to delete message', async () => {
    const result = await service.canDeleteMessage('u1', 'STUDENT', 'u2');
    expect(result.allowed).toBe(false);
  });

  it('should allow ADMIN to edit any message', async () => {
    const result = await service.canEditMessage('admin1', 'ADMIN', 'user2');
    expect(result.allowed).toBe(true);
  });

  it('should allow SUPER_ADMIN to edit any message', async () => {
    const result = await service.canEditMessage('admin1', 'SUPER_ADMIN', 'user2');
    expect(result.allowed).toBe(true);
  });

  it('should allow owner to edit own message', async () => {
    const result = await service.canEditMessage('u1', 'STUDENT', 'u1');
    expect(result.allowed).toBe(true);
  });

  it('should deny non-owner non-admin to edit message', async () => {
    const result = await service.canEditMessage('u1', 'STUDENT', 'u2');
    expect(result.allowed).toBe(false);
  });

  it('should include reason in send message denial', async () => {
    const result = await service.canSendMessage('u1', 'GUEST', 'c1');
    expect(result.reason).toBeDefined();
  });

  it('should include owner reason in delete denial', async () => {
    const result = await service.canDeleteMessage('u1', 'STUDENT', 'u1');
    expect(result.reason).toBe('Owner');
  });

  it('should include insufficient permissions reason in delete denial', async () => {
    const result = await service.canDeleteMessage('u1', 'STUDENT', 'u2');
    expect(result.reason).toBe('Insufficient permissions');
  });
});
