'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpMarketplaceService } from '../services/lxp-marketplace.service';
import type { CourseMarketplace, MarketplaceTemplate, PremiumContent } from '@educi/types';
import type { MarketplaceQuery } from '../types';

export const useLxpMarketplace = (schoolId: string) => {
  const [listings, setListings] = useState<readonly CourseMarketplace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpMarketplaceService(createClient());
      const data = await service.listListings(schoolId);
      setListings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch marketplace listings');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return { listings, loading, error, refresh: fetchListings };
};

export const useLxpMarketplaceListing = (schoolId: string, id: string | null) => {
  const [listing, setListing] = useState<CourseMarketplace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListing = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpMarketplaceService(createClient());
      const data = await service.getListing(schoolId, id);
      setListing(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch marketplace listing');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchListing();
  }, [fetchListing]);

  return { listing, loading, error, refresh: fetchListing };
};

export const useLxpMarketplaceCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<CourseMarketplace, 'id' | 'createdAt' | 'updatedAt' | 'enrollmentCount' | 'revenue' | 'reviewCount'>): Promise<CourseMarketplace | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpMarketplaceService(createClient());
      const result = await service.createListing(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create marketplace listing');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpMarketplaceUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: Partial<CourseMarketplace>): Promise<CourseMarketplace | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpMarketplaceService(createClient());
      const result = await service.updateListing(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update marketplace listing');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpMarketplaceTemplates = (schoolId: string) => {
  const [templates, setTemplates] = useState<readonly MarketplaceTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpMarketplaceService(createClient());
      const data = await service.listTemplates(schoolId);
      setTemplates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch marketplace templates');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return { templates, loading, error, refresh: fetchTemplates };
};
