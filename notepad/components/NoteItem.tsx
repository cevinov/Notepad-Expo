import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Note } from '../types/Note';
import { theme } from '../constants/theme';

type Props = {
  note: Note;
  onDelete: (id: string) => void;
};

export default function NoteItem({ note, onDelete }: Props) {
  const router = useRouter();

  const handleEdit = () => {
    router.push({
      pathname: '/edit-note/[id]',
      params: { id: note.id }
    });
  };
  return (
    <View style={styles.container}>
      <Link href={`/${note.id}`} asChild>
        <TouchableOpacity style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={1}>{note.title}</Text>
          <Text style={styles.preview} numberOfLines={2}>{note.content}</Text>
        </TouchableOpacity>
      </Link>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={handleEdit} style={styles.actionButton}>
          <Ionicons name="pencil" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(note.id)} style={styles.actionButton}>
          <Ionicons name="trash" size={24} color={theme.colors.accent} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: theme.spacing.medium,
    elevation: 2,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    padding: theme.spacing.medium,
  },
  title: {
    fontSize: theme.fontSizes.medium,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.small,
  },
  preview: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.secondaryText,
  },
  actionsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: theme.spacing.small,
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.border,
  },
  actionButton: {
    padding: theme.spacing.small,
  },
});