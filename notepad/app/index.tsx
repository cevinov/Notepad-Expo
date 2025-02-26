import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import NoteItem from '../components/NoteItem';
import { useNotes } from '../hooks/useNotes';
import { theme } from '../constants/theme';

export default function Home() {
  const { notes, loadNotes, deleteNote } = useNotes();
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadNotes();
    setIsRefreshing(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteNote(id) }
      ]
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>NOTEPAD-TK1</Text>
        <TouchableOpacity onPress={handleRefresh} disabled={isRefreshing}>
          {isRefreshing ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <Ionicons name="refresh" size={24} color={theme.colors.primary} />
          )}
        </TouchableOpacity>
      </View>
      <FlatList
        data={notes}
        renderItem={({ item }) => <NoteItem note={item} onDelete={handleDelete} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/new-note')}
      >
        <Text style={styles.addButtonText}>+</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.large,
  },
  title: {
    fontSize: theme.fontSizes.extraLarge,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  listContent: {
    paddingBottom: theme.spacing.large,
  },
  addButton: {
    position: 'absolute',
    right: theme.spacing.large,
    bottom: theme.spacing.large,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    fontSize: 32,
    color: 'white',
  },
});