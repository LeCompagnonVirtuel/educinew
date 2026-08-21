import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { COLORS, withAlpha } from '../../constants/colors';
import { BORDER_RADIUS } from '../../constants/theme';

type SkeletonVariant = 'text' | 'circle' | 'rectangle' | 'card';

export interface SkeletonLoaderProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number;
  style?: object;
  testID?: string;
}

const VARIANT_STYLES: Record<SkeletonVariant, { width?: number | string; height: number; borderRadius: number }> = {
  text: { width: '100%', height: 16, borderRadius: BORDER_RADIUS.sm },
  circle: { width: 48, height: 48, borderRadius: BORDER_RADIUS.full },
  rectangle: { width: '100%', height: 120, borderRadius: BORDER_RADIUS.lg },
  card: { width: '100%', height: 200, borderRadius: BORDER_RADIUS.lg },
};

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  width,
  height,
  style,
  testID,
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.6)).current;

  const variantStyle = VARIANT_STYLES[variant];

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.6,
          duration: 750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    shimmer.start();
    pulse.start();

    return () => {
      shimmer.stop();
      pulse.stop();
    };
  }, [shimmerAnim, pulseAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  const containerWidth = width ?? variantStyle.width;
  const containerHeight = height ?? variantStyle.height;

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          width: containerWidth,
          height: containerHeight,
          borderRadius: variantStyle.borderRadius,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.base,
          {
            opacity: pulseAnim,
          },
        ]}
      />
      <Animated.View
        testID={`${testID}-shimmer`}
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

export const SkeletonCard: React.FC<{ testID?: string }> = ({ testID }) => (
  <View testID={testID} style={styles.cardContainer}>
    <SkeletonLoader variant="rectangle" testID={`${testID}-image`} />
    <View style={styles.cardContent}>
      <SkeletonLoader variant="text" width="80%" testID={`${testID}-title`} />
      <View style={styles.cardSpacer} />
      <SkeletonLoader variant="text" width="60%" testID={`${testID}-subtitle`} />
    </View>
  </View>
);

export const SkeletonList: React.FC<{ count?: number; testID?: string }> = ({
  count = 3,
  testID,
}) => (
  <View testID={testID}>
    {Array.from({ length: count }).map((_, index) => (
      <View key={index} style={styles.listItem}>
        <SkeletonLoader variant="circle" width={40} height={40} testID={`${testID}-item-${index}`} />
        <View style={styles.listContent}>
          <SkeletonLoader variant="text" width="70%" testID={`${testID}-item-${index}-title`} />
          <View style={styles.listSpacer} />
          <SkeletonLoader variant="text" width="50%" testID={`${testID}-item-${index}-subtitle`} />
        </View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: COLORS.surfaceContainer,
  },
  base: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.surfaceContainer,
  },
  shimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: withAlpha(COLORS.white, 0.3),
    width: 100,
  },
  cardContainer: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  cardContent: {
    padding: 16,
  },
  cardSpacer: {
    height: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  listContent: {
    flex: 1,
    marginLeft: 12,
  },
  listSpacer: {
    height: 6,
  },
});
