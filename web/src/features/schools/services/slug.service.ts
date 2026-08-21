import { logger } from '@educi/logger';

export class SlugService {
  generate(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  async isUnique(slug: string, excludeId?: string): Promise<boolean> {
    logger.debug('Checking slug uniqueness', { slug, excludeId }, 'schools');
    return true;
  }

  async generateUnique(name: string, excludeId?: string): Promise<string> {
    const base = this.generate(name);
    const isUnique = await this.isUnique(base, excludeId);
    if (isUnique) return base;

    let counter = 1;
    while (counter < 100) {
      const candidate = `${base}-${counter}`;
      const unique = await this.isUnique(candidate, excludeId);
      if (unique) return candidate;
      counter++;
    }

    return `${base}-${Date.now()}`;
  }
}
