import { create } from 'zustand';
import { Note, ChecklistNote, IdeaNote } from '../types';
import { getNotes, createNote, deleteNote as deleteNoteApi } from '../lib/api';

interface NotesStore {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];
  isLoading: boolean;
  error: string | null;
  fetchNotes: () => Promise<void>;
  addNote: (note: Note) => Promise<void>;
  addChecklist: (checklist: ChecklistNote) => Promise<void>;
  addIdea: (idea: IdeaNote) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  deleteChecklist: (id: string) => Promise<void>;
  deleteIdea: (id: string) => Promise<void>;
  toggleChecklistItem: (checklistId: string, itemId: string) => void;
}

export const useNotesStore = create<NotesStore>((set) => ({
  notes: [],
  checklists: [],
  ideas: [],
  isLoading: false,
  error: null,

  fetchNotes: async () => {
    set({ isLoading: true, error: null });
    try {
      const all = await getNotes();
      set({
        notes: all.filter((n: any) => n.type === 'note'),
        checklists: all.filter((n: any) => n.type === 'checklist'),
        ideas: all.filter((n: any) => n.type === 'idea'),
        isLoading: false,
      });
    } catch {
      set({ error: 'Error al cargar notas', isLoading: false });
    }
  },

 addNote: async (note) => {
  try {
    await createNote({ title: note.title, type: 'note', content: note.content });
    set((state) => ({ notes: [...state.notes, note] }));
  } catch {
    set({ error: 'Error al crear nota' });
  }
},

addChecklist: async (checklist) => {
  try {
    await createNote({ title: checklist.title, type: 'checklist' });
    set((state) => ({ checklists: [...state.checklists, checklist] }));
  } catch {
    set({ error: 'Error al crear checklist' });
  }
},

addIdea: async (idea) => {
  try {
    await createNote({ title: idea.title, type: 'idea', color: idea.color });
    set((state) => ({ ideas: [...state.ideas, idea] }));
  } catch {
    set({ error: 'Error al crear idea' });
  }
},

  deleteNote: async (id) => {
    try {
      await deleteNoteApi(id);
      set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
    } catch {
      set({ error: 'Error al eliminar nota' });
    }
  },

  deleteChecklist: async (id) => {
    try {
      await deleteNoteApi(id);
      set((state) => ({ checklists: state.checklists.filter((c) => c.id !== id) }));
    } catch {
      set({ error: 'Error al eliminar checklist' });
    }
  },

  deleteIdea: async (id) => {
    try {
      await deleteNoteApi(id);
      set((state) => ({ ideas: state.ideas.filter((i) => i.id !== id) }));
    } catch {
      set({ error: 'Error al eliminar idea' });
    }
  },

  toggleChecklistItem: (checklistId, itemId) =>
    set((state) => ({
      checklists: state.checklists.map((c) =>
        c.id !== checklistId ? c : {
          ...c,
          items: c.items.map((i) =>
            i.id === itemId ? { ...i, isCompleted: !i.isCompleted } : i
          ),
        }
      ),
    })),
}));