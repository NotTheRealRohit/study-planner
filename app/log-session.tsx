import { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/primitives/ScreenContainer';
import { LogSessionForm } from '@/components/LogSessionForm';
import { useSessionLifecycle } from '@/hooks/useSessionLifecycle';

export default function LogSessionModal() {
  const router = useRouter();
  const sessionLifecycle = useSessionLifecycle();
  const [saving, setSaving] = useState(false);

  const handleSave = async (data: {
    resourceLabel: string;
    durationMinutes: number;
    occurredOn: Date;
  }) => {
    if (saving) return;

    setSaving(true);
    try {
      await sessionLifecycle.logPassive(data);
      router.back();
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to save session'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <LogSessionForm onSave={handleSave} onCancel={handleCancel} />
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});