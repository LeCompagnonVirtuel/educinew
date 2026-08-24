# Phase 2.6: AI Voice and Vision Features

## Overview

Le module AI Voice & Vision d'EduCI intègre les capacités multimodales de l'IA : reconnaissance et synthèse vocale, analyse et génération d'images, et transcription audio. Il est conçu pour améliorer l'accessibilité et l'expérience éducative avec des interactions naturelles.

### Capacités

- Synthèse vocale (Text-to-Speech) en français et langues locales
- Reconnaissance vocale (Speech-to-Text) avec diarisation
- Analyse d'images et OCR
- Génération d'images pédagogiques
- Description automatique de contenus visuels
- Support multilingue (français, Baoulé, Dioula)
- Accessibilité pour les élèves malvoyants
- Transcription de cours et réunions

## Architecture

### Composants

```
┌─────────────────────────────────────────────┐
│          AI Voice & Vision Service           │
├──────────┬──────────┬──────────┬────────────┤
│  TTS     │   STT    │  Image   │  Vision    │
│ Engine   │  Engine  │ Analyzer │  Generator │
├──────────┴──────────┴──────────┴────────────┤
│              Processing Pipeline              │
├──────┬──────┬──────┬──────┬──────┬──────────┤
│Audio │Text  │Image │OCR   │Lang  │ Output   │
│Input │Proc. │Proc. │      │Detect│ Formatter│
└──────┴──────┴──────┴──────┴──────┴──────────┘
```

### Modèles de données

```typescript
interface AIVoiceConfig {
  id: string;
  schoolId?: string;
  enabled: boolean;
  tts: TTSConfig;
  stt: STTConfig;
  languages: VoiceLanguage[];
  voices: VoiceProfile[];
  rateLimits: VoiceRateLimit;
  createdAt: string;
  updatedAt: string;
}

interface TTSConfig {
  enabled: boolean;
  provider: 'elevenlabs' | 'google' | 'openai' | 'local';
  defaultVoice: string;
  defaultLanguage: string;
  speed: number;
  pitch: number;
  volume: number;
  outputFormat: 'mp3' | 'wav' | 'ogg';
  maxCharacters: number;
  cacheEnabled: boolean;
}

interface STTConfig {
  enabled: boolean;
  provider: 'openai' | 'google' | 'local';
  defaultLanguage: string;
  model: string;
  enableDiarization: boolean;
  enablePunctuation: boolean;
  enableTimestamps: boolean;
  maxDuration: number;
  outputFormat: 'text' | 'json' | 'srt' | 'vtt';
}

interface VoiceLanguage {
  code: string;
  name: string;
  nativeName: string;
  ttsEnabled: boolean;
  sttEnabled: boolean;
  quality: 'low' | 'medium' | 'high';
}

interface VoiceProfile {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'neutral';
  language: string;
  accent?: string;
  ageGroup: 'child' | 'adult' | 'senior';
  style: 'formal' | 'casual' | 'educational';
  previewUrl?: string;
}

interface AIVisionConfig {
  id: string;
  schoolId?: string;
  enabled: boolean;
  imageAnalysis: ImageAnalysisConfig;
  ocr: OCRConfig;
  imageGeneration: ImageGenerationConfig;
  createdAt: string;
  updatedAt: string;
}

interface ImageAnalysisConfig {
  enabled: boolean;
  provider: 'openai' | 'google' | 'anthropic';
  maxImageSize: number;
  supportedFormats: string[];
  maxImagesPerRequest: number;
  analysisDetail: 'low' | 'high' | 'auto';
  features: string[];
}

interface OCRConfig {
  enabled: boolean;
  provider: 'google' | 'openai' | 'local';
  languages: string[];
  accuracy: number;
  enableHandwriting: boolean;
  outputFormat: 'text' | 'json' | 'hocr';
}

interface ImageGenerationConfig {
  enabled: boolean;
  provider: 'dall-e' | 'stable-diffusion' | 'local';
  defaultSize: string;
  defaultQuality: 'standard' | 'hd';
  maxImagesPerRequest: number;
  safetyFilter: boolean;
}

interface AIAudioTranscription {
  id: string;
  userId: string;
  schoolId: string;
  audioUrl: string;
  language: string;
  text: string;
  segments: TranscriptionSegment[];
  duration: number;
  wordCount: number;
  createdAt: string;
}

interface TranscriptionSegment {
  id: string;
  start: number;
  end: number;
  text: string;
  speaker?: string;
  confidence: number;
}

interface AIVisionAnalysis {
  id: string;
  imageUrl: string;
  description: string;
  objects: DetectedObject[];
  text?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

interface DetectedObject {
  label: string;
  confidence: number;
  boundingBox?: { x: number; y: number; width: number; height: number };
}
```

