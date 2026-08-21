import type { AcademicRepository, Room, AcademicFilters, CreateRoomRequest, UpdateRoomRequest } from '../types';
import { RoomNotFoundError, AppError } from '@educi/errors';
import { logger } from '@educi/logger';

interface RoomStatistics {
  total: number;
  byType: Array<{ type: string; count: number }>;
  byStatus: Array<{ status: string; count: number }>;
  availability: {
    total: number;
    available: number;
    occupied: number;
    maintenance: number;
    archived: number;
    availabilityRate: number;
  };
}

export class RoomService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Creates a new room after validating required fields and code uniqueness.
   */
  async create(schoolId: string, userId: string, data: CreateRoomRequest): Promise<Room> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Le nom est requis' });
    }
    if (!data.code || data.code.trim().length === 0) {
      errors.push({ field: 'code', message: 'Le code est requis' });
    }
    if (!data.capacity || data.capacity < 1) {
      errors.push({ field: 'capacity', message: 'La capacité doit être supérieure à 0' });
    }
    if (!data.roomType || data.roomType.trim().length === 0) {
      errors.push({ field: 'roomType', message: 'Le type de salle est requis' });
    }

    if (errors.length > 0) {
      throw new AppError(
        `Erreur de validation: ${errors.length} erreur(s)`,
        'ROOM_VALIDATION_ERROR',
        400,
      );
    }

    const { data: existingRooms } = await this.academicRepo.findAllRooms(schoolId, { limit: 1000 });

    const duplicateCode = existingRooms.find(
      (r) => r.code.toLowerCase() === data.code.trim().toLowerCase(),
    );
    if (duplicateCode) {
      throw new AppError(
        `Une salle avec le code ${data.code} existe déjà`,
        'ROOM_DUPLICATE',
        409,
      );
    }

    const room = await this.academicRepo.createRoom(data, schoolId);
    logger.info('Room created', { roomId: room.id, schoolId, userId }, 'academic');
    return room;
  }

  /**
   * Retrieves a room by its ID within a school.
   */
  async getById(schoolId: string, roomId: string): Promise<Room> {
    const room = await this.academicRepo.findRoom(roomId);
    if (!room || room.schoolId !== schoolId) {
      throw new RoomNotFoundError(roomId);
    }
    logger.info('Room retrieved', { roomId, schoolId }, 'academic');
    return room;
  }

  /**
   * Lists rooms with filtering, search, and pagination.
   */
  async list(schoolId: string, filters: AcademicFilters): Promise<{ data: Room[]; total: number }> {
    const page = filters.page || 1;
    const limit = filters.limit || 20;

    let queryFilters: AcademicFilters = { ...filters, page, limit };

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const { data: allRooms } = await this.academicRepo.findAllRooms(schoolId, { limit: 10000 });
      const filtered = allRooms.filter(
        (r) =>
          r.name.toLowerCase().includes(searchLower) ||
          r.code.toLowerCase().includes(searchLower),
      );

      let typedFiltered = filtered;
      if (filters.roomType) {
        typedFiltered = typedFiltered.filter((r) => r.roomType === filters.roomType);
      }
      if (filters.status) {
        typedFiltered = typedFiltered.filter((r) => r.status === filters.status);
      }

      const start = (page - 1) * limit;
      const paginated = typedFiltered.slice(start, start + limit);

      return { data: paginated, total: typedFiltered.length };
    }

    if (filters.roomType) {
      queryFilters = { ...queryFilters, roomType: filters.roomType };
    }
    if (filters.status) {
      queryFilters = { ...queryFilters, status: filters.status };
    }

    return this.academicRepo.findAllRooms(schoolId, queryFilters);
  }

  /**
   * Updates a room after validating the update data.
   */
  async update(schoolId: string, userId: string, roomId: string, data: UpdateRoomRequest): Promise<Room> {
    const existing = await this.academicRepo.findRoom(roomId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new RoomNotFoundError(roomId);
    }

    const errors: Array<{ field: string; message: string }> = [];

    if (data.name !== undefined && data.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Le nom ne peut pas être vide' });
    }
    if (data.code !== undefined && data.code.trim().length === 0) {
      errors.push({ field: 'code', message: 'Le code ne peut pas être vide' });
    }
    if (data.capacity !== undefined && data.capacity < 1) {
      errors.push({ field: 'capacity', message: 'La capacité doit être supérieure à 0' });
    }

    if (errors.length > 0) {
      throw new AppError(
        `Erreur de validation: ${errors.length} erreur(s)`,
        'ROOM_VALIDATION_ERROR',
        400,
      );
    }

    if (data.code !== undefined) {
      const targetCode = data.code.trim().toLowerCase();
      const { data: existingRooms } = await this.academicRepo.findAllRooms(schoolId, { limit: 1000 });

      const duplicate = existingRooms.find(
        (r) => r.id !== roomId && r.code.toLowerCase() === targetCode,
      );

      if (duplicate) {
        throw new AppError(
          `Une salle avec le code ${data.code} existe déjà`,
          'ROOM_DUPLICATE',
          409,
        );
      }
    }

    const updated = await this.academicRepo.updateRoom(roomId, data);
    logger.info('Room updated', { roomId, schoolId, userId }, 'academic');
    return updated;
  }

  /**
   * Archives a room by setting its status to ARCHIVED.
   */
  async archive(schoolId: string, userId: string, roomId: string): Promise<void> {
    const existing = await this.academicRepo.findRoom(roomId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new RoomNotFoundError(roomId);
    }

    if (existing.status === 'ARCHIVED') {
      throw new AppError('La salle est déjà archivée', 'ROOM_ALREADY_ARCHIVED', 400);
    }

    await this.academicRepo.archiveRoom(roomId);
    logger.info('Room archived', { roomId, schoolId, userId }, 'academic');
  }

  /**
   * Restores an archived room by setting its status to AVAILABLE.
   */
  async restore(schoolId: string, userId: string, roomId: string): Promise<void> {
    const existing = await this.academicRepo.findRoom(roomId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new RoomNotFoundError(roomId);
    }

    if (existing.status !== 'ARCHIVED') {
      throw new AppError('Seules les salles archivées peuvent être restaurées', 'ROOM_NOT_ARCHIVED', 400);
    }

    await this.academicRepo.restoreRoom(roomId);
    logger.info('Room restored', { roomId, schoolId, userId }, 'academic');
  }

  /**
   * Deletes a room by its ID.
   */
  async delete(schoolId: string, userId: string, roomId: string): Promise<void> {
    const existing = await this.academicRepo.findRoom(roomId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new RoomNotFoundError(roomId);
    }

    await this.academicRepo.deleteRoom(roomId);
    logger.info('Room deleted', { roomId, schoolId, userId }, 'academic');
  }

  /**
   * Returns statistics about rooms for a school including breakdowns by type, status, and availability rate.
   */
  async getStatistics(schoolId: string): Promise<RoomStatistics> {
    const { data: rooms } = await this.academicRepo.findAllRooms(schoolId, { limit: 10000 });

    const total = rooms.length;

    const byTypeMap = new Map<string, { type: string; count: number }>();
    const byStatusMap = new Map<string, { status: string; count: number }>();

    let available = 0;
    let occupied = 0;
    let maintenance = 0;
    let archived = 0;

    for (const room of rooms) {
      const typeEntry = byTypeMap.get(room.roomType);
      if (typeEntry) {
        typeEntry.count++;
      } else {
        byTypeMap.set(room.roomType, { type: room.roomType, count: 1 });
      }

      const statusEntry = byStatusMap.get(room.status);
      if (statusEntry) {
        statusEntry.count++;
      } else {
        byStatusMap.set(room.status, { status: room.status, count: 1 });
      }

      switch (room.status) {
        case 'AVAILABLE':
          available++;
          break;
        case 'OCCUPIED':
          occupied++;
          break;
        case 'MAINTENANCE':
          maintenance++;
          break;
        case 'ARCHIVED':
          archived++;
          break;
      }
    }

    const activeRooms = total - archived;
    const availabilityRate = activeRooms > 0 ? Math.round((available / activeRooms) * 100) : 0;

    logger.info('Room statistics retrieved', { schoolId, total }, 'academic');

    return {
      total,
      byType: Array.from(byTypeMap.values()),
      byStatus: Array.from(byStatusMap.values()),
      availability: {
        total,
        available,
        occupied,
        maintenance,
        archived,
        availabilityRate,
      },
    };
  }
}
