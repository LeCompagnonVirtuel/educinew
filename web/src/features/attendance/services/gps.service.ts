import type {
  AttendanceGPS, AttendanceLocation,
  AttendanceRepositoryExtended,
} from '../types';
import {
  AttendanceGPSError,
  AttendanceGPSOutOfRadiusError,
  AttendanceValidationError,
} from '@educi/errors';
import { logger } from '@educi/logger';
import { ATTENDANCE_GPS } from '@educi/config';

export class GPSService {
  constructor(private readonly attendanceRepo: AttendanceRepositoryExtended) {}

  async validate(schoolId: string, studentId: string, latitude: number, longitude: number): Promise<{ valid: boolean; distance?: number; reason?: string }> {
    const errors: Array<{ field: string; message: string }> = [];

    if (latitude < -90 || latitude > 90) {
      errors.push({ field: 'latitude', message: 'Latitude invalide' });
    }
    if (longitude < -180 || longitude > 180) {
      errors.push({ field: 'longitude', message: 'Longitude invalide' });
    }

    if (errors.length > 0) {
      throw new AttendanceValidationError(errors);
    }

    const location = await this.attendanceRepo.findSchoolLocation(schoolId);
    if (!location) {
      return { valid: false, reason: 'Aucune position définie pour cet établissement' };
    }

    const distance = this.getDistance(
      latitude,
      longitude,
      location.latitude,
      location.longitude,
    );

    const radius = location.radius || ATTENDANCE_GPS.DEFAULT_RADIUS_METERS;

    if (distance > radius) {
      logger.info('GPS validation failed - out of radius', { schoolId, studentId, distance, radius }, 'attendance');
      return { valid: false, distance, reason: `Position hors de la zone autorisée (${radius}m)` };
    }

    logger.info('GPS validation passed', { schoolId, studentId, distance, radius }, 'attendance');
    return { valid: true, distance };
  }

  getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  isInRadius(latitude: number, longitude: number, centerLat: number, centerLon: number, radiusMeters: number): boolean {
    const distance = this.getDistance(latitude, longitude, centerLat, centerLon);
    return distance <= radiusMeters;
  }
}
