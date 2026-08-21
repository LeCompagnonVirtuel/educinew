import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { Card, Badge, Button, EmptyState, SkeletonCard } from '../../components/ui';
import { api } from '../../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const CATEGORIES = [
  { id: '', labelKey: 'marketplace.all', icon: 'grid-outline' },
  { id: 'course', labelKey: 'marketplace.course', icon: 'book-outline' },
  { id: 'quiz', labelKey: 'marketplace.quiz', icon: 'help-circle-outline' },
  { id: 'ebook', labelKey: 'marketplace.ebook', icon: 'document-text-outline' },
  { id: 'tutoring', labelKey: 'marketplace.tutoring', icon: 'people-outline' },
];

export default function MarketplaceScreen({ navigation }: any) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => { loadListings(); }, [selectedCategory]);

  async function loadListings() {
    setLoading(true);
    try {
      const data = await api.getMarketplaceListings({ category: selectedCategory });
      if (Array.isArray(data) && data.length > 0) {
        setListings(data);
      } else {
        setListings([
          { id: '1', title: 'Cours de Mathématiques - Terminale', category: 'course', price: 2000, currency: 'XOF', seller: { name: 'Prof. Koné' }, rating: 4.8, downloads: 156 },
          { id: '2', title: 'Quiz Physique-Chimie (50 questions)', category: 'quiz', price: 500, currency: 'XOF', seller: { name: 'EduCI Team' }, rating: 4.5, downloads: 89 },
          { id: '3', title: 'Manuel SVT - Classe de 3ème', category: 'ebook', price: 3500, currency: 'XOF', seller: { name: 'Prof. Diallo' }, rating: 4.9, downloads: 243 },
          { id: '4', title: 'Tutorat Anglais - 1h', category: 'tutoring', price: 5000, currency: 'XOF', seller: { name: 'Mr. Johnson' }, rating: 4.7, downloads: 34 },
          { id: '5', title: 'Exercices corrigés Français', category: 'course', price: 1500, currency: 'XOF', seller: { name: 'Mme Touré' }, rating: 4.6, downloads: 112 },
        ]);
      }
    } catch {
      setListings([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadListings();
  }, []);

  function getCategoryIcon(category: string) {
    switch (category) {
      case 'course': return 'book';
      case 'quiz': return 'help-circle';
      case 'ebook': return 'document-text';
      case 'tutoring': return 'people';
      default: return 'cube';
    }
  }

  function getCategoryColor(category: string) {
    switch (category) {
      case 'course': return COLORS.primary;
      case 'quiz': return COLORS.warning;
      case 'ebook': return '#8B5CF6';
      case 'tutoring': return COLORS.success;
      default: return COLORS.outline;
    }
  }

  function handlePurchase(item: any) {
    Alert.alert(
      t('marketplace.confirmPurchase'),
      `${t('marketplace.purchaseConfirmMessage')} "${item.title}" pour ${item.price?.toLocaleString()} F CFA ?`,
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('marketplace.buy'),
          onPress: async () => {
            setPurchasingId(item.id);
            try {
              await api.purchaseMarketplaceItem(item.id);
              Alert.alert(t('common.success'), t('marketplace.purchaseSuccess'));
              loadListings();
            } catch (error: any) {
              Alert.alert(t('common.error'), error?.message || t('marketplace.purchaseError'));
            } finally {
              setPurchasingId(null);
            }
          },
        },
      ]
    );
  }

  const filteredListings = listings.filter(l => {
    if (selectedCategory && l.category !== selectedCategory) return false;
    if (search && !l.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('marketplace.title')}</Text>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.outline} />
        <TextInput
          style={styles.searchInput}
          placeholder={t('marketplace.search')}
          placeholderTextColor={COLORS.outline}
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={loadListings}
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories} contentContainerStyle={{ paddingHorizontal: SPACING.xl, gap: SPACING.sm }}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.categoryChip, selectedCategory === cat.id && styles.categoryChipActive]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Ionicons name={cat.icon as any} size={16} color={selectedCategory === cat.id ? COLORS.white : COLORS.onSurfaceVariant} />
            <Text style={[styles.categoryLabel, selectedCategory === cat.id && styles.categoryLabelActive]}>{t(cat.labelKey)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Listings */}
      {loading ? (
        <View style={styles.skeletonContainer}>
          <SkeletonCard testID="marketplace-skeleton-1" />
          <SkeletonCard testID="marketplace-skeleton-2" />
          <SkeletonCard testID="marketplace-skeleton-3" />
        </View>
      ) : (
        <FlatList
          data={filteredListings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: SPACING.xl, gap: SPACING.md }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
          renderItem={({ item }) => (
            <Card variant="default" padding="md" style={styles.listingCard}>
              <View style={[styles.listingIcon, { backgroundColor: withAlpha(getCategoryColor(item.category), 0.15) }]}>
                <Ionicons name={getCategoryIcon(item.category) as any} size={24} color={getCategoryColor(item.category)} />
              </View>
              <View style={styles.listingInfo}>
                <Text style={styles.listingTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.listingSeller}>{item.seller?.name || t('marketplace.author')}</Text>
                <View style={styles.listingMeta}>
                  <Badge
                    label={`${item.rating}`}
                    variant="warning"
                    size="sm"
                    testID={`listing-rating-${item.id}`}
                  />
                  <Text style={styles.downloadText}>{item.downloads} {t('marketplace.purchases')}</Text>
                </View>
              </View>
              <View style={styles.listingRight}>
                <Text style={styles.listingPrice}>{item.price?.toLocaleString()} F</Text>
                <Button
                  title=""
                  variant="primary"
                  size="sm"
                  onPress={() => handlePurchase(item)}
                  loading={purchasingId === item.id}
                  disabled={purchasingId === item.id}
                  iconLeft={<Ionicons name="add" size={18} color={COLORS.white} />}
                  testID={`listing-buy-${item.id}`}
                />
              </View>
            </Card>
          )}
          ListEmptyComponent={
            <EmptyState
              icon={<Ionicons name="storefront-outline" size={40} color={COLORS.outline} />}
              title={t('marketplace.noListings')}
              subtitle={t('marketplace.noListingsSubtitle')}
              testID="marketplace-empty"
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.xl, paddingVertical: SPACING.lg },
  headerTitle: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onSurface },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: SPACING.xl, backgroundColor: COLORS.surfaceContainerLow, borderRadius: BORDER_RADIUS.md, paddingHorizontal: SPACING.lg, gap: SPACING.sm, marginBottom: SPACING.md },
  searchInput: { flex: 1, height: 44, fontSize: FONT_SIZES.sm, color: COLORS.onSurface },
  categories: { marginBottom: SPACING.sm, maxHeight: 44 },
  categoryChip: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.xxl, backgroundColor: COLORS.surfaceContainerLow },
  categoryChipActive: { backgroundColor: COLORS.primary },
  categoryLabel: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurfaceVariant },
  categoryLabelActive: { color: COLORS.white },
  listingCard: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  listingIcon: { width: 52, height: 52, borderRadius: BORDER_RADIUS.lg, justifyContent: 'center', alignItems: 'center' },
  listingInfo: { flex: 1 },
  listingTitle: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface, lineHeight: 18 },
  listingSeller: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 3 },
  listingMeta: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginTop: SPACING.xs },
  downloadText: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant },
  listingRight: { alignItems: 'flex-end', gap: SPACING.sm },
  listingPrice: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.primary },
  skeletonContainer: { padding: SPACING.xl, gap: SPACING.md },
});
