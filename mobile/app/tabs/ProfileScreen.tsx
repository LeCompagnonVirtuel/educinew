import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, TextInput, ActivityIndicator, Image, RefreshControl, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { COLORS } from '../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../constants/theme';
import { BottomTabBar } from '../../components/BottomTabBar';
import { supabase } from '../../services/supabase';
import { Card, Badge, Button } from '../../components/ui';
import { SkeletonCard, SkeletonList } from '../../components/ui/SkeletonLoader';

export default function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [saving, setSaving] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getRoleLabel = (role?: string): string => {
    switch (role) {
      case 'ADMIN': return t('common.administrator');
      case 'TEACHER': return t('common.teacher');
      case 'PARENT': return t('common.parent');
      case 'STUDENT': return t('common.student');
      case 'COMPTABLE': return t('common.accountant');
      case 'SECRETAIRE': return t('common.secretary');
      case 'CENSEUR': return t('common.censeur');
      case 'SURVEILLANT': return t('common.supervisor');
      default: return role || t('common.role');
    }
  };

  const getRoleBadgeVariant = (role?: string): 'info' | 'success' | 'warning' | 'error' | 'neutral' => {
    switch (role) {
      case 'ADMIN': return 'error';
      case 'TEACHER': return 'info';
      case 'STUDENT': return 'success';
      case 'PARENT': return 'warning';
      default: return 'neutral';
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [user?.id]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    setLoading(false);
    setRefreshing(false);
  }, []);

  const handleLogout = () => {
    Alert.alert(t('settings_screen.disconnect'), t('settings_screen.disconnectConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('settings_screen.disconnect'), style: 'destructive', onPress: logout },
    ]);
  };

  async function handleSave() {
    if (!editName.trim()) {
      Alert.alert(t('common.error'), t('common.nameEmptyError'));
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { name: editName.trim(), phone: editPhone.trim() || null },
      });
      if (error) throw error;
      Alert.alert(t('success.profileUpdated'));
      setEditing(false);
    } catch (err: any) {
      Alert.alert(t('common.error'), err?.message || t('common.profileUpdateError'));
    } finally {
      setSaving(false);
    }
  }

  function handleCancelEdit() {
    setEditName(user?.name || '');
    setEditPhone(user?.phone || '');
    setEditing(false);
  }

  async function handlePickPhoto() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('common.permissionRequired'), t('common.galleryPermissionError'));
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (result.canceled || !result.assets?.[0]) return;

    setUploadingPhoto(true);
    try {
      const asset = result.assets[0];
      const ext = asset.uri.split('.').pop() || 'jpg';
      const path = `${user?.id}/avatar.${ext}`;
      const response = await fetch(asset.uri);
      const blob = await response.blob();
      const arrayBuffer = await new Response(blob).arrayBuffer();

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, arrayBuffer, { upsert: true, contentType: `image/${ext}` });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(path);
      const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;

      await supabase.auth.updateUser({ data: { photo_url: publicUrl } });
      setPhotoUrl(publicUrl);
      Alert.alert(t('common.success'), t('common.photoUpdated'));
    } catch (err: any) {
      Alert.alert(t('common.error'), err?.message || t('common.photoUploadError'));
    } finally {
      setUploadingPhoto(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
        >
          <View style={styles.content}>
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.surfaceContainerHigh }} />
            <View style={{ width: 160, height: 22, backgroundColor: COLORS.surfaceContainerHigh, borderRadius: 4, marginTop: SPACING.md }} />
            <View style={{ width: 100, height: 14, backgroundColor: COLORS.surfaceContainerHigh, borderRadius: 4, marginTop: SPACING.sm }} />
            <SkeletonList count={3} />
            <View style={{ height: SPACING.md }} />
            <SkeletonCard />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
      >
        <View style={styles.content}>
          <TouchableOpacity style={styles.avatarContainer} onPress={handlePickPhoto} disabled={uploadingPhoto}>
            {photoUrl ? (
              <Image source={{ uri: photoUrl }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</Text>
              </View>
            )}
            <View style={styles.cameraIcon}>
              {uploadingPhoto ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Ionicons name="camera" size={14} color="white" />
              )}
            </View>
          </TouchableOpacity>

          <Card variant="elevated" padding="lg" style={styles.profileCard}>
            {editing ? (
              <View style={styles.editForm}>
                <Text style={styles.editLabel}>{t('settings_screen.editProfile')}</Text>
                <TextInput
                  style={styles.editInput}
                  value={editName}
                  onChangeText={setEditName}
                  placeholder={t('common.fullName')}
                  placeholderTextColor={COLORS.outline}
                  autoCapitalize="words"
                />
                <TextInput
                  style={styles.editInput}
                  value={editPhone}
                  onChangeText={setEditPhone}
                  placeholder={t('common.phone')}
                  placeholderTextColor={COLORS.outline}
                  keyboardType="phone-pad"
                />
                <View style={styles.editActions}>
                  <Button
                    title={t('common.cancel')}
                    variant="outline"
                    size="sm"
                    onPress={handleCancelEdit}
                    disabled={saving}
                  />
                  <Button
                    title={t('common.save')}
                    variant="primary"
                    size="sm"
                    onPress={handleSave}
                    loading={saving}
                  />
                </View>
              </View>
            ) : (
              <>
                <Text style={styles.name}>{user?.name || t('common.student')}</Text>
                {user?.role && (
                  <Badge
                    label={getRoleLabel(user.role)}
                    variant={getRoleBadgeVariant(user.role)}
                    size="sm"
                    style={styles.roleBadge}
                  />
                )}
                {user?.school?.name && (
                  <Text style={styles.school}>{user.school.name}</Text>
                )}
              </>
            )}

            {!editing && (
              <Button
                title={t('common.edit')}
                variant="outline"
                size="sm"
                iconLeft={<Ionicons name="pencil-outline" size={14} color={COLORS.primary} />}
                onPress={() => setEditing(true)}
                style={styles.editButton}
              />
            )}
          </Card>

          {[
            { icon: 'mail-outline', label: t('auth.email'), value: user?.email || '-' },
            ...(user?.phone ? [{ icon: 'call-outline', label: t('common.phone'), value: user.phone }] : []),
          ].map((item, i) => (
            <Card key={i} variant="default" padding="md" style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Ionicons name={item.icon as any} size={20} color={COLORS.onSurfaceVariant} />
                <View style={{ marginLeft: SPACING.md }}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              </View>
            </Card>
          ))}

          <Card
            variant="default"
            padding="md"
            onPress={() => navigation.navigate('Settings')}
            style={styles.settingsCard}
          >
            <View style={styles.settingsRow}>
              <Ionicons name="settings-outline" size={20} color={COLORS.primary} />
              <Text style={styles.settingsText}>{t('profile.settings')}</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.outlineVariant} style={{ marginLeft: 'auto' }} />
            </View>
          </Card>

          <Card
            variant="default"
            padding="md"
            onPress={() => navigation.navigate('QRBadge')}
            style={styles.settingsCard}
          >
            <View style={styles.settingsRow}>
              <Ionicons name="qr-code-outline" size={20} color="#8B5CF6" />
              <Text style={styles.settingsText}>{t('qrBadge.title') || 'Mon Badge QR'}</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.outlineVariant} style={{ marginLeft: 'auto' }} />
            </View>
          </Card>

          <Card variant="outlined" padding="lg" style={styles.dangerCard}>
            <Button
              title={t('settings_screen.disconnect')}
              variant="danger"
              fullWidth
              iconLeft={<Ionicons name="log-out-outline" size={20} color={COLORS.white} />}
              onPress={handleLogout}
            />
          </Card>

          <Text style={styles.version}>EduCI v1.0.0</Text>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>

      <BottomTabBar
        activeTab="profile"
        onTabPress={(tab) => {
          const r: Record<string, string> = {
            home: 'Home', learning: 'Learning', payments: 'Payments',
            messages: 'Messages', profile: 'Profile',
          };
          navigation.navigate(r[tab] || 'Home');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, paddingTop: SPACING.xxl, alignItems: 'center' },
  avatarContainer: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryFixed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  avatarText: { fontSize: FONT_SIZES.xxxl, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.primary },
  profileCard: {
    width: '100%',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  name: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  roleBadge: {
    marginTop: SPACING.sm,
  },
  school: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semibold,
    marginTop: SPACING.sm,
  },
  editButton: {
    marginTop: SPACING.md,
  },
  editForm: { width: '100%' },
  editLabel: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurfaceVariant, marginBottom: SPACING.md, textAlign: 'center' },
  editInput: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurface,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    marginBottom: SPACING.sm,
    width: '100%',
  },
  editActions: { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.sm },
  infoCard: {
    width: '100%',
    marginBottom: SPACING.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant },
  infoValue: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurface },
  settingsCard: {
    width: '100%',
    marginBottom: SPACING.md,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsText: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.primary, marginLeft: SPACING.md },
  dangerCard: {
    width: '100%',
    marginTop: SPACING.sm,
  },
  version: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: SPACING.xl, opacity: 0.6 },
});
