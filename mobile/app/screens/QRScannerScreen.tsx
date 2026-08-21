import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Vibration, Animated, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { api } from '../../services/api';
import { COLORS } from '../../constants/colors';

export default function QRScannerScreen({ navigation, route }: any) {
  const { user } = useAuth();
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);
  const [scanType, setScanType] = useState<'ARRIVAL' | 'DEPARTURE' | 'CANTEEN' | 'LIBRARY' | 'EXAM' | 'EVENT'>(route?.params?.type || 'ARRIVAL');
  const [scanCount, setScanCount] = useState(0);
  const [scanHistory, setScanHistory] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const pulseAnim = useState(new Animated.Value(1))[0];
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    return () => timeoutRefs.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  if (!permission) {
    return <View style={styles.container}><Text>Chargement...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Ionicons name="camera-outline" size={64} color={COLORS.primary} />
          <Text style={styles.permissionTitle}>Caméra requise</Text>
          <Text style={styles.permissionText}>
            Autorisez l'accès à la caméra pour scanner les QR codes des élèves.
          </Text>
          <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
            <Text style={styles.permissionBtnText}>Autoriser la caméra</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backLink}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanned || isProcessing) return;
    setScanned(true);
    setIsProcessing(true);
    setErrorMessage(null);
    Vibration.vibrate(100);

    try {
      // Send raw QR data to server for validation
      const result = await api.scanStudentQR(data, scanType);

      setLastResult(result);
      setScanCount(prev => prev + 1);
      setScanHistory(prev => [result, ...prev].slice(0, 20));

      if (result?.success) {
        Vibration.vibrate([0, 50, 100, 50]);
        timeoutRefs.current.push(setTimeout(() => setScanned(false), 2000));
      } else {
        Vibration.vibrate([0, 100, 100, 100, 100, 100]);
        timeoutRefs.current.push(setTimeout(() => setScanned(false), 2000));
      }
    } catch (err: any) {
      Vibration.vibrate([0, 200, 100, 200, 100, 200]);
      setErrorMessage(err?.message || 'Impossible de traiter le scan');
      timeoutRefs.current.push(setTimeout(() => {
        setScanned(false);
        setErrorMessage(null);
      }, 2000));
    } finally {
      setIsProcessing(false);
    }
  };

  const getScanTypeLabel = (type: string) => {
    switch (type) {
      case 'ARRIVAL': return 'Arrivée';
      case 'DEPARTURE': return 'Départ';
      case 'CANTEEN': return 'Cantine';
      case 'LIBRARY': return 'Bibliothèque';
      case 'EXAM': return 'Examen';
      case 'EVENT': return 'Événement';
      default: return type;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBack}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Scanner QR</Text>
          <Text style={styles.headerSubtitle}>
            {getScanTypeLabel(scanType)} • {scanCount} scan{scanCount > 1 ? 's' : ''}
          </Text>
        </View>
        <View style={styles.counterBadge}>
          <Text style={styles.counterText}>{scanCount}</Text>
        </View>
      </View>

      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <View style={styles.overlay}>
            <Animated.View style={[styles.scanFrame, { transform: [{ scale: pulseAnim }] }]}>
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
            </Animated.View>
            <Text style={styles.scanHint}>
              {isProcessing ? 'Traitement en cours...' : 'Placez le QR code dans le cadre'}
            </Text>
          </View>
        </CameraView>
      </View>

      {/* Success result card */}
      {lastResult?.success && (
        <View style={styles.resultCard}>
          <View style={styles.resultIconSuccess}>
            <Ionicons name="checkmark-circle" size={32} color="#10B981" />
          </View>
          <View style={styles.resultInfo}>
            <Text style={styles.resultName}>{lastResult.person?.name || 'Utilisateur'}</Text>
            <Text style={styles.resultDetail}>
              {lastResult.person?.role || 'Élève'} • {lastResult.person?.class || ''}
            </Text>
            <Text style={styles.resultTime}>
              {lastResult.scan?.time || new Date().toLocaleTimeString('fr-FR')} • {getScanTypeLabel(lastResult.scan?.type || scanType)}
            </Text>
          </View>
        </View>
      )}

      {/* Error card */}
      {errorMessage && (
        <View style={styles.errorCard}>
          <Ionicons name="alert-circle" size={24} color="#EF4444" />
          <View style={styles.resultInfo}>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <Text style={styles.errorHint}>Vérifiez le QR code et réessayez</Text>
          </View>
        </View>
      )}

      {/* Duplicate warning */}
      {lastResult && !lastResult.success && lastResult.message?.includes('Doublon') && (
        <View style={styles.duplicateCard}>
          <Ionicons name="time" size={24} color="#F59E0B" />
          <View style={styles.resultInfo}>
            <Text style={styles.duplicateText}>Doublon détecté</Text>
            <Text style={styles.duplicateHint}>Ce pointage a déjà été enregistré récemment</Text>
          </View>
        </View>
      )}

      <View style={styles.typeToggle}>
        {([
          { key: 'ARRIVAL', icon: 'enter-outline', label: 'Arrivée' },
          { key: 'DEPARTURE', icon: 'exit-outline', label: 'Départ' },
          { key: 'CANTEEN', icon: 'restaurant-outline', label: 'Cantine' },
          { key: 'LIBRARY', icon: 'library-outline', label: 'Biblio' },
          { key: 'EXAM', icon: 'school-outline', label: 'Examen' },
          { key: 'EVENT', icon: 'calendar-outline', label: 'Événement' },
        ] as const).map(({ key, icon, label }) => (
          <TouchableOpacity
            key={key}
            style={[styles.typeBtn, scanType === key && styles.typeBtnActive]}
            onPress={() => setScanType(key)}
          >
            <Ionicons name={icon} size={16} color={scanType === key ? COLORS.onPrimary : COLORS.primary} />
            <Text style={[styles.typeText, scanType === key && styles.typeTextActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent scans */}
      {scanHistory.length > 0 && (
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Scans récents</Text>
          {scanHistory.slice(0, 5).map((item, index) => (
            <View key={index} style={[styles.historyItem, !item.success && styles.historyItemError]}>
              <Ionicons
                name={item.success ? 'checkmark-circle' : 'close-circle'}
                size={16}
                color={item.success ? '#10B981' : '#EF4444'}
              />
              <Text style={styles.historyName} numberOfLines={1}>
                {item.person?.name || 'Scan'}
              </Text>
              <Text style={styles.historyTime}>{item.scan?.time || '—'}</Text>
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, gap: 12 },
  headerBack: { padding: 4 },
  headerCenter: { flex: 1 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.onSurface },
  headerSubtitle: { fontSize: 12, color: COLORS.onSurfaceVariant },
  counterBadge: { backgroundColor: COLORS.primary, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  counterText: { color: COLORS.onPrimary, fontWeight: '800', fontSize: 14 },
  cameraContainer: { flex: 1, marginHorizontal: 20, borderRadius: 24, overflow: 'hidden' },
  camera: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  scanFrame: { width: 250, height: 250, position: 'relative' },
  corner: { position: 'absolute', width: 30, height: 30, borderColor: COLORS.primary, borderWidth: 4 },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 12 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 12 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 12 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 12 },
  scanHint: { marginTop: 24, color: '#fff', fontSize: 13, fontWeight: '600', textAlign: 'center' },
  resultCard: { flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 20, marginTop: 12, backgroundColor: '#ECFDF5', padding: 14, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#10B981' },
  resultIconSuccess: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#D1FAE5', justifyContent: 'center', alignItems: 'center' },
  resultInfo: { flex: 1 },
  resultName: { fontSize: 15, fontWeight: '700', color: COLORS.onSurface },
  resultDetail: { fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 2 },
  resultTime: { fontSize: 11, color: '#6B7280', marginTop: 2, fontWeight: '600' },
  errorCard: { flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 20, marginTop: 12, backgroundColor: '#FEF2F2', padding: 14, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#EF4444' },
  errorText: { fontSize: 14, fontWeight: '700', color: '#DC2626' },
  errorHint: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  duplicateCard: { flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 20, marginTop: 12, backgroundColor: '#FFFBEB', padding: 14, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#F59E0B' },
  duplicateText: { fontSize: 14, fontWeight: '700', color: '#D97706' },
  duplicateHint: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  typeToggle: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginHorizontal: 20, marginVertical: 12 },
  typeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, borderWidth: 2, borderColor: COLORS.primary, backgroundColor: COLORS.surfaceContainerLowest },
  typeBtnActive: { backgroundColor: COLORS.primary },
  typeText: { fontSize: 14, fontWeight: '700', color: COLORS.primary },
  typeTextActive: { color: COLORS.onPrimary },
  permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  permissionTitle: { fontSize: 22, fontWeight: '800', color: COLORS.onSurface, marginTop: 16 },
  permissionText: { fontSize: 14, color: COLORS.onSurfaceVariant, textAlign: 'center', marginTop: 8, lineHeight: 20 },
  permissionBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 14, marginTop: 24 },
  permissionBtnText: { color: COLORS.onPrimary, fontWeight: '700', fontSize: 15 },
  backLink: { color: COLORS.primary, fontWeight: '600', marginTop: 16 },
  historySection: { paddingHorizontal: 20, paddingBottom: 12 },
  historyTitle: { fontSize: 12, fontWeight: '700', color: '#6B7280', marginBottom: 8, textTransform: 'uppercase' },
  historyItem: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  historyItemError: { opacity: 0.6 },
  historyName: { flex: 1, fontSize: 13, fontWeight: '600', color: COLORS.onSurface },
  historyTime: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },
});
