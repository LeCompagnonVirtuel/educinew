'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpPDFService } from '../services/lxp-pdf.service';
import type { PDF } from '@educi/types';
import type { PDFQuery } from '../types';

export const useLxpPDFs = (courseId: string) => {
  const [pdfs, setPDFs] = useState<readonly PDF[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPDFs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPDFService(createClient());
      const data = await service.listPDFs(courseId);
      setPDFs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch PDFs');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchPDFs();
  }, [fetchPDFs]);

  return { pdfs, loading, error, refresh: fetchPDFs };
};

export const useLxpPDF = (schoolId: string, id: string | null) => {
  const [pdf, setPDF] = useState<PDF | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPDF = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPDFService(createClient());
      const data = await service.getPDF(schoolId, id);
      setPDF(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch PDF');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchPDF();
  }, [fetchPDF]);

  return { pdf, loading, error, refresh: fetchPDF };
};

export const useLxpPDFCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (courseId: string, file: File, title: string): Promise<PDF | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPDFService(createClient());
      const result = await service.uploadPDF(courseId, file, title);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload PDF');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpPDFRenderUrl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRenderUrl = useCallback(async (schoolId: string, id: string): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPDFService(createClient());
      const url = await service.getRenderUrl(schoolId, id);
      return url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get render URL');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getRenderUrl, loading, error };
};

export const useLxpPDFDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPDFService(createClient());
      await service.deletePDF(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete PDF');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
