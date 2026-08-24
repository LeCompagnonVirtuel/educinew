# EMERGENCY MODULE

Phase 4.6 — Gestion des Urgences

---

## 1. Vision

Système de gestion des situations d'urgence scolaire: protocoles, alertes, comptes rendus et communication.

---

## 2. RBAC

| Rôle | Accès |
|------|-------|
| SUPER_ADMIN | Toutes écoles |
| ADMIN | Urgences école |
| DIRECTEUR | Toutes urgences |
| SURVEILLANT | Déclencher + gérer |
| ENSEIGNANT | Déclencher + consulter |
| INFIRMIER | Urgences médicales |
| PARENT | Notifications enfants |

---

## 3. DB Schema

```sql
CREATE TABLE emergency_protocols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  protocol_type VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  alert_level VARCHAR(20) CHECK (alert_level IN ('green', 'yellow', 'orange', 'red')),
  is_active BOOLEAN DEFAULT true,
  last_reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_emergency_protocols_school ON emergency_protocols(school_id);
```

```sql
CREATE TABLE emergency_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  event_reference VARCHAR(50) UNIQUE NOT NULL,
  protocol_id UUID REFERENCES emergency_protocols(id),
  event_type VARCHAR(50) NOT NULL,
  alert_level VARCHAR(20) CHECK (alert_level IN ('green', 'yellow', 'orange', 'red')),
  status VARCHAR(30) CHECK (status IN ('triggered', 'responding', 'contained', 'resolved', 'debriefing')),
  description TEXT NOT NULL,
  location VARCHAR(255),
  triggered_by UUID NOT NULL REFERENCES auth.users(id),
  responded_by UUID[],
  students_affected UUID[],
  injuries_count INTEGER DEFAULT 0,
  resolved_at TIMESTAMPTZ,
  resolution_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
```

```sql
CREATE TABLE emergency_communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  event_id UUID NOT NULL REFERENCES emergency_events(id),
  channel VARCHAR(30) CHECK (channel IN ('sms', 'email', 'push', 'announcement', 'radio')),
  recipient_type VARCHAR(30) CHECK (recipient_type IN ('all', 'parents', 'staff', 'students', 'specific')),
  recipient_ids UUID[],
  message TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now(),
  sent_by UUID NOT NULL REFERENCES auth.users(id)
);
```

```sql
CREATE TABLE emergency_headcounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  event_id UUID NOT NULL REFERENCES emergency_events(id),
  classroom_id UUID NOT NULL,
  teacher_id UUID NOT NULL REFERENCES auth.users(id),
  total_students INTEGER NOT NULL,
  present_count INTEGER NOT NULL,
  missing_count INTEGER DEFAULT 0,
  missing_students UUID[],
  reported_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 4. API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/emergency/protocols` | Protocoles |
| POST | `/api/emergency/protocols` | Créer protocole |
| GET | `/api/emergency/events` | Événements |
| POST | `/api/emergency/events/trigger` | Déclencher urgence |
| PUT | `/api/emergency/events/:id` | Mettre à jour |
| POST | `/api/emergency/events/:id/communicate` | Envoyer message |
| POST | `/api/emergency/events/:id/headcount` | Appel nominal |
| GET | `/api/emergency/events/:id/status` | Statut temps réel |

---

## 5. API Example — Déclenchement

```json
POST /api/emergency/events/trigger
{
  "protocol_id": "uuid-protocol",
  "event_type": "fire",
  "alert_level": "red",
  "description": "Détection de fumée dans le bâtiment B, 2ème étage",
  "location": "Bâtiment B - 2ème étage"
}
```

---

## 6. RLS Policies

```sql
ALTER TABLE emergency_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY emergency_admin_access ON emergency_events
  FOR ALL USING (
    school_id = current_setting('app.current_school_id')::uuid
    AND EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('ADMIN', 'DIRECTEUR', 'SURVEILLANT')
    )
  );
```

---

## 7. Types d'Urgence

| Type | Protocole |
|------|-----------|
| fire | Évacuation bâtiment |
| lockdown | Confinement |
| medical | Urgence médicale |
| weather | Alerte météo |
| intruder | Intrusion |
| chemical | Fuite chimique |
| structural | Dégât structurel |
| power | Coupure électrique |

---

## 8. Workflow

```
Trigger → Alert (auto) → Notify (parents, staff, emergency)
    ↓
Respond → Headcount → Account → Contain
    ↓
Resolve → Debrief → Report → Review Protocol
```

---

## 9. Notifications

- Déclencheon → Push ALL staff immédiat
- Niveau rouge → SMS parents + Appels urgence
- Appel nominal → Push enseignants
- Résolution → Notification globale

---

*Phase 4.6 — EduCI Documentation*
