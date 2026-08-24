# CAREER_WALLET - Portfolio Numérique

Phase 4.4 - Module Career Wallet

---

## 1. Objectif

Portefeuille numérique de compétences et réalisations, permettant aux étudiants/diplômés de stocker, partager et vérifier leurs credentials.

## 2. Modèle de Données

```sql
CREATE TABLE wallet_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  user_id UUID REFERENCES users(id),
  item_type TEXT CHECK (item_type IN ('CERTIFICATE','SKILL','PROJECT','EXPERIENCE','AWARD','REFERENCE')),
  title TEXT NOT NULL,
  description TEXT,
  issuing_org TEXT,
  issue_date DATE,
  expiry_date DATE,
  credential_url TEXT,
  verification_code TEXT UNIQUE,
  evidence_urls JSONB DEFAULT '[]',
  is_verified BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE wallet_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_item_id UUID REFERENCES wallet_items(id),
  shared_with TEXT NOT NULL,
  share_type TEXT CHECK (share_type IN ('PUBLIC','PRIVATE','LINK','QR')),
  expires_at TIMESTAMPTZ,
  access_count INT DEFAULT 0,
  max_access INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE wallet_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_item_id UUID REFERENCES wallet_items(id),
  verifier_org TEXT,
  verification_method TEXT CHECK (verification_method IN ('QR','LINK','API','MANUAL')),
  is_valid BOOLEAN,
  verified_at TIMESTAMPTZ DEFAULT now()
);
```

## 3. API Endpoints

### GET /api/wallet/items
```json
{
  "items": [
    {
      "id": "uuid",
      "item_type": "CERTIFICATE",
      "title": "Licence Informatique",
      "issuing_org": "Université de Dakar",
      "issue_date": "2024-06-15",
      "is_verified": true,
      "verification_code": "CERT-2024-XXXX",
      "share_count": 12
    },
    {
      "id": "uuid",
      "item_type": "SKILL",
      "title": "React Advanced",
      "description": "Maîtrise avancée de React",
      "is_verified": true,
      "metadata": {
        "level": "ADVANCED",
        "assessment_score": 95
      }
    }
  ]
}
```

### POST /api/wallet/items
```json
{
  "item_type": "PROJECT",
  "title": "Application E-commerce",
  "description": "Plateforme e-commerce complète avec paiement intégré",
  "evidence_urls": [
    "https://github.com/user/project",
    "https://demo.example.com"
  ],
  "metadata": {
    "technologies": ["React", "Node.js", "Stripe"],
    "duration_months": 3
  }
}
```

### POST /api/wallet/items/:id/share
```json
{
  "share_type": "LINK",
  "expires_at": "2024-12-31T23:59:59Z",
  "max_access": 50
}
```

### GET /api/wallet/verify/:code
```json
{
  "verification_code": "CERT-2024-XXXX",
  "is_valid": true,
  "item": {
    "title": "Licence Informatique",
    "issuing_org": "Université de Dakar",
    "issue_date": "2024-06-15",
    "holder": "Jean Dupont"
  },
  "verified_at": "2024-10-15T14:30:00Z"
}
```

## 4. RBAC

| Rôle | Voir wallet | Ajouter items | Partager | Vérifier |
|------|-------------|---------------|----------|----------|
| SUPER_ADMIN | ✅ | ✅ | ✅ | ✅ |
| ADMIN | ✅ (school) | ✅ | ✅ | ✅ |
| ELEVE/GRADUATE | ✅ (own) | ✅ (own) | ✅ (own) | ✅ |
| RECRUITER | ❌ | ❌ | ❌ | ✅ (shared) |

## 5. QR Code Generation

```typescript
const generateVerificationQR = (item) => {
  return QRCode.toDataURL(JSON.stringify({
    type: 'CAREER_WALLET',
    code: item.verification_code,
    url: `https://verify.educi.app/${item.verification_code}`,
    timestamp: Date.now(),
    signature: signWithHMAC(item)
  }));
};
```

## 6. Blockchain Verification (Future)

```typescript
const BlockchainVerification = {
  store: async (item) => {
    const hash = await computeHash(item);
    const tx = await contract.storeCredential(hash);
    return tx.hash;
  },
  verify: async (hash) => {
    return await contract.verifyCredential(hash);
  }
};
```

## 7. Features

- **Stockage sécurisé** : Chiffrement AES-256
- **Vérification instantanée** : QR + URL
- **Partage contrôlé** : Accès temporaire
- **Export PDF** : CV généré automatiquement
- **Intégration LinkedIn** : Synchronisation
- **Notifications** : Rappels d'expiration

## 8. Index

```sql
CREATE INDEX idx_wallet_items_user ON wallet_items(user_id);
CREATE INDEX idx_wallet_items_type ON wallet_items(item_type);
CREATE INDEX idx_wallet_items_verified ON wallet_items(is_verified);
CREATE INDEX idx_wallet_verification_code ON wallet_items(verification_code);
CREATE INDEX idx_wallet_shares_item ON wallet_shares(wallet_item_id);
CREATE INDEX idx_wallet_verifications_item ON wallet_verifications(wallet_item_id);
```