## Configuration

### Synthèse vocale

```typescript
import { AI_VOICE_CONFIG } from '@educi/config';

const ttsConfig = AI_VOICE_CONFIG.tts;
/*
{
  enabled: true,
  provider: "elevenlabs",
  defaultVoice: "france_female_1",
  languages: [
    { code: "fr", name: "Français", enabled: true, quality: "high" },
    { code: "en", name: "English", enabled: true, quality: "high" },
    { code: "bam", name: "Bamanankan", enabled: true, quality: "medium" },
    { code: "djo", name: "Dioula", enabled: true, quality: "medium" },
    { code: "bet", name: "Bété", enabled: false, quality: "low" },
  ],
  voices: [
    { id: "france_female_1", name: "Marie", gender: "female", language: "fr", accent: "français" },
    { id: "france_male_1", name: "Jean", gender: "male", language: "fr", accent: "français" },
    { id: "ci_female_1", name: "Awa", gender: "female", language: "fr", accent: "ivoirien" },
    { id: "ci_male_1", name: "Kofi", gender: "male", language: "fr", accent: "ivoirien" },
  ],
  settings: {
    speed: 1.0,
    pitch: 1.0,
    volume: 1.0,
    outputFormat: "mp3",
    maxCharacters: 5000,
    cacheEnabled: true,
  }
}
*/
```

### Reconnaissance vocale

```typescript
const sttConfig = AI_VOICE_CONFIG.stt;
/*
{
  enabled: true,
  provider: "openai",
  model: "whisper-1",
  languages: ["fr", "en", "bam", "djo"],
  settings: {
    enableDiarization: true,
    enablePunctuation: true,
    enableTimestamps: true,
    maxDuration: 600,
    outputFormat: "json",
  },
  features: {
    autoDetectLanguage: true,
    translateToFrench: true,
    generateSubtitles: true,
  }
}
*/
```

### Vision

```typescript
import { AI_VISION_CONFIG } from '@educi/config';

const visionConfig = AI_VISION_CONFIG;
/*
{
  enabled: true,
  imageAnalysis: {
    enabled: true,
    provider: "openai",
    maxImageSize: 20971520,
    supportedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
    maxImagesPerRequest: 10,
    analysisDetail: "auto",
    features: ["description", "objects", "text", "faces"],
  },
  ocr: {
    enabled: true,
    provider: "google",
    languages: ["fr", "en"],
    accuracy: 0.95,
    enableHandwriting: true,
    outputFormat: "text",
  },
  imageGeneration: {
    enabled: true,
    provider: "dall-e",
    defaultSize: "1024x1024",
    defaultQuality: "standard",
    maxImagesPerRequest: 4,
    safetyFilter: true,
    styles: ["educational", "cartoon", "realistic"],
  }
}
*/
```

## API Reference

### Endpoints

| Méthode | Endpoint | Description | Rôle requis |
|---------|----------|-------------|-------------|
| POST | `/api/ai/voice/tts` | Synthèse vocale | Tous authentifiés |
| POST | `/api/ai/voice/stt` | Reconnaissance vocale | Tous authentifiés |
| POST | `/api/ai/voice/transcribe` | Transcription complète | ENSEIGNANT, ADMIN |
| GET | `/api/ai/voice/languages` | Langues disponibles | Tous |
| GET | `/api/ai/voice/voices` | Voix disponibles | Tous |
| POST | `/api/ai/vision/analyze` | Analyser une image | Tous authentifiés |
| POST | `/api/ai/vision/ocr` | Extraire le texte | Tous authentifiés |
| POST | `/api/ai/vision/describe` | Décrire une image | Tous authentifiés |
| POST | `/api/ai/vision/generate` | Générer une image | ENSEIGNANT, ADMIN |
| POST | `/api/ai/vision/compare` | Comparer des images | ENSEIGNANT |
| GET | `/api/ai/multimodal/capabilities` | Capacités disponibles | Tous |

