# WORKFORCE_SECURITY - Sécurité

Phase 4.4 - Module Workforce Security

---

## 1. Objectif

Politiques et mécanismes de sécurité spécifiques au module Workforce : données sensibles, accès tiers, conformité.

## 2. Données Sensibles

| Donnée | Classification | Chiffrement | Accès |
|--------|---------------|-------------|-------|
| Salary | CONFIDENTIAL | AES-256 | Owner + Admin |
| Personal Info | SENSITIVE | AES-256 | Owner + Admin |
| Career History | INTERNAL | TLS | Owner |
| Skills | PUBLIC | TLS | Authenticated |
| Job Listings | PUBLIC | TLS | Authenticated |
| Applications | CONFIDENTIAL | AES-256 | Owner + Recruiter |

## 3. Authentification API

```typescript
const APIAuth = {
  apiKey: {
    format: 'workforce_(live|test)_xxxx',
    length: 40,
    rotation: '90 days',
    storage: 'encrypted'
  },
  hmac: {
    algorithm: 'SHA-256',
    secret: process.env.WEBHOOK_SECRET,
    header: 'X-Webhook-Signature'
  }
};
```

## 4. Authorization Matrix

```typescript
const AuthorizationMatrix = {
  talent: {
    ownProfile: ['read', 'update'],
    ownApplications: ['read', 'create', 'update', 'delete'],
    ownWallet: ['read', 'create', 'update', 'share'],
    publicJobs: ['read'],
    otherTalents: [] // No access
  },
  recruiter: {
    ownCompany: ['read', 'update'],
    ownJobs: ['read', 'create', 'update', 'delete'],
    applications: ['read', 'update_status'],
    talentSearch: ['read'],
    talentProfiles: ['read'] // Only after match
  },
  admin: {
    allData: ['read'],
    manageUsers: ['create', 'update', 'delete'],
    manageJobs: ['create', 'update', 'delete'],
    reports: ['read', 'export']
  }
};
```

## 5. RLS Policies

```sql
-- Talent can only see own profile
CREATE POLICY talent_own_profile ON workforce_talent_profiles
  FOR ALL USING (user_id = auth.uid());

-- Recruiter can see applications for own jobs
CREATE POLICY recruiter_own_jobs ON workforce_applications
  FOR SELECT USING (
    job_id IN (
      SELECT id FROM workforce_jobs 
      WHERE company_id = (
        SELECT company_id FROM workforce_recruiters 
        WHERE user_id = auth.uid()
      )
    )
  );

-- Admin can see all school data
CREATE POLICY admin_school_access ON workforce_*
  FOR ALL USING (
    school_id IN (
      SELECT school_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('ADMIN', 'SUPER_ADMIN')
    )
  );
```

## 6. Data Protection

```typescript
const DataProtection = {
  encryption: {
    atRest: 'AES-256-GCM',
    inTransit: 'TLS 1.3',
    keyRotation: 'annual'
  },
  retention: {
    jobListings: '2 years after expiry',
    applications: '1 year after decision',
    careerData: '5 years',
    analytics: '3 years'
  },
  anonymization: {
    afterRetention: true,
    method: 'k-anonymity',
    k: 5
  }
};
```

## 7. Audit Logging

```typescript
const AuditEvents = {
  DATA_ACCESS: {
    level: 'INFO',
    capture: ['user', 'resource', 'action', 'timestamp']
  },
  DATA_MODIFICATION: {
    level: 'WARNING',
    capture: ['user', 'resource', 'action', 'before', 'after']
  },
  FAILED_AUTH: {
    level: 'ERROR',
    capture: ['user', 'reason', 'ip', 'timestamp']
  },
  SUSPICIOUS_ACTIVITY: {
    level: 'CRITICAL',
    capture: ['user', 'action', 'context', 'alert']
  }
};
```

## 8. API Security

```typescript
const APISecurity = {
  rateLimiting: {
    global: '1000/hour',
    perEndpoint: '100/minute',
    burst: '50/10seconds'
  },
  inputValidation: {
    maxPayloadSize: '1MB',
    sanitization: true,
    sqlInjection: true,
    xssPrevention: true
  },
  cors: {
    origin: process.env.ALLOWED_ORIGINS.split(','),
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
};
```

## 9. Compliance

- **RGPD**: Droit à l'oubli, portabilité données
- **OWASP Top 10**: Toutes les protections
- **SOC 2**: Contrôles de sécurité
- **ISO 27001**: Politiques documentées

## 10. Incident Response

```typescript
const IncidentResponse = {
  detection: 'Real-time monitoring + alerts',
  classification: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
  response: {
    LOW: 'Log and monitor',
    MEDIUM: 'Notify admin',
    HIGH: 'Isolate and investigate',
    CRITICAL: 'Full incident response team'
  },
  communication: {
    internal: 'Within 1 hour',
    external: 'Within 24 hours',
    regulatory: 'Within 72 hours'
  }
};
```

## 11. Security Checklist

- [ ] HTTPS enforced
- [ ] API keys rotated
- [ ] RLS policies active
- [ ] Audit logging enabled
- [ ] Encryption at rest
- [ ] Input validation
- [ ] Rate limiting
- [ ] CORS configured
- [ ] Secrets not in code
- [ ] Dependencies updated
