import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../constants/theme';

export default function TabsLayout() {
  const theme = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: { backgroundColor: theme.surface, borderTopColor: theme.border },
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.text,
      }}
    >
      <Tabs.Screen name="notas" options={{ title: 'Notas', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="note-text" color={color} size={size} /> }} />
      <Tabs.Screen name="checklists" options={{ title: 'Checklists', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="checkbox-marked-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="ideas" options={{ title: 'Ideas', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="lightbulb-outline" color={color} size={size} /> }} />
    </Tabs>
  );
}