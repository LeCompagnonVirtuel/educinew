import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../context/AuthContext';

export default function AdminRedirectScreen() {
  const { logout } = useAuth();

  const openWeb = () => {
    Linking.openURL('https://educi.live/dashboard').catch(() => {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#080E1E" />
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="laptop-outline" size={64} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>Espace Administration</Text>
        <Text style={styles.subtitle}>
          L'administration de votre établissement est disponible exclusivement sur la plateforme Web EduCI.
        </Text>

        <View style={styles.features}>
          <FeatureRow icon="people-outline" text="Gestion des élèves, enseignants et classes" />
          <FeatureRow icon="card-outline" text="Paiements et comptabilité" />
          <FeatureRow icon="settings-outline" text="Configuration de l'établissement" />
          <FeatureRow icon="document-text-outline" text="Documents, bulletins et rapports" />
          <FeatureRow icon="qr-code-outline" text="Génération de QR Codes" />
          <FeatureRow icon="calendar-outline" text="Emplois du temps" />
        </View>

        <TouchableOpacity style={styles.webButton} onPress={openWeb} activeOpacity={0.8}>
          <Ionicons name="globe-outline" size={20} color="#FFFFFF" />
          <Text style={styles.webButtonText}>Accéder au portail Web</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={logout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={18} color={COLORS.onSurfaceVariant} />
          <Text style={styles.logoutButtonText}>Se déconnecter</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>
          Connectez-vous depuis un navigateur sur educi.live pour administrer votre établissement.
        </Text>
      </View>
    </SafeAreaView>
  );
}

function FeatureRow({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.featureRow}>
      <Ionicons name={icon as any} size={18} color={COLORS.primary} />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080E1E',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.onSurface,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  features: {
    width: '100%',
    marginBottom: 32,
    gap: 14,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    flex: 1,
  },
  webButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    height: 52,
    width: '100%',
    marginBottom: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  webButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    width: '100%',
    marginBottom: 16,
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
  },
  hint: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    opacity: 0.5,
    lineHeight: 18,
  },
});
