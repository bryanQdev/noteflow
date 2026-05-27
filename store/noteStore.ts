import { create } from "zustand";
import { Note, ChecklistNote, IdeaNote} from '../types';

interface NoteStore {
    notes: Note[];
    checklists: ChecklistNote[];
    ideas: IdeaNote[];
    addNote: (note: Note) => void;
    addChecklist: (checklist: ChecklistNote) => void;
    addIdea: (idea: IdeaNote) => void;
    deleteNote: (id: string) => void;
    deleteChecklist: (id: string) => void;
    deleteIdea: (id: string)=> void;
    toggleChecklistItem: (checklistId: string, itemId: string) => void

    
}

export const useNoteStore = create<NoteStore>((set) => ({
    notes: [],
    checklists: [],
    ideas: [],

    addNote: (note) =>
        set((state)) =>({ notes: [...state.notes, note]})),

    addChecklist: (checklist) =>
        set((state)) =>({ checklists: [...state.checklists, checklist]})),
    
    addIdea: (idea) =>
        set((State)) => ({ ideas: [...state.ideas, idea]})),
s}));
