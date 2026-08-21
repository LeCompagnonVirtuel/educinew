import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraView } from 'expo-camera';
import { useAuth } from '../context/AuthContext';
import { COLORS, withAlpha } from '../../constants/colors';
import { api } from '../../services/api';

export default function QRLoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanned || loading) return;
    setScanned(true);
    setLoading(true);
    setError('');

    try {
      const result = await api.loginWithQRCode(data);
      if (result.user && result.token) {
        await login(result.user.email, '', undefined, result);
      }
    } catch (err: any) {
      let message = err.message || 'QR Code invalide ou expiré.';
      if (message.includes('expired') || message.includes('expiré')) {
        message = 'Ce QR Code a expiré. Demandez un nouveau QR Code à votre établissement.';
      } else if (message.includes('revoked') || message.includes('révoqué')) {
        message = 'Ce QR Code a été révoqué par l\'administrateur.';
      } else if (message.includes('invalid') || message.includes('invalide')) {
        message = 'QR Code non reconnu. Assurez-vous de scanner le QR Code fourni par votre établissement.';
      }
      setError(message);
      setTimeout(() => setScanned(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionBox}>
          <Ionicons name="camera-outline" size={48} color={COLORS.onSurfaceVariant} />
          <Text style={styles.permissionTitle}>Accès caméra requis</Text>
          <Text style={styles.permissionText}>
            Pour scanner votre QR Code de connexion, veuillez autoriser l'accès à la caméra dans les réglages de votre téléphone.
          </Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Connexion par QR Code</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        />
        <View style={styles.overlay}>
          <View style={styles.overlayTop} />
          <View style={styles.overlayMiddle}>
            <View style={styles.overlaySide} />
            <Animated.View style={[styles.scanFrame, { transform: [{ scale: pulseAnim }] }]}>
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
            </Animated.View>
            <View style={styles.overlaySide} />
          </View>
          <View style={styles.overlayBottom} />
        </View>
      </View>

      <View style={styles.bottomSection}>
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Vérification en cours...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <>
            <Ionicons name="qr-code-outline" size={28} color={COLORS.primary} />
            <Text style={styles.instruction}>
              Placez le QR Code fourni par votre établissement dans le cadre
            </Text>
            <Text style={styles.hint}>
              Chaque QR Code est unique et lié à votre compte
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const FRAME_SIZE = 250;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerBack: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  overlayMiddle: {
    flexDirection: 'row',
    height: FRAME_SIZE,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  scanFrame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: COLORS.primary,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 8,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 8,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 8,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 8,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  instruction: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.onSurface,
    textAlign: 'center',
  },
  hint: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
  },
  loadingBox: {
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    fontWeight: '500',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.errorContainer,
    borderRadius: 12,
    padding: 14,
    gap: 10,
    width: '100%',
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.error,
    fontWeight: '600',
  },
  permissionBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    gap: 16,
    backgroundColor: COLORS.background,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  permissionText: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
  },
  backButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.onPrimary,
  },
});
