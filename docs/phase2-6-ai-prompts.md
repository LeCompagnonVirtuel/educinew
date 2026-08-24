# Phase 2.6: AI Prompts Management

## Overview

Le module AI Prompts d'EduCI fournit un système complet de gestion des prompts pour l'IA éducative : templates, versioning, traduction, validation, et injection contextuelle. Il permet aux éducateurs de créer et gérer des prompts pédagogiques de manière réutilisable et maintenable, avec support multilingue (français, anglais, langues nationales).

### Capacités

- Templates de prompts pédagogiques réutilisables
- Versioning complet avec historique et rollback
- Traduction automatique multilingue
- Validation et test de prompts
- Injection contextuelle dynamique
- Catalogue partagé entre écoles
- A/B testing de variants
- Gestion des variables et placeholders

## Architecture

### Composants

```
┌─────────────────────────────────────────────┐
│             AI Prompt Service                │
├──────────┬──────────┬──────────┬────────────┤
│  Prompt  │ Prompt   │ Prompt   │  Prompt    │
│ Registry │ Version  │ Trans-   │ Validator  │
│          │ Manager  │ lator    │            │
├──────────┴──────────┴──────────┴────────────┤
│             Template Engine                   │
├──────────┬──────────┬──────────┬────────────┤
│ Variable │ Context  │ Render   │  Cache     │
│ Resolver │ Builder  │ Engine   │  Layer     │
└──────────┴──────────┴──────────┴────────────┘
```

### Modèles de données

```typescript
interface AIPromptTemplate {
  id: string;
  schoolId?: string;
  name: string;
  description: string;
  category: AIPromptCategory;
  type: AIPromptType;
  content: string;
  variables: AIPromptVariable[];
  language: string;
  tags: string[];
  isPublic: boolean;
  isSystem: boolean;
  version: number;
  status: 'draft' | 'active' | 'deprecated' | 'archived';
  author: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

type AIPromptCategory =
  | 'tutoring' | 'assessment' | 'content_creation'
  | 'communication' | 'analysis' | 'gamification'
  | 'research' | 'moderation' | 'custom';

type AIPromptType =
  | 'system' | 'user' | 'assistant' | 'function';

interface AIPromptVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array';
  description: string;
  required: boolean;
  defaultValue?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    enum?: string[];
  };
}

interface AIPromptVersion {
  id: string;
  templateId: string;
  version: number;
  content: string;
  variables: AIPromptVariable[];
  changelog: string;
  author: string;
  isActive: boolean;
  createdAt: string;
}

interface AIPromptTranslation {
  id: string;
  templateId: string;
  language: string;
  content: string;
  variables: AIPromptVariable[];
  translator: 'ai' | 'human';
  qualityScore: number;
  createdAt: string;
}
```

## Configuration

### Prompts système éducatifs

```typescript
import { AI_PROMPTS_CONFIG } from '@educi/config';

// Système de prompting unifié
const systemPrompt = AI_PROMPTS_CONFIG.system.unifiedEducationalAssistant;
/*
"Tu es un assistant éducatif IA spécialisé dans le système scolaire ivoirien.
Tu dois :
1. Fournir des explications claires et adaptées au niveau de l'élève
2. Utiliser des exemples du contexte ivoirien
3. Encourager la pensée critique
4. Respecter le programme scolaire officiel
5. être patient et bienveillant
6. Détecter les difficultés d'apprentissage
7. Adapter ton langage au niveau scolaire

Langues supportées : Français, Anglais, Baoulé, Dioula, Bété
Niveaux : Maternelle, CP, CE1, CE2, CM1, CM2, 6ème, 5ème, 4ème, 3ème, Seconde, Première, Terminale
*/
```

### Prompts par rôle

