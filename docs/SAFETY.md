# SAFETY MODULE

Phase 4.6 — Sécurité Scolaire

---

## 1. Vision

Gestion de la sécurité physique et numérique de l'établissement. Inspections, contrôles et conformité.

---

## 2. RBAC

| Rôle | Accès |
|------|-------|
| SUPER_ADMIN | Données globales |
| ADMIN | Sécurité école |
| DIRECTEUR | Toutes inspections |
| SURVEILLANT | Inspections + contrôles |
| MAINTENANCE | Rapports maintenance |
| ENSEIGNANT | Signaler problèmes |
| PARENT | Rapports sécurité |

---

## 3. DB Schema

```sql
CREATE TABLE safety_inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  inspection_type VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('scheduled', 'in_progress', 'completed', 'failed')),
  inspector_id UUID NOT NULL REFERENCES auth.users(id),
  checklist JSONB NOT NULL DEFAULT '[]'::jsonb,
  findings TEXT,
  issues_found INTEGER DEFAULT 0,
  critical_issues INTEGER DEFAULT 0,
  next_inspection_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_safety_inspections_school ON safety_inspections(school_id);
CREATE INDEX idx_safety_inspections_type ON safety_inspections(inspection_type);
```

```sql
CREATE TABLE safety_issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  inspection_id UUID REFERENCES safety_inspections(id),
  issue_type VARCHAR(50) NOT NULL,
  severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  description TEXT NOT NULL,
  location VARCHAR(255),
  reported_by UUID NOT NULL REFERENCES auth.users(id),
  assigned_to UUID REFERENCES auth.users(id),
  status VARCHAR(20) CHECK (status IN ('open', 'in_progress', 'resolved', 'verified')),
  due_date DATE,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

```sql
CREATE TABLE safety_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  certification_type VARCHAR(100) NOT NULL,
  issuing_body VARCHAR(255),
  certificate_number VARCHAR(100),
  issued_date DATE,
  expiry_date DATE,
  document_url TEXT,
  is_valid BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 4. API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/safety/inspections` | Liste inspections |
| POST | `/api/safety/inspections` | Planifier inspection |
| GET | `/api/safety/inspections/:id` | Détail inspection |
| PUT | `/api/safety/inspections/:id` | Mettre à jour |
| GET | `/api/safety/issues` | Problèmes ouverts |
| POST | `/api/safety/issues` | Signaler problème |
| PUT | `/api/safety/issues/:id` | Résoudre problème |
| GET | `/api/safety/certifications` | Certificats |
| POST | `/api/safety/certifications` | Ajouter certificat |
| GET | `/api/safety/dashboard` | Tableau de bord |

---

## 5. API Example — Inspection

```json
POST /api/safety/inspections
{
  "inspection_type": "fire_safety",
  "location": "Bâtiment principal",
  "checklist": [
    { "item": "Extincteurs vérifiés", "passed": true },
    { "item": "Sorties de secours dégagées", "passed": true },
    { "item": "Détecteurs fumée fonctionnels", "passed": false, "note": "Détecteur étage 2 défaillant" }
  ]
}
```

---

## 6. RLS Policies

```sql
ALTER TABLE safety_inspections ENABLE ROW LEVEL SECURITY;

CREATE POLICY safety_school_isolation ON safety_inspections
  USING (school_id = current_setting('app.current_school_id')::uuid);
```

---

## 7. Types d'Inspection

| Type | Fréquence |
|------|-----------|
| fire_safety | Trimestrielle |
| electrical | Semestrielle |
| structural | Annuelle |
| playground | Mensuelle |
| kitchen | Hebdomadaire |
| chemical_storage | Mensuelle |
| accessibility | Semestrielle |
| security_systems | Mensuelle |

---

## 8. Checklist Standard — Incendie

| Élément | Statut |
|---------|--------|
| Extincteurs vérifiés | ✓/✗ |
| Sorties de secours | ✓/✗ |
| Détecteurs fumée | ✓/✗ |
| Éclairage urgence | ✓/✗ |
| Plan évacuation affiché | ✓/✗ |
| Système alarme | ✓/✗ |
| Clés de secours | ✓/✗ |

---

## 9. Notifications

- Inspection échouée → Push admin
- Problème critique → Push admin + directeur
- Certificat expire 30j → Rappel admin
- Tâche maintenance en retard → Rappel assigné

---

*Phase 4.6 — EduCI Documentation*
