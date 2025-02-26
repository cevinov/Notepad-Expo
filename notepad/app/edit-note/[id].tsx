import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotes } from '../../hooks/useNotes';
import { theme } from '../../constants/theme';

export default function EditNote() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { getNoteById, updateNote, loadNotes, notes } = useNotes();
  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) {
        Alert.alert("Error", "Note ID is missing");
        router.back();
        return;
      }

      console.log('Fetching note with id:', id);
      await loadNotes(); // Ensure notes are loaded
    };

    fetchNote();
  }, [id, loadNotes, router]);

  useEffect(() => {
    if (notes.length > 0 && id) {
      const note = getNoteById(id);
      if (note) {
        console.log('Note found:', note);
        setTitle(note.title);
        setContent(note.content);
      } else {
        console.log('Note not found');
        Alert.alert("Error", "Note not found");
        router.back();
      }
    }
  }, [notes, id, getNoteById, router]);
  const handleSave = () => {
    if (!id) {
      Alert.alert("Error", "Note ID is missing");
      return;
    }
    if (title.trim() && content.trim()) {
      updateNote(id, { title, content });
      router.back();
    } else {
      Alert.alert("Error", "Title and content cannot be empty");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Note</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  title: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.large,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    fontSize: theme.fontSizes.medium,
  },
  contentInput: {
    height: 200,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: theme.fontSizes.medium,
    fontWeight: 'bold',
  },
});