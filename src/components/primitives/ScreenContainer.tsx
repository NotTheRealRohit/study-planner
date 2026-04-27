import { SafeAreaView, StyleSheet, type ViewProps } from 'react-native';
import type { ReactNode } from 'react';

interface ScreenContainerProps extends ViewProps {
  children: ReactNode;
}

export function ScreenContainer({ children, style, ...props }: ScreenContainerProps) {
  return (
    <SafeAreaView style={[styles.container, style]} {...props}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});