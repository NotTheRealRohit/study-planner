import { Text, StyleSheet, type TextProps } from 'react-native';

interface BodyProps extends TextProps {
  children: React.ReactNode;
}

export function Body({ style, children, ...props }: BodyProps) {
  return <Text style={[styles.body, style]} {...props}>{children}</Text>;
}

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});