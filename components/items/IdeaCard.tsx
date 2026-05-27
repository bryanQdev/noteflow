import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IdeaNote } from '../../types';
import { useAppTheme } from '../../constants/theme';
import { typography, spacing } from '../../constants/theme';

interface IdeaCardProps {
  idea: IdeaNote;
  onPress: () => void;
}

export default function IdeaCard({ idea, onPress }: IdeaCardProps) {
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: idea.color, borderColor: theme.border }]}
      onPress={onPress}
    >
      <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
        {idea.title}
      </Text>

      <View style={styles.tagsContainer}>
        {idea.tags.map((tag) => (
          <View
            key={tag}
            style={[styles.tag, { backgroundColor: theme.surface }]}
          >
            <Text style={[styles.tagText, { color: theme.text }]}>
              {tag}
            </Text>
          </View>
        ))}
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tag: {
    borderRadius: 20,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  tagText: {
    fontSize: typography.sizes.xs,
  },
});