import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNotesStore } from '../../../store/notesStore';
import { useAppTheme, spacing, typography } from '../../../constants/theme';
import ChecklistCard from '../../../components/items/ChecklistCard';
import { ChecklistNote } from '../../../types';

function EmptyState({ message }: { message: string }) {
  const theme = useAppTheme();
  return (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="checkbox-blank-outline" size={64} color={theme.textSecondary} />
      <Text style={[styles.emptyText, { color: theme.textSecondary }]}>{message}</Text>
    </View>
  );
}

export default function ChecklistsScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const checklists = useNotesStore((state: { checklists: ChecklistNote[] }) => state.checklists);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlashList
        data={checklists}
        //@ts-ignore
        estimatedItemSize={100}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }: { item: ChecklistNote }) => (
          <ChecklistCard
            checklist={item}
            onPress={() => router.push(`/checklists/${item.id}`)}
          />
        )}
        ListEmptyComponent={<EmptyState message="No hay checklists aún. Pulsa + para crear uno." />}
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