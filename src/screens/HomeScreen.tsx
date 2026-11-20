import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { formatDate, getEmotionDetails, getLatestEntry } from '../data/diary';
import type { DiaryEntry } from '../data/diary';
import { colors } from '../theme/theme';

type Props = {
  displayName: string;
  entries: DiaryEntry[];
  onOpenDiary: () => void;
  onOpenSelfCare: () => void;
};

export default function HomeScreen({ displayName, entries, onOpenDiary, onOpenSelfCare }: Props) {
  const latestEntry = getLatestEntry(entries);
  const latestEmotion = latestEntry ? getEmotionDetails(latestEntry.emotion) : null;
  const firstName = displayName.trim().split(/\s+/)[0] || 'Kevin';

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.greeting}>Hola, {firstName} 👋</Text>
          <Text style={styles.subtitle}>¿Cómo te sientes hoy?</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>💜</Text>
        </View>
      </View>

      <View style={styles.checkInCard}>
        <View style={styles.checkInText}>
          <Text style={styles.checkInTitle}>Registrar mi ánimo</Text>
          <Text style={styles.checkInDescription}>Dedica un momento para reconocer cómo te sientes.</Text>
        </View>
        <View style={styles.emotionPreview}>
          <Text style={styles.previewEmoji}>😊</Text>
          <Text style={styles.previewEmoji}>😢</Text>
          <Text style={styles.previewEmoji}>😐</Text>
        </View>
        <Button
          title="+ Añadir registro"
          onPress={onOpenDiary}
          buttonStyle={styles.addButton}
          titleStyle={styles.addButtonText}
        />
      </View>

      <View style={styles.breathingCard}>
        <View style={styles.breathingIcon}>
          <Text style={styles.breathingEmoji}>🫁</Text>
        </View>
        <View style={styles.breathingText}>
          <Text style={styles.breathingTitle}>Ejercicios de respiración</Text>
          <Text style={styles.breathingDescription}>Unos minutos de calma para reducir el estrés.</Text>
        </View>
        <Button
          title="Empezar"
          onPress={onOpenSelfCare}
          buttonStyle={styles.breathingButton}
          titleStyle={styles.breathingButtonText}
        />
      </View>

      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Mi último registro</Text>
      </View>

      <View style={styles.latestCard}>
        {latestEntry && latestEmotion ? (
          <>
            <View style={styles.latestTop}>
              <View style={[styles.latestEmojiBox, { backgroundColor: latestEmotion.background }]}>
                <Text style={styles.latestEmoji}>{latestEmotion.emoji}</Text>
              </View>
              <View style={styles.latestInfo}>
                <Text style={styles.latestEmotion}>{latestEntry.emotion}</Text>
                <Text style={styles.latestDate}>{formatDate(latestEntry.date)}</Text>
              </View>
              <Text style={styles.latestIntensity}>{latestEntry.intensity}/5</Text>
            </View>
            <Text style={styles.latestNote} numberOfLines={3}>{latestEntry.note}</Text>
            <Text style={styles.latestContext}>Contexto: {latestEntry.context}</Text>
          </>
        ) : (
          <View style={styles.noLatest}>
            <Text style={styles.noData}>Todavía no tienes entradas. Registra tu primera emoción para comenzar.</Text>
          </View>
        )}
      </View>

      <View style={styles.careCard}>
        <Text style={styles.careEmoji}>🌿</Text>
        <View style={styles.careText}>
          <Text style={styles.careTitle}>Un momento para ti</Text>
          <Text style={styles.careDescription}>Reconocer tus emociones también es una forma de cuidarte.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 23, paddingBottom: 22 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 22 },
  headerText: { flex: 1 },
  greeting: { color: colors.title, fontSize: 25, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 13, marginTop: 5 },
  avatar: { width: 48, height: 48, borderRadius: 17, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  avatarEmoji: { fontSize: 23 },
  checkInCard: { backgroundColor: colors.surface, borderRadius: 21, borderWidth: 1, borderColor: colors.border, padding: 17, marginBottom: 23 },
  checkInText: { marginBottom: 12 },
  checkInTitle: { color: colors.title, fontSize: 17, fontWeight: '700' },
  checkInDescription: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 4 },
  emotionPreview: { flexDirection: 'row', gap: 13, marginBottom: 14 },
  previewEmoji: { fontSize: 26 },
  addButton: { backgroundColor: colors.primary, borderRadius: 13, paddingVertical: 12 },
  addButtonText: { fontSize: 13, fontWeight: '700' },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11, marginTop: 2 },
  sectionTitle: { color: colors.title, fontSize: 15, fontWeight: '700', flexShrink: 1 },
  breathingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5EE', borderRadius: 21, padding: 15, marginBottom: 23 },
  breathingIcon: { width: 52, height: 52, borderRadius: 16, backgroundColor: '#CDEBDA', alignItems: 'center', justifyContent: 'center' },
  breathingEmoji: { fontSize: 27 },
  breathingText: { flex: 1, paddingHorizontal: 12 },
  breathingTitle: { color: colors.title, fontSize: 14, fontWeight: '700' },
  breathingDescription: { color: colors.text, fontSize: 11, lineHeight: 16, marginTop: 3 },
  breathingButton: { backgroundColor: colors.success, borderRadius: 13, paddingVertical: 9, paddingHorizontal: 14 },
  breathingButtonText: { fontSize: 12, fontWeight: '700' },
  noData: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  latestCard: { backgroundColor: colors.surface, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 17 },
  latestTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  latestEmojiBox: { width: 46, height: 46, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  latestEmoji: { fontSize: 26 },
  latestInfo: { flex: 1, paddingLeft: 11 },
  latestEmotion: { color: colors.title, fontSize: 14, fontWeight: '700' },
  latestDate: { color: colors.muted, fontSize: 10, marginTop: 3 },
  latestIntensity: { color: colors.primaryDark, fontSize: 12, fontWeight: '700', backgroundColor: colors.primarySoft, borderRadius: 9, paddingHorizontal: 9, paddingVertical: 6 },
  latestNote: { color: colors.text, fontSize: 12, lineHeight: 18 },
  latestContext: { color: colors.muted, fontSize: 10, marginTop: 10 },
  noLatest: { paddingVertical: 8 },
  careCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F7F2', borderRadius: 17, padding: 14, marginTop: 1 },
  careEmoji: { fontSize: 26, marginRight: 12 },
  careText: { flex: 1 },
  careTitle: { color: colors.title, fontSize: 12, fontWeight: '700' },
  careDescription: { color: colors.text, fontSize: 11, lineHeight: 16, marginTop: 3 },
});
