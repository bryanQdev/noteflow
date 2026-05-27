import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { z } from 'zod';
import { useNotesStore } from '../store/noteStore';
import { useAppTheme, typography, spacing } from '../constants/theme';

const noteSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  content: z.string().min(1, 'El contenido no puede estar vacío'),
});

const checklistSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
});

const ideaSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  tags: z.string().min(1, 'Añade al menos una etiqueta'),
});

type NoteType = 'nota' | 'checklist' | 'idea';

export default function NuevaNota() {
  const theme = useAppTheme();
  const router = useRouter();
  const { addNote, addChecklist, addIdea } = useNotesStore();

  const [type, setType] = useState<NoteType>('nota');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [color, setColor] = useState('#FFD700');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181'];

  const handleSave = () => {
    setErrors({});
    const id = Date.now().toString();
    const now = new Date();

    if (type === 'nota') {
      const result = noteSchema.safeParse({ title, content });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((e: any) => {
          fieldErrors[e.path[0]] = e.message;
        });
        setErrors(fieldErrors);
        return;
      }
      addNote({ id, title, content, createdAt: now, updateAt: now });
    }

    if (type === 'checklist') {
      const result = checklistSchema.safeParse({ title });
      if (!result.success) {
        setErrors({ title: result.error.issues[0].message });
        return;
      }
      addChecklist({ id, title, items: [], createdAt: now, updateAt: now });
    }

    if (type === 'idea') {
      const result = ideaSchema.safeParse({ title, tags });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((e: any) => {
          fieldErrors[e.path[0]] = e.message;
        });
        setErrors(fieldErrors);
        return;
      }
      addIdea({
        id,
        title,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        color,
        createdAt: now,
        updateAt: now,
      });
    }

    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>

        <Text style={[styles.label, { color: theme.text }]}>Tipo de nota</Text>
        <View style={styles.typeSelector}>
          {(['nota', 'checklist', 'idea'] as NoteType[]).map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.typeButton,
                { borderColor: theme.border, backgroundColor: type === t ? theme.primary : theme.surface },
              ]}
              onPress={() => setType(t)}
            >
              <Text style={{ color: type === t ? '#fff' : theme.text }}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { color: theme.text }]}>Título</Text>
        <TextInput
          style={[styles.input, { borderColor: errors.title ? theme.error : theme.border, color: theme.text, backgroundColor: theme.surface }]}
          value={title}
          onChangeText={setTitle}
          placeholder="Escribe un título..."
          placeholderTextColor={theme.textSecondary}
        />
        {errors.title && <Text style={[styles.error, { color: theme.error }]}>{errors.title}</Text>}

        {type === 'nota' && (
          <>
            <Text style={[styles.label, { color: theme.text }]}>Contenido</Text>
            <TextInput
              style={[styles.input, styles.textarea, { borderColor: errors.content ? theme.error : theme.border, color: theme.text, backgroundColor: theme.surface }]}
              value={content}
              onChangeText={setContent}
              placeholder="Escribe tu nota..."
              placeholderTextColor={theme.textSecondary}
              multiline
            />
            {errors.content && <Text style={[styles.error, { color: theme.error }]}>{errors.content}</Text>}
          </>
        )}

        {type === 'idea' && (
          <>
            <Text style={[styles.label, { color: theme.text }]}>Etiquetas (separadas por comas)</Text>
            <TextInput
              style={[styles.input, { borderColor: errors.tags ? theme.error : theme.border, color: theme.text, backgroundColor: theme.surface }]}
              value={tags}
              onChangeText={setTags}
              placeholder="trabajo, personal, urgente..."
              placeholderTextColor={theme.textSecondary}
            />
            {errors.tags && <Text style={[styles.error, { color: theme.error }]}>{errors.tags}</Text>}

            <Text style={[styles.label, { color: theme.text }]}>Color</Text>
            <View style={styles.colorSelector}>
              {colors.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[styles.colorCircle, { backgroundColor: c, borderWidth: color === c ? 3 : 0, borderColor: theme.text }]}
                  onPress={() => setColor(c)}
                />
              ))}
            </View>
          </>
        )}

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: theme.primary }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  label: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, marginBottom: spacing.xs, marginTop: spacing.md },
  input: { borderWidth: 1, borderRadius: 8, padding: spacing.sm, fontSize: typography.sizes.md },
  textarea: { height: 120, textAlignVertical: 'top' },
  error: { fontSize: typography.sizes.xs, marginTop: spacing.xs },
  typeSelector: { flexDirection: 'row', gap: spacing.sm },
  typeButton: { flex: 1, borderWidth: 1, borderRadius: 8, padding: spacing.sm, alignItems: 'center' },
  colorSelector: { flexDirection: 'row', gap: spacing.sm },
  colorCircle: { width: 36, height: 36, borderRadius: 18 },
  saveButton: { borderRadius: 8, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg, marginBottom: spacing.xl },
  saveButtonText: { color: '#fff', fontSize: typography.sizes.md, fontWeight: typography.weights.bold },
});