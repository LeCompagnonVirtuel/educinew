import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../../services/supabase';
import { COLORS, withAlpha } from '../../constants/colors';
import { Card, Badge, Button, EmptyState, SkeletonCard } from '../../components/ui';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../constants/theme';

export default function QRBadgeScreen({ navigation }: any) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [qrData, setQrData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQR();
  }, []);

  async function loadQR() {
    if (!user?.id) return;
    try {
      const { data } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (data?.qr_url) {
        setQrUrl(data.qr_url);
        setQrData(data);
      } else {
        const { data: session } = await supabase.auth.getSession();
        const token = session?.session?.access_token;
        if (token) {
          const resp = await fetch(
            `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/generate-qr`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                userId: user.id,
                userType: user.role === 'TEACHER' ? 'TEACHER' : user.role === 'STUDENT' ? 'STUDENT' : 'STAFF',
                matricule: (user as any).matricule || user.id,
                name: user.name,
              }),
            }
          );
          if (resp.ok) {
            const qrUrlHeader = resp.headers.get('X-QR-Url');
            if (qrUrlHeader) setQrUrl(qrUrlHeader);
            const { data: refreshed } = await supabase
              .from('qr_codes')
              .select('*')
              .eq('user_id', user.id)
              .eq('is_active', true)
              .single();
            if (refreshed) {
              setQrUrl(refreshed.qr_url);
              setQrData(refreshed);
            }
          }
        }
      }
    } catch (err) {
      console.error('QR load error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleShare() {
    if (!qrUrl) return;
    try {
      await Share.share({
        message: `${t('qrBadge.shareMessage')}${qrUrl}`,
        url: qrUrl,
      });
    } catch (error) { console.error('[QRBadgeScreen] Error sharing QR:', error); }
  }

  const roleLabel = user?.role === 'TEACHER' ? t('qrBadge.teacher') : user?.role === 'STUDENT' ? t('qrBadge.student') : t('qrBadge.staff');
  const roleVariant = user?.role === 'TEACHER' ? 'info' : user?.role === 'STUDENT' ? 'success' : 'warning';

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
          <Text style={styles.headerTitle}>{t('qrBadge.title')}</Text>
          <Ionicons name="share-outline" size={24} color={COLORS.primary} />
        </View>
        <SkeletonCard />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        <Text style={styles.headerTitle}>{t('qrBadge.title')}</Text>
        <Button title="" variant="ghost" size="sm" onPress={handleShare} iconRight={<Ionicons name="share-outline" size={24} color={COLORS.primary} />} />
      </View>

      <Card variant="elevated" style={styles.card}>
        <View style={styles.roleStrip}>
          <Badge label={roleLabel} variant={roleVariant as any} size="sm" />
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0)?.toUpperCase() || 'E'}</Text>
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          {(user as any)?.matricule && (
            <Badge label={`N° ${(user as any).matricule}`} variant="info" size="sm" style={styles.matriculeBadge} />
          )}
        </View>

        {qrUrl ? (
          <View style={styles.qrContainer}>
            <Image source={{ uri: qrUrl }} style={styles.qrImage} resizeMode="contain" />
            {qrData?.barcode_data && (
              <Text style={styles.barcode}>{qrData.barcode_data}</Text>
            )}
          </View>
        ) : (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={48} color={COLORS.error} />
            <Text style={styles.errorText}>{t('qrBadge.unavailable')}</Text>
            <Button title={t('qrBadge.retry')} variant="primary" size="sm" onPress={loadQR} />
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t('qrBadge.footer')}</Text>
          <Text style={styles.footerSub}>{t('qrBadge.footerSub')}</Text>
        </View>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.xl, paddingVertical: SPACING.md },
  headerTitle: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onSurface },
  card: { flex: 1, marginHorizontal: SPACING.xl, marginBottom: SPACING.xl, overflow: 'hidden', borderRadius: BORDER_RADIUS.xxl },
  roleStrip: { paddingVertical: SPACING.md - 2, alignItems: 'center', backgroundColor: withAlpha(COLORS.primary, 0.1) },
  profileSection: { alignItems: 'center', paddingTop: SPACING.xl, paddingBottom: SPACING.lg },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.md },
  avatarText: { color: COLORS.white, fontSize: 28, fontWeight: FONT_WEIGHTS.extrabold },
  name: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onSurface },
  email: { fontSize: FONT_SIZES.sm, color: COLORS.onSurfaceVariant, marginTop: 2 },
  matriculeBadge: { marginTop: SPACING.sm },
  qrContainer: { alignItems: 'center', paddingVertical: SPACING.lg },
  qrImage: { width: 220, height: 220, borderRadius: BORDER_RADIUS.lg },
  barcode: { marginTop: SPACING.md, fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurfaceVariant, letterSpacing: 2, fontFamily: 'monospace' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  errorText: { fontSize: FONT_SIZES.md, color: COLORS.error, fontWeight: FONT_WEIGHTS.semibold },
  footer: { alignItems: 'center', paddingVertical: SPACING.lg, borderTopWidth: 1, borderTopColor: COLORS.surfaceContainerLow, marginTop: 'auto' },
  footerText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary },
  footerSub: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 2 },
});
