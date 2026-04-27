import { useMemo } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/primitives/ScreenContainer';
import { Heading } from '@/components/primitives/Heading';
import { Body } from '@/components/primitives/Body';
import { Button } from '@/components/primitives/Button';
import { StreakCalendar } from '@/components/StreakCalendar';
import { useStreakCalendar } from '@/hooks/useStreakCalendar';
import { useUIStore } from '@/stores/ui-store';

export default function HomeScreen() {
  const router = useRouter();
  const openLogSessionModal = useUIStore((state) => state.openLogSessionModal);

  const dateRange = useMemo(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 364);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }, []);

  const { streakGrid, loading, error } = useStreakCalendar({
    startDate: dateRange.start,
    endDate: dateRange.end,
  });

  const handleOpenModal = () => {
    router.push('/log-session');
  };

  return (
    <ScreenContainer>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Heading level={1}>Study Planner</Heading>
          <Body style={styles.subtitle}>Track your learning journey</Body>
        </View>

        <View style={styles.calendarSection}>
          <Heading level={3} style={styles.sectionTitle}>Your Activity</Heading>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#216e39" />
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error loading data</Text>
            </View>
          ) : streakGrid ? (
            <StreakCalendar streakGrid={streakGrid} />
          ) : null}
        </View>

        <View style={styles.actionSection}>
          <Button title="Log a Study Session" onPress={handleOpenModal} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  subtitle: {
    color: '#666',
    marginTop: 4,
  },
  calendarSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  errorContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 16,
  },
  actionSection: {
    alignItems: 'center',
  },
});