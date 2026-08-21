import { createClient } from '@/lib/supabase/client';
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
    const supabase = createClient();
    const { data } = await supabase
      .from('schools')
      .select('id')
      .eq('slug', slug)
      .limit(1);

    if (!data || data.length === 0) return true;
    if (excludeId && data[0].id === excludeId) return true;
    return false;
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
