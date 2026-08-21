import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../../services/api';
import { COLORS, withAlpha } from '../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { Card, Button } from '../../components/ui';

const QUICK_PROMPTS = [
  { icon: 'book-outline', labelKey: 'ai.resumeCourse', prompt: 'Résume-moi le cours de ', type: 'summarize' as const },
  { icon: 'help-circle-outline', labelKey: 'ai.explainExercise', prompt: "Explique-moi comment résoudre cet exercice : ", type: 'explain' as const },
  { icon: 'clipboard-outline', labelKey: 'ai.generateQuiz', prompt: 'Génère un quiz de 5 questions sur ', type: 'quiz' as const },
  { icon: 'bulb-outline', labelKey: 'ai.revisionTips', prompt: "Donne-moi des conseils de révision pour l'examen de ", type: 'chat' as const },
];

export default function AIScreen({ navigation }: any) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: 'assistant',
      content: `Bonjour${user?.name ? ` ${user.name.split(' ')[0]}` : ''} ! Je suis EduCI AI, ton assistant éducatif. Je peux t'aider à comprendre tes cours, résoudre des exercices, générer des quiz ou te donner des conseils. Comment puis-je t'aider ?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);

  const handleSend = async (text?: string, promptType?: string) => {
    const userMsg = (text || input).trim();
    if (!userMsg || loading) return;

    setInput('');
    setShowPrompts(false);
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);

    try {
      const context = user?.role === 'STUDENT'
        ? `L'utilisateur est un élève (${user.name}). Réponds de manière pédagogique et adaptée à un élève.`
        : user?.role === 'TEACHER'
        ? `L'utilisateur est un enseignant (${user.name}). Aide-le à préparer ses cours et évaluations.`
        : `L'utilisateur est ${user?.name || 'un utilisateur'} avec le rôle ${user?.role || 'inconnu'}.`;

      let data: any;

      if (promptType === 'explain') {
        const subject = userMsg.match(/(?:en|de|d[''])\s+(\w+)/i)?.[1] || 'general';
        data = await api.explainExercise(userMsg, subject);
      } else if (promptType === 'quiz') {
        const subject = userMsg.match(/(?:en|de|sur|d[''])\s+(\w+)/i)?.[1] || 'general';
        data = await api.generateQuiz(subject, user?.role === 'STUDENT' ? '3eme' : 'general', 5);
      } else if (promptType === 'summarize') {
        const subject = userMsg.match(/(?:en|de|d[''])\s+(\w+)/i)?.[1] || 'general';
        data = await api.summarizeLesson(userMsg, subject);
      } else {
        data = await api.chat(userMsg, context);
      }

      const responseText = data.response || data.message || data.explanation || t('ai.fallbackResponse');
      setMessages((prev) => [...prev, { role: 'assistant', content: responseText }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: t('ai.errorMessage') },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const handleQuickPrompt = (prompt: string, type?: string) => {
    if (type === 'chat') {
      setInput(prompt);
    } else {
      handleSend(prompt, type);
    }
  };

  const handleClearHistory = () => {
    setMessages([{
      role: 'assistant',
      content: t('ai.resetConfirm'),
    }]);
    setShowPrompts(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <View style={styles.aiLogo}>
            <Ionicons name="sparkles" size={16} color={COLORS.white} />
          </View>
          <Text style={styles.header}>{t('ai.title')}</Text>
        </View>
        {messages.length > 2 && (
          <Button
            title=""
            variant="ghost"
            size="sm"
            onPress={handleClearHistory}
            iconLeft={<Ionicons name="trash-outline" size={18} color={COLORS.onSurfaceVariant} />}
            style={styles.clearBtn}
          />
        )}
      </View>

      <ScrollView ref={scrollRef} style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
        {messages.map((msg, i) => (
          <View
            key={i}
            style={[styles.messageBubble, msg.role === 'user' ? styles.userBubble : styles.aiBubble]}
          >
            {msg.role === 'assistant' && (
              <View style={styles.aiIcon}>
                <Ionicons name="sparkles" size={14} color={COLORS.primary} />
              </View>
            )}
            <Card
              variant={msg.role === 'user' ? 'default' : 'outlined'}
              padding="sm"
              style={[styles.bubbleContent, msg.role === 'user' ? styles.userContent : styles.aiContent]}
            >
              <Text style={[styles.bubbleText, msg.role === 'user' && styles.userText]}>
                {msg.content}
              </Text>
            </Card>
          </View>
        ))}
        {loading && (
          <View style={[styles.messageBubble, styles.aiBubble]}>
            <View style={styles.aiIcon}>
              <Ionicons name="sparkles" size={14} color={COLORS.primary} />
            </View>
            <Card variant="outlined" padding="sm" style={[styles.bubbleContent, styles.aiContent]}>
              <Text style={styles.bubbleText}>...</Text>
            </Card>
          </View>
        )}

        {showPrompts && messages.length <= 1 && (
          <View style={styles.promptsContainer}>
            <Text style={styles.promptsTitle}>{t('ai.suggestions')}</Text>
            {QUICK_PROMPTS.map((qp, i) => (
              <Card
                key={i}
                variant="outlined"
                padding="md"
                onPress={() => handleQuickPrompt(qp.prompt, qp.type)}
                style={styles.promptChip}
              >
                <View style={styles.promptChipContent}>
                  <Ionicons name={qp.icon as any} size={16} color={COLORS.primary} />
                  <Text style={styles.promptChipText}>{t(qp.labelKey)}</Text>
                </View>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={[styles.inputContainer, { paddingBottom: insets.bottom + SPACING.md }]}>
        <TextInput
          style={styles.input}
          placeholder={t('ai.askQuestion')}
          placeholderTextColor={COLORS.onSurfaceVariant}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => handleSend()}
          multiline
          maxLength={2000}
        />
        <Button
          title=""
          variant="primary"
          size="md"
          onPress={() => handleSend()}
          disabled={!input.trim() || loading}
          iconLeft={<Ionicons name="send" size={18} color={COLORS.white} />}
          style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
        />
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  aiLogo: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.text },
  clearBtn: { padding: SPACING.sm },
  messagesContainer: { flex: 1 },
  messagesContent: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xl },
  messageBubble: { flexDirection: 'row', gap: SPACING.sm, maxWidth: '85%' },
  userBubble: { alignSelf: 'flex-end' },
  aiBubble: { alignSelf: 'flex-start', flexDirection: 'row', gap: SPACING.sm },
  aiIcon: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: withAlpha(COLORS.primary, 0.13),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleContent: { flexShrink: 1 },
  userContent: { backgroundColor: COLORS.primary },
  aiContent: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
  bubbleText: { fontSize: FONT_SIZES.md, color: COLORS.text, lineHeight: 20 },
  userText: { color: COLORS.white },
  promptsContainer: { marginTop: SPACING.md, gap: SPACING.sm },
  promptsTitle: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurfaceVariant, marginBottom: SPACING.xs },
  promptChip: {},
  promptChipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  promptChipText: { fontSize: FONT_SIZES.md, color: COLORS.text, fontWeight: FONT_WEIGHTS.medium },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: SPACING.sm,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.xl,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.xl,
  },
  sendButtonDisabled: { opacity: 0.5 },
});
