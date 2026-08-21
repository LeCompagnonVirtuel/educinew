import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

interface ScanResult {
  success: boolean;
  rfidTag: string;
  type: string;
  itemId: string;
  itemName: string;
  action: string;
  timestamp: string;
}

export const ScRFIDScanScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [scanning, setScanning] = useState(false);
  const [lastScan, setLastScan] = useState<ScanResult | null>(null);

  const handleStartScan = async () => {
    setScanning(true);
    try {
      const response = await fetch('/api/smart-campus/library/rfid/scan', {
        method: 'POST',
      });
      const json = await response.json();
      setLastScan(json.data);
      handleScanResult(json.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to scan RFID tag');
    } finally {
      setScanning(false);
    }
  };

  const handleScanResult = (result: ScanResult) => {
    if (result.success) {
      Alert.alert(
        'Scan Successful',
        `${result.type}: ${result.itemName}\nAction: ${result.action}`,
        [
          { text: 'OK' },
          {
            text: 'View Details',
            onPress: () => {
              if (result.type === 'book') {
                navigation.navigate('ScBookDetail', { id: result.itemId });
              }
            },
          },
        ]
      );
    } else {
      Alert.alert('Scan Failed', 'Could not read RFID tag. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>RFID Scanner</Text>
        <Text style={styles.headerSubtitle}>Scan books for quick check-in/out</Text>
      </View>

      <View style={styles.scannerArea}>
        <View style={[styles.scanFrame, scanning && styles.scanFrameActive]}>
          <Text style={styles.scanIcon}>📱</Text>
          <Text style={styles.scanText}>
            {scanning ? 'Scanning...' : 'Position RFID tag near scanner'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.scanButton, scanning && styles.scanButtonActive]}
        onPress={handleStartScan}
        disabled={scanning}
      >
        <Text style={styles.scanButtonText}>
          {scanning ? 'Scanning...' : 'Start Scan'}
        </Text>
      </TouchableOpacity>

      {lastScan && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Last Scan Result</Text>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Status</Text>
            <Text style={[styles.resultValue, lastScan.success ? styles.success : styles.error]}>
              {lastScan.success ? 'Success' : 'Failed'}
            </Text>
          </View>
          {lastScan.success && (
            <>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Type</Text>
                <Text style={styles.resultValue}>{lastScan.type}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Item</Text>
                <Text style={styles.resultValue}>{lastScan.itemName}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>RFID Tag</Text>
                <Text style={styles.resultValue}>{lastScan.rfidTag}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Action</Text>
                <Text style={styles.resultValue}>{lastScan.action}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Time</Text>
                <Text style={styles.resultValue}>{lastScan.timestamp}</Text>
              </View>
            </>
          )}
        </View>
      )}

      <View style={styles.instructions}>
        <Text style={styles.instructionTitle}>Instructions</Text>
        <Text style={styles.instructionText}>1. Tap "Start Scan" to activate RFID reader</Text>
        <Text style={styles.instructionText}>2. Place the RFID tag near the device</Text>
        <Text style={styles.instructionText}>3. Wait for the scan to complete</Text>
        <Text style={styles.instructionText}>4. View results and take action</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#007AFF',
    padding: 24,
    alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff', marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  scannerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  scanFrame: {
    width: 200,
    height: 200,
    borderWidth: 3,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrameActive: {
    borderColor: '#28a745',
    backgroundColor: 'rgba(40,167,69,0.1)',
  },
  scanIcon: { fontSize: 48, marginBottom: 12 },
  scanText: { fontSize: 14, color: '#666', textAlign: 'center', paddingHorizontal: 16 },
  scanButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  scanButtonActive: { backgroundColor: '#6c757d' },
  scanButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  resultCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  resultTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultLabel: { fontSize: 14, color: '#666' },
  resultValue: { fontSize: 14, fontWeight: '500' },
  success: { color: '#28a745' },
  error: { color: '#dc3545' },
  instructions: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  instructionTitle: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  instructionText: { fontSize: 14, color: '#666', marginBottom: 4 },
});
