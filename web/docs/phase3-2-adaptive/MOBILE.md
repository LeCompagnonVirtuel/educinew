# Mobile — Phase 3.2 Adaptive Learning Intelligence

## Overview

40 React Native screens located under `src/features/adaptive/mobile/`. Built with Expo, using SafeAreaView, RefreshControl, and Card components with theme constants from `constants/theme`.

## Structure

```
mobile/
├── AdaptiveDashboardScreen.tsx         # Main dashboard with overview
├── LearningPathScreen.tsx              # Learning path detail + nodes
├── LearningPathListScreen.tsx          # Browse available paths
├── ContentDetailScreen.tsx             # Content item viewer
├── ContentListScreen.tsx               # Content browser with filters
├── AssessmentScreen.tsx                # Take assessment
├── AssessmentResultScreen.tsx          # View results + analysis
├── DifficultyProfileScreen.tsx         # View difficulty level + ZPD
├── KnowledgeGapScreen.tsx              # Knowledge gap overview
├── SkillTreeScreen.tsx                 # Skill tree visualization
├── CompetencyScreen.tsx                # Competency progress
├── CompetencyFrameworkScreen.tsx       # Framework overview
├── SpacedRepetitionScreen.tsx          # Review cards
├── RepetitionScheduleScreen.tsx        # Upcoming reviews
├── RecommendationScreen.tsx            # AI recommendations
├── AnalyticsScreen.tsx                 # Learning analytics
├── SessionHistoryScreen.tsx            # Past sessions
├── SessionDetailScreen.tsx             # Single session detail
├── EngagementScreen.tsx                # Engagement metrics
├── GoalScreen.tsx                      # Learning goals
├── GoalDetailScreen.tsx                # Goal progress + milestones
├── StreakScreen.tsx                    # Learning streaks
├── LeaderboardScreen.tsx               # Leaderboard view
├── AchievementScreen.tsx               # Achievements + badges
├── PointBalanceScreen.tsx              # Points + rewards
├── NotificationScreen.tsx              # Notification list
├── NotificationPreferencesScreen.tsx   # Notification settings
├── ProgressScreen.tsx                  # Overall progress
├── ProgressReportScreen.tsx            # Detailed reports
├── SocialGroupScreen.tsx               # Study group detail
├── SocialGroupListScreen.tsx           # Browse groups
├── PeerReviewScreen.tsx                # Submit peer review
├── DiscussionScreen.tsx                # Discussion thread
├── AccessibilityScreen.tsx             # Accessibility settings
├── InstructorInsightScreen.tsx         # Instructor view
├── CurriculumScreen.tsx                # Curriculum mapping
├── ExperimentScreen.tsx                # A/B test assignment
├── SettingsScreen.tsx                  # Adaptive settings
└── OnboardingScreen.tsx                # Learning style assessment
```

## Component Pattern

```tsx
import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Card } from '@/components/ui/Card';
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants/theme';
import { useAdaptiveProfileList } from '../hooks/use-adaptive-profile-list';

export default function AdaptiveDashboardScreen({ schoolId }: { schoolId: string }) {
  const { items, loading, error, refresh } = useAdaptiveProfileList(schoolId);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Adaptive Learning</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>{item.user_id}</Text>
            <Text style={styles.cardSubtitle}>Style: {item.learning_style}</Text>
            <Text style={styles.cardText}>Pace: {item.learning_pace}</Text>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No profiles found</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
  },
  card: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  cardSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  cardText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textTertiary,
  },
  empty: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
});
```

## Shared Components

| Component | Description |
|-----------|-------------|
| `Card` | Elevated card container |
| `Badge` | Status/level badge |
| `ProgressBar` | Linear progress indicator |
| `ScoreRing` | Circular score display |
| `Chip` | Filter/selection chip |
| `Skeleton` | Loading placeholder |

## Theme Constants

```typescript
// constants/theme.ts
export const COLORS = {
  background: '#FFFFFF',
  surface: '#F8F9FA',
  text: '#1A1A2E',
  textSecondary: '#6C757D',
  textTertiary: '#ADB5BD',
  primary: '#4361EE',
  secondary: '#7209B7',
  success: '#06D6A0',
  warning: '#FFD166',
  error: '#EF476F',
  border: '#E9ECEF',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const TYPOGRAPHY = {
  h1: { fontSize: 28, fontWeight: '700' as const },
  h2: { fontSize: 22, fontWeight: '600' as const },
  h3: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 14, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
};
```

## Screen Features

| Screen | Features |
|--------|----------|
| Dashboard | Overview cards, quick stats, recent activity |
| LearningPath | Node graph, progress bar, enrollment |
| Assessment | Question carousel, timer, submit |
| SpacedRepetition | Card flip, review quality rating |
| Analytics | Charts, trends, cohort comparison |
| Goal | Milestone tracking, reminders |
| SocialGroup | Member list, activity feed, tasks |
| Instructor | Class overview, intervention tools |
