import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, RefreshControl, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../../constants/theme';
import { BottomTabBar } from '../../components/BottomTabBar';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../../services/api';
import { supabase } from '../../services/supabase';
import { Card, Badge, EmptyState, SkeletonList } from '../../components/ui';

interface Conversation {
  name: string;
  msg: string;
  time: string;
  unread: number;
  color: string;
  category: number;
  userId: string;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  sender?: { name?: string; id?: string };
}

interface DateGroup {
  label: string;
  messages: Message[];
}

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) return 'Aujourd\'hui';
  if (diffDays === 1) return 'Hier';
  if (diffDays < 7) {
    return d.toLocaleDateString('fr-FR', { weekday: 'long' });
  }
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function groupMessagesByDate(messages: Message[]): DateGroup[] {
  const groups: Record<string, Message[]> = {};
  for (const msg of messages) {
    const dateKey = new Date(msg.createdAt).toISOString().split('T')[0];
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(msg);
  }
  return Object.entries(groups)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, msgs]) => ({
      label: formatDateLabel(msgs[0].createdAt),
      messages: msgs,
    }));
}

export default function MessagesScreen({ navigation }: any) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState(0);
  const [selectedConv, setSelectedConv] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList<any>>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadInbox();
    setRefreshing(false);
  }, []);

  const fallbackConversations: Conversation[] = [];

  useEffect(() => {
    loadInbox();
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const loadMessages = useCallback(async (userId: string) => {
    setMessagesLoading(true);
    try {
      const data = await api.getConversation(userId);
      if (Array.isArray(data)) {
        setMessages(data.map((m: any) => ({
          id: m.id || `${m.createdAt}-${Math.random()}`,
          content: m.content || '',
          senderId: m.senderId || m.sender_id || '',
          receiverId: m.receiverId || m.receiver_id || '',
          createdAt: m.createdAt || m.created_at || new Date().toISOString(),
          sender: m.sender,
        })));
      }
    } catch {
      setMessages([]);
    } finally {
      setMessagesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedConv !== null && filtered[selectedConv]?.userId) {
      const userId = filtered[selectedConv].userId;
      loadMessages(userId);

      const channel = supabase
        .channel(`messages:${user?.id}:${userId}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${user?.id}`,
        }, (payload: any) => {
          if (payload.new?.sender_id === userId) {
            setMessages(prev => [...prev, {
              id: payload.new.id,
              content: payload.new.content || '',
              senderId: payload.new.sender_id,
              receiverId: payload.new.receiver_id,
              createdAt: payload.new.created_at,
              sender: payload.new.sender,
            }]);
          }
        })
        .subscribe();

      return () => { supabase.removeChannel(channel); };
    }
    return () => {};
  }, [selectedConv]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: false });
      }, 100);
    }
  }, [messages.length]);

  async function loadInbox() {
    setLoading(true);
    try {
      const inbox = await api.getInbox();
      if (Array.isArray(inbox) && inbox.length > 0) {
        setConversations(inbox.map((c: any, i: number) => ({
          name: c.name || c.senderName || `Contact ${i + 1}`,
          msg: c.lastMessage || c.message || c.content || '',
          time: c.time || c.createdAt || '',
          unread: c.unread || 0,
          color: [COLORS.primary, COLORS.secondary, COLORS.tertiary, COLORS.primary][i % 4],
          category: 1,
          userId: c.userId || c.senderId || '',
        })));
      } else {
        setConversations(fallbackConversations);
      }
    } catch {
      setConversations(fallbackConversations);
    } finally {
      setLoading(false);
    }
  }

  const filtered = activeFilter === 0 ? conversations : conversations.filter(c => c.category === activeFilter);

  async function handleSend() {
    if (!messageInput.trim() || selectedConv === null || sending) return;
    const conv = filtered[selectedConv];
    if (!conv?.userId) { setMessageInput(''); return; }

    const content = messageInput.trim();
    setMessageInput('');
    setSending(true);

    try {
      await api.sendMessage(conv.userId, content);

      const newMsg: Message = {
        id: `local-${Date.now()}`,
        content,
        senderId: user?.id || '',
        receiverId: conv.userId,
        createdAt: new Date().toISOString(),
      };
      setMessages(prev => [...prev, newMsg]);

      const updated = [...conversations];
      const idx = conversations.indexOf(conv);
      if (idx >= 0) {
        updated[idx] = { ...updated[idx], msg: content, time: t('common.now') };
        setConversations(updated);
      }
    } catch {
      setMessageInput(content);
    } finally {
      setSending(false);
    }
  }

  function isOwnMessage(msg: Message): boolean {
    return msg.senderId === user?.id;
  }

  const dateGroups = groupMessagesByDate(messages);

  if (selectedConv !== null && filtered[selectedConv]) {
    const conv = filtered[selectedConv];
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.chatHeader}>
            <TouchableOpacity onPress={() => { setSelectedConv(null); setMessages([]); }} style={styles.chatBackBtn}>
              <Ionicons name="arrow-back" size={FONT_SIZES.xl} color={COLORS.onSurface} />
            </TouchableOpacity>
            <View style={[styles.chatAvatar, { backgroundColor: withAlpha(conv.color, 0.08) }]}>
              <Ionicons name="person" size={FONT_SIZES.lg} color={conv.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.chatName}>{conv.name}</Text>
              <Text style={styles.chatStatus}>{t('messages.online')}</Text>
            </View>
          </View>

          {messagesLoading && messages.length === 0 ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : (
            <FlatList
              ref={flatListRef}
              data={dateGroups}
              keyExtractor={(item) => item.label}
              style={styles.chatMessages}
              contentContainerStyle={{ padding: SPACING.lg }}
              renderItem={({ item: group }) => (
                <View>
                  <View style={styles.dateSeparator}>
                    <View style={styles.dateLine} />
                    <Text style={styles.dateLabel}>{group.label}</Text>
                    <View style={styles.dateLine} />
                  </View>
                  {group.messages.map((msg: any) => {
                    const own = isOwnMessage(msg);
                    return (
                      <View
                        key={msg.id}
                        style={[styles.messageRow, own && styles.messageRowOwn]}
                      >
                        <View style={[styles.messageBubble, own ? styles.bubbleOwn : styles.bubbleReceived]}>
                          <Text style={[styles.messageText, own && styles.messageTextOwn]}>{msg.content}</Text>
                          <Text style={[styles.messageTime, own && styles.messageTimeOwn]}>{formatTime(msg.createdAt)}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
            />
          )}

          <View style={[styles.chatInputRow, { paddingBottom: insets.bottom + SPACING.sm }]}>
            <TextInput
              style={styles.chatInput}
              placeholder={t('messages.writeMessage')}
              placeholderTextColor={COLORS.outline}
              value={messageInput}
              onChangeText={setMessageInput}
              onSubmitEditing={handleSend}
              editable={!sending}
            />
            <TouchableOpacity
              style={[styles.chatSendBtn, (!messageInput.trim() || sending) && { opacity: 0.5 }]}
              disabled={!messageInput.trim() || sending}
              onPress={handleSend}
            >
              {sending ? (
                <ActivityIndicator size="small" color={COLORS.onPrimary} />
              ) : (
                <Ionicons name="send" size={FONT_SIZES.lg} color={COLORS.onPrimary} />
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <BottomTabBar activeTab="messages" onTabPress={(tab) => {
          const r: Record<string, string> = { home: 'Home', learning: 'Learning', payments: 'Payments', messages: 'Messages', profile: 'Profile' };
          navigation.navigate(r[tab] || 'Home');
        }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{t('messages.title')}</Text>
          <Text style={styles.subtitle}>{t('messages.communitySubtitle')}</Text>
        </View>
        <View style={styles.filters}>
          {[t('messages.allChats'), t('messages.teachers'), t('messages.admin'), t('messages.transport')].map((f, i) => (
            <TouchableOpacity key={f} style={[styles.filterBtn, activeFilter === i && styles.filterActive]} onPress={() => setActiveFilter(i)}>
              <Text style={[styles.filterText, activeFilter === i && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {loading ? (
          <View style={{ padding: SPACING.lg }}>
            <SkeletonList count={5} />
          </View>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="chatbubbles-outline"
            title={t('messages.noConversations')}
            subtitle={t('messages.startChat')}
          />
        ) : (
          filtered.map((conv, i) => (
            <Card
              key={i}
              variant="default"
              padding="md"
              onPress={() => setSelectedConv(i)}
              style={styles.convCard}
            >
              <View style={[styles.convAvatar, { backgroundColor: withAlpha(conv.color, 0.08) }]}>
                <Ionicons name="person" size={FONT_SIZES.lg} color={conv.color} />
              </View>
              <View style={styles.convInfo}>
                <View style={styles.convTop}>
                  <Text style={styles.convName}>{conv.name}</Text>
                  <Text style={styles.convTime}>{conv.time}</Text>
                </View>
                <Text style={styles.convMsg} numberOfLines={1}>{conv.msg}</Text>
              </View>
              {conv.unread > 0 && (
                <Badge label={`${conv.unread}`} variant="error" size="sm" />
              )}
            </Card>
          ))
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
      <BottomTabBar activeTab="messages" onTabPress={(tab) => {
        const r: Record<string, string> = { home: 'Home', learning: 'Learning', payments: 'Payments', messages: 'Messages', profile: 'Profile' };
        navigation.navigate(r[tab] || 'Home');
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.md, paddingBottom: SPACING.sm + SPACING.xs },
  title: { fontSize: FONT_SIZES.xxxl, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onSurface },
  subtitle: { fontSize: FONT_SIZES.md, color: COLORS.onSurfaceVariant, marginTop: SPACING.xs },
  filters: { flexDirection: 'row', paddingHorizontal: SPACING.lg, gap: SPACING.sm, marginBottom: SPACING.lg },
  filterBtn: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: BORDER_RADIUS.full },
  filterActive: { backgroundColor: COLORS.primary },
  filterText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurface },
  filterTextActive: { color: COLORS.onPrimary },
  convCard: { marginHorizontal: SPACING.lg, marginBottom: SPACING.sm },
  convAvatar: { width: 48, height: 48, borderRadius: BORDER_RADIUS.xl, justifyContent: 'center', alignItems: 'center' },
  convInfo: { flex: 1 },
  convTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.xs },
  convName: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  convTime: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant },
  convMsg: { fontSize: FONT_SIZES.sm, color: COLORS.onSurfaceVariant },
  chatHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.surfaceContainer, gap: SPACING.md },
  chatBackBtn: { padding: SPACING.xs },
  chatAvatar: { width: 40, height: 40, borderRadius: BORDER_RADIUS.md, justifyContent: 'center', alignItems: 'center' },
  chatName: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  chatStatus: { fontSize: FONT_SIZES.xs, color: COLORS.success },
  chatMessages: { flex: 1 },
  dateSeparator: { flexDirection: 'row', alignItems: 'center', marginVertical: SPACING.md, paddingHorizontal: SPACING.sm },
  dateLine: { flex: 1, height: 1, backgroundColor: COLORS.surfaceContainerHigh },
  dateLabel: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurfaceVariant, marginHorizontal: SPACING.sm + SPACING.xs, textTransform: 'uppercase' },
  messageRow: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: SPACING.xs },
  messageRowOwn: { justifyContent: 'flex-end' },
  messageBubble: { borderRadius: BORDER_RADIUS.xl, padding: SPACING.md, maxWidth: '78%' },
  bubbleOwn: { backgroundColor: COLORS.primary, borderBottomRightRadius: SPACING.xs },
  bubbleReceived: { backgroundColor: COLORS.surfaceContainerLow, borderBottomLeftRadius: SPACING.xs },
  messageText: { fontSize: FONT_SIZES.md, color: COLORS.onSurface, lineHeight: 20 },
  messageTextOwn: { color: COLORS.onPrimary },
  messageTime: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: SPACING.xs, textAlign: 'right' },
  messageTimeOwn: { color: withAlpha(COLORS.onPrimary, 0.7) },
  chatInputRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderTopWidth: 1, borderTopColor: COLORS.surfaceContainer, gap: SPACING.sm },
  chatInput: { flex: 1, backgroundColor: COLORS.surfaceContainerLow, borderRadius: BORDER_RADIUS.full, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm + SPACING.xs, fontSize: FONT_SIZES.md, color: COLORS.onSurface },
  chatSendBtn: { backgroundColor: COLORS.primary, width: 40, height: 40, borderRadius: BORDER_RADIUS.full, justifyContent: 'center', alignItems: 'center' },
});
