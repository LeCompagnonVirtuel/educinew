# HEALTH PRIVACY MODULE

Phase 4.6 — Confidentialité des Données Santé

---

## 1. Vision

Protection de la vie privée et des données personnelles de santé. Conformité RGPD et lois locales.

---

## 2. Principes Fondamentaux

| Principe | Implémentation |
|----------|----------------|
| Minimisation | Collecte stricte nécessaire |
| Finalité | Usage uniquement santé scolaire |
| Limitation | Durée de conservation définie |
| Exactitude | Droit de rectification |
| Sécurité | Chiffrement + contrôle accès |
| Transparence | Politique claire |

---

## 3. DB Schema — Consentements

```sql
CREATE TABLE health_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  student_id UUID NOT NULL REFERENCES students(id),
  consent_type VARCHAR(50) NOT NULL,
  granted BOOLEAN NOT NULL,
  granted_by UUID NOT NULL REFERENCES auth.users(id),
  scope TEXT NOT NULL,
  expires_at TIMESTAMPTZ,
  withdrawn_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_health_consents_student ON health_consents(student_id);
```

```sql
CREATE TABLE health_data_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  student_id UUID NOT NULL REFERENCES students(id),
  request_type VARCHAR(30) CHECK (request_type IN ('access', 'rectification', 'erasure', 'portability', 'restriction')),
  status VARCHAR(20) CHECK (status IN ('pending', 'processing', 'completed', 'denied')),
  requested_by UUID NOT NULL REFERENCES auth.users(id),
  processed_by UUID REFERENCES auth.users(id),
  response_data JSONB,
  deadline DATE NOT NULL,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

```sql
CREATE TABLE health_data_retention (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  table_name VARCHAR(100) NOT NULL,
  retention_days INTEGER NOT NULL,
  archive_after_days INTEGER,
  delete_after_days INTEGER,
  is_active BOOLEAN DEFAULT true,
  last_cleanup_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 4. API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/health/privacy/consent` | Enregistrer consentement |
| GET | `/api/health/privacy/consent/:studentId` | Consulter consentements |
| PUT | `/api/health/privacy/consent/:id/withdraw` | Retirer consentement |
| POST | `/api/health/privacy/data-request` | Demande RGPD |
| GET | `/api/health/privacy/data-requests` | Liste demandes |
| PUT | `/api/health/privacy/data-requests/:id` | Traiter demande |
| GET | `/api/health/privacy/retention` | Politiques rétention |
| POST | `/api/health/privacy/export/:studentId` | Exporter données |
| POST | `/api/health/privacy/erase/:studentId` | Supprimer données |

---

## 5. API Example — Demande RGPD

```json
POST /api/health/privacy/data-request
{
  "student_id": "uuid-student",
  "request_type": "access",
  "scope": "health_profiles, health_visits"
}

Response:
{
  "id": "uuid-request",
  "status": "pending",
  "deadline": "2026-09-07",
  "message": "Votre demande sera traitée dans les 30 jours"
}
```

---

## 6. RLS Policies

```sql
ALTER TABLE health_consents ENABLE ROW LEVEL SECURITY;

CREATE POLICY health_consent_parent_access ON health_consents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM parent_student_relations
      WHERE parent_id = auth.uid()
      AND student_id = health_consents.student_id
    )
  );

CREATE POLICY health_consent_admin_manage ON health_consents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('ADMIN', 'SUPER_ADMIN')
    )
  );
```

---

## 7. Types de Consentement

| Type | Scope | Durée |
|------|-------|-------|
| medical_share | Partage infirmerie-enseignant | Année scolaire |
| emergency_contact | Contact urgence parent | Permanent |
| data_processing | Traitement données santé | Année scolaire |
| ai_analysis | Analyse IA santé | Semestriel |
| external_sharing | Partage externe | Cas par cas |

---

## 8. Droits RGPD

| Droit | Délai | Implémentation |
|-------|-------|----------------|
| Accès | 30 jours | Export JSON/PDF |
| Rectification | 30 jours | Modification directe |
| Effacement | 30 jours | Soft delete + purge |
| Portabilité | 30 jours | Export structuré |
| Restriction | 30 jours | Flag restriction |
| Opposition | 30 jours | Arrêt traitement |

---

## 9. Rétention des Données

| Type | Conservation | Archivage | Suppression |
|------|--------------|-----------|-------------|
| Profil santé | Durée scolarisation | +5 ans | 10 ans |
| Visites | 5 ans | +5 ans | 10 ans |
| Alertes | 3 ans | - | 3 ans |
| Consentements | Durée validité | +10 ans | Permanent |
| Audit logs | 5 ans | +5 ans | 10 ans |

---

## 10. Notifications

- Demande RGPD reçue → Push admin
- Délai expirant 7j → Rappel admin
- Consentement retiré → Notification infirmerie
- Suppression données → Confirmation admin

---

*Phase 4.6 — EduCI Documentation*
