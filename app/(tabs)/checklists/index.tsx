import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/noteStore';
import { useAppTheme } from '../../../constants/theme';
import { spacing } from '../../../constants/theme';
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: spacing.md },
});