import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import { useAppTheme, typography, spacing } from '../../../constants/theme';
import * as Haptics from 'expo-haptics';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ChecklistDetalle() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useAppTheme();
  const router = useRouter();
  const checklists = useNotesStore((state) => state.checklists);
  const deleteChecklist = useNotesStore((state) => state.deleteChecklist);
  const toggleChecklistItem = useNotesStore((state) => state.toggleChecklistItem);

  const checklist = checklists.find((c) => c.id === id);

  if (!checklist) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Checklist no encontrado</Text>
      </View>
    );
  }

  const handleToggle = async (itemId: string) => {
    toggleChecklistItem(id, itemId);
    const updatedItems = checklist.items.map((i) =>
      i.id === itemId ? { ...i, isCompleted: !i.isCompleted } : i
    );
    const allCompleted = updatedItems.every((i) => i.isCompleted);
    if (allCompleted) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar checklist',
      '¿Estás seguro de que quieres eliminar este checklist?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            deleteChecklist(id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>{checklist.title}</Text>

      {checklist.items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={() => handleToggle(item.id)}
        >
          <MaterialCommunityIcons
            name={item.isCompleted ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={24}
            color={item.isCompleted ? theme.primary : theme.textSecondary}
          />
          <Text style={[styles.itemText, { color: theme.text, textDecorationLine: item.isCompleted ? 'line-through' : 'none' }]}>
            {item.text}
          </Text>
        </TouchableOpacity>
      ))}

      <Button mode="contained" buttonColor={theme.error} onPress={handleDelete} style={styles.button}>
        Eliminar checklist
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  title: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, marginBottom: spacing.md },
  item: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm },
  itemText: { fontSize: typography.sizes.md },
  button: { marginTop: spacing.lg },
});