import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge } from '../../../components/ui';

interface Ticket {
  id: string;
  title: string;
  school_name: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  created_at: string;
  last_updated: string;
  message_count: number;
}

export default function TicketListScreen({ navigation }: any) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTickets = useCallback(async () => {
    try {
      setTickets([
        { id: 'T-001', title: 'Login issue on mobile app', school_name: 'Lincoln Academy', priority: 'high', status: 'open', created_at: '2026-07-24 09:00', last_updated: '2026-07-24 10:30', message_count: 3 },
        { id: 'T-002', title: 'Cannot access gradebook', school_name: 'Washington High', priority: 'medium', status: 'in_progress', created_at: '2026-07-23 14:00', last_updated: '2026-07-24 08:15', message_count: 5 },
        { id: 'T-003', title: 'Feature request: Dark mode', school_name: 'Jefferson Middle', priority: 'low', status: 'open', created_at: '2026-07-22 11:00', last_updated: '2026-07-22 11:00', message_count: 1 },
        { id: 'T-004', title: 'System crash during report generation', school_name: 'Roosevelt Elementary', priority: 'critical', status: 'open', created_at: '2026-07-24 08:00', last_updated: '2026-07-24 09:00', message_count: 8 },
        { id: 'T-005', title: 'Password reset not working', school_name: 'Adams Preparatory', priority: 'medium', status: 'resolved', created_at: '2026-07-20 16:00', last_updated: '2026-07-21 10:00', message_count: 4 },
      ]);
    } catch (error) {
      console.error('[TicketListScreen] Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTickets(); }, [loadTickets]);

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

  const renderTicket = ({ item }: { item: Ticket }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TicketDetail', { ticketId: item.id })}>
      <Card variant="elevated" padding="md" style={styles.ticketCard}>
        <View style={styles.ticketHeader}>
          <View style={styles.ticketInfo}>
            <Text style={styles.ticketId}>{item.id}</Text>
            <Text style={styles.ticketTitle}>{item.title}</Text>
          </View>
          <Badge variant="dot" color={getStatusColor(item.status)}>
            {item.status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
          </Badge>
        </View>

        <View style={styles.detailsRow}>
          <Badge variant="outline" color={getPriorityColor(item.priority)}>
            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
          </Badge>
          <Text style={styles.schoolText}>{item.school_name}</Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="chatbubbles-outline" size={14} color={COLORS.onSurfaceVariant} />
            <Text style={styles.metaText}>{item.message_count} messages</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color={COLORS.onSurfaceVariant} />
            <Text style={styles.metaText}>{item.last_updated}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.title}>Support Tickets</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading tickets...</Text>
        </View>
      ) : (
        <FlatList
          data={tickets}
          renderItem={renderTicket}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="chatbubbles-outline" size={48} color={COLORS.onSurfaceVariant} />
              <Text style={styles.emptyText}>No tickets found</Text>
            </View>
          }
        />
      )}
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
  listContent: {
    padding: SPACING.md,
  },
  ticketCard: {
    marginBottom: SPACING.md,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  ticketInfo: {
    flex: 1,
  },
  ticketId: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    marginBottom: 4,
  },
  ticketTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  schoolText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceVariant,
    paddingTop: SPACING.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurfaceVariant,
    marginTop: SPACING.md,
  },
});
