import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DeviceSecurityService } from '../device-security-service';
import { GestcrpNotFoundError, GestcrpValidationError, GestcrpDeviceInventoryError, GestcrpMDMCommandError } from '@educi/errors';

const mockInventoryRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockComplianceRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockMDMCommandsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockDeviceRepo = {
  inventory: mockInventoryRepo,
  compliance: mockComplianceRepo,
  mdmCommands: mockMDMCommandsRepo,
  findOnlineDevices: vi.fn(),
  findByPlatform: vi.fn(),
  findNonCompliantDevices: vi.fn(),
};

const mockDevice = {
  id: 'dev-001',
  school_id: 'sch-001',
  name: 'Admin Laptop',
  hostname: 'admin-laptop-001',
  platform: 'WINDOWS',
  os_version: 'Windows 11 Pro',
  serial_number: 'SN-001',
  mac_address: 'AA:BB:CC:DD:EE:FF',
  ip_address: '192.168.1.10',
  last_seen_at: new Date().toISOString(),
  status: 'ONLINE' as const,
  owner: 'user-001',
  department: 'Administration',
  location: 'Building A',
  tags: [],
  managed_by: 'MANUAL',
  protection_status: {},
  compliance_status: {},
  installed_software: [],
  open_ports: [],
  network_interfaces: [],
  created_at: new Date().toISOString(),
};

let service: DeviceSecurityService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new DeviceSecurityService(mockDeviceRepo as never);
});

