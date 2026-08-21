'use client';
import { useState, useCallback } from 'react';
import { ScBookService } from '../services/sc-book.service';
import { createClient } from '@/lib/supabase/client';
import type { Book, BookQuery } from '@educi/types';

export const useScBookSearch = (schoolId: string) => {
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string): Promise<Book[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScBookService(createClient());
      const data = await service.searchBooks(schoolId, query);
      setResults(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const filter = useCallback(async (query: BookQuery): Promise<Book[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScBookService(createClient());
      const data = await service.listBooks(schoolId, query);
      setResults(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getRecommendations = useCallback(async (bookId: string): Promise<Book[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScBookService(createClient());
      const book = await service.getBook(schoolId, bookId);
      const allBooks = await service.listBooks(schoolId, { category: book.category });
      setResults(allBooks.filter((b) => b.id !== bookId).slice(0, 5));
      return allBooks.filter((b) => b.id !== bookId).slice(0, 5);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { results, loading, error, search, filter, getRecommendations };
};
