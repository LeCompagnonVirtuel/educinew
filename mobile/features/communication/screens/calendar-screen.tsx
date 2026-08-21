import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'deadline' | 'event' | 'reminder';
  color: string;
  isAllDay: boolean;
}

const CalendarScreen: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const mockData: CalendarEvent[] = [
        { id: '1', title: 'Staff Meeting', date: '2024-01-15', time: '10:00 AM', type: 'meeting', color: '#3b82f6', isAllDay: false },
        { id: '2', title: 'Project Deadline', date: '2024-01-15', time: '5:00 PM', type: 'deadline', color: '#ef4444', isAllDay: false },
        { id: '3', title: 'Science Fair', date: '2024-01-16', time: 'All Day', type: 'event', color: '#8b5cf6', isAllDay: true },
        { id: '4', title: 'Submit Grades', date: '2024-01-18', time: '11:59 PM', type: 'reminder', color: '#f59e0b', isAllDay: false },
        { id: '5', title: 'Parent Conference', date: '2024-01-20', time: '2:00 PM', type: 'meeting', color: '#3b82f6', isAllDay: false },
      ];
      setEvents(mockData);
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyDay} />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvents = events.some((e) => e.date === dateStr);
      const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === currentMonth.getMonth();
      days.push(
        <TouchableOpacity
          key={day}
          style={[styles.dayCell, isSelected && styles.selectedDay]}
          onPress={() => setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
        >
          <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{day}</Text>
          {hasEvents && <View style={styles.eventDot} />}
        </TouchableOpacity>
      );
    }
    return days;
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return '📅';
      case 'deadline': return '⏰';
      case 'event': return '🎉';
      case 'reminder': return '🔔';
      default: return '📌';
    }
  };

  const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const todayEvents = events.filter((e) => e.date === selectedDateStr);

  const navigateMonth = (direction: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Calendar</Text>
      <View style={styles.calendarCard}>
        <View style={styles.monthHeader}>
          <TouchableOpacity onPress={() => navigateMonth(-1)}>
            <Text style={styles.navArrow}>◀</Text>
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </Text>
          <TouchableOpacity onPress={() => navigateMonth(1)}>
            <Text style={styles.navArrow}>▶</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.weekdaysHeader}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Text key={day} style={styles.weekdayText}>{day}</Text>
          ))}
        </View>
        <View style={styles.daysGrid}>{renderCalendarDays()}</View>
      </View>
      <View style={styles.eventsSection}>
        <View style={styles.eventsHeader}>
          <Text style={styles.eventsTitle}>
            Events for {selectedDate.toLocaleDateString()}
          </Text>
          <TouchableOpacity style={styles.createEventButton}>
            <Text style={styles.createEventText}>+ New</Text>
          </TouchableOpacity>
        </View>
        {todayEvents.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No events for this day</Text>
          </View>
        ) : (
          todayEvents.map((event) => (
            <View key={event.id} style={[styles.eventItem, { borderLeftColor: event.color }]}>
              <View style={styles.eventIcon}>
                <Text>{getEventTypeIcon(event.type)}</Text>
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventTime}>{event.time}</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  calendarCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navArrow: {
    fontSize: 18,
    color: '#3b82f6',
    padding: 8,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  weekdaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekdayText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    width: 40,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  emptyDay: {
    width: '14.28%',
    aspectRatio: 1,
  },
  selectedDay: {
    backgroundColor: '#3b82f6',
  },
  dayText: {
    fontSize: 14,
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  eventDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3b82f6',
    marginTop: 2,
  },
  eventsSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  eventsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  createEventButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  createEventText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#666',
    fontSize: 14,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
  },
  eventIcon: {
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  eventTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default CalendarScreen;
