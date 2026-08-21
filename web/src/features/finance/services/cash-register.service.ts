import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class CashRegisterService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async findCashRegister(id: string) {
    const register = await this.repository.findCashRegisterById(id);
    if (!register) {
      logger.warn('Cash register not found', { registerId: id }, 'finance');
    }
    return register;
  }

  async findAllCashRegisters() {
    return this.repository.listCashRegisters(this.schoolId);
  }

  async createCashRegister(data: Record<string, unknown>) {
    const register = await this.repository.createCashRegister({ ...data, school_id: this.schoolId });
    logger.info('Cash register created', { registerId: register.id }, 'finance');
    return register;
  }

  async openCashRegister(cashRegisterId: string, openingBalance: number, openedBy: string) {
    const session = await this.repository.openCashRegisterSession({
      cash_register_id: cashRegisterId,
      opening_balance: openingBalance,
      opened_by: openedBy,
      opened_at: new Date().toISOString(),
      status: 'open',
      school_id: this.schoolId,
    });
    logger.info('Cash register opened', { sessionId: session.id, cashRegisterId }, 'finance');
    return session;
  }

  async closeCashRegister(sessionId: string, closingBalance: number) {
    const session = await this.repository.closeCashRegisterSession(sessionId, closingBalance);
    logger.info('Cash register closed', { sessionId }, 'finance');
    return session;
  }

  async findCashRegisterMovements(sessionId: string) {
    return this.repository.listCashRegisterMovements(sessionId);
  }

  async createCashRegisterMovement(data: Record<string, unknown>) {
    const movement = await this.repository.createCashRegisterMovement(data);
    logger.info('Cash register movement created', { movementId: movement.id }, 'finance');
    return movement;
  }
}
