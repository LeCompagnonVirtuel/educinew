import type {
  AcademicRepository, AcademicEvent, CreateEventRequest,
} from '../types';
import { NotFoundError, AppError } from '@educi/errors';
import { logger } from '@educi/logger';
import { ACADEMIC_CALENDAR } from '@educi/config';

interface EventFilters {
  eventType?: string;
  startDate?: string;
  endDate?: string;
}

export class AcademicCalendarService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Creates a new academic calendar event.
   */
  async createEvent(
    schoolId: string,
    userId: string,
    data: CreateEventRequest,
  ): Promise<AcademicEvent> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!data.title || data.title.trim().length === 0) {
      errors.push({ field: 'title', message: 'Le titre est requis' });
    }
    if (!data.academicYearId) {
      errors.push({ field: 'academicYearId', message: "L'année scolaire est requise" });
    }
    if (!data.eventType) {
      errors.push({ field: 'eventType', message: "Le type d'événement est requis" });
    }
    if (!data.startDate) {
      errors.push({ field: 'startDate', message: 'La date de début est requise' });
    }
    if (!data.endDate) {
      errors.push({ field: 'endDate', message: 'La date de fin est requise' });
    }

    if (errors.length > 0) {
      throw new AppError(
        `Erreur de validation: ${errors.length} erreur(s)`,
        'CALENDAR_VALIDATION_ERROR',
        400,
      );
    }

    if (!ACADEMIC_CALENDAR.EVENT_TYPES.includes(data.eventType)) {
      throw new AppError(
        `Type d'événement invalide: ${data.eventType}`,
        'CALENDAR_INVALID_EVENT_TYPE',
        400,
      );
    }

    if (new Date(data.startDate) > new Date(data.endDate)) {
      throw new AppError(
        'La date de fin doit être après la date de début',
        'CALENDAR_DATE_INVALID',
        400,
      );
    }

    const events = await this.academicRepo.findEvents(schoolId, data.academicYearId);
    if (events.length >= ACADEMIC_CALENDAR.MAX_EVENTS_PER_YEAR) {
      throw new AppError(
        `Limite atteinte: ${ACADEMIC_CALENDAR.MAX_EVENTS_PER_YEAR} événements maximum par an`,
        'CALENDAR_LIMIT_EXCEEDED',
        400,
      );
    }

    const event = await this.academicRepo.createEvent(data, schoolId);
    logger.info('Calendar event created', { eventId: event.id, schoolId, userId }, 'academic');
    return event;
  }

  /**
   * Retrieves events for an academic year with optional filters.
   */
  async getEvents(
    schoolId: string,
    academicYearId: string,
    filters?: EventFilters,
  ): Promise<AcademicEvent[]> {
    const events = await this.academicRepo.findEvents(schoolId, academicYearId);

    let filtered = events;

    if (filters?.eventType) {
      filtered = filtered.filter((e) => e.eventType === filters.eventType);
    }
    if (filters?.startDate) {
      filtered = filtered.filter((e) => new Date(e.startDate) >= new Date(filters.startDate!));
    }
    if (filters?.endDate) {
      filtered = filtered.filter((e) => new Date(e.endDate) <= new Date(filters.endDate!));
    }

    logger.info('Calendar events retrieved', { schoolId, count: filtered.length }, 'academic');
    return filtered;
  }

  /**
   * Updates an academic calendar event.
   */
  async updateEvent(
    schoolId: string,
    userId: string,
    eventId: string,
    data: Partial<CreateEventRequest>,
  ): Promise<AcademicEvent> {
    const events = await this.academicRepo.findEvents(schoolId, '');
    const existing = events.find((e) => e.id === eventId);

    if (!existing || existing.schoolId !== schoolId) {
      throw new NotFoundError('Événement', eventId);
    }

    await this.academicRepo.deleteEvent(eventId);

    const updatedData: CreateEventRequest = {
      academicYearId: data.academicYearId || existing.academicYearId,
      title: data.title || existing.title,
      description: data.description ?? existing.description,
      eventType: data.eventType || existing.eventType,
      startDate: data.startDate || existing.startDate,
      endDate: data.endDate || existing.endDate,
      isRecurring: data.isRecurring ?? existing.isRecurring,
    };

    const updated = await this.academicRepo.createEvent(updatedData, schoolId);
    logger.info('Calendar event updated', { eventId, schoolId, userId }, 'academic');
    return updated;
  }

  /**
   * Deletes an academic calendar event by its ID.
   */
  async deleteEvent(schoolId: string, userId: string, eventId: string): Promise<void> {
    const events = await this.academicRepo.findEvents(schoolId, '');
    const existing = events.find((e) => e.id === eventId);

    if (!existing || existing.schoolId !== schoolId) {
      throw new NotFoundError('Événement', eventId);
    }

    await this.academicRepo.deleteEvent(eventId);
    logger.info('Calendar event deleted', { eventId, schoolId, userId }, 'academic');
  }

  /**
   * Retrieves events within a specific date range across all academic years.
   */
  async getEventsByDateRange(
    schoolId: string,
    startDate: string,
    endDate: string,
  ): Promise<AcademicEvent[]> {
    const academicYears = await this.academicRepo.findAllAcademicYears(schoolId);
    const allEvents: AcademicEvent[] = [];

    for (const year of academicYears) {
      const events = await this.academicRepo.findEvents(schoolId, year.id);
      allEvents.push(...events);
    }

    const filtered = allEvents.filter(
      (e) =>
        new Date(e.startDate) >= new Date(startDate) &&
        new Date(e.endDate) <= new Date(endDate),
    );

    logger.info('Events by date range retrieved', { schoolId, count: filtered.length }, 'academic');
    return filtered;
  }

  /**
   * Retrieves upcoming events with a configurable limit.
   */
  async getUpcomingEvents(schoolId: string, limit = 10): Promise<AcademicEvent[]> {
    const academicYears = await this.academicRepo.findAllAcademicYears(schoolId);
    const currentYear = academicYears.find((y) => y.isCurrent) || academicYears[0];

    if (!currentYear) {
      return [];
    }

    const events = await this.academicRepo.findEvents(schoolId, currentYear.id);
    const now = new Date();

    const upcoming = events
      .filter((e) => new Date(e.endDate) >= now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, limit);

    logger.info('Upcoming events retrieved', { schoolId, count: upcoming.length }, 'academic');
    return upcoming;
  }

  /**
   * Retrieves events filtered by type for a specific academic year.
   */
  async getEventsByType(
    schoolId: string,
    academicYearId: string,
    eventType: string,
  ): Promise<AcademicEvent[]> {
    const events = await this.academicRepo.findEvents(schoolId, academicYearId);
    const filtered = events.filter((e) => e.eventType === eventType);

    logger.info('Events by type retrieved', { schoolId, eventType, count: filtered.length }, 'academic');
    return filtered;
  }
}
