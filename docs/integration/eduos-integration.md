# EduOS Phase 3.4 — Intégrations

> Version : 3.4.0

---

## 1. Types de connecteurs

| Type | Usage |
|------|-------|
| REST API | Intégrations HTTP standard |
| SOAP | Services web legacy |
| GraphQL | APIs flexibles |
| gRPC | Communication haute performance |
| Webhook | Événements push |
| File Transfer | SFTP/FTP |
| Database | Connexion directe BDD |
| Message Queue | Files d'attente asynchrones |

---

## 2. Intégrations Google

| Service | Statut | Usage |
|---------|--------|-------|
| Google Classroom | ✅ Activé | Synchronisation cours |
| Google Calendar | ✅ Activé | Événements |
| Google Drive | ✅ Activé | Documents |
| Google Meet | ✅ Activé | Vidéoconférence |

### Configuration

```typescript
GOOGLE_INTEGRATIONS: {
  GOOGLE_CLASSROOM_ENABLED: true,
  GOOGLE_SYNC_INTERVAL_MINUTES: 15,
  GOOGLE_RATE_LIMIT_PER_SECOND: 10,
  GOOGLE_API_SCOPES: [
    'classroom.courses',
    'classroom.coursework',
    'calendar',
    'drive',
  ]
}
```

---

## 3. Intégrations Microsoft

| Service | Statut | Usage |
|---------|--------|-------|
| MS Teams | ✅ Activé | Communication |
| Office 365 | ✅ Activé | Productivité |
| OneDrive | ✅ Activé | Stockage |
| Outlook | ✅ Activé | Email |
| Azure AD | ✅ Activé | SSO |

### Configuration

```typescript
MICROSOFT_INTEGRATIONS: {
  MS_TEAMS_ENABLED: true,
  MS_SYNC_INTERVAL_MINUTES: 15,
  MS_RATE_LIMIT_PER_SECOND: 10,
}
```

---

## 4. LMS Integration

| LMS | Statut | Sync |
|-----|--------|------|
| Moodle | ✅ | Notes, inscriptions |
| Canvas | ✅ | Notes, inscriptions |
| Blackboard | ✅ | Notes, inscriptions |
| Schoology | ✅ | Notes, inscriptions |
| Open edX | ✅ | Notes, inscriptions |

---

## 5. Paiements

| Provider | Statut | Méthodes |
|----------|--------|----------|
| Money Fusion | ✅ Principal | Mobile Money, Card |
| Orange Money | ✅ | Mobile Money |
| MTN MoMo | ✅ | Mobile Money |
| Wave | ✅ | Mobile Money |

### Webhook Security

```typescript
PAYMENT_WEBHOOK: {
  SIGNATURE_VERIFICATION: true,
  SIGNATURE_ALGORITHM: 'HMAC-SHA256',
  TIMESTAMP_TOLERANCE_SECONDS: 300,
}
```

---

## 6. SMS & Email

| Provider | Type | Limites |
|----------|------|---------|
| Africa's Talking | SMS | 60/min, 10k/jour |
| Twilio | SMS | 60/min, 10k/jour |
| SendGrid | Email | 100/min, 50k/jour |
| Mailgun | Email | 100/min, 50k/jour |

---

## 7. Cloud Storage

| Provider | Usage |
|----------|-------|
| AWS S3 | Backup, storage |
| Azure Blob | Backup, storage |
| Google Cloud | Backup, storage |
| DigitalOcean | Backup |

---

## 8. AI Services

| Service | Usage |
|---------|-------|
| OpenAI | GPT-4, embeddings |
| Anthropic | Claude |
| Google AI | Gemini |
| Azure OpenAI | Enterprise AI |
| Hugging Face | Modèles open source |

---

## 9. Créer un connecteur

### Via API

```json
POST /api/v3/eduos/connectors
{
  "name": "Mon Connecteur",
  "type": "REST_API",
  "config": {
    "base_url": "https://api.example.com",
    "auth_type": "OAUTH2",
    "client_id": "...",
    "client_secret": "..."
  },
  "sync_type": "REAL_TIME",
  "health_check_url": "/health"
}
```

### Via UI

1. Admin → Intégrations → Nouveau
2. Sélectionner le type
3. Configurer l'authentification
4. Tester la connexion
5. Activer

---

## 10. Webhooks

### Créer un webhook

```json
POST /api/v3/eduos/webhooks
{
  "url": "https://example.com/webhook",
  "events": ["student.enrolled", "payment.received"],
  "secret": "your-secret-key",
  "active": true
}
```

### Sécurité

- Signature HMAC-SHA256
- Timestamp tolerance: 300s
- Rotation du secret: 90 jours

---

## 11. Voir aussi

- [Documentation principale](../phase3-4-eduos.md)
- [API Reference](../api/eduos-api.md)
- [Webhooks](../WEBHOOKS.md)
