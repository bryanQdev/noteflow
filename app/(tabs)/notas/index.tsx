import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNotesStore } from '../../../store/notesStore';
import { useAppTheme, spacing, typography } from '../../../constants/theme';
import NoteCard from '../../../components/items/NoteCard';
import { Note } from '../../../types';

function EmptyState({ message }: { message: string }) {
  const theme = useAppTheme();
  return (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="note-outline" size={64} color={theme.textSecondary} />
      <Text style={[styles.emptyText, { color: theme.textSecondary }]}>{message}</Text>
    </View>
  );
}

export default function NotasScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const notes = useNotesStore((state) => state.notes);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlashList
        data={notes}
        // @ts-ignore - estimatedItemSize is valid but types are outdated
        estimatedItemSize={100}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }: { item: Note }) => (
          <NoteCard
            note={item}
            onPress={() => router.push(`/notas/${item.id}`)}
          />
        )}
        ListEmptyComponent={<EmptyState message="No hay notas aún. Pulsa + para crear una." />}
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