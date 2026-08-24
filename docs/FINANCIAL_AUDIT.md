# FINANCIAL_AUDIT.md — Audit Financier

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le module d'Audit Financier assure la traçabilité complète de toutes les opérations financières, la conformité aux normes comptables, et la génération de rapports d'audit pour les autorités de tutelle.

---

## 2. Schéma de base de données

```sql
-- Plans d'audit
CREATE TABLE audit_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  audit_name VARCHAR(300) NOT NULL,
  audit_type VARCHAR(50) CHECK (audit_type IN (
    'INTERNAL', 'EXTERNAL', 'COMPLIANCE', 'TAX', 'OPERATIONAL'
  )),
  fiscal_year VARCHAR(9) NOT NULL,
  scope TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  auditor_name VARCHAR(200),
  status VARCHAR(20) DEFAULT 'PLANNED' CHECK (status IN (
    'PLANNED', 'IN_PROGRESS', 'COMPLETED', 'REPORTED'
  )),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Éléments de vérification
CREATE TABLE audit_procedures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES audit_plans(id) ON DELETE CASCADE,
  procedure_name VARCHAR(300) NOT NULL,
  description TEXT NOT NULL,
  area VARCHAR(100) NOT NULL,
  risk_level VARCHAR(20) CHECK (risk_level IN ('LOW', 'MEDIUM', 'HIGH')),
  status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN (
    'PENDING', 'IN_PROGRESS', 'COMPLETED', 'EXCEPTION'
  )),
  assigned_to UUID REFERENCES auth.users(id),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Observations d'audit
CREATE TABLE audit_findings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES audit_plans(id),
  procedure_id UUID REFERENCES audit_procedures(id),
  finding_type VARCHAR(30) CHECK (finding_type IN (
    'CONTROL_WEAKNESS', 'NON_COMPLIANCE', 'ERROR',
    'FRAUD', 'INEFFICIENCY', 'BEST_PRACTICE'
  )),
  severity VARCHAR(20) CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  title VARCHAR(300) NOT NULL,
  description TEXT NOT NULL,
  evidence TEXT,
  recommendation TEXT NOT NULL,
  management_response TEXT,
  status VARCHAR(20) DEFAULT 'OPEN' CHECK (status IN (
    'OPEN', 'ACKNOWLEDGED', 'REMEDIATING', 'RESOLVED', 'WAIVED'
  )),
  due_date DATE,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rapports d'audit
CREATE TABLE audit_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES audit_plans(id),
  report_type VARCHAR(50) CHECK (report_type IN (
    'SUMMARY', 'DETAILED', 'EXECUTIVE', 'COMPLIANCE_CERTIFICATE'
  )),
  content JSONB NOT NULL,
  issued_date DATE NOT NULL,
  issued_by UUID NOT NULL REFERENCES auth.users(id),
  status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN (
    'DRAFT', 'FINAL', 'SUBMITTED'
  )),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trail complet (immutable)
CREATE TABLE financial_trail (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  event_type VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID NOT NULL,
  action VARCHAR(50) NOT NULL,
  user_id UUID NOT NULL,
  old_data JSONB,
  new_data JSONB,
  ip_address INET,
  checksum VARCHAR(64) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_audit_plans_school ON audit_plans(school_id);
CREATE INDEX idx_audit_plans_year ON audit_plans(fiscal_year);
CREATE INDEX idx_audit_proc_plan ON audit_procedures(plan_id);
CREATE INDEX idx_audit_findings_plan ON audit_findings(plan_id);
CREATE INDEX idx_audit_findings_severity ON audit_findings(severity);
CREATE INDEX idx_audit_reports_plan ON audit_reports(plan_id);
CREATE INDEX idx_trail_school ON financial_trail(school_id);
CREATE INDEX idx_trail_entity ON financial_trail(entity_type, entity_id);
CREATE INDEX idx_trail_created ON financial_trail(created_at);
```

---

## 3. RBAC

| Rôle | Planifier audit | Exécuter procédures | Créer findings | Voir trail |
|------|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✓ | ✓ | ✓ |
| COMPTABLE | ✗ | ✗ | ✗ | ✓ (lecture) |
| DIRECTEUR | ✗ | ✗ | ✗ | ✓ (école) |

---

## 4. Service principal

```typescript
// services/audit/financial-audit.service.ts
interface FinancialAuditService {
  createAuditPlan(params: CreateAuditPlanParams): Promise<AuditPlan>;
  addProcedure(planId: string, params: AddProcedureParams): Promise<AuditProcedure>;
  completeProcedure(procedureId: string, findings: Finding[]): Promise<void>;
  generateReport(planId: string, type: string): Promise<AuditReport>;
  getFinancialTrail(
    schoolId: string,
    filters: TrailFilters
  ): Promise<PaginatedTrail>;
  verifyTrailIntegrity(schoolId: string, startDate: string, endDate: string): Promise<IntegrityResult>;
}
```

---

## 5. API Endpoints

```
GET    /api/audit/plans                        → Plans d'audit
POST   /api/audit/plans                        → Créer un plan
GET    /api/audit/plans/:id                    → Détail d'un plan
GET    /api/audit/plans/:id/procedures         → Procédures du plan
POST   /api/audit/plans/:id/procedures         → Ajouter procédure
PATCH  /api/audit/procedures/:id               → Mettre à jour procédure
GET    /api/audit/findings                     → Observations
POST   /api/audit/findings                     → Créer une observation
PATCH  /api/audit/findings/:id                 → Résoudre observation
GET    /api/audit/reports                      → Rapports d'audit
POST   /api/audit/reports                      → Générer un rapport
GET    /api/audit/trail                        → Journal d'audit
GET    /api/audit/trail/verify                 → Vérifier intégrité
```

---

## 6. Règles métier

1. **Immuabilité** : Les entrées `financial_trail` ne peuvent être ni modifiées ni supprimées
2. **Checksum** : Chaque entrée est signée SHA-256 pour garantir l'intégrité
3. **Rétention** : Les données d'audit sont conservées 10 ans minimum
4. **Vérification** : Contrôle d'intégrité mensuel du trail
5. **Certification** : Le rapport final inclut un certificat de conformité

---

## 7. Intégrité du trail

```typescript
// Vérification d'intégrité
async function verifyTrailIntegrity(
  schoolId: string,
  startDate: string,
  endDate: string
): Promise<{ valid: boolean; broken: string[] }> {
  const entries = await getTrailEntries(schoolId, startDate, endDate);
  const broken: string[] = [];

  for (const entry of entries) {
    const expected = computeChecksum(entry);
    if (entry.checksum !== expected) {
      broken.push(entry.id);
    }
  }

  return { valid: broken.length === 0, broken };
}
```

---

## 8. Conformité

| Norme | Description | Statut |
|-------|-------------|--------|
| OHADA | Plan comptable统一 | ✅ |
| SYSCOHADA | Système comptable | ✅ |
| IFRS | Normes internationales | 🔄 Partiel |
| ISO 27001 | Sécurité de l'information | ✅ |

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
