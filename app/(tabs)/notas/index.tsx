import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNotesStore } from '../../../store/noteStore';
import { useAppTheme, spacing } from '../../../constants/theme';
import NoteCard from '../../../components/items/NoteCard';
import { Note } from '../../../types';

export default function NotasScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const notes = useNotesStore((state: { notes: Note[] }) => state.notes);

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
        ListEmptyComponent={<View />}
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