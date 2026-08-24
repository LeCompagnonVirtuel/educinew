# EduOS Phase 3.4 — Documentation Mobile

> Version : 3.4.0 | Expo + React Native

---

## 1. Vue d'ensemble

EduOS Mobile est construit avec Expo et React Native, offrant une expérience native sur iOS et Android avec support offline.

---

## 2. Écrans principaux

### Par rôle

| Rôle | Écrans |
|------|--------|
| ELEVE | Dashboard, Cours, Notes, Présence, Bibliothèque, Wallet |
| ENSEIGNANT | Dashboard, Classes, Notes, Présence, Communication |
| PARENT | Dashboard, Enfants, Paiements, Communication |
| ADMIN | Dashboard complet, Utilisateurs, Configuration |
| COMPTABLE | Dashboard, Transactions, Rapports, Wallet |
| CHAUFFEUR | Trajet, Attendance transport, GPS |

### Navigation

```
Bottom Tab Navigator
├── Dashboard (home)
├── Modules (grid)
├── Notifications (badge)
├── Wallet (solde)
└── Profile (settings)
```

---

## 3. Fonctionnalités mobiles

### QR Code

- Scan pour présence
- Vérification credentials
- Partage d'identité
- Génération QR signé (HMAC SHA256)

### Camera

- Photo de profil
- Scan documents
- Capture notes manuscrites
- OCR pour documents

### GPS

- Géolocalisation transport
- Présence géolocalisée
- Suivi bus scolaire
- Zones géofencing

### Push Notifications

| Type | Priorité |
|------|----------|
| Notes publiées | Haute |
| Absence détectée | Critique |
| Paiement reçu | Moyenne |
| Annonce école | Normale |
| Rappel devoirs | Basse |

---

## 4. Offline Support

### Stratégie

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Offline   │────►│    Local    │────►│    Sync     │
│   Queue     │     │   Storage   │     │   Server    │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Données synchronisées

| Donnée | TTL offline |
|--------|-------------|
| Emploi du temps | 24h |
| Notes | 7j |
| Présence | 24h |
| Messages | 48h |
| Wallet balance | 1h |
| Documents | 7j |

### Conflits

- Stratégie: Server wins
- Merge: Dernière modification
- Notification: En cas de conflit

---

## 5. SecureStore

| Donnée | Stockage |
|--------|----------|
| Auth token | SecureStore |
| Refresh token | SecureStore |
| Biometric templates | SecureStore (chiffré) |
| Wallet keys | SecureStore |
| User preferences | AsyncStorage |

---

## 6. Deep Linking

| Schéma | Usage |
|--------|-------|
| `educi://wallet/:id` | Ouvrir wallet |
| `educi://credential/:id` | Vérifier credential |
| `educi://order/:id` | Voir commande |
| `educi://pay/:ref` | Paiement |
| `educi://qr` | Scanner QR |

---

## 7. Performance

| Métrique | Cible |
|----------|-------|
|冷启动 | < 3s |
| Navigation | < 300ms |
| Sync | < 5s |
| Frame rate | 60fps |
| Bundle size | < 15MB |

---

## 8. Voir aussi

- [Documentation principale](../phase3-4-eduos.md)
- [Guidelines mobile](../10_MOBILE_GUIDELINES.md)
- [Sécurité](../security/eduos-security.md)