```typescript
const teacherPrompt = AI_PROMPTS_CONFIG.prompts.teacher;
/*
{
  name: "Assistant Enseignant",
  systemMessage: "Tu es un assistant pédagogique pour les enseignants du système éducatif ivoirien.",
  capabilities: ["planification", "évaluation", "différenciation"],
  constraints: ["respecter le programme officiel", "adapter au contexte local"],
  tone: "professionnel",
}
*/

const studentPrompt = AI_PROMPTS_CONFIG.prompts.student;
/*
{
  name: "Tuteur IA pour Élèves",
  systemMessage: "Tu es un tuteur IA bienveillant pour les élèves du primaire et secondaire.",
  capabilities: ["explication", "exercices", "encouragement"],
  constraints: ["pas de réponses directes", "guider vers la découverte"],
  tone: "amical",
}
*/

const directorPrompt = AI_PROMPTS_CONFIG.prompts.director;
/*
{
  name: "Assistant Direction",
  systemMessage: "Tu es un assistant stratégique pour les directeurs d'école.",
  capabilities: ["analytics", "reporting", "planification"],
  constraints: ["confidentialité", "données agrégées"],
  tone: "professionnel",
}
*/

const parentPrompt = AI_PROMPTS_CONFIG.prompts.parent;
/*
{
  name: "Assistant Parents",
  systemMessage: "Tu es un assistant bienveillant pour les parents d'élèves.",
  capabilities: ["suivi", "orientation", "communication"],
  constraints: ["respecter la vie privée", "pas de diagnostic"],
  tone: "amical",
}
*/
```

### Prompts d'activités

```typescript
const tutoringPrompt = AI_PROMPTS_CONFIG.activities.tutoring;
/*
{
  name: "Tutorat Adaptatif",
  type: "one_on_one",
  maxDuration: 30,
  maxTokens: 2000,
  systemPrompt: "Guide l'élève dans sa compréhension en utilisant la méthode socratique.",
  adaptiveRules: [
    { condition: "errors > 3", action: "simplify" },
    { condition: "time > 20min", action: "conclude" },
    { condition: "mastery > 0.8", action: "advance" }
  ]
}
*/

const assessmentPrompt = AI_PROMPTS_CONFIG.activities.assessment;
/*
{
  name: "Évaluation Formative",
  type: "quiz",
  maxQuestions: 10,
  timeLimit: 60,
  systemPrompt: "Évalue la compréhension de l'élève de manière bienveillante.",
  feedbackStyle: "constructive"
}
*/
```

## API Reference

### Endpoints

| Méthode | Endpoint | Description | Rôle requis |
|---------|----------|-------------|-------------|
| GET | `/api/ai/prompts` | Lister les prompts | Tous authentifiés |
| GET | `/api/ai/prompts/:id` | Détails d'un prompt | Tous authentifiés |
| POST | `/api/ai/prompts` | Créer un prompt | ENSEIGNANT, ADMIN, SUPER_ADMIN |
| PUT | `/api/ai/prompts/:id` | Modifier un prompt | ENSEIGNANT, ADMIN |
| DELETE | `/api/ai/prompts/:id` | Supprimer un prompt | ADMIN |
| POST | `/api/ai/prompts/:id/translate` | Traduire un prompt | ADMIN |
| POST | `/api/ai/prompts/:id/validate` | Valider un prompt | ENSEIGNANT, ADMIN |
| POST | `/api/ai/prompts/:id/test` | Tester un prompt | ENSEIGNANT, ADMIN |
| POST | `/api/ai/prompts/:id/render` | Rendre un prompt | Système |
| GET | `/api/ai/prompts/:id/versions` | Historique des versions | ADMIN |
| POST | `/api/ai/prompts/:id/rollback` | Rollback à une version | ADMIN |
| GET | `/api/ai/prompts/catalog` | Catalogue partagé | Tous authentifiés |

### Exemples de requêtes

#### Créer un prompt

```typescript
const prompt = await fetch('/api/ai/prompts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    name: 'Explication Mathématiques CM2',
    description: 'Prompt pour expliquer les fractions aux CM2',
    category: 'tutoring',
    type: 'system',
    content: `Tu es un tuteur mathématiques pour les élèves de CM2 en Côte d'Ivoire.
    
