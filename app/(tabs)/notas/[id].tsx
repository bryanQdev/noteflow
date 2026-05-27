import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAppTheme } from '../../../constants/theme';

export default function NotaDetalle() {
  const { id } = useLocalSearchParams();
  const theme = useAppTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text, { color: theme.text}]}>
        Detalle de la nota: {id}
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16 },
    text: { fontSize: 16}
  },
);