### Exemples de requêtes

#### Synthèse vocale

```typescript
const tts = await fetch('/api/ai/voice/tts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    text: "Bonjour ! Aujourd'hui, nous allons apprendre les fractions.",
    voiceId: "ci_female_1",
    language: "fr",
    speed: 1.0,
    outputFormat: "mp3",
  }),
});

const result = await tts.json();
// {
//   audioUrl: "https://storage.educi.ci/voice/abc123.mp3",
//   duration: 5.2,
//   format: "mp3",
//   size: 82000
// }
```

#### Reconnaissance vocale

```typescript
const stt = await fetch('/api/ai/voice/stt', {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`,
  },
  body: formData, // audio file
});

const result = await stt.json();
// {
//   text: "J'ai du mal avec les fractions. Peux-tu m'expliquer ?",
//   language: "fr",
//   confidence: 0.92,
//   segments: [
//     { start: 0, end: 2.5, text: "J'ai du mal avec les fractions.", confidence: 0.95 },
//     { start: 2.5, end: 5.1, text: "Peux-tu m'expliquer ?", confidence: 0.89 },
//   ]
// }
```

#### Analyse d'image

```typescript
const vision = await fetch('/api/ai/vision/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    imageUrl: "https://example.com/geography-map.jpg",
    features: ["description", "objects", "text"],
    language: "fr",
  }),
});

const result = await vision.json();
// {
//   description: "Carte géographique de la Côte d'Ivoire montrant les régions administratives",
//   objects: [
//     { label: "carte", confidence: 0.98 },
//     { label: "texte", confidence: 0.95 },
//   ],
//   text: "Région des Lagunes, Abidjan, Yamoussoukro...",
//   educationalRelevance: 0.9,
//   suggestedActivities: [
//     "Identifier les régions sur la carte",
//     "Localiser Abidjan et Yamoussoukro"
//   ]
// }
```

## Usage Examples

### Exemple 1 : Cours accessible

```typescript
class AccessibleCourse {
  async createAccessibleContent(
    text: string,
    options: AccessibilityOptions
  ): Promise<AccessibleContent> {
    const content: AccessibleContent = { text };

    // Générer l'audio
    if (options.ttsEnabled) {
      const audio = await voiceService.synthesize(text, {
        voiceId: options.voiceId ?? 'ci_female_1',
        speed: options.speed ?? 1.0,
      });
      content.audioUrl = audio.audioUrl;
      content.duration = audio.duration;
    }

    // Générer les sous-titres
    if (options.subtitlesEnabled) {
      const subtitles = await this.generateSubtitles(text, options.language);
      content.subtitles = subtitles;
    }

    // Générer une description d'image si nécessaire
    if (options.imageDescription) {
      const description = await visionService.describeImage(
        options.imageDescription
      );
      content.imageDescription = description;
    }

    return content;
  }
}
```

### Exemple 2 : Transcription de cours

```typescript
class CourseTranscription {
  async transcribe(
    audioUrl: string,
    options: TranscriptionOptions
  ): Promise<TranscriptionResult> {
    // Transcrire l'audio
    const transcription = await voiceService.transcribe(audioUrl, {
      language: options.language,
      enableDiarization: true,
      enableTimestamps: true,
    });

    // Segmenter par intervenant
    const segments = this.segmentBySpeaker(transcription.segments);

    // Générer le résumé
    const summary = await this.generateSummary(transcription.text);

    // Extraire les points clés
    const keyPoints = await this.extractKeyPoints(transcription.text);

    // Générer les questions de révision
    const reviewQuestions = await this.generateQuestions(transcription.text);

    return {
      fullText: transcription.text,
      segments,
      summary,
      keyPoints,
      reviewQuestions,
      duration: transcription.duration,
      wordCount: transcription.wordCount,
    };
  }
}
```

### Exemple 3 : Analyse de document

```typescript
class DocumentAnalyzer {
  async analyzeDocument(imageUrl: string): Promise<DocumentAnalysis> {
    // OCR pour extraire le texte
    const ocrResult = await visionService.ocr(imageUrl, {
      languages: ['fr', 'en'],
      enableHandwriting: true,
    });

    // Analyser le contenu
    const analysis = await visionService.analyze(imageUrl, {
      features: ['description', 'objects', 'text'],
    });

    // Identifier le type de document
    const documentType = this.classifyDocument(ocrResult.text, analysis);

    // Extraire les informations pertinentes
    const information = await this.extractInformation(
      ocrResult.text,
      documentType
    );

    return {
      text: ocrResult.text,
      documentType,
      information,
      analysis: analysis.description,
      suggestions: this.generateSuggestions(documentType, information),
    };
  }
}
```

## Best Practices

### Voix

1. **Choisir la bonne voix** : Adaptée au contexte éducatif
2. **Vitesse adaptée** : Plus lente pour les débutants
3. **Prononciation** : Vérifier la prononciation des noms propres ivoiriens
4. **Cache** : Mettre en cache les synthèses fréquentes
5. **Accessibilité** : Toujours proposer une alternative textuelle

### Vision

1. **Qualité d'image** : Images claires et bien éclairées
2. **Contexte** : Fournir le contexte éducatif pour de meilleures analyses
3. **OCR** : Vérifier manuellement les résultats importants
4. **Sécurité** : Filtrer les images inappropriées
5. **Stockage** : Compresser les images pour optimiser le stockage

### Multimodal

```typescript
// Bon : Combiner voix et vision
const lesson = await createMultimodalLesson({
  text: "Voici la carte de la Côte d'Ivoire",
  image: "ivory-coast-map.jpg",
  audio: await voiceService.synthesize("Voici la carte de la Côte d'Ivoire"),
  subtitles: true,
});

