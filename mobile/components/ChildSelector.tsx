import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../constants/colors';
import { useChild, Child } from '../app/context/ChildContext';

export default function ChildSelector() {
  const { children, selectedChild, selectChild } = useChild();
  const [showPicker, setShowPicker] = useState(false);

  if (children.length <= 1) return null;

  return (
    <>
      <TouchableOpacity style={styles.selector} onPress={() => setShowPicker(true)} activeOpacity={0.7}>
        {selectedChild?.photoUrl ? (
          <Image source={{ uri: selectedChild.photoUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{selectedChild?.firstName?.[0] || '?'}</Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{selectedChild?.fullName}</Text>
          <Text style={styles.classLabel}>{selectedChild?.className || 'Classe'}</Text>
        </View>
        <Ionicons name="chevron-down" size={18} color={COLORS.onSurfaceVariant} />
      </TouchableOpacity>

      <Modal visible={showPicker} transparent animationType="fade" onRequestClose={() => setShowPicker(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setShowPicker(false)}>
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Sélectionner un enfant</Text>
            <FlatList
              data={children}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.childRow, item.id === selectedChild?.id && styles.childRowActive]}
                  onPress={() => { selectChild(item); setShowPicker(false); }}
                >
                  {item.photoUrl ? (
                    <Image source={{ uri: item.photoUrl }} style={styles.childAvatar} />
                  ) : (
                    <View style={styles.childAvatarPlaceholder}>
                      <Text style={styles.childAvatarText}>{item.firstName?.[0] || '?'}</Text>
                    </View>
                  )}
                  <View style={styles.childInfo}>
                    <Text style={styles.childName}>{item.fullName}</Text>
                    <Text style={styles.childClass}>{item.className || 'Classe non assignée'}</Text>
                  </View>
                  {item.id === selectedChild?.id && (
                    <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 14,
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryFixed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  classLabel: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '60%',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.outlineVariant,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: 16,
  },
  childRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 6,
    gap: 12,
  },
  childRowActive: {
    backgroundColor: withAlpha(COLORS.primary, 0.08),
  },
  childAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  childAvatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryFixed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  childClass: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
});
