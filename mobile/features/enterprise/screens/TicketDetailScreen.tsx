import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge } from '../../../components/ui';

interface TicketMessage {
  id: string;
  sender: string;
  sender_role: 'user' | 'support' | 'system';
  content: string;
  created_at: string;
}

interface TicketDetail {
  id: string;
  title: string;
  school_name: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  created_at: string;
  last_updated: string;
  messages: TicketMessage[];
}

export default function TicketDetailScreen({ route, navigation }: any) {
  const { ticketId } = route.params;
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');

  const loadTicket = useCallback(async () => {
    try {
      setTicket({
        id: ticketId,
        title: 'Login issue on mobile app',
        school_name: 'Lincoln Academy',
        priority: 'high',
        status: 'in_progress',
        created_at: '2026-07-24 09:00',
        last_updated: '2026-07-24 10:30',
        messages: [
          { id: '1', sender: 'Dr. Sarah Johnson', sender_role: 'user', content: 'I am unable to login to the mobile app. It keeps showing "Invalid credentials" even though I am sure my password is correct.', created_at: '2026-07-24 09:00' },
          { id: '2', sender: 'Support Team', sender_role: 'support', content: 'Thank you for reporting this issue. We are looking into it. Can you please confirm which version of the app you are using?', created_at: '2026-07-24 09:15' },
          { id: '3', sender: 'Dr. Sarah Johnson', sender_role: 'user', content: 'I am using version 2.4.1 on iOS.', created_at: '2026-07-24 09:30' },
          { id: '4', sender: 'Support Team', sender_role: 'support', content: 'We have identified the issue and are deploying a fix. It should be resolved within the next hour. We apologize for the inconvenience.', created_at: '2026-07-24 10:00' },
        ],
      });
    } catch (error) {
      console.error('[TicketDetailScreen] Error loading ticket:', error);
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => { loadTicket(); }, [loadTicket]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return SEMANTIC_COLORS.error.main;
      case 'high': return SEMANTIC_COLORS.warning.main;
      case 'medium': return COLORS.primary;
      case 'low': return SEMANTIC_COLORS.success.main;
      default: return COLORS.onSurfaceVariant;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return SEMANTIC_COLORS.info.main;
      case 'in_progress': return SEMANTIC_COLORS.warning.main;
      case 'resolved': return SEMANTIC_COLORS.success.main;
      case 'closed': return COLORS.onSurfaceVariant;
      default: return COLORS.onSurfaceVariant;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'support': return COLORS.primary;
      case 'user': return SEMANTIC_COLORS.info.main;
      case 'system': return COLORS.onSurfaceVariant;
      default: return COLORS.onSurfaceVariant;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading ticket...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.title}>Ticket {ticket?.id}</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card variant="elevated" padding="lg" style={styles.ticketCard}>
          <Text style={styles.ticketTitle}>{ticket?.title}</Text>
          <View style={styles.ticketMeta}>
            <Badge variant="dot" color={getPriorityColor(ticket?.priority || '')}>
              {ticket?.priority?.charAt(0).toUpperCase() + (ticket?.priority?.slice(1) || '')}
            </Badge>
            <Badge variant="dot" color={getStatusColor(ticket?.status || '')}>
              {ticket?.status?.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </Badge>
          </View>
          <View style={styles.ticketInfo}>
            <Text style={styles.infoLabel}>School: {ticket?.school_name}</Text>
            <Text style={styles.infoLabel}>Created: {ticket?.created_at}</Text>
            <Text style={styles.infoLabel}>Updated: {ticket?.last_updated}</Text>
          </View>
        </Card>

        <View style={styles.messagesSection}>
          <Text style={styles.sectionTitle}>Conversation</Text>
          {ticket?.messages.map((message) => (
            <Card key={message.id} variant="default" padding="md" style={styles.messageCard}>
              <View style={styles.messageHeader}>
                <View style={styles.messageSender}>
                  <View style={[styles.senderDot, { backgroundColor: getRoleColor(message.sender_role) }]} />
                  <Text style={styles.senderName}>{message.sender}</Text>
                  <Badge variant="outline" color={getRoleColor(message.sender_role)}>
                    {message.sender_role.charAt(0).toUpperCase() + message.sender_role.slice(1)}
                  </Badge>
                </View>
                <Text style={styles.messageTime}>{message.created_at}</Text>
              </View>
              <Text style={styles.messageContent}>{message.content}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a reply..."
          placeholderTextColor={COLORS.onSurfaceVariant}
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} disabled={!newMessage.trim()}>
          <Ionicons name="send" size={20} color={newMessage.trim() ? COLORS.primary : COLORS.onSurfaceVariant} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.onSurface,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurfaceVariant,
  },
  ticketCard: {
    marginBottom: SPACING.lg,
  },
  ticketTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.onSurface,
    marginBottom: SPACING.md,
  },
  ticketMeta: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  ticketInfo: {
    gap: 4,
  },
  infoLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
  },
  messagesSection: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
    marginBottom: SPACING.md,
  },
  messageCard: {
    marginBottom: SPACING.md,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  messageSender: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  senderDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  senderName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
  },
  messageTime: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.onSurfaceVariant,
  },
  messageContent: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurface,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceVariant,
    backgroundColor: COLORS.background,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurface,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: SPACING.sm,
    padding: SPACING.sm,
  },
});
