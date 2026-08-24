# FINANCIAL_COMPLIANCE.md — Conformité Financière

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le module assure la conformité financière réglementaire : normes comptables, contrôles internes, politiques financières, et reporting obligatoire aux autorités.

---

## 2. Schéma de base de données

```sql
-- Contrôles internes
CREATE TABLE internal_controls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  control_name VARCHAR(300) NOT NULL,
  control_type VARCHAR(50) CHECK (control_type IN (
    'PREVENTIVE', 'DETECTIVE', 'CORRECTIVE', 'COMPENSATING'
  )),
  category VARCHAR(50) CHECK (category IN (
    'SEGREGATION_OF_DUTIES', 'APPROVAL_WORKFLOW',
    'RECONCILIATION', 'ACCESS_CONTROL', 'AUDIT_TRAIL',
    'BUDGET_CONTROL', 'DOCUMENTATION'
  )),
  description TEXT NOT NULL,
  frequency VARCHAR(30) CHECK (frequency IN (
    'DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'ANNUAL', 'PER_TRANSACTION'
  )),
  responsible_role VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_executed_at TIMESTAMPTZ,
  next_execution_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exécutions de contrôles
CREATE TABLE control_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  control_id UUID NOT NULL REFERENCES internal_controls(id),
  executed_by UUID NOT NULL REFERENCES auth.users(id),
  execution_date TIMESTAMPTZ DEFAULT NOW(),
  result VARCHAR(20) CHECK (result IN ('PASS', 'FAIL', 'PARTIAL', 'EXCEPTION')),
  findings TEXT,
  evidence_urls TEXT[],
  remediation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Politiques financières
CREATE TABLE financial_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  policy_name VARCHAR(300) NOT NULL,
  policy_type VARCHAR(50) CHECK (policy_type IN (
    'ACCOUNTING', 'PAYMENT', 'EXPENSE', 'REVENUE',
    'INVESTMENT', 'BUDGET', 'CASH_MANAGEMENT'
  )),
  content TEXT NOT NULL,
  version VARCHAR(10) DEFAULT '1.0',
  effective_date DATE NOT NULL,
  review_date DATE,
  status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN (
    'DRAFT', 'ACTIVE', 'UNDER_REVIEW', 'ARCHIVED'
  )),
  approved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Événements de conformité
CREATE TABLE compliance_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN (
    'BREACH', 'VIOLATION', 'REMEDIATION', 'AUDIT_FINDING',
    'POLICY_CHANGE', 'REGULATORY_UPDATE'
  )),
  severity VARCHAR(20) CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  description TEXT NOT NULL,
  affected_area VARCHAR(100),
  remediation_action TEXT,
  status VARCHAR(20) DEFAULT 'OPEN' CHECK (status IN (
    'OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'WAIVED'
  )),
  reported_by UUID REFERENCES auth.users(id),
  resolved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Index
CREATE INDEX idx_controls_school ON internal_controls(school_id);
CREATE INDEX idx_controls_type ON internal_controls(control_type);
CREATE INDEX idx_control_exec_control ON control_executions(control_id);
CREATE INDEX idx_policies_school ON financial_policies(school_id);
CREATE INDEX idx_compliance_events_school ON compliance_events(school_id);
CREATE INDEX idx_compliance_events_severity ON compliance_events(severity);
```

---

## 3. RBAC

| Rôle | Voir contrôles | Exécuter | Créer politique | Signaler violation |
|------|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✓ | ✓ | ✓ |
| COMPTABLE | ✓ | ✓ | ✗ | ✓ |
| DIRECTEUR | ✓ | ✗ | ✗ | ✓ |

---

## 4. API Endpoints

```
GET    /api/compliance/controls               → Lister les contrôles
POST   /api/compliance/controls               → Créer un contrôle
GET    /api/compliance/controls/:id           → Détail d'un contrôle
POST   /api/compliance/controls/:id/execute   → Exécuter un contrôle
GET    /api/compliance/controls/:id/executions → Historique d'exécution
GET    /api/compliance/policies               → Politiques financières
POST   /api/compliance/policies               → Créer une politique
GET    /api/compliance/events                 → Événements de conformité
POST   /api/compliance/events                 → Signaler un événement
PATCH  /api/compliance/events/:id             → Résoudre un événement
GET    /api/compliance/dashboard              → Tableau de bord conformité
```

---

## 5. Règles métier

1. **Séparation des tâches** : La personne qui saisit ≠ celle qui approuve
2. **Audit trail** : Chaque action est tracée avec horodatage et utilisateur
3. **Contrôles périodiques** : Exécution automatique selon la fréquence définie
4. **Remédiation** : Plan d'action obligatoire pour chaque violation
5. **Revue** : Les politiques sont revues annuellement

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
