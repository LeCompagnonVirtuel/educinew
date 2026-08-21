import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SEMANTIC_COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../../../constants/theme';
import { Card, Badge } from '../../../components/ui';

export default function AdaptiveAttentionScreen({ navigation }: any) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setItems([]);
    } catch (err) {
      console.error('[AdaptiveAttentionScreen]', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}><Text style={styles.loadingText}>Chargement...</Text></View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Attention</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {error && <Card style={styles.errorCard}><Text style={styles.errorText}>{error}</Text></Card>}
        {items.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="bulb-outline" size={48} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>Aucun résultat</Text>
          </View>
        ) : items.map((item) => (
          <TouchableOpacity key={item.id}>
            <Card style={styles.card}>
              <Text style={styles.cardTitle}>{item.name || item.title || 'Item'}</Text>
              <Text style={styles.cardSubtitle}>{item.created_at}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  title: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold as any, color: COLORS.textPrimary },
  content: { padding: SPACING.md },
  card: { marginBottom: SPACING.sm },
  cardTitle: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold as any, color: COLORS.textPrimary },
  cardSubtitle: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginTop: SPACING.xs },
  loadingText: { fontSize: FONT_SIZES.md, color: COLORS.textSecondary },
  errorCard: { backgroundColor: SEMANTIC_COLORS.error + '10', borderColor: SEMANTIC_COLORS.error },
  errorText: { color: SEMANTIC_COLORS.error, fontSize: FONT_SIZES.sm },
  empty: { alignItems: 'center', padding: SPACING.xl * 2 },
  emptyText: { fontSize: FONT_SIZES.md, color: COLORS.textSecondary, marginTop: SPACING.md },
});