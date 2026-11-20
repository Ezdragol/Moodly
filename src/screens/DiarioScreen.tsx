import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Input, Overlay, Text } from '@rneui/themed';
import DiaryEntryCard from '../components/DiaryEntryCard';
import NewEntryModal from '../components/NewEntryModal';
import { filterEntries } from '../data/diary';
import type { DiaryEntry, NewDiaryEntry } from '../data/diary';
import { colors } from '../theme/theme';

type Props = {
  displayName: string;
  entries: DiaryEntry[];
  onAddEntry: (data: NewDiaryEntry) => void;
};

export default function DiarioScreen({ displayName, entries, onAddEntry }: Props) {
  const [search, setSearch] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const filteredEntries = useMemo(() => filterEntries(entries, search), [entries, search]);

  const addEntry = (data: NewDiaryEntry) => {
    onAddEntry(data);
    setSearch('');
    setFormVisible(false);
    setConfirmationVisible(true);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heading}>
          <View style={styles.headingText}>
            <Text style={styles.title}>Diario de {displayName}</Text>
            <Text style={styles.description}>Tu espacio para conectar con tus emociones.</Text>
          </View>
          <View style={styles.headingEmoji}>
            <Text style={styles.bookEmoji}>📓</Text>
          </View>
        </View>

        <Input
          placeholder="Buscar por emoción, contexto o nota..."
          value={search}
          onChangeText={setSearch}
          leftIcon={<Text style={styles.searchIcon}>🔎</Text>}
          inputContainerStyle={styles.searchBox}
          inputStyle={styles.searchInput}
          containerStyle={styles.searchContainer}
          autoCorrect={false}
          accessibilityLabel="Buscar entradas del diario"
        />

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Entradas recientes</Text>
          <Text style={styles.counter}>{filteredEntries.length} {filteredEntries.length === 1 ? 'entrada' : 'entradas'}</Text>
        </View>

        {filteredEntries.map(entry => <DiaryEntryCard key={entry.id} entry={entry} />)}

        {filteredEntries.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔎</Text>
            <Text style={styles.emptyTitle}>Sin coincidencias</Text>
            <Text style={styles.emptyText}>Prueba con otra emoción, contexto o palabra de tu nota.</Text>
            <Button title="Limpiar búsqueda" type="clear" onPress={() => setSearch('')} titleStyle={styles.clearLabel} />
          </View>
        )}
      </ScrollView>

      <View style={styles.actionArea}>
        <Button
          title="+ Nueva entrada"
          onPress={() => setFormVisible(true)}
          buttonStyle={styles.newEntryButton}
          titleStyle={styles.newEntryLabel}
          accessibilityLabel="Agregar nueva entrada al diario"
        />
      </View>
      <NewEntryModal
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        onSave={addEntry}
      />
      <Overlay
        isVisible={confirmationVisible}
        onBackdropPress={() => setConfirmationVisible(false)}
        overlayStyle={styles.confirmation}
      >
        <Text style={styles.confirmationEmoji}>💜</Text>
        <Text style={styles.confirmationTitle}>¡Entrada guardada!</Text>
        <Text style={styles.confirmationText}>Tu emoción ya aparece al inicio del diario.</Text>
        <Button
          title="Volver al diario"
          onPress={() => setConfirmationVisible(false)}
          buttonStyle={styles.newEntryButton}
        />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 16 },
  heading: { flexDirection: 'row', alignItems: 'center', marginBottom: 17 },
  headingText: { flex: 1, paddingRight: 8 },
  title: { color: colors.title, fontSize: 26, fontWeight: '700' },
  description: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 5 },
  headingEmoji: { backgroundColor: colors.primarySoft, height: 49, width: 49, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  bookEmoji: { fontSize: 25 },
  searchContainer: { paddingHorizontal: 0, marginBottom: 5 },
  searchBox: { backgroundColor: colors.surface, borderBottomWidth: 0, borderRadius: 15, paddingHorizontal: 12, borderWidth: 1, borderColor: colors.border, height: 48 },
  searchIcon: { fontSize: 16 },
  searchInput: { color: colors.text, fontSize: 13, paddingLeft: 8 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 },
  sectionTitle: { color: colors.title, fontSize: 16, fontWeight: '700' },
  counter: { color: colors.muted, fontSize: 12 },
  emptyState: { alignItems: 'center', backgroundColor: colors.surface, borderRadius: 18, padding: 24, borderWidth: 1, borderColor: colors.border },
  emptyEmoji: { fontSize: 32 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: colors.title, marginTop: 7 },
  emptyText: { textAlign: 'center', color: colors.muted, fontSize: 12, marginTop: 5, lineHeight: 19 },
  clearLabel: { color: colors.primary, fontSize: 13 },
  actionArea: { paddingHorizontal: 20, paddingTop: 9, paddingBottom: 12 },
  newEntryButton: { backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 13 },
  newEntryLabel: { fontWeight: '700' },
  confirmation: { width: '86%', maxWidth: 400, borderRadius: 20, padding: 24, alignItems: 'stretch' },
  confirmationEmoji: { textAlign: 'center', fontSize: 36, marginBottom: 7 },
  confirmationTitle: { color: colors.title, fontSize: 20, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  confirmationText: { color: colors.text, fontSize: 13, marginBottom: 18, textAlign: 'center' },
});
