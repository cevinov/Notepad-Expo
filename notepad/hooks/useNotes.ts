import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../types/Note';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const loadNotes = useCallback(async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes);
        setNotes(parsedNotes);
        console.log('Loaded notes:', parsedNotes);
      } else {
        console.log('No stored notes found');
      }
    } catch (error) {
      console.error('Failed to load notes:', error);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const saveNotes = async (updatedNotes: Note[]) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      console.log('Saved notes:', updatedNotes);
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  };

  const addNote = async (newNote: Omit<Note, 'id'>) => {
    const note: Note = { ...newNote, id: Date.now().toString() };
    const updatedNotes = [...notes, note];
    await saveNotes(updatedNotes);
  };

  const updateNote = async (id: string, updatedNote: Partial<Omit<Note, 'id'>>) => {
    const updatedNotes = notes.map(note => 
      note.id === id ? { ...note, ...updatedNote } : note
    );
    await saveNotes(updatedNotes);
  };

  const deleteNote = async (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    await saveNotes(updatedNotes);
  };

  const getNoteById = useCallback((id: string) => {
    console.log('Searching for note with id:', id);
    console.log('Current notes:', notes);
    const note = notes.find(note => note.id === id);
    if (!note) {
      console.warn(`Note with id ${id} not found`);
    } else {
      console.log('Found note:', note);
    }
    return note;
  }, [notes]);

  return { notes, loadNotes, addNote, updateNote, deleteNote, getNoteById };
}