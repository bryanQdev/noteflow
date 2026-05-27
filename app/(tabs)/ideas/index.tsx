import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/noteStore';
import { useAppTheme } from '../../../constants/theme';
import { spacing } from '../../../constants/theme';
import IdeaCard from '../../../components/items/IdeaCard';
import { IdeaNote } from '../../../types';

export default function IdeasScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const ideas = useNotesStore((state: { ideas: IdeaNote[] }) => state.ideas);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlashList
        data={ideas}
        // @ts-ignore - estimatedItemSize is valid but types are outdated
        estimatedItemSize={100}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }: { item: IdeaNote }) => (
          <IdeaCard
            idea={item}
            onPress={() => router.push(`/ideas/${item.id}`)}
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