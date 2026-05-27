import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChecklistNote } from '../../types';
import { useAppTheme } from '../../constants/theme';
import { typography, spacing } from '../../constants/theme';

interface ChecklistCardProps {
  checklist: ChecklistNote;
  onPress: () => void;
}

export default function ChecklistCard({ checklist, onPress }: ChecklistCardProps) {
  const theme = useAppTheme();

  const completed = checklist.items.filter((i) => i.isCompleted).length;
  const total = checklist.items.length;
  const progress = total === 0 ? 0 : completed / total;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={onPress}
    >
      <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
        {checklist.title}
      </Text>

      <Text style={[styles.progress, { color: theme.textSecondary }]}>
        {completed} de {total} tareas completadas
      </Text>

      <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
        <View
          style={[
            styles.progressFill,
            {
              backgroundColor: theme.primary,
              width: `${progress * 100}%`,
            },
          ]}
        />
      </View>
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
    marginBottom: spacing.sm,
  },
  progress: {
    fontSize: typography.sizes.xs,
    marginBottom: spacing.xs,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
});