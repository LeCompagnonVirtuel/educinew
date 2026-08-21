import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  masteryLevel: number;
  lastReviewed: string;
}

export const AiFlashcardsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await fetch('/api/ai/flashcards');
      const json = await response.json();
      setFlashcards(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setShowBack(false);
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setShowBack(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const getMasteryColor = (level: number) => {
    if (level >= 80) return '#28a745';
    if (level >= 50) return '#ffc107';
    return '#dc3545';
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (flashcards.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Aucune carte mémoire disponible</Text>
      </View>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cartes Mémoire</Text>
      <Text style={styles.subtitle}>Révisez vos connaissances avec les cartes IA</Text>

      <View style={styles.progressInfo}>
        <Text style={styles.progressText}>Carte {currentIndex + 1} sur {flashcards.length}</Text>
        <View style={[styles.masteryBadge, { backgroundColor: getMasteryColor(currentCard.masteryLevel) + '20' }]}>
          <Text style={[styles.masteryText, { color: getMasteryColor(currentCard.masteryLevel) }]}>
            Maîtrise: {currentCard.masteryLevel}%
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.flashcard, showBack && styles.flashcardBack]}
        onPress={() => setShowBack(!showBack)}
      >
        <Text style={styles.flashcardLabel}>{showBack ? 'Réponse' : 'Question'}</Text>
        <Text style={styles.flashcardText}>
          {showBack ? currentCard.back : currentCard.front}
        </Text>
        <Text style={styles.flashcardHint}>Appuyez pour {showBack ? 'voir la question' : 'voir la réponse'}</Text>
      </TouchableOpacity>

      <View style={styles.subjectBadge}>
        <Text style={styles.subjectText}>{currentCard.subject}</Text>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentIndex === 0}
        >
          <Text style={styles.navButtonText}>← Précédent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === flashcards.length - 1 && styles.navButtonDisabled]}
          onPress={handleNext}
          disabled={currentIndex === flashcards.length - 1}
        >
          <Text style={styles.navButtonText}>Suivant →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Statistiques de révision</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{flashcards.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{flashcards.filter((f) => f.masteryLevel >= 80).length}</Text>
            <Text style={styles.statLabel}>Maîtrisées</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{flashcards.filter((f) => f.masteryLevel < 50).length}</Text>
            <Text style={styles.statLabel}>À réviser</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  progressInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  progressText: { fontSize: 14, color: '#333' },
  masteryBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  masteryText: { fontSize: 12, fontWeight: '600' },
  flashcard: { backgroundColor: '#1565c0', borderRadius: 16, padding: 32, minHeight: 250, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  flashcardBack: { backgroundColor: '#28a745' },
  flashcardLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  flashcardText: { fontSize: 20, fontWeight: '600', color: '#fff', textAlign: 'center', lineHeight: 28 },
  flashcardHint: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 20 },
  subjectBadge: { alignSelf: 'center', backgroundColor: '#e3f2fd', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginBottom: 20 },
  subjectText: { fontSize: 13, color: '#1565c0', fontWeight: '600' },
  navigationContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  navButton: { backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  navButtonDisabled: { backgroundColor: '#e0e0e0' },
  navButtonText: { fontSize: 14, fontWeight: '600', color: '#333' },
  statsCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  statsTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#333' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#1565c0' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 4 },
});
