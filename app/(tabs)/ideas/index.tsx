import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNotesStore } from '../../../store/notesStore';
import { useAppTheme, spacing, typography } from '../../../constants/theme';
import IdeaCard from '../../../components/items/IdeaCard';
import { IdeaNote } from '../../../types';

function EmptyState({ message }: { message: string }) {
  const theme = useAppTheme();
  return (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="lightbulb-outline" size={64} color={theme.textSecondary} />
      <Text style={[styles.emptyText, { color: theme.textSecondary }]}>{message}</Text>
    </View>
  );
}

export default function IdeasScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const ideas = useNotesStore((state: { ideas: IdeaNote[] }) => state.ideas);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlashList
        data={ideas}
        //@ts-ignore
        estimatedItemSize={100}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }: { item: IdeaNote }) => (
          <IdeaCard
            idea={item}
            onPress={() => router.push(`/ideas/${item.id}`)}
          />
        )}
        ListEmptyComponent={<EmptyState message="No hay ideas aún. Pulsa + para crear una." />}
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.primary }]}
        onPress={() => router.push('/nueva-nota')}
      >
        <MaterialCommunityIcons name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: spacing.md },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 100 },
  emptyText: { fontSize: typography.sizes.md, marginTop: spacing.md, textAlign: 'center' },
  fab: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});