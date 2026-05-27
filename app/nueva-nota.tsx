import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../constants/theme';

export default function NuevaNota() {
  const theme = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text, { color: theme.text }]}>
        Formulario de nueva nota
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  text: { fontSize: 16 },
});