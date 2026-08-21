import type { Attendance, AttendanceFilters, AttendanceSession, AttendanceDashboard, AttendanceStatistics, AttendanceTimeline, AttendanceAlert, AttendanceCorrection, AttendanceReport } from '@educi/types';

export class AttendanceMobileRepository {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async findById(id: string): Promise<Attendance | null> {
    const response = await fetch(`${this.baseUrl}/api/attendance/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  async findAll(filters: AttendanceFilters): Promise<{ data: Attendance[]; total: number }> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    });
    const response = await fetch(`${this.baseUrl}/api/attendance?${params.toString()}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async findByClass(classId: string, date: string): Promise<Attendance[]> {
    const response = await fetch(`${this.baseUrl}/api/attendance?classId=${classId}&date=${date}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async findByStudent(studentId: string, startDate?: string, endDate?: string): Promise<Attendance[]> {
    const params = new URLSearchParams({ studentId });
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    const response = await fetch(`${this.baseUrl}/api/attendance?${params.toString()}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async create(data: Partial<Attendance>): Promise<Attendance> {
    const response = await fetch(`${this.baseUrl}/api/attendance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    return response.json();
  }

  async bulkCreate(records: Array<{ studentId: string; date: string; status: string; remark?: string }>): Promise<Attendance[]> {
    const response = await fetch(`${this.baseUrl}/api/attendance/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(records),
    });
    if (!response.ok) throw new Error('Erreur lors de la création en masse');
    return response.json();
  }

  async update(id: string, data: Partial<Attendance>): Promise<Attendance> {
    const response = await fetch(`${this.baseUrl}/api/attendance/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return response.json();
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/attendance/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
  }

  async createTeacherAttendance(data: { teacherId: string; date: string; status: string; periods?: number }): Promise<Attendance> {
    const response = await fetch(`${this.baseUrl}/api/attendance/teacher`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    return response.json();
  }

  async findTeacherAttendances(filters: AttendanceFilters): Promise<{ data: Attendance[]; total: number }> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    });
    const response = await fetch(`${this.baseUrl}/api/attendance/teacher?${params.toString()}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async getSession(id: string): Promise<AttendanceSession | null> {
    const response = await fetch(`${this.baseUrl}/api/attendance/session/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  async findSessions(filters: AttendanceFilters): Promise<{ data: AttendanceSession[]; total: number }> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    });
    const response = await fetch(`${this.baseUrl}/api/attendance/session?${params.toString()}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async startSession(data: { classId: string; date: string; period?: string }): Promise<AttendanceSession> {
    const response = await fetch(`${this.baseUrl}/api/attendance/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    return response.json();
  }

  async endSession(id: string): Promise<AttendanceSession> {
    const response = await fetch(`${this.baseUrl}/api/attendance/session/${id}/end`, { method: 'POST' });
    if (!response.ok) throw new Error('Erreur lors de la fin de session');
    return response.json();
  }

  async getDashboard(date?: string): Promise<AttendanceDashboard> {
    const params = date ? `?date=${date}` : '';
    const response = await fetch(`${this.baseUrl}/api/attendance/dashboard${params}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async getStatistics(academicYearId: string): Promise<AttendanceStatistics> {
    const response = await fetch(`${this.baseUrl}/api/attendance/statistics?academicYearId=${academicYearId}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async getTimeline(studentId?: string): Promise<AttendanceTimeline> {
    const params = studentId ? `?studentId=${studentId}` : '';
    const response = await fetch(`${this.baseUrl}/api/attendance/timeline${params}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async search(query: string): Promise<Attendance[]> {
    const response = await fetch(`${this.baseUrl}/api/attendance/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Erreur lors de la recherche');
    return response.json();
  }

  async generateReport(params: { reportType: string; startDate?: string; endDate?: string; classId?: string }): Promise<AttendanceReport> {
    const response = await fetch(`${this.baseUrl}/api/attendance/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!response.ok) throw new Error('Erreur lors de la génération');
    return response.json();
  }

  async validateQR(sessionId: string, studentId: string): Promise<Attendance> {
    const response = await fetch(`${this.baseUrl}/api/attendance/qr/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, studentId }),
    });
    if (!response.ok) throw new Error('Erreur lors de la validation');
    return response.json();
  }

  async validateGPS(studentId: string, lat: number, lng: number): Promise<Attendance> {
    const response = await fetch(`${this.baseUrl}/api/attendance/gps/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, lat, lng }),
    });
    if (!response.ok) throw new Error('Erreur lors de la validation');
    return response.json();
  }

  async validateNFC(sessionId: string, deviceId: string): Promise<Attendance> {
    const response = await fetch(`${this.baseUrl}/api/attendance/nfc/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, deviceId }),
    });
    if (!response.ok) throw new Error('Erreur lors de la validation');
    return response.json();
  }

  async validateFace(studentId: string, imageUrl: string): Promise<Attendance> {
    const response = await fetch(`${this.baseUrl}/api/attendance/face/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, imageUrl }),
    });
    if (!response.ok) throw new Error('Erreur lors de la validation');
    return response.json();
  }

  async getAlerts(): Promise<AttendanceAlert[]> {
    const response = await fetch(`${this.baseUrl}/api/attendance/alerts`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async createCorrection(data: { attendanceId: string; newStatus: string; reason: string }): Promise<AttendanceCorrection> {
    const response = await fetch(`${this.baseUrl}/api/attendance/correction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    return response.json();
  }

  async approveCorrection(id: string, reviewNote?: string): Promise<AttendanceCorrection> {
    const response = await fetch(`${this.baseUrl}/api/attendance/correction/${id}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviewNote }),
    });
    if (!response.ok) throw new Error('Erreur lors de l\'approbation');
    return response.json();
  }

  async rejectCorrection(id: string, reviewNote?: string): Promise<AttendanceCorrection> {
    const response = await fetch(`${this.baseUrl}/api/attendance/correction/${id}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviewNote }),
    });
    if (!response.ok) throw new Error('Erreur lors du rejet');
    return response.json();
  }

  async importAttendance(data: string, importType: string): Promise<{ imported: number; errors: Array<{ field: string; message: string }> }> {
    const response = await fetch(`${this.baseUrl}/api/attendance/import`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, importType }),
    });
    if (!response.ok) throw new Error('Erreur lors de l\'import');
    return response.json();
  }

  async exportAttendance(format: string, filters: AttendanceFilters): Promise<{ url: string }> {
    const response = await fetch(`${this.baseUrl}/api/attendance/export`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ format, ...filters }),
    });
    if (!response.ok) throw new Error('Erreur lors de l\'export');
    return response.json();
  }

  async getHistory(studentId?: string): Promise<Attendance[]> {
    const params = studentId ? `?studentId=${studentId}` : '';
    const response = await fetch(`${this.baseUrl}/api/attendance/history${params}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async getAnalytics(academicYearId: string): Promise<Record<string, unknown>> {
    const response = await fetch(`${this.baseUrl}/api/attendance/analytics?academicYearId=${academicYearId}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async getAuditLog(): Promise<Record<string, unknown>[]> {
    const response = await fetch(`${this.baseUrl}/api/attendance/audit`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }
}
