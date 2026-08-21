import type { Teacher, TeacherFilters, TeacherListResult, CreateTeacherRequest, UpdateTeacherRequest } from '@educi/types';

export class TeacherMobileRepository {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async findById(id: string): Promise<Teacher | null> {
    const response = await fetch(`${this.baseUrl}/api/teachers/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  async findAll(filters: TeacherFilters): Promise<TeacherListResult> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    });
    const response = await fetch(`${this.baseUrl}/api/teachers?${params.toString()}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async search(query: string, limit = 20): Promise<Teacher[]> {
    const response = await fetch(`${this.baseUrl}/api/teachers/search?query=${encodeURIComponent(query)}&limit=${limit}`);
    if (!response.ok) throw new Error('Erreur lors de la recherche');
    return response.json();
  }

  async create(data: CreateTeacherRequest): Promise<Teacher> {
    const response = await fetch(`${this.baseUrl}/api/teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    return response.json();
  }

  async update(id: string, data: UpdateTeacherRequest): Promise<Teacher> {
    const response = await fetch(`${this.baseUrl}/api/teachers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return response.json();
  }

  async archive(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/teachers/${id}/archive`, { method: 'POST' });
    if (!response.ok) throw new Error('Erreur lors de l\'archivage');
  }

  async restore(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/teachers/${id}/restore`, { method: 'POST' });
    if (!response.ok) throw new Error('Erreur lors de la restauration');
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/teachers/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
  }
}
