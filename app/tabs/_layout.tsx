import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="notas" options={{ title: 'Notas' }} />
      <Tabs.Screen name="checklists" options={{ title: 'Checklists' }} />
      <Tabs.Screen name="idea" options={{ title: 'Ideas' }} />
    </Tabs>
  );
}