describe('DeviceSecurityService', () => {
  describe('listDevices', () => {
    it('should list devices for a school', async () => {
      mockInventoryRepo.findAll.mockResolvedValue({ data: [mockDevice], total: 1 });

      const result = await service.listDevices('sch-001');

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listDevices('')).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('getDevice', () => {
    it('should retrieve a device by id', async () => {
      mockInventoryRepo.exists.mockResolvedValue(true);
      mockInventoryRepo.findById.mockResolvedValue(mockDevice);

      const result = await service.getDevice('sch-001', 'dev-001');

      expect(result).toEqual(mockDevice);
    });

    it('should throw if device not found', async () => {
      mockInventoryRepo.exists.mockResolvedValue(false);

      await expect(service.getDevice('sch-001', 'nonexistent')).rejects.toThrow(GestcrpNotFoundError);
    });
  });

  describe('getDevicesByPlatform', () => {
    it('should filter devices by platform', async () => {
      mockDeviceRepo.findByPlatform.mockResolvedValue({ data: [mockDevice], total: 1 });

      const result = await service.getDevicesByPlatform('sch-001', 'WINDOWS');

      expect(result.data).toHaveLength(1);
    });

    it('should reject invalid platform', async () => {
      await expect(service.getDevicesByPlatform('sch-001', 'INVALID')).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('registerDevice', () => {
    it('should register a device', async () => {
      mockInventoryRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockInventoryRepo.create.mockResolvedValue(mockDevice);

      const result = await service.registerDevice('sch-001', {
        name: 'Admin Laptop',
        hostname: 'admin-laptop-001',
        platform: 'WINDOWS',
        os_version: 'Windows 11 Pro',
        osVersion: 'Windows 11 Pro',
        serial_number: 'SN-001',
        serialNumber: 'SN-001',
        mac_address: 'AA:BB:CC:DD:EE:FF',
        macAddress: 'AA:BB:CC:DD:EE:FF',
        ip_address: '192.168.1.10',
        owner: '550e8400-e29b-41d4-a716-446655440000',
      });

      expect(result).toEqual(mockDevice);
    });

    it('should reject duplicate serial number', async () => {
      mockInventoryRepo.findAll.mockResolvedValue({ data: [mockDevice], total: 1 });

      await expect(service.registerDevice('sch-001', {
        name: 'Test Device',
        hostname: 'test',
        platform: 'WINDOWS',
        os_version: '11',
        serial_number: 'SN-001',
        mac_address: 'AA:BB:CC:DD:EE:FF',
        ip_address: '192.168.1.10',
        owner: 'user-001',
      })).rejects.toThrow();
    });

    it('should reject invalid platform', async () => {
      await expect(service.registerDevice('sch-001', {
        name: 'Test',
        hostname: 'test',
        platform: 'INVALID',
        os_version: '11',
        serial_number: 'SN-002',
        mac_address: 'AA:BB:CC:DD:EE:FF',
        ip_address: '192.168.1.10',
        owner: 'user-001',
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('updateDeviceStatus', () => {
    it('should update device status', async () => {
      mockInventoryRepo.exists.mockResolvedValue(true);
      mockInventoryRepo.findById.mockResolvedValue(mockDevice);
      mockInventoryRepo.update.mockResolvedValue({ ...mockDevice, status: 'OFFLINE' });

      const result = await service.updateDeviceStatus('sch-001', 'dev-001', 'OFFLINE');

      expect(result.status).toBe('OFFLINE');
    });

    it('should reject invalid status', async () => {
      await expect(service.updateDeviceStatus('sch-001', 'dev-001', 'INVALID')).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('deleteDevice', () => {
    it('should soft delete a device', async () => {
      mockInventoryRepo.exists.mockResolvedValue(true);
      mockInventoryRepo.findById.mockResolvedValue(mockDevice);
      mockInventoryRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteDevice('sch-001', 'dev-001');

      expect(mockInventoryRepo.softDelete).toHaveBeenCalledWith('dev-001', 'sch-001');
    });
  });

  describe('checkDeviceCompliance', () => {
    it('should check device compliance (new)', async () => {
      mockInventoryRepo.exists.mockResolvedValue(true);
      mockComplianceRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockComplianceRepo.create.mockResolvedValue({
        id: 'comp-001',
        device_id: 'dev-001',
        compliant: true,
      });

      const result = await service.checkDeviceCompliance('sch-001', 'dev-001', {
        compliant: true,
        os_up_to_date: true,
        encryption_compliant: true,
        password_compliant: true,
      });

      expect(result.compliant).toBe(true);
    });

    it('should reject non-existent device', async () => {
      mockInventoryRepo.exists.mockResolvedValue(false);

      await expect(service.checkDeviceCompliance('sch-001', 'nonexistent', {
        compliant: true,
      })).rejects.toThrow(GestcrpDeviceInventoryError);
    });
  });

  describe('sendMDMCommand', () => {
    it('should send an MDM command', async () => {
      const mockCommand = {
        id: 'cmd-001',
        device_id: 'dev-001',
        command: 'LOCK',
        status: 'PENDING',
      };
      mockInventoryRepo.exists.mockResolvedValue(true);
      mockInventoryRepo.findById.mockResolvedValue(mockDevice);
      mockMDMCommandsRepo.create.mockResolvedValue(mockCommand);

      const result = await service.sendMDMCommand('sch-001', {
        device_id: 'dev-001',
        deviceId: '550e8400-e29b-41d4-a716-446655440000',
        command: 'LOCK',
      });

      expect(result).toEqual(mockCommand);
    });

    it('should reject command to offline device', async () => {
      mockInventoryRepo.exists.mockResolvedValue(true);
      mockInventoryRepo.findById.mockResolvedValue({ ...mockDevice, status: 'OFFLINE' });

      await expect(service.sendMDMCommand('sch-001', {
        device_id: 'dev-001',
        deviceId: '550e8400-e29b-41d4-a716-446655440000',
        command: 'LOCK',
      })).rejects.toThrow();
    });

    it('should reject invalid command type', async () => {
      await expect(service.sendMDMCommand('sch-001', {
        device_id: 'dev-001',
        deviceId: '550e8400-e29b-41d4-a716-446655440000',
        command: 'INVALID',
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('updateMDMCommandStatus', () => {
    it('should update MDM command status', async () => {
      const mockCommand = { id: 'cmd-001', school_id: 'sch-001', status: 'PENDING' };
      mockMDMCommandsRepo.exists.mockResolvedValue(true);
      mockMDMCommandsRepo.findById.mockResolvedValue(mockCommand);
      mockMDMCommandsRepo.update.mockResolvedValue({ ...mockCommand, status: 'COMPLETED' });

      const result = await service.updateMDMCommandStatus('sch-001', 'cmd-001', 'COMPLETED');

      expect(result.status).toBe('COMPLETED');
    });
  });

  describe('cancelMDMCommand', () => {
    it('should cancel a pending command', async () => {
      mockMDMCommandsRepo.exists.mockResolvedValue(true);
      mockMDMCommandsRepo.findById.mockResolvedValue({ id: 'cmd-001', school_id: 'sch-001', status: 'PENDING' });
      mockMDMCommandsRepo.update.mockResolvedValue({ id: 'cmd-001', status: 'CANCELLED' });

      const result = await service.cancelMDMCommand('sch-001', 'cmd-001');

      expect(result.status).toBe('CANCELLED');
    });

    it('should reject cancelling completed command', async () => {
      mockMDMCommandsRepo.exists.mockResolvedValue(true);
      mockMDMCommandsRepo.findById.mockResolvedValue({ id: 'cmd-001', school_id: 'sch-001', status: 'COMPLETED' });

      await expect(service.cancelMDMCommand('sch-001', 'cmd-001')).rejects.toThrow(GestcrpMDMCommandError);
    });
  });

  describe('getDeviceStats', () => {
    it('should return device statistics', async () => {
      mockInventoryRepo.findAll.mockResolvedValue({
        data: [mockDevice, { ...mockDevice, id: 'dev-002', platform: 'MACOS', status: 'OFFLINE' }],
        total: 2,
      });

      const result = await service.getDeviceStats('sch-001');

      expect(result.total).toBe(2);
      expect(result.online).toBeDefined();
      expect(result.offline).toBeDefined();
      expect(result.byPlatform).toBeDefined();
      expect(result.byStatus).toBeDefined();
    });
  });

  describe('getComplianceStats', () => {
    it('should return compliance statistics', async () => {
      mockComplianceRepo.findAll.mockResolvedValue({
        data: [
          { id: 'c1', compliant: true, issues: [] },
          { id: 'c2', compliant: false, issues: [{ type: 'OUTDATED_OS' }] },
        ],
        total: 2,
      });

      const result = await service.getComplianceStats('sch-001');

      expect(result.total).toBe(2);
      expect(result.compliant).toBe(1);
      expect(result.nonCompliant).toBe(1);
      expect(result.complianceRate).toBe(50);
      expect(result.commonIssues).toBeDefined();
    });
  });

  describe('getMDMCommandStats', () => {
    it('should return MDM command statistics', async () => {
      mockMDMCommandsRepo.findAll.mockResolvedValue({
        data: [
          { id: 'cmd-001', command: 'LOCK', status: 'COMPLETED' },
          { id: 'cmd-002', command: 'WIPE', status: 'PENDING' },
        ],
        total: 2,
      });

      const result = await service.getMDMCommandStats('sch-001');

      expect(result.total).toBe(2);
      expect(result.pending).toBeDefined();
      expect(result.completed).toBeDefined();
      expect(result.byCommand).toBeDefined();
    });
  });
});
