import type { SchoolCreationRequest, SchoolUpdateRequest } from '@educi/types';
import { logger } from '@educi/logger';

export class ValidationService {
  validateSchoolCreation(data: SchoolCreationRequest): void {
    if (!data.name || data.name.trim().length < 2) {
      throw new Error('Le nom doit contenir au moins 2 caractères');
    }

    if (!data.email || !this.isValidEmail(data.email)) {
      throw new Error('Email invalide');
    }

    if (data.phone && !this.isValidPhone(data.phone)) {
      throw new Error('Numéro de téléphone invalide');
    }

    if (data.website && !this.isValidUrl(data.website)) {
      throw new Error('URL du site web invalide');
    }

    logger.debug('School creation data validated', { name: data.name }, 'schools');
  }

  validateSchoolUpdate(data: SchoolUpdateRequest): void {
    if (data.name !== undefined && data.name.trim().length < 2) {
      throw new Error('Le nom doit contenir au moins 2 caractères');
    }

    if (data.email !== undefined && !this.isValidEmail(data.email)) {
      throw new Error('Email invalide');
    }

    if (data.phone && data.phone.length > 0 && !this.isValidPhone(data.phone)) {
      throw new Error('Numéro de téléphone invalide');
    }

    if (data.website && data.website.length > 0 && !this.isValidUrl(data.website)) {
      throw new Error('URL du site web invalide');
    }

    if (data.latitude !== undefined && data.latitude !== null) {
      if (data.latitude < -90 || data.latitude > 90) {
        throw new Error('Latitude invalide');
      }
    }

    if (data.longitude !== undefined && data.longitude !== null) {
      if (data.longitude < -180 || data.longitude > 180) {
        throw new Error('Longitude invalide');
      }
    }

    if (data.checkinRadius !== undefined) {
      if (data.checkinRadius < 10 || data.checkinRadius > 10000) {
        throw new Error('Rayon de pointage invalide (10-10000m)');
      }
    }

    logger.debug('School update data validated', { fields: Object.keys(data) }, 'schools');
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private isValidPhone(phone: string): boolean {
    return /^\+?[\d\s-]{8,15}$/.test(phone);
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
