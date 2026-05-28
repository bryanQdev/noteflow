import { View, Text, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import { useAppTheme, typography, spacing } from '../../../constants/theme';
import * as Haptics from 'expo-haptics';
import { Button } from 'react-native-paper';

export default function IdeaDetalle() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useAppTheme();
  const router = useRouter();
  const ideas = useNotesStore((state) => state.ideas);
  const deleteIdea = useNotesStore((state) => state.deleteIdea);

  const idea = ideas.find((i) => i.id === id);

  if (!idea) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Idea no encontrada</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Eliminar idea',
      '¿Estás seguro de que quieres eliminar esta idea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            deleteIdea(id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: idea.color }]}>
      <Text style={[styles.title, { color: theme.text }]}>{idea.title}</Text>
      <View style={styles.tagsContainer}>
        {idea.tags.map((tag) => (
          <View key={tag} style={[styles.tag, { backgroundColor: theme.surface }]}>
            <Text style={[styles.tagText, { color: theme.text }]}>{tag}</Text>
          </View>
        ))}
      </View>
      <Button mode="contained" buttonColor={theme.error} onPress={handleDelete} style={styles.button}>
        Eliminar idea
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  title: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, marginBottom: spacing.md },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, flex: 1 },
  tag: { borderRadius: 20, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  tagText: { fontSize: typography.sizes.sm },
  button: { marginTop: spacing.lg },
});