// Mauvais : Un seul mode
const textOnly = "Voici la carte de la Côte d'Ivoire";
```

## Security Considerations

- Chiffrement des fichiers audio et image
- Pas de stockage permanent des enregistrements sans consentement
- Filtrage des contenus inappropriés
- Respect de la vie privée (visages, voix)
- Audit des accès aux médias
- Suppression automatique après période configurée
- Conformité aux lois sur la protection des données

## Monitoring and Alerting

| Métrique | Type | Description |
|----------|------|-------------|
| `voice_tts_requests_total` | Counter | Requêtes TTS |
| `voice_stt_requests_total` | Counter | Requêtes STT |
| `voice_duration_seconds` | Histogram | Durée audio traitée |
| `vision_analysis_total` | Counter | Analyses d'images |
| `vision_ocr_requests_total` | Counter | Requêtes OCR |
| `vision_generation_total` | Counter | Images générées |
| `multimodal_latency_ms` | Histogram | Latence multimodale |

### Alertes

```typescript
const voiceVisionAlerts = [
  {
    name: 'Erreur TTS fréquente',
    condition: 'voice_tts_errors > 10',
    severity: 'medium',
    action: 'check_provider',
  },
  {
    name: 'OCR dégradation',
    condition: 'vision_ocr_accuracy < 0.8',
    severity: 'medium',
    action: 'review_settings',
  },
  {
    name: 'Image inappropriée détectée',
    condition: 'vision_safety_filter_triggered > 0',
    severity: 'high',
    action: 'block_and_notify',
  },
];
```

## Troubleshooting

| Erreur | Code | Cause | Solution |
|--------|------|-------|----------|
| `AiVoiceNotFoundError` | 404 | Voix introuvable | Vérifier l'ID |
| `AiVoiceUnsupportedError` | 400 | Langue non supportée | Changer de langue |
| `AiAudioTooLongError` | 400 | Audio trop long | Diviser l'audio |
| `AiImageTooLargeError` | 400 | Image trop volumineuse | Compresser |
| `AiVisionError` | 500 | Erreur d'analyse | Réessayer |
| `AiOCRError` | 500 | Erreur OCR | Améliorer la qualité |
| `AiGenerationError` | 500 | Erreur de génération | Simplifier la requête |

## Changelog

### Version 2.6.0

- Synthèse vocale multilingue
- Reconnaissance vocale avec diarisation
- Analyse d'images et OCR
- Génération d'images pédagogiques
- Support français, Baoulé, Dioula
- Transcription de cours
- Accessibilité améliorée
- Cache audio optimisé
