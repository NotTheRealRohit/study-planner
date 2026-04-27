import { TextInput as RNTextInput, View, Text, StyleSheet, type TextInputProps as RNTextInputProps } from 'react-native';

interface TextInputProps extends RNTextInputProps {
  label?: string;
}

export function TextInput({ label, style, ...props }: TextInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput style={[styles.input, style]} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});