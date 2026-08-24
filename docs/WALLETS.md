# WALLETS.md — Module Portefeuilles Numériques

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le système de portefeuilles numériques permet aux parents et élèves de précharger des fonds, effectuer des paiements rapides et suivre leur solde en temps réel. Le wallet s'intègre directement avec le module de paiements.

---

## 2. Schéma de base de données

```sql
-- Portefeuilles
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  wallet_type VARCHAR(30) NOT NULL CHECK (wallet_type IN ('PARENT', 'STUDENT', 'INSTITUTION')),
  balance DECIMAL(15,2) DEFAULT 0 CHECK (balance >= 0),
  currency VARCHAR(3) DEFAULT 'XOF',
  status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'FROZEN', 'CLOSED')),
  daily_limit DECIMAL(15,2) DEFAULT 500000,
  monthly_limit DECIMAL(15,2) DEFAULT 5000000,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(school_id, user_id)
);

-- Transactions wallet
CREATE TABLE wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID NOT NULL REFERENCES wallets(id),
  type VARCHAR(30) NOT NULL CHECK (type IN (
    'DEPOSIT', 'WITHDRAWAL', 'PAYMENT', 'REFUND', 'TRANSFER_IN', 'TRANSFER_OUT', 'ADJUSTMENT'
  )),
  amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
  balance_before DECIMAL(15,2) NOT NULL,
  balance_after DECIMAL(15,2) NOT NULL,
  reference_type VARCHAR(50),
  reference_id UUID,
  description TEXT,
  status VARCHAR(20) DEFAULT 'COMPLETED' CHECK (status IN (
    'PENDING', 'COMPLETED', 'FAILED', 'REVERSED'
  )),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rechargements
CREATE TABLE wallet_topups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID NOT NULL REFERENCES wallets(id),
  amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
  payment_method VARCHAR(50) NOT NULL,
  provider VARCHAR(50) DEFAULT 'MONEY_FUSION',
  provider_ref VARCHAR(200),
  status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN (
    'PENDING', 'COMPLETED', 'FAILED'
  )),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Index
CREATE INDEX idx_wallets_school ON wallets(school_id);
CREATE INDEX idx_wallets_user ON wallets(user_id);
CREATE INDEX idx_wallet_tx_wallet ON wallet_transactions(wallet_id);
CREATE INDEX idx_wallet_tx_type ON wallet_transactions(type);
CREATE INDEX idx_wallet_tx_date ON wallet_transactions(created_at);
CREATE INDEX idx_wallet_topups_wallet ON wallet_topups(wallet_id);
```

---

## 3. RBAC

| Rôle | Voir solde | Recharger | Payer | Transférer | Ajuster | Geler |
|------|:-:|:-:|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| COMPTABLE | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ |
| PARENT | ✓ (sien) | ✓ (sien) | ✓ (sien) | ✗ | ✗ | ✗ |
| ELEVE | ✓ (sien) | ✗ | ✓ (sien) | ✗ | ✗ | ✗ |

---

## 4. Service principal

```typescript
// services/wallet/wallet.service.ts
interface WalletService {
  getBalance(walletId: string): Promise<number>;
  topUp(walletId: string, amount: number, method: string): Promise<TopupResult>;
  payFromWallet(walletId: string, amount: number, ref: string): Promise<PaymentResult>;
  transfer(fromWalletId: string, toWalletId: string, amount: number): Promise<void>;
  getHistory(walletId: string, filters: TransactionFilters): Promise<PaginatedTransactions>;
  freezeWallet(walletId: string): Promise<void>;
  adjustBalance(walletId: string, amount: number, reason: string): Promise<void>;
}
```

---

## 5. API Endpoints

```
GET    /api/wallets/balance          → Consulter le solde
POST   /api/wallets/topup            → Recharger le wallet
GET    /api/wallets/transactions     → Historique des transactions
POST   /api/wallets/pay              → Payer depuis le wallet
POST   /api/wallets/transfer         → Transférer entre wallets
POST   /api/wallets/:id/freeze       → Geler un wallet (ADMIN)
POST   /api/wallets/:id/adjust       → Ajustement manuel (COMPTABLE)
```

---

## 6. Règles métier

1. **Solde minimum** : Le wallet ne peut pas descendre en dessous de 0
2. **Limites** : Les plafonds journalier/mensuel sont configurables par établissement
3. **Transfert** : Uniquement entre wallets du même établissement
4. **Gel** : Un wallet gelé ne peut ni recevoir ni envoyer de fonds
5. **Concurrence** : Utilisation de transactions DB pour éviter les race conditions

---

## 7. Sécurité

- Verrous de ligne sur les opérations de débit/crédit
- Idempotence des rechargements via `provider_ref`
- Audit trail complet pour chaque mutation de solde
- Rate limiting : max 5 rechargements/heure par wallet

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
