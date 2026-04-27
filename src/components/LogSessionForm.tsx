import { useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from './primitives/TextInput';
import { Button } from './primitives/Button';
import { Card } from './primitives/Card';

interface LogSessionFormProps {
  onSave: (data: {
    resourceLabel: string;
    durationMinutes: number;
    occurredOn: Date;
  }) => void;
  onCancel: () => void;
}

export function LogSessionForm({ onSave, onCancel }: LogSessionFormProps) {
  const [resourceLabel, setResourceLabel] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const duration = parseInt(durationMinutes, 10);
    if (!resourceLabel.trim()) {
      setError('Resource label is required');
      return;
    }
    if (isNaN(duration) || duration <= 0) {
      setError('Duration must be a positive number');
      return;
    }

    onSave({
      resourceLabel: resourceLabel.trim(),
      durationMinutes: duration,
      occurredOn: date,
    });
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Log a Study Session</Text>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <TextInput
        label="What did you study?"
        placeholder="e.g., TypeScript Tutorial"
        value={resourceLabel}
        onChangeText={(text) => {
          setResourceLabel(text);
          setError(null);
        }}
        autoFocus
      />

      <TextInput
        label="Duration (minutes)"
        placeholder="e.g., 30"
        value={durationMinutes}
        onChangeText={(text) => {
          setDurationMinutes(text.replace(/[^0-9]/g, ''));
          setError(null);
        }}
        keyboardType="numeric"
      />

      <View style={styles.dateField}>
        <Text style={styles.label}>Date</Text>
        <Pressable style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>{formatDate(date)}</Text>
        </Pressable>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selectedDate) => {
            setShowDatePicker(Platform.OS === 'ios');
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
          maximumDate={new Date()}
        />
      )}

      <View style={styles.buttons}>
        <Button title="Cancel" variant="secondary" onPress={onCancel} style={styles.cancelButton} />
        <Button title="Save" onPress={handleSave} style={styles.saveButton} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
  },
  dateField: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#333',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
  },
});