Niveau : {{niveau}}
Sujet : {{sujet}}
Contexte : {{contexte_local}}

Instructions :
1. Commence par un exemple concret (fruits, marché)
2. Utilise des visuels mentaux
3. Propose des exercices progressifs
4. Vérifie la compréhension à chaque étape
5. Encourage l'élève`,
    variables: [
      { name: 'niveau', type: 'string', required: true, defaultValue: 'CM2' },
      { name: 'sujet', type: 'string', required: true },
      { name: 'contexte_local', type: 'string', required: false, defaultValue: 'marché de Cocody' }
    ],
    language: 'fr',
    tags: ['mathématiques', 'CM2', 'fractions'],
    isPublic: false,
  }),
});
```

#### Traduire un prompt

```typescript
const translation = await fetch('/api/ai/prompts/prompt-123/translate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    targetLanguage: 'en',
    translator: 'ai',
    preserveVariables: true,
    adaptCultural: true,
  }),
});
```

#### Rendre un prompt avec variables

```typescript
const rendered = await fetch('/api/ai/prompts/prompt-123/render', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    variables: {
      niveau: 'CE2',
      sujet: 'Addition avec retenue',
      contexte_local: 'boutique de Abidjan',
    },
  }),
});

const result = await rendered.json();
// {
//   rendered: "Tu es un tuteur mathématiques pour les élèves de CM2 en Côte d'Ivoire.\n\nNiveau : CE2\nSujet : Addition avec retenue\nContexte : boutique de Abidjan\n\nInstructions :\n1. Commence par un exemple concret...",
//   tokenCount: 245,
//   estimatedCost: 0.0001
// }
```

## Usage Examples

### Exemple 1 : Bibliothèque de prompts pédagogiques

```typescript
import { AI_PROMPTS_CONFIG } from '@educi/config';

class PromptLibrary {
  private basePrompts = {
    math: {
      elementary: AI_PROMPTS_CONFIG.prompts.student.systemMessage + `
Focus sur les mathématiques du primaire avec des exemples concrets.`,
      middle: AI_PROMPTS_CONFIG.prompts.student.systemMessage + `
Focus sur les mathématiques du collège avec rigueur.`,
    },
    french: {
      elementary: AI_PROMPTS_CONFIG.prompts.student.systemMessage + `
Focus sur la lecture et l'écriture en français.`,
      middle: AI_PROMPTS_CONFIG.prompts.student.systemMessage + `
Focus sur la grammaire et la littérature française.`,
    },
  };

  getPrompt(subject: string, level: string): string {
    return this.basePrompts[subject]?.[level] ?? AI_PROMPTS_CONFIG.prompts.student.systemMessage;
  }
}
```

### Exemple 2 : Validation de prompt

```typescript
import { AI_PROMPTS_CONFIG } from '@educi/config';

class PromptValidator {
  validate(template: string): ValidationResult {
    const errors: string[] = [];

    // Vérifier la longueur
    if (template.length < 10) {
      errors.push('Le prompt est trop court (< 10 caractères)');
    }
    if (template.length > 10000) {
      errors.push('Le prompt est trop long (> 10000 caractères)');
    }

    // Vérifier les variables non résolues
    const unresolvedVars = template.match(/\{\{(\w+)\}\}/g);
    if (unresolvedVars) {
      errors.push(`Variables non résolues : ${unresolvedVars.join(', ')}`);
    }

    // Vérifier les instructions dangereuses
    const dangerousPatterns = [
      /ignore.*instructions/i,
      /bypass.*security/i,
      /reveal.*system.*prompt/i,
    ];
    for (const pattern of dangerousPatterns) {
      if (pattern.test(template)) {
        errors.push('Contenu potentiellement dangereux détecté');
      }
    }

    return { valid: errors.length === 0, errors };
  }
}
```

### Exemple 3 : Versioning de prompt

```typescript
class PromptVersionManager {
  async createVersion(
    templateId: string,
    newContent: string,
    changelog: string
  ): Promise<AIPromptVersion> {
    // Obtenir la version actuelle
    const current = await promptRepository.findCurrentVersion(templateId);

    // Créer la nouvelle version
    const newVersion = {
      templateId,
      version: current.version + 1,
      content: newContent,
      variables: this.extractVariables(newContent),
      changelog,
      author: getCurrentUserId(),
      isActive: true,
    };

    // Désactiver l'ancienne version
    await promptRepository.deactivateVersion(templateId, current.version);

    // Enregistrer la nouvelle version
    return await promptRepository.createVersion(newVersion);
  }

