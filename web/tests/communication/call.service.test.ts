import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createCallService } from '../../src/features/communication/services/call.service';

const mockRepository = {
  getCalls: vi.fn(),
  getCall: vi.fn(),
  createCall: vi.fn(),
  updateCall: vi.fn(),
  getCallRecording: vi.fn(),
  getCallStats: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('CallService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create CallService with all methods', () => {
    const service = createCallService(mockRepository as any);
    expect(typeof service.getCalls).toBe('function');
    expect(typeof service.getCall).toBe('function');
    expect(typeof service.initiateCall).toBe('function');
    expect(typeof service.joinCall).toBe('function');
    expect(typeof service.leaveCall).toBe('function');
    expect(typeof service.endCall).toBe('function');
    expect(typeof service.muteCallParticipant).toBe('function');
    expect(typeof service.toggleVideo).toBe('function');
    expect(typeof service.toggleScreenShare).toBe('function');
    expect(typeof service.getCallRecording).toBe('function');
    expect(typeof service.getCallStats).toBe('function');
    expect(typeof service.getCallRecordingUrl).toBe('function');
  });

  it('should fetch calls', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCalls.mockResolvedValue([{ id: 'call1' }]);
    const result = await service.getCalls('school1', 'user1');
    expect(result).toEqual([{ id: 'call1' }]);
  });

  it('should throw if schoolId missing for getCalls', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.getCalls('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getCalls', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.getCalls('school1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch a call', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1', status: 'active' });
    const result = await service.getCall('call1', 'user1');
    expect(result).toEqual({ id: 'call1', status: 'active' });
  });

  it('should throw if call not found', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue(null);
    await expect(service.getCall('call1', 'user1')).rejects.toThrow();
  });

  it('should initiate a call', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.createCall.mockResolvedValue({ id: 'call1', status: 'ringing' });
    const result = await service.initiateCall('school1', 'user1', { type: 'video' });
    expect(result.status).toBe('ringing');
  });

  it('should throw if type missing for initiateCall', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.initiateCall('school1', 'user1', {})).rejects.toThrow('call type is required');
  });

  it('should join a call', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1', status: 'active', participants: [] });
    mockRepository.updateCall.mockResolvedValue({ id: 'call1', participants: [{ userId: 'user1' }] });
    const result = await service.joinCall('call1', 'user1');
    expect(result.participants).toHaveLength(1);
  });

  it('should throw if call ended for joinCall', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1', status: 'ended', participants: [] });
    await expect(service.joinCall('call1', 'user1')).rejects.toThrow();
  });

  it('should throw if already participant for joinCall', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1', status: 'active', participants: [{ userId: 'user1' }] });
    await expect(service.joinCall('call1', 'user1')).rejects.toThrow();
  });

  it('should leave a call', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1', participants: [{ userId: 'user1' }] });
    mockRepository.updateCall.mockResolvedValue({ id: 'call1', participants: [{ userId: 'user1', leftAt: '2024-01-01' }] });
    const result = await service.leaveCall('call1', 'user1');
    expect(result).toBeDefined();
  });

  it('should throw if participant not found for leaveCall', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1', participants: [] });
    await expect(service.leaveCall('call1', 'user1')).rejects.toThrow();
  });

  it('should end a call', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1', status: 'active', startedAt: new Date(Date.now() - 60000).toISOString() });
    mockRepository.updateCall.mockResolvedValue({ id: 'call1', status: 'ended' });
    const result = await service.endCall('call1', 'user1');
    expect(result.status).toBe('ended');
  });

  it('should mute a participant', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1', participants: [{ userId: 'user2', isMuted: false }] });
    mockRepository.updateCall.mockResolvedValue({ id: 'call1', participants: [{ userId: 'user2', isMuted: true }] });
    const result = await service.muteCallParticipant('call1', 'user1', 'user2', true);
    expect(result.participants[0].isMuted).toBe(true);
  });

  it('should throw if participant not found for muteCallParticipant', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1', participants: [] });
    await expect(service.muteCallParticipant('call1', 'user1', 'user2', true)).rejects.toThrow();
  });

  it('should toggle video', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1', participants: [{ userId: 'user1', isVideoOn: false }] });
    mockRepository.updateCall.mockResolvedValue({ id: 'call1', participants: [{ userId: 'user1', isVideoOn: true }] });
    const result = await service.toggleVideo('call1', 'user1', true);
    expect(result.participants[0].isVideoOn).toBe(true);
  });

  it('should throw if participant not found for toggleVideo', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1', participants: [] });
    await expect(service.toggleVideo('call1', 'user1', true)).rejects.toThrow();
  });

  it('should toggle screen share', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1', participants: [{ userId: 'user1' }] });
    mockRepository.updateCall.mockResolvedValue({ id: 'call1', participants: [{ userId: 'user1', isScreenSharing: true }] });
    const result = await service.toggleScreenShare('call1', 'user1', true);
    expect(result).toBeDefined();
  });

  it('should get call recording', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1' });
    mockRepository.getCallRecording.mockResolvedValue({ id: 'rec1' });
    const result = await service.getCallRecording('call1', 'user1');
    expect(result).toEqual({ id: 'rec1' });
  });

  it('should get call stats', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCallStats.mockResolvedValue({ total: 10 });
    const result = await service.getCallStats('school1');
    expect(result).toEqual({ total: 10 });
  });

  it('should throw if schoolId missing for getCallStats', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.getCallStats('')).rejects.toThrow('schoolId is required');
  });

  it('should get call recording URL', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1' });
    mockRepository.getCallRecording.mockResolvedValue({ id: 'rec1', url: 'http://rec.url' });
    const result = await service.getCallRecordingUrl('call1', 'rec1', 'user1');
    expect(result).toBe('http://rec.url');
  });

  it('should throw if recording not found for getCallRecordingUrl', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1' });
    mockRepository.getCallRecording.mockResolvedValue(null);
    await expect(service.getCallRecordingUrl('call1', 'rec1', 'user1')).rejects.toThrow();
  });

  it('should throw if callId missing for getCall', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.getCall('', 'user1')).rejects.toThrow('callId is required');
  });

  it('should throw if userId missing for getCall', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.getCall('call1', '')).rejects.toThrow('userId is required');
  });

  it('should throw if callId missing for joinCall', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.joinCall('', 'user1')).rejects.toThrow('callId is required');
  });

  it('should throw if userId missing for joinCall', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.joinCall('call1', '')).rejects.toThrow('userId is required');
  });

  it('should throw if callId missing for leaveCall', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.leaveCall('', 'user1')).rejects.toThrow('callId is required');
  });

  it('should throw if userId missing for leaveCall', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.leaveCall('call1', '')).rejects.toThrow('userId is required');
  });

  it('should throw if callId missing for endCall', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.endCall('', 'user1')).rejects.toThrow('callId is required');
  });

  it('should throw if userId missing for endCall', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.endCall('call1', '')).rejects.toThrow('userId is required');
  });

  it('should throw if callId missing for muteCallParticipant', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.muteCallParticipant('', 'user1', 'user2', true)).rejects.toThrow('callId is required');
  });

  it('should throw if participantId missing for muteCallParticipant', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.muteCallParticipant('call1', 'user1', '', true)).rejects.toThrow('participantId is required');
  });

  it('should throw if callId missing for toggleVideo', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.toggleVideo('', 'user1', true)).rejects.toThrow('callId is required');
  });

  it('should throw if callId missing for toggleScreenShare', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.toggleScreenShare('', 'user1', true)).rejects.toThrow('callId is required');
  });

  it('should throw if callId missing for getCallRecording', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.getCallRecording('', 'user1')).rejects.toThrow('callId is required');
  });

  it('should throw if callId missing for getCallRecordingUrl', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.getCallRecordingUrl('', 'rec1', 'user1')).rejects.toThrow('callId is required');
  });

  it('should throw if recordingId missing for getCallRecordingUrl', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.getCallRecordingUrl('call1', '', 'user1')).rejects.toThrow('recordingId is required');
  });

  it('should throw if userId missing for getCallRecordingUrl', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.getCallRecordingUrl('call1', 'rec1', '')).rejects.toThrow('userId is required');
  });

  it('should handle getCalls with filters', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCalls.mockResolvedValue([]);
    await service.getCalls('school1', 'user1', { type: 'video' });
    expect(mockRepository.getCalls).toHaveBeenCalledWith('school1', 'user1', { type: 'video' });
  });

  it('should handle getCallStats with date range', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCallStats.mockResolvedValue({ total: 5 });
    await service.getCallStats('school1', '2024-01-01', '2024-12-31');
    expect(mockRepository.getCallStats).toHaveBeenCalledWith('school1', '2024-01-01', '2024-12-31');
  });

  it('should handle initiateCall error', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.createCall.mockRejectedValue(new Error('fail'));
    await expect(service.initiateCall('school1', 'user1', { type: 'video' })).rejects.toThrow('fail');
  });

  it('should handle joinCall error', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockRejectedValue(new Error('fail'));
    await expect(service.joinCall('call1', 'user1')).rejects.toThrow('fail');
  });

  it('should handle leaveCall error', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockRejectedValue(new Error('fail'));
    await expect(service.leaveCall('call1', 'user1')).rejects.toThrow('fail');
  });

  it('should handle endCall error', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockRejectedValue(new Error('fail'));
    await expect(service.endCall('call1', 'user1')).rejects.toThrow('fail');
  });

  it('should handle toggleScreenShare with participant found', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1', participants: [{ userId: 'user1', isScreenSharing: false }] });
    mockRepository.updateCall.mockResolvedValue({ id: 'call1', participants: [{ userId: 'user1', isScreenSharing: true }] });
    const result = await service.toggleScreenShare('call1', 'user1', true);
    expect(result).toBeDefined();
  });

  it('should throw if participant not found for toggleScreenShare', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1', participants: [] });
    await expect(service.toggleScreenShare('call1', 'user1', true)).rejects.toThrow();
  });

  it('should throw if call not found for endCall', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue(null);
    await expect(service.endCall('call1', 'user1')).rejects.toThrow();
  });

  it('should log event on initiateCall', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.createCall.mockResolvedValue({ id: 'call1' });
    await service.initiateCall('school1', 'user1', { type: 'video' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'call.initiated', expect.any(Object));
  });

  it('should log event on joinCall', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1', status: 'active', schoolId: 'school1', participants: [] });
    mockRepository.updateCall.mockResolvedValue({ id: 'call1' });
    await service.joinCall('call1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'call.joined', expect.any(Object));
  });

  it('should log event on leaveCall', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1', schoolId: 'school1', participants: [{ userId: 'user1' }] });
    mockRepository.updateCall.mockResolvedValue({ id: 'call1' });
    await service.leaveCall('call1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'call.left', expect.any(Object));
  });

  it('should log event on endCall', async () => {
    const service = createCallService(mockRepository as any);
    mockRepository.getCall.mockResolvedValue({ id: 'call1', schoolId: 'school1', status: 'active' });
    mockRepository.updateCall.mockResolvedValue({ id: 'call1' });
    await service.endCall('call1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'call.ended', expect.any(Object));
  });

  it('should throw if callId missing for initiateCall', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.initiateCall('', 'user1', { type: 'video' })).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for initiateCall', async () => {
    const service = createCallService(mockRepository as any);
    await expect(service.initiateCall('school1', '', { type: 'video' })).rejects.toThrow('userId is required');
  });
});
