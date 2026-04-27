import { Text, StyleSheet, type TextProps } from 'react-native';

interface HeadingProps extends TextProps {
  level?: 1 | 2 | 3;
}

export function Heading({ level = 1, style, ...props }: HeadingProps) {
  const fontSize = level === 1 ? 28 : level === 2 ? 22 : 18;
  return <Text style={[styles.heading, { fontSize }, style]} {...props} />;
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: '700',
    color: '#1a1a1a',
  },
});