  async rollback(templateId: string, targetVersion: number): Promise<void> {
    const target = await promptRepository.getVersion(templateId, targetVersion);
    if (!target) throw new Error('Version cible introuvable');

    // Désactiver la version actuelle
    const current = await promptRepository.findCurrentVersion(templateId);
    await promptRepository.deactivateVersion(templateId, current.version);

    // Réactiver la version cible
    await promptRepository.activateVersion(templateId, targetVersion);
  }
}
```

## Best Practices

### Rédaction de prompts

1. **Clarté** : Instructions précises et sans ambiguïté
2. **Contextualisation** : Inclure le contexte éducatif ivoirien
3. **Progressivité** : Niveaux de difficulté croissants
4. **Bienveillance** : Ton encourageant et constructif
5. **Adaptabilité** : Variables pour l'individualisation

### Structure recommandée

```
[IDENTITÉ] Tu es un [rôle] spécialisé en [domaine].
[CONTEXTE] Tu travailles avec [public cible] en Côte d'Ivoire.
[INSTRUCTIONS]
1. [Instruction principale]
2. [Instruction secondaire]
3. [Contrainte]
[RÈGLES]
- [Règle de sécurité]
- [Règle pédagogique]
[FORMAT] Réponds en [format souhaité].
```

### Gestion des versions

- Utiliser des changelogs descriptifs
- Tester les nouveaux prompts avant déploiement
- Conserver les anciennes versions pour rollback
- Documenter les raisons des modifications

## Security Considerations

- Validation de tous les prompts avant exécution
- Détection d'injection de prompts (prompt injection)
- Sanitisation des entrées utilisateur
- Audit trail des modifications de prompts
- Isolation des prompts système et utilisateur
- Limite de longueur pour éviter l'abus

## Monitoring and Alerting

| Métrique | Type | Description |
|----------|------|-------------|
| `prompt_usage_total` | Counter | Utilisations par prompt |
| `prompt_render_duration_ms` | Histogram | Temps de rendu |
| `prompt_variable_resolution_errors` | Counter | Erreurs de résolution |
| `prompt_translation_quality` | Gauge | Score qualité traductions |
| `prompt_version_changes` | Counter | Modifications de versions |

### Alertes

```typescript
const promptAlerts = [
  {
    name: 'Prompt injection détecté',
    condition: 'prompt_injection_attempts > 0',
    severity: 'critical',
    action: 'block_and_notify',
  },
  {
    name: 'Qualité de traduction faible',
    condition: 'prompt_translation_quality < 0.7',
    severity: 'medium',
    action: 'review_required',
  },
];
```

## Troubleshooting

| Erreur | Code | Cause | Solution |
|--------|------|-------|----------|
| `AiPromptNotFoundError` | 404 | Prompt introuvable | Vérifier l'ID |
| `AiPromptValidationError` | 400 | Validation échouée | Corriger le template |
| `AiPromptInjectionError` | 403 | Injection détectée | Revoir le contenu |
| `AiPromptTranslationError` | 500 | Erreur de traduction | Réessayer ou traduire manuellement |
| `AiPromptRenderError` | 500 | Erreur de rendu | Vérifier les variables |

## Changelog

### Version 2.6.0

- Système de templates pédagogiques
- Versioning avec rollback
- Traduction automatique multilingue
- Validation et détection d'injection
- Injection contextuelle dynamique
- Catalogue partagé entre écoles
- Support Baoulé, Dioula, Bété
