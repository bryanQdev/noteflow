import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNotesStore } from '../../../store/noteStore';
import { useAppTheme, spacing } from '../../../constants/theme';
import ChecklistCard from '../../../components/items/ChecklistCard';
import { ChecklistNote } from '../../../types';

export default function ChecklistsScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const checklists = useNotesStore((state: { checklists: ChecklistNote[] }) => state.checklists);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlashList
        data={checklists}
        // @ts-ignore - estimatedItemSize is valid but types are outdated
        estimatedItemSize={100}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }: { item: ChecklistNote }) => (
          <ChecklistCard
            checklist={item}
            onPress={() => router.push(`/checklists/${item.id}`)}
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
  }
});