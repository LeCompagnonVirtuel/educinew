# EduOS Phase 3.4 — Sécurité

> Version : 3.4.0 | OWASP Top 10 Compliant

---

## 1. Authentification

### Supabase Auth + JWT

```
Client → Login → Supabase Auth → JWT Token → API
```

| Paramètre | Valeur |
|-----------|--------|
| Token expiry | 3600s (1h) |
| Refresh token | 7 jours |
| Max sessions/user | 5 |
| Session timeout | 30 min |

### MFA (Multi-Factor Authentication)

| Méthode | Configuration |
|---------|---------------|
| TOTP | Code 6 chiffres, expiry 300s |
| SMS | Via Africa's Talking / Twilio |
| Email | Code par email |
| Push | Notification push mobile |
| Hardware Key | FIDO2/WebAuthn |

- Backup codes: 10 codes de 8 caractères
- Lockout après 5 tentatives biométriques (15 min)

### Biométrie

| Type | Confiance min |
|------|---------------|
| Fingerprint | 0.92 |
| Facial | 0.92 |
| Iris | 0.92 |
| Voice | 0.92 |

- Liveness detection obligatoire
- Stockage: templates chiffrés localement

---

## 2. Autorisation (RBAC)

### Rôles

| Rôle | Permissions |
|------|-------------|
| SUPER_ADMIN | Accès total |
| ADMIN | Gestion école complète |
| DIRECTEUR | Supervision académique |
| SECRETAIRE | Administration générale |
| COMPTABLE | Finance et comptabilité |
| ENSEIGNANT | Classes, notes, présence |
| SURVEILLANT | Discipline, surveillance |
| PARENT | Enfant, paiements |
| ELEVE | Cours, notes, bibliothèque |
| CHAUFFEUR | Transport |
| BIBLIOTHECAIRE | Bibliothèque |
| INFIRMIER | Santé |
| RH | Ressources humaines |

### Validation RBAC

```typescript
// Chaque requête API vérifie:
1. JWT valide
2. Rôle autorisé pour l'endpoint
3. school_id correspondant
4. Permissions spécifiques
```

---

## 3. Protection des données

### Chiffrement

| Contexte | Algorithme |
|----------|------------|
| Au repos | AES-256-GCM |
| En transit | TLS 1.3 |
| Tokens blockchain | Ed25519 |
| Wallet backup | AES-256-GCM |

### Masquage des données

| Niveau | Usage |
|--------|-------|
| PUBLIC | Données publiques |
| INTERNAL | Usage interne uniquement |
| CONFIDENTIAL | Accès restreint |
| RESTRICTED | Accès administrateur |

### Données personnelles

- Right to be forgotten: activé
- Consent tracking: activé
- Rétention par défaut: 2555 jours (7 ans)
- Archivage après: 365 jours

---

## 4. Sécurité réseau

| Mesure | Configuration |
|--------|---------------|
| CSP | Activé |
| Helmet | Activé |
| CORS | Domaines autorisés uniquement |
| Rate Limiting | 100 req/min (défaut) |
| WAF | Activé |
| DDoS Protection | Activé |

---

## 5. Sécurité blockchain

| Mesure | Configuration |
|--------|---------------|
| Key Management | HSM |
| Key Rotation | 90 jours |
| Multi-sig | Seuil 2/5 signataires |
| Smart Contract Audit | Obligatoire |
| Signature | Ed25519 |

---

## 6. Audit & Traçabilité

| Élément | Rétention |
|---------|-----------|
| Audit logs | 10 ans |
| Blockchain audit | 20 ans |
| Audit immutable | Oui |
| Real-time streaming | Activé |

### Logs d'audit obligatoires

- Authentification (succès/échec)
- Accès données sensibles
- Modifications configuration
- Transactions financières
- Actions administratives

---

## 7. Webhook Security

| Mesure | Configuration |
|--------|---------------|
| Signature verification | HMAC-SHA256 |
| Timestamp tolerance | 300s |
| IP Whitelist | Optionnel |
| Secret rotation | 90 jours |

---

## 8. Conformité

| Standard | Statut |
|----------|--------|
| OWASP Top 10 | Conforme |
| RGPD | Conforme |
| ISO 27001 | En cours |
| SOC 2 | Planifié |

---

## 9. Voir aussi

- [Documentation principale](../phase3-4-eduos.md)
- [Architecture](../architecture/eduos-architecture.md)
- [Compliance](../compliance/eduos-compliance.md)
