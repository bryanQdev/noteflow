import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/noteStore';
import { useAppTheme } from '../../../constants/theme';
import { spacing } from '../../../constants/theme';
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: spacing.md },
});