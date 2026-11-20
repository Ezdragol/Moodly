import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Input, Overlay, Text } from '@rneui/themed';
import { contexts, emotions, isValidNote, MAX_NOTE_LENGTH } from '../data/diary';
import type { Context, Emotion, NewDiaryEntry } from '../data/diary';
import { colors } from '../theme/theme';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (value: NewDiaryEntry) => void;
};

export default function NewEntryModal({ visible, onClose, onSave }: Props) {
  const [emotion, setEmotion] = useState<Emotion>('Feliz');
  const [intensity, setIntensity] = useState(3);
  const [context, setContext] = useState<Context>('Estudio');
  const [note, setNote] = useState('');
  const [showError, setShowError] = useState(false);

  const reset = () => {
    setEmotion('Feliz');
    setIntensity(3);
    setContext('Estudio');
    setNote('');
    setShowError(false);
  };

  const close = () => {
    reset();
    onClose();
  };

  const save = () => {
    if (!isValidNote(note)) {
      setShowError(true);
      return;
    }
    onSave({ emotion, intensity, context, note: note.trim() });
    reset();
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={close}
      overlayStyle={styles.modal}
      accessibilityViewIsModal
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.title}>Nueva entrada ✨</Text>
              <Text style={styles.intro}>Registra cómo te sientes en este momento.</Text>
            </View>
            <TouchableOpacity onPress={close} accessibilityRole="button" accessibilityLabel="Cerrar formulario" style={styles.closeButton}>
              <Text style={styles.closeLabel}>×</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>¿Cómo te sientes hoy?</Text>
          <View style={styles.emotionsGrid}>
            {emotions.map(item => (
              <TouchableOpacity
                key={item.name}
                accessibilityRole="button"
                accessibilityLabel={`Emoción ${item.name}`}
                accessibilityState={{ selected: emotion === item.name }}
                onPress={() => setEmotion(item.name)}
                style={[styles.emotionOption, emotion === item.name && styles.selectedOption]}
              >
                <Text style={styles.emotionEmoji}>{item.emoji}</Text>
                <Text style={[styles.emotionName, emotion === item.name && styles.selectedText]}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Intensidad de la emoción</Text>
            <Text style={styles.intensityPill}>{intensity}/5</Text>
          </View>
          <View style={styles.levelsRow}>
            {[1, 2, 3, 4, 5].map(level => (
              <TouchableOpacity
                key={level}
                accessibilityRole="button"
                accessibilityLabel={`Intensidad ${level} de 5`}
                accessibilityState={{ selected: intensity === level }}
                onPress={() => setIntensity(level)}
                style={[styles.level, intensity === level && styles.selectedLevel]}
              >
                <Text style={[styles.levelText, intensity === level && styles.selectedLevelText]}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.levelDescription}>
            <Text style={styles.hint}>Leve</Text>
            <Text style={styles.hint}>Muy intensa</Text>
          </View>

          <Text style={styles.sectionTitle}>¿En qué contexto?</Text>
          <View style={styles.contextsRow}>
            {contexts.map(item => (
              <TouchableOpacity
                key={item.name}
                accessibilityRole="button"
                accessibilityLabel={`Contexto ${item.name}`}
                accessibilityState={{ selected: context === item.name }}
                onPress={() => setContext(item.name)}
                style={[styles.contextOption, context === item.name && styles.selectedOption]}
              >
                <Text style={[styles.contextText, context === item.name && styles.selectedText]}>
                  {item.emoji} {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Cuéntame un poco más</Text>
            <Text style={styles.hint}>{note.length}/{MAX_NOTE_LENGTH}</Text>
          </View>
          <Input
            placeholder="¿Qué pasó hoy? ¿Qué te hizo sentir así?"
            value={note}
            onChangeText={value => {
              setNote(value);
              if (showError) setShowError(false);
            }}
            multiline
            numberOfLines={4}
            maxLength={MAX_NOTE_LENGTH}
            textAlignVertical="top"
            containerStyle={styles.noteContainer}
            inputContainerStyle={[styles.noteField, showError && styles.noteError]}
            inputStyle={styles.noteInput}
            errorMessage={showError ? 'Escribe una nota para guardar tu entrada.' : undefined}
            errorStyle={styles.errorText}
          />

          <Button title="Guardar entrada" onPress={save} buttonStyle={styles.saveButton} titleStyle={styles.saveLabel} />
          <Button title="Cancelar" type="clear" onPress={close} titleStyle={styles.cancelLabel} containerStyle={styles.cancelButton} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  modal: { width: '94%', maxWidth: 460, maxHeight: '88%', borderRadius: 23, padding: 19, backgroundColor: colors.surface },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 },
  headerText: { flex: 1 },
  title: { color: colors.title, fontSize: 21, fontWeight: '700' },
  intro: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 5 },
  closeButton: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', marginLeft: 4 },
  closeLabel: { color: colors.muted, fontSize: 26, lineHeight: 30 },
  sectionTitle: { color: colors.title, fontSize: 14, fontWeight: '700', marginTop: 17, marginBottom: 10 },
  emotionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  emotionOption: { width: '30.5%', paddingVertical: 10, borderRadius: 14, alignItems: 'center', backgroundColor: colors.chip, borderWidth: 1, borderColor: 'transparent' },
  selectedOption: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  emotionEmoji: { fontSize: 27, marginBottom: 5 },
  emotionName: { color: colors.text, fontSize: 12 },
  selectedText: { color: colors.primaryDark, fontWeight: '700' },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  intensityPill: { color: colors.primaryDark, backgroundColor: colors.primarySoft, fontSize: 12, paddingHorizontal: 9, paddingVertical: 4, borderRadius: 10, overflow: 'hidden' },
  levelsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  level: { flex: 1, backgroundColor: colors.chip, borderRadius: 12, borderWidth: 1, borderColor: 'transparent', paddingVertical: 11, alignItems: 'center' },
  selectedLevel: { backgroundColor: colors.primary, borderColor: colors.primaryDark },
  levelText: { fontSize: 14, fontWeight: '600', color: colors.text },
  selectedLevelText: { color: colors.surface },
  levelDescription: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 },
  hint: { color: colors.muted, fontSize: 11 },
  contextsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  contextOption: { backgroundColor: colors.chip, paddingVertical: 9, paddingHorizontal: 11, borderRadius: 12, borderWidth: 1, borderColor: 'transparent' },
  contextText: { color: colors.text, fontSize: 12 },
  noteContainer: { paddingHorizontal: 0, paddingTop: 0 },
  noteField: { minHeight: 105, alignItems: 'flex-start', backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 13, paddingHorizontal: 9, paddingTop: 8, paddingBottom: 4 },
  noteError: { borderColor: colors.error },
  noteInput: { minHeight: 87, fontSize: 13, color: colors.text },
  errorText: { color: colors.error, fontSize: 11 },
  saveButton: { backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 12, marginTop: 5 },
  saveLabel: { fontWeight: '700' },
  cancelButton: { marginTop: 4 },
  cancelLabel: { color: colors.muted, fontSize: 13 },
});
