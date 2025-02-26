import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNotes } from '../hooks/useNotes';
import { theme } from '../constants/theme';
import { Note } from '../types/Note';

export default function NoteDetail() {
  const { id } = useLocalSearchParams();
  const { getNoteById } = useNotes();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      const foundNote = getNoteById(id as string);
      setNote(foundNote || null);
    };
    fetchNote();
  }, [id, getNoteById]);

  if (!note) return <Text style={styles.notFound}>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>
    </ScrollView>
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
    marginBottom: theme.spacing.medium,
  },
  content: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.text,
    lineHeight: 24,
  },
  notFound: {
    fontSize: theme.fontSizes.large,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: theme.spacing.large,
  },
});