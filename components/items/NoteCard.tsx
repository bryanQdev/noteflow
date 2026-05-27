import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Note } from '../../types';
import { useAppTheme } from '../../constants/theme';
import { typography, spacing } from '../../constants/theme';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

export default function NoteCard({ note, onPress }: NoteCardProps) {
  const theme = useAppTheme();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={onPress}
    >
      <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
        {note.title}
      </Text>
      <Text style={[styles.content, { color: theme.textSecondary }]} numberOfLines={2}>
        {note.content}
      </Text>
      <Text style={[styles.date, { color: theme.textSecondary }]}>
        {formatDate(note.createdAt)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  content: {
    fontSize: typography.sizes.sm,
    marginBottom: spacing.sm,
  },
  date: {
    fontSize: typography.sizes.xs,
  },
});