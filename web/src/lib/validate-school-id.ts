import { NextRequest } from 'next/server';
import { getAuthenticatedSchoolId } from './api/secure';

/**
 * Validates and returns the authenticated school_id.
 * Derives school_id from the Supabase session (NOT from query params).
 * Use this in all API routes that require tenant isolation.
 */
export async function validateSchoolId(_request: NextRequest): Promise<string> {
  return getAuthenticatedSchoolId();
}
