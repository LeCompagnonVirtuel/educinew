# EduOS Phase 3.4 — Guide Développeur

> Version : 3.4.0

---

## 1. Installation

### Prérequis

- Node.js 20+
- npm 10+
- Git
- Supabase CLI
- Expo CLI (pour mobile)

### Setup

```bash
# Cloner le repo
git clone https://github.com/educi/eduOS.git
cd eduOS

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env.local

# Initialiser la base de données
supabase db push

# Lancer le développement
npm run dev
```

---

## 2. Structure du projet

```
eduOS/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Pages d'authentification
│   ├── (dashboard)/       # Dashboard principal
│   └── api/               # API routes
├── components/            # Composants React
├── hooks/                 # Custom hooks
├── lib/                   # Utilitaires
│   ├── services/         # Services métier
│   ├── repositories/     # Accès données
│   └── validators/       # Validation Zod
├── packages/              # Packages partagés
│   ├── types/            # Types TypeScript
│   ├── config/           # Configuration
│   └── errors/           # Erreurs custom
├── supabase/              # Migrations BDD
├── mobile/                # App mobile Expo
└── tests/                 # Tests
```

---

## 3. Conventions de code

### Architecture

```
Page → Hook → Service → Repository → Supabase
```

- **Page**: UI uniquement, pas de logique métier
- **Hook**: Logique de state et effets
- **Service**: Logique métier
- **Repository**: Accès données
- **Supabase**: Base de données

### TypeScript

```typescript
// ✅ Bon
interface Student {
  id: string;
  name: string;
  school_id: string;
}

// ❌ Mauvais
const data: any = {};
```

### Naming

| Élément | Convention |
|---------|------------|
| Fichiers | `kebab-case.ts` |
| Composants | `PascalCase.tsx` |
| Hooks | `useCamelCase.ts` |
| Services | `camelCase.service.ts` |
| Types | `PascalCase.ts` |
| Tables | `snake_case` |

---

## 4. Créer un nouveau module

### 1. Types

```typescript
// packages/types/src/my-module.ts
export interface MyModule {
  id: string;
  school_id: string;
  name: string;
  status: 'active' | 'inactive';
  created_at: string;
}
```

### 2. Errors

```typescript
// packages/errors/src/my-module.ts
import { AppError } from './AppError';

export class MyModuleError extends AppError {
  constructor(details?: string) {
    super(`My Module error: ${details}`, 'MY_MODULE', 500, true);
  }
}
```

### 3. Config

```typescript
// packages/config/src/my-module.ts
export const MY_MODULE_CONFIG = {
  enabled: true,
  version: '1.0.0',
  MAX_ITEMS: 100,
} as const;
```

### 4. Repository

```typescript
// lib/repositories/my-module.repository.ts
import { supabase } from '@/lib/supabase';

export const myModuleRepository = {
  async findAll(schoolId: string) {
    return supabase
      .from('my_module')
      .select('*')
      .eq('school_id', schoolId);
  },
};
```

### 5. Service

```typescript
// lib/services/my-module.service.ts
import { myModuleRepository } from '@/lib/repositories/my-module.repository';

export const myModuleService = {
  async getModules(schoolId: string) {
    return myModuleRepository.findAll(schoolId);
  },
};
```

### 6. Hook

```typescript
// hooks/use-my-module.ts
import { myModuleService } from '@/lib/services/my-module.service';

export function useMyModule(schoolId: string) {
  const [modules, setModules] = useState([]);
  
  useEffect(() => {
    myModuleService.getModules(schoolId).then(setModules);
  }, [schoolId]);
  
  return { modules };
}
```

### 7. Page

```typescript
// app/(dashboard)/my-module/page.tsx
export default function MyModulePage() {
  const { modules } = useMyModule(schoolId);
  return <ModuleList modules={modules} />;
}
```

---

## 5. Tests

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# E2E
npm run test:e2e

# Coverage
npm run test:coverage
```

---

## 6. Contribuer

### Branches

- `main` — Production
- `develop` — Intégration
- `feature/*` — Nouvelles fonctionnalités
- `bugfix/*` — Corrections

### PR Process

1. Créer une branche depuis `develop`
2. Développer et tester
3. Créer une PR vers `develop`
4. Review obligatoire
5. Merge après CI passée

### Checklist PR

- [ ] Code conforme aux conventions
- [ ] Tests unitaires ajoutés
- [ ] TypeScript strict (pas de `any`)
- [ ] Pas d'erreur ESLint
- [ ] Documentation mise à jour
- [ ] Responsive testé
- [ ] Sécurité vérifiée

---

## 7. Voir aussi

- [Guide utilisateur](eduos-user-guide.md)
- [Guide admin](eduos-admin-guide.md)
- [Architecture](../architecture/eduos-architecture.md)
- [Conventions](../03_CONVENTIONS.md)
