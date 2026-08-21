import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

interface TabItem {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconFilled: keyof typeof Ionicons.glyphMap;
  label: string;
}

const tabs: TabItem[] = [
  { name: 'home', icon: 'home-outline', iconFilled: 'home', label: 'Accueil' },
  { name: 'learning', icon: 'school-outline', iconFilled: 'school', label: 'Notes' },
  { name: 'payments', icon: 'card-outline', iconFilled: 'card', label: 'Paiements' },
  { name: 'messages', icon: 'chatbubble-outline', iconFilled: 'chatbubble', label: 'Messages' },
  { name: 'profile', icon: 'person-outline', iconFilled: 'person', label: 'Profil' },
];

interface BottomTabBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export function BottomTabBar({ activeTab, onTabPress }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, Platform.OS === 'ios' ? 20 : 10);

  return (
    <View style={[styles.container, { paddingBottom: bottomPadding }]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => onTabPress(tab.name)}
            style={[styles.tab, isActive && styles.activeTab]}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isActive ? tab.iconFilled : tab.icon}
              size={22}
              color={isActive ? COLORS.primary : COLORS.onSurfaceVariant}
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    paddingHorizontal: 10,
    borderRadius: 16,
    minWidth: 52,
  },
  activeTab: { backgroundColor: COLORS.primaryFixed },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
    marginTop: 3,
    letterSpacing: 0.2,
  },
  activeLabel: { color: COLORS.primary },
});
