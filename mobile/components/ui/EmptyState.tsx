import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import {
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  LINE_HEIGHTS,
} from '../../constants/theme';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  illustration?: React.ReactNode;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: object;
  testID?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  illustration,
  title,
  subtitle,
  actionLabel,
  onAction,
  style,
  testID,
}) => {
  return (
    <View testID={testID} style={[styles.container, style]}>
      {illustration ? (
        <View testID={`${testID}-illustration`} style={styles.illustrationContainer}>
          {illustration}
        </View>
      ) : icon ? (
        <View testID={`${testID}-icon`} style={styles.iconContainer}>
          {icon}
        </View>
      ) : (
        <View testID={`${testID}-placeholder`} style={styles.placeholderContainer}>
          <Text style={styles.placeholderIcon}>📭</Text>
        </View>
      )}

      <Text testID={`${testID}-title`} style={styles.title}>
        {title}
      </Text>

      {subtitle && (
        <Text testID={`${testID}-subtitle`} style={styles.subtitle}>
          {subtitle}
        </Text>
      )}

      {actionLabel && onAction && (
        <View style={styles.actionContainer}>
          <Button
            title={actionLabel}
            variant="primary"
            size="md"
            onPress={onAction}
            testID={`${testID}-action`}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxxl,
  },
  illustrationContainer: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  placeholderContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  placeholderIcon: {
    fontSize: 40,
  },
  title: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: FONT_SIZES.md * LINE_HEIGHTS.relaxed,
    marginBottom: SPACING.xl,
  },
  actionContainer: {
    marginTop: SPACING.sm,
  },
});
