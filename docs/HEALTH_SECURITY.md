# HEALTH SECURITY MODULE

Phase 4.6 — Sécurité du Module Santé

---

## 1. Vision

Mesures de sécurité spécifiques au module santé: chiffrement, audit, protection des données médicales.

---

## 2. Menaces Identifiées

| Menace | Risque | Mitigation |
|--------|--------|------------|
| Accès non autorisé données médicales | Critique | RBAC + RLS + Chiffrement |
| Fuite données santé | Critique | Chiffrement repos + transit |
| Manipulation dossiers | Haute | Audit trail + signatures |
| Injection SQL | Haute | Requêtes paramétrées |
| XSS médical | Moyenne | Sanitization + CSP |

---

## 3. Chiffrement

### Au repos (At Rest)

```sql
-- Extension pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Champs sensibles chiffrés
ALTER TABLE health_profiles
  ADD COLUMN encrypted_allergies BYTEA,
  ADD COLUMN encrypted_medications BYTEA;

-- Fonction chiffrement
CREATE OR REPLACE FUNCTION encrypt_sensitive()
RETURNS TRIGGER AS $$
BEGIN
  NEW.encrypted_allergies = pgp_sym_encrypt(
    NEW.allergies::text,
    current_setting('app.encryption_key')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### En transit (In Transit)

- TLS 1.3 obligatoire
- HSTS strict
- Certificate pinning mobile

---

## 4. Audit Trail

```sql
CREATE TABLE health_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  table_name VARCHAR(100) NOT NULL,
  record_id UUID NOT NULL,
  action VARCHAR(20) CHECK (action IN ('INSERT', 'UPDATE', 'DELETE', 'SELECT')),
  old_values JSONB,
  new_values JSONB,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_health_audit_table ON health_audit_log(table_name, record_id);
CREATE INDEX idx_health_audit_user ON health_audit_log(user_id);
CREATE INDEX idx_health_audit_date ON health_audit_log(created_at);
```

---

## 5. RLS Avancées

```sql
-- Pas de SELECT sans school_id
CREATE POLICY health_strict_isolation ON health_profiles
  USING (
    school_id = current_setting('app.current_school_id')::uuid
    AND school_id IS NOT NULL
  );

-- Audit INSERT
CREATE POLICY health_audit_insert ON health_profiles
  FOR INSERT WITH CHECK (
    school_id = current_setting('app.current_school_id')::uuid
  );

-- Pas de DELETE sans admin
CREATE POLICY health_admin_only_delete ON health_profiles
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'SUPER_ADMIN'
    )
  );
```

---

## 6. API Security Headers

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 7. Validation Serveur

```typescript
// Middleware validation
async function validateHealthRequest(req: Request) {
  const body = await req.json();
  
  // Sanitization
  const sanitized = {
    ...body,
    notes: sanitize(body.notes),
    diagnosis: sanitize(body.diagnosis),
    treatment: sanitize(body.treatment)
  };
  
  // Validation Zod
  const result = HealthVisitSchema.safeParse(sanitized);
  if (!result.success) {
    throw new ValidationError(result.error.issues);
  }
  
  return result.data;
}

function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"'&]/g, '')
    .trim();
}
```

---

## 8. Secrets Management

| Secret | Emplacement | Rotation |
|--------|-------------|----------|
| Supabase Key | .env.local | 90 jours |
| Encryption Key | Vault | 180 jours |
| API Key DeepSeek | Vault | 90 jours |
| JWT Secret | Supabase | Géré par Supabase |

---

## 9. Conformité

| Standard | Statut | Détails |
|----------|--------|---------|
| OWASP Top 10 | ✓ | Toutes mitigations |
| HIPAA-like | ✓ | Chiffrement + audit |
| RGPD | ✓ | Droit à l'oubli + portabilité |
| PCI DSS | N/A | Pas de données paiement santé |

---

## 10. Incident Response

```
Détection → Classification → Containment → Eradication
    ↓
Recovery → Lessons Learned → Documentation → Prevention
```

| Sévérité | Temps Réponse | Escalade |
|----------|---------------|----------|
| Critique | 15 min | Admin + Direction |
| Haute | 1h | Admin |
| Moyenne | 4h | Équipe |
| Basse | 24h | Standard |

---

## 11. Monitoring

- Logs temps réel via Edge Functions
- Alerte accès non autorisé → Push immédiat
- Taux d'erreur API > 5% → Alerte
- Tentatives brute force → Block IP
- Anomalies accès → Flag review

---

*Phase 4.6 — EduCI Documentation*
