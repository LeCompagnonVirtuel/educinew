'use client';
import { useState, useCallback } from 'react';
import { ScBookLoanService } from '../services/sc-book-loan.service';
import { createClient } from '@/lib/supabase/client';
import type { BookLoan, BookLoanCreate } from '@educi/types';

export const useScBookLoanActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const borrow = useCallback(async (data: BookLoanCreate): Promise<BookLoan | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScBookLoanService(createClient());
      return await service.createLoan(schoolId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const renew = useCallback(async (loanId: string, newDueDate: string): Promise<BookLoan | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScBookLoanService(createClient());
      return await service.extendLoan(schoolId, loanId, newDueDate);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const returnBook = useCallback(async (loanId: string): Promise<BookLoan | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScBookLoanService(createClient());
      return await service.updateLoan(schoolId, loanId, { status: 'returned', returnDate: new Date().toISOString() });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, borrow, renew, returnBook };
};
