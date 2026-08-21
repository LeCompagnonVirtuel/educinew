import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Vibration,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { api } from '../../services/api';
import { COLORS, withAlpha } from '../../constants/colors';

const SCAN_FRAME_SIZE = 260;
const MAX_HISTORY = 10;

type ScanMode = 'STUDENT' | 'TEACHER' | 'SURVEILLANCE';
type ScanType = 'ARRIVAL' | 'DEPARTURE' | 'CANTEEN' | 'LIBRARY' | 'EXAM' | 'EVENT';

interface ScanHistoryItem {
  id: string;
  name: string;
  time: string;
  success: boolean;
  type: string;
  role?: string;
}

export default function PremiumQRScannerScreen({ navigation, route }: any) {
  const { user } = useAuth();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [manualMode, setManualMode] = useState(false);

  const [scanMode, setScanMode] = useState<ScanMode>(route?.params?.mode || 'STUDENT');
  const [scanType, setScanType] = useState<ScanType>(route?.params?.type || 'ARRIVAL');
  const [scanCount, setScanCount] = useState(0);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);

  const [resultVisible, setResultVisible] = useState(false);
  const [resultSuccess, setResultSuccess] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const resultSlideAnim = useRef(new Animated.Value(100)).current;
  const resultOpacityAnim = useRef(new Animated.Value(0)).current;
  const framePulse = useRef(new Animated.Value(1)).current;
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    return () => timeoutRefs.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(framePulse, { toValue: 1.03, duration: 1200, useNativeDriver: true }),
        Animated.timing(framePulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  useEffect(() => {
    if (!scanned && !isProcessing) {
      startScanLine();
    }
  }, [scanned, isProcessing]);

  const startScanLine = useCallback(() => {
    scanLineAnim.setValue(0);
    Animated.loop(
      Animated.timing(scanLineAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();
  }, [scanLineAnim]);

  const showResult = useCallback((success: boolean, data: any) => {
    setResultSuccess(success);
    setResultData(data);
    setResultVisible(true);
    resultSlideAnim.setValue(100);
    resultOpacityAnim.setValue(0);

    Animated.parallel([
      Animated.spring(resultSlideAnim, {
        toValue: 0,
        tension: 60,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(resultOpacityAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    timeoutRefs.current.push(
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(resultSlideAnim, {
            toValue: 100,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(resultOpacityAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => setResultVisible(false));
      }, 3000),
    );
  }, [resultSlideAnim, resultOpacityAnim]);

  const processScan = useCallback(
    async (qrCode: string) => {
      if (isProcessing) return;
      setIsProcessing(true);
      setScanned(true);
      Vibration.vibrate(80);

      try {
        let result: any;

        if (scanMode === 'STUDENT') {
          result = await api.scanStudentQR(qrCode, scanType);
        } else if (scanMode === 'TEACHER') {
          result = await api.teacherCheckinQR(user?.id || '', qrCode);
        } else {
          result = await api.surveillanceScanQR(qrCode, scanType);
        }

        const success = result?.success ?? true;
        Vibration.vibrate(success ? [0, 50, 100, 50] : [0, 100, 100, 100, 100, 100]);

        setScanCount((prev) => prev + 1);

        const historyItem: ScanHistoryItem = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name: result?.person?.name || result?.student?.name || 'Scan',
          time: result?.scan?.time || new Date().toLocaleTimeString('fr-FR'),
          success,
          type: result?.scan?.type || scanType,
          role: result?.person?.role,
        };
        setScanHistory((prev) => [historyItem, ...prev].slice(0, MAX_HISTORY));

        showResult(success, result);
      } catch (err: any) {
        Vibration.vibrate([0, 200, 100, 200, 100, 200]);
        showResult(false, { error: err?.message || 'Impossible de traiter le scan' });
      } finally {
        setIsProcessing(false);
        timeoutRefs.current.push(setTimeout(() => setScanned(false), 2500));
      }
    },
    [isProcessing, scanMode, scanType, user?.id, showResult],
  );

  const handleBarCodeScanned = useCallback(
    ({ data }: { data: string }) => {
      if (scanned || isProcessing) return;
      processScan(data);
    },
    [scanned, isProcessing, processScan],
  );

  const handleManualSubmit = useCallback(() => {
    const trimmed = manualCode.trim();
    if (!trimmed) {
      Alert.alert('Champ vide', 'Entrez un code QR valide');
      return;
    }
    setManualMode(false);
    processScan(trimmed);
    setManualCode('');
  }, [manualCode, processScan]);

  const getScanTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      ARRIVAL: 'Arrivée',
      DEPARTURE: 'Départ',
      CANTEEN: 'Cantine',
      LIBRARY: 'Bibliothèque',
      EXAM: 'Examen',
      EVENT: 'Événement',
    };
    return labels[type] || type;
  };

  const getModeLabel = (mode: string) => {
    const labels: Record<string, string> = {
      STUDENT: 'Élève',
      TEACHER: 'Enseignant',
      SURVEILLANCE: 'Surveillance',
    };
    return labels[mode] || mode;
  };

  if (!permission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.centered}>
        <View style={styles.permissionContainer}>
          <View style={styles.permissionIconWrap}>
            <Ionicons name="camera-outline" size={56} color={COLORS.primary} />
          </View>
          <Text style={styles.permissionTitle}>Caméra requise</Text>
          <Text style={styles.permissionText}>
            Autorisez l'accès à la caméra pour scanner les QR codes.
          </Text>
          <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
            <Ionicons name="camera" size={18} color={COLORS.onPrimary} />
            <Text style={styles.permissionBtnText}>Autoriser la caméra</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
            <Ionicons name="arrow-back" size={16} color={COLORS.primary} />
            <Text style={styles.backLinkText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.root}>
      {/* Camera full screen */}
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={scanned || manualMode ? undefined : handleBarCodeScanned}
      >
        {/* Dark overlay with cutout */}
        <View style={[styles.overlayTop, { height: SCREEN_HEIGHT * 0.18 }]} />
        <View style={styles.overlayMiddle}>
          <View style={styles.overlayLeft} />

          <View style={styles.scanFrameContainer}>
            <Animated.View style={[styles.scanFrame, { transform: [{ scale: framePulse }] }]}>
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />

              {/* Scanning line */}
              {!isProcessing && (
                <Animated.View
                  style={[
                    styles.scanLine,
                    {
                      transform: [
                        {
                          translateY: scanLineAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, SCAN_FRAME_SIZE - 2],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              )}
            </Animated.View>

            <Text style={styles.scanHint}>
              {isProcessing
                ? 'Traitement en cours...'
                : manualMode
                  ? 'Saisie manuelle active'
                  : 'Placez le QR code dans le cadre'}
            </Text>
          </View>

          <View style={styles.overlayRight} />
        </View>
        <View style={styles.overlayBottom} />

        {/* Mode & type pills */}
        <SafeAreaView style={styles.topBar} edges={['top']}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <View style={styles.topCenter}>
            <Text style={styles.topTitle}>Scanner QR</Text>
            <Text style={styles.topSubtitle}>
              {getModeLabel(scanMode)} · {getScanTypeLabel(scanType)} · {scanCount} scan{scanCount > 1 ? 's' : ''}
            </Text>
          </View>

          <View style={styles.countBadge}>
            <Text style={styles.countText}>{scanCount}</Text>
          </View>
        </SafeAreaView>
      </CameraView>

      {/* Bottom controls */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.bottomControls}
      >
        {/* Manual input area */}
        <View style={styles.manualSection}>
          {manualMode ? (
            <View style={styles.manualInputGroup}>
              <TouchableOpacity onPress={() => setManualMode(false)} style={styles.manualCancelBtn}>
                <Ionicons name="close" size={18} color={COLORS.onSurfaceVariant} />
              </TouchableOpacity>
              <TextInput
                style={styles.manualInput}
                placeholder="Entrez le code QR..."
                placeholderTextColor="#9CA3AF"
                value={manualCode}
                onChangeText={setManualCode}
                autoFocus
                returnKeyType="send"
                onSubmitEditing={handleManualSubmit}
              />
              <TouchableOpacity onPress={handleManualSubmit} style={styles.manualSubmitBtn}>
                <Ionicons name="checkmark" size={20} color={COLORS.onPrimary} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.manualToggleBtn}
              onPress={() => setManualMode(true)}
            >
              <Ionicons name="keypad-outline" size={18} color={COLORS.primary} />
              <Text style={styles.manualToggleText}>Saisie manuelle</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Type selector */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            { key: 'ARRIVAL', icon: 'enter-outline' as const, label: 'Arrivée' },
            { key: 'DEPARTURE', icon: 'exit-outline' as const, label: 'Départ' },
            { key: 'CANTEEN', icon: 'restaurant-outline' as const, label: 'Cantine' },
            { key: 'LIBRARY', icon: 'library-outline' as const, label: 'Biblio' },
            { key: 'EXAM', icon: 'school-outline' as const, label: 'Examen' },
            { key: 'EVENT', icon: 'calendar-outline' as const, label: 'Événement' },
          ]}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.typeListContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.typePill, scanType === item.key && styles.typePillActive]}
              onPress={() => setScanType(item.key as ScanType)}
            >
              <Ionicons
                name={item.icon}
                size={14}
                color={scanType === item.key ? COLORS.onPrimary : COLORS.primary}
              />
              <Text
                style={[styles.typePillText, scanType === item.key && styles.typePillTextActive]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Recent scans */}
        {scanHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Scans récents</Text>
            {scanHistory.slice(0, 5).map((item) => (
              <View key={item.id} style={[styles.historyRow, !item.success && styles.historyRowError]}>
                <View style={[styles.historyDot, item.success ? styles.dotSuccess : styles.dotError]}>
                  <Ionicons
                    name={item.success ? 'checkmark' : 'close'}
                    size={10}
                    color="#fff"
                  />
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.historyMeta}>
                    {getScanTypeLabel(item.type)} · {item.role || ''}
                  </Text>
                </View>
                <Text style={styles.historyTime}>{item.time}</Text>
              </View>
            ))}
          </View>
        )}
      </KeyboardAvoidingView>

      {/* Result overlay */}
      {resultVisible && (
        <Animated.View
          style={[
            styles.resultOverlay,
            {
              transform: [{ translateY: resultSlideAnim }],
              opacity: resultOpacityAnim,
            },
          ]}
        >
          <View style={[styles.resultCard, resultSuccess ? styles.resultCardSuccess : styles.resultCardError]}>
            <View style={[styles.resultIconWrap, resultSuccess ? styles.resultIconSuccess : styles.resultIconError]}>
              <Ionicons
                name={resultSuccess ? 'checkmark-circle' : 'alert-circle'}
                size={28}
                color={resultSuccess ? '#10B981' : '#EF4444'}
              />
            </View>
            <View style={styles.resultContent}>
              {resultSuccess ? (
                <>
                  <Text style={styles.resultName}>
                    {resultData?.person?.name || resultData?.student?.name || 'Utilisateur'}
                  </Text>
                  <Text style={styles.resultDetail}>
                    {resultData?.person?.role || resultData?.student?.class || ''}
                  </Text>
                  <Text style={styles.resultTime}>
                    {resultData?.scan?.time || new Date().toLocaleTimeString('fr-FR')}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.resultErrorTitle}>Erreur</Text>
                  <Text style={styles.resultErrorMessage} numberOfLines={2}>
                    {resultData?.error || resultData?.message || 'Scan échoué'}
                  </Text>
                </>
              )}
            </View>
            <View style={[styles.resultGlow, resultSuccess ? styles.glowSuccess : styles.glowError]} />
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 40,
  },
  loadingText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
  },

  // Camera
  camera: {
    flex: 1,
  },

  // Overlay
  overlayTop: {
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  overlayMiddle: {
    flexDirection: 'row',
    height: SCAN_FRAME_SIZE,
  },
  overlayLeft: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  overlayRight: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },

  // Scan frame
  scanFrameContainer: {
    width: SCAN_FRAME_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanFrame: {
    width: SCAN_FRAME_SIZE,
    height: SCAN_FRAME_SIZE,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: '#10B981',
    borderWidth: 3,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 14,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 14,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 14,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 14,
  },
  scanLine: {
    position: 'absolute',
    left: 8,
    right: 8,
    height: 2,
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 5,
  },
  scanHint: {
    marginTop: 20,
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  // Top bar
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topCenter: {
    flex: 1,
    alignItems: 'center',
  },
  topTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#fff',
  },
  topSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  countBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: COLORS.onPrimary,
    fontWeight: '800',
    fontSize: 15,
  },

  // Bottom controls
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },

  // Manual input
  manualSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  manualToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: withAlpha(COLORS.primary, 0.06),
  },
  manualToggleText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  manualInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  manualCancelBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  manualInput: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surfaceContainerLow,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  manualSubmitBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Type pills
  typeListContent: {
    paddingHorizontal: 20,
    gap: 8,
    paddingVertical: 8,
  },
  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: 'transparent',
  },
  typePillActive: {
    backgroundColor: COLORS.primary,
  },
  typePillText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  typePillTextActive: {
    color: COLORS.onPrimary,
  },

  // History
  historyContainer: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 4,
  },
  historyTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.outlineVariant,
  },
  historyRowError: {
    opacity: 0.55,
  },
  historyDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotSuccess: {
    backgroundColor: '#10B981',
  },
  dotError: {
    backgroundColor: '#EF4444',
  },
  historyInfo: {
    flex: 1,
  },
  historyName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  historyMeta: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 1,
  },
  historyTime: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },

  // Result overlay
  resultOverlay: {
    position: 'absolute',
    bottom: 260,
    left: 20,
    right: 20,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  resultCardSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  resultCardError: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  resultGlow: {
    position: 'absolute',
    top: -1,
    bottom: -1,
    left: -1,
    width: 4,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  glowSuccess: {
    backgroundColor: '#10B981',
  },
  glowError: {
    backgroundColor: '#EF4444',
  },
  resultIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultIconSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  resultIconError: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  resultContent: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
  resultDetail: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  resultTime: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.55)',
    marginTop: 3,
  },
  resultErrorTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FCA5A5',
  },
  resultErrorMessage: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },

  // Permission
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionIconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: withAlpha(COLORS.primary, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.onSurface,
    marginTop: 20,
  },
  permissionText: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 21,
    maxWidth: 280,
  },
  permissionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 28,
  },
  permissionBtnText: {
    color: COLORS.onPrimary,
    fontWeight: '700',
    fontSize: 15,
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 20,
  },
  backLinkText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});
