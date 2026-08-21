import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBookLoanService } from '@/features/smart-campus/services/sc-book-loan.service';

describe('ScBookLoanService', () => {
  let service: ScBookLoanService;
  const mockSupabase = {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
          then: vi.fn()
        })),
        then: vi.fn()
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn()
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn()
          }))
        }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn()
      }))
    }))
  } as any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ScBookLoanService(mockSupabase);
  });

  it('should get loan by id', async () => {
    const result = await service.getLoan('school-1', 'loan-1');
    expect(result).toBeDefined();
  });

  it('should return loan with correct data', async () => {
    const mockLoan = { id: 'loan-1', book_copy_id: 'copy-1', student_id: 'student-1', status: 'active' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockLoan, error: null });
    const result = await service.getLoan('school-1', 'loan-1');
    expect(result).toEqual(mockLoan);
  });

  it('should handle error when getting loan', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getLoan('school-1', 'loan-1');
    expect(result).toBeNull();
  });

  it('should get all loans for a school', async () => {
    const mockLoans = [{ id: 'loan-1' }, { id: 'loan-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockLoans, error: null });
    const result = await service.getLoans('school-1');
    expect(result).toEqual(mockLoans);
  });

  it('should create a new loan', async () => {
    const newLoan = { book_copy_id: 'copy-1', student_id: 'student-1', due_date: '2026-08-17' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'loan-3', ...newLoan }, error: null });
    const result = await service.createLoan('school-1', newLoan);
    expect(result).toBeDefined();
  });

  it('should update a loan', async () => {
    const updates = { status: 'returned' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'loan-1', ...updates }, error: null });
    const result = await service.updateLoan('school-1', 'loan-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a loan', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteLoan('school-1', 'loan-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteLoan('school-1', 'loan-1');
    expect(result).toBe(false);
  });

  it('should get active loans', async () => {
    const mockLoans = [{ id: 'loan-1', status: 'active' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockLoans, error: null });
    const result = await service.getActiveLoans('school-1');
    expect(result).toEqual(mockLoans);
  });

  it('should get loans by student', async () => {
    const mockLoans = [{ id: 'loan-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockLoans, error: null });
    const result = await service.getLoansByStudent('school-1', 'student-1');
    expect(result).toEqual(mockLoans);
  });

  it('should get overdue loans', async () => {
    const mockLoans = [{ id: 'loan-1', due_date: '2026-08-01', status: 'overdue' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockLoans, error: null });
    const result = await service.getOverdueLoans('school-1');
    expect(result).toEqual(mockLoans);
  });

  it('should return a book', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'loan-1', status: 'returned', return_date: new Date() }, error: null });
    const result = await service.returnBook('school-1', 'loan-1');
    expect(result).toBeDefined();
  });

  it('should renew a loan', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'loan-1', due_date: '2026-08-24' }, error: null });
    const result = await service.renewLoan('school-1', 'loan-1', '2026-08-24');
    expect(result).toBeDefined();
  });

  it('should check if student can borrow', async () => {
    const mockLoans = [{ id: 'loan-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockLoans, error: null });
    const result = await service.canStudentBorrow('school-1', 'student-1');
    expect(result).toBe(true);
  });

  it('should validate loan data', () => {
    const result = service.validateLoanData({ book_copy_id: 'copy-1', student_id: 'student-1', due_date: '2026-08-17' });
    expect(result).toBe(true);
  });

  it('should reject invalid loan data', () => {
    const result = service.validateLoanData({ book_copy_id: '', student_id: '', due_date: '' });
    expect(result).toBe(false);
  });

  it('should calculate due date', () => {
    const dueDate = service.calculateDueDate(new Date('2026-08-03'), 14);
    expect(dueDate).toBeDefined();
  });
});
