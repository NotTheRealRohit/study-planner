import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StreakGrid } from '@/modules/progress-engine';

interface StreakCalendarProps {
  streakGrid: StreakGrid;
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function StreakCalendar({ streakGrid }: StreakCalendarProps) {
  const { cells } = streakGrid;

  if (cells.length === 0) {
    return <Text style={styles.emptyText}>No data to display</Text>;
  }

  const weeks: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const monthLabels: { month: number; weekIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIndex) => {
    const firstDayOfWeek = week[0];
    if (firstDayOfWeek) {
      const month = firstDayOfWeek.date.getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ month, weekIndex });
        lastMonth = month;
      }
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.monthLabels}>
        <View style={{ width: 24 }} />
        {monthLabels.map((item, i) => (
          <Text
            key={i}
            style={[styles.monthLabel, { marginLeft: item.weekIndex === 0 ? 0 : (item.weekIndex - (monthLabels[i - 1]?.weekIndex ?? 0) - 1) * 12 }]}
          >
            {MONTH_LABELS[item.month]}
          </Text>
        ))}
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.dayLabels}>
          {[0, 2, 4, 6].map((day) => (
            <Text key={day} style={styles.dayLabel}>{DAY_LABELS[day]}</Text>
          ))}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.grid}>
            {weeks.map((week, weekIndex) => (
              <View key={weekIndex} style={styles.week}>
                {week.map((cell, dayIndex) => (
                  <View
                    key={dayIndex}
                    style={[
                      styles.cell,
                      cell.intensity === 0 && styles.intensity0,
                      cell.intensity === 1 && styles.intensity1,
                      cell.intensity === 2 && styles.intensity2,
                      cell.intensity === 3 && styles.intensity3,
                      cell.intensity === 4 && styles.intensity4,
                    ]}
                    title={`${cell.date.toDateString()}: ${cell.totalMinutes} min`}
                  />
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    padding: 20,
  },
  monthLabels: {
    flexDirection: 'row',
    marginBottom: 8,
    marginLeft: 24,
  },
  monthLabel: {
    fontSize: 10,
    color: '#666',
    width: 24,
  },
  gridContainer: {
    flexDirection: 'row',
  },
  dayLabels: {
    width: 24,
    justifyContent: 'space-between',
    paddingRight: 4,
  },
  dayLabel: {
    fontSize: 10,
    color: '#666',
    height: 10,
  },
  grid: {
    flexDirection: 'row',
  },
  week: {
    flexDirection: 'column',
  },
  cell: {
    width: 10,
    height: 10,
    margin: 1,
    borderRadius: 2,
  },
  intensity0: { backgroundColor: '#ebedf0' },
  intensity1: { backgroundColor: '#9be9a8' },
  intensity2: { backgroundColor: '#40c463' },
  intensity3: { backgroundColor: '#30a14e' },
  intensity4: { backgroundColor: '#216e39' },
});