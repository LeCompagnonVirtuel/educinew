# FINANCIAL_SECURITY.md — Sécurité Financière

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le module implémente les mesures de sécurité spécifiques aux données financières : chiffrement, tokenisation des moyens de paiement, contrôle d'accès granulaire, détection de fraude et journalisation immuable.

---

## 2. Schéma de base de données

```sql
-- Journaux d'audit financiers (immuables)
CREATE TABLE financial_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  user_id UUID NOT NULL,
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(100) NOT NULL,
  resource_id UUID NOT NULL,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  session_id VARCHAR(200),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tokenisation des moyens de paiement
CREATE TABLE payment_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  user_id UUID NOT NULL,
  token_type VARCHAR(30) CHECK (token_type IN (
    'CARD', 'MOBILE_MONEY', 'BANK_ACCOUNT'
  )),
  token_hash VARCHAR(200) NOT NULL,
  last_four VARCHAR(10),
  expiry_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Détection de fraude
CREATE TABLE fraud_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  alert_type VARCHAR(50) NOT NULL CHECK (alert_type IN (
    'UNUSUAL_AMOUNT', 'VELOCITY', 'GEO_ANOMALY', 'DUPLICATE_TX',
    'AFTER_HOURS', 'LARGE_WITHDRAWAL', 'PATTERN_BREAK'
  )),
  severity VARCHAR(20) CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  transaction_id UUID,
  user_id UUID,
  description TEXT NOT NULL,
  risk_score DECIMAL(5,2),
  status VARCHAR(20) DEFAULT 'OPEN' CHECK (status IN (
    'OPEN', 'INVESTIGATING', 'FALSE_POSITIVE', 'CONFIRMED_FRAUD', 'BLOCKED'
  )),
  investigated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Sessions financières sécurisées
CREATE TABLE secure_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  session_token_hash VARCHAR(200) NOT NULL,
  ip_address INET NOT NULL,
  user_agent TEXT,
  mfa_verified BOOLEAN DEFAULT FALSE,
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Verrous de transaction (optimistic locking)
CREATE TABLE transaction_locks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_type VARCHAR(100) NOT NULL,
  resource_id UUID NOT NULL,
  locked_by UUID NOT NULL,
  locked_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  UNIQUE(resource_type, resource_id)
);

-- Index
CREATE INDEX idx_audit_logs_school ON financial_audit_logs(school_id);
CREATE INDEX idx_audit_logs_user ON financial_audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON financial_audit_logs(action);
CREATE INDEX idx_audit_logs_created ON financial_audit_logs(created_at);
CREATE INDEX idx_payment_tokens_user ON payment_tokens(user_id);
CREATE INDEX idx_fraud_alerts_school ON fraud_alerts(school_id);
CREATE INDEX idx_fraud_alerts_severity ON fraud_alerts(severity);
CREATE INDEX idx_secure_sessions_user ON secure_sessions(user_id);
CREATE INDEX idx_tx_locks_resource ON transaction_locks(resource_type, resource_id);
```

---

## 3. RBAC

| Rôle | Voir audit | Investiguer fraude | Gérer tokens | Accès admin |
|------|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ (école) | ✗ | ✗ | ✓ |
| COMPTABLE | ✓ (propres actions) | ✗ | ✗ | ✗ |

---

## 4. Mesures de sécurité

```typescript
// services/security/financial-security.service.ts

// 1. Tokenisation
async function tokenizeCard(cardData: CardData): Promise<PaymentToken> {
  const token = generateSecureToken();
  const hash = await hashToken(token);
  return storeToken({ hash, last_four: cardData.number.slice(-4) });
}

// 2. Chiffrement au repos
const ENCRYPTION_KEY = getEnvVar('FINANCIAL_ENCRYPTION_KEY');
const ALGORITHM = 'aes-256-gcm';

// 3. Rate limiting financier
const FINANCIAL_RATE_LIMITS = {
  payment_creation: { max: 10, window: '1h' },
  payment_approval: { max: 20, window: '1h' },
  export_data: { max: 5, window: '1d' },
};

// 4. Verrous optimistes
async function acquireLock(resourceType: string, resourceId: string, userId: string) {
  const expiresAt = new Date(Date.now() + 30_000); // 30 secondes
  return db.insert(transactionLocks).values({
    resource_type: resourceType,
    resource_id: resourceId,
    locked_by: userId,
    expires_at: expiresAt,
  }).onConflict().doNothing();
}
```

---

## 5. API Endpoints

```
GET    /api/security/audit-logs                → Journaux d'audit
GET    /api/security/audit-logs/:resourceType/:id → Historique d'une ressource
GET    /api/security/fraud-alerts              → Alertes de fraude
POST   /api/security/fraud-alerts/:id/investigate → Lancer enquête
POST   /api/security/fraud-alerts/:id/resolve  → Résoudre alerte
GET    /api/security/active-sessions           → Sessions actives
POST   /api/security/sessions/:id/revoke       → Révoquer une session
GET    /api/security/export-audit              → Export CSV audit (SUPER_ADMIN)
```

---

## 6. Règles métier

1. **Immuabilité** : Les audit logs ne peuvent jamais être modifiés/supprimés
2. **Tokenisation** : Aucun numéro de carte n'est stocké en clair
3. **MFA** : Opérations financières > 100,000 XOF nécessitent MFA
4. **Délai de session** : Inactivité > 15 minutes = déconnexion automatique
5. **Alerte fraude** : Notification immédiate pour les transactions à risque

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
