import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';
import { formatDate, getContextDetails, getEmotionDetails } from '../data/diary';
import type { DiaryEntry } from '../data/diary';
import { colors } from '../theme/theme';

type Props = {
  entry: DiaryEntry;
};

export default function DiaryEntryCard({ entry }: Props) {
  const emotion = getEmotionDetails(entry.emotion);
  const context = getContextDetails(entry.context);

  return (
    <View style={styles.card} accessible accessibilityLabel={`${entry.emotion}, intensidad ${entry.intensity} de 5, ${entry.context}, ${formatDate(entry.date)}. ${entry.note}`}>
      <View style={styles.topRow}>
        <View style={[styles.emojiContainer, { backgroundColor: emotion.background }]}>
          <Text style={styles.emoji}>{emotion.emoji}</Text>
        </View>
        <View style={styles.headingText}>
          <Text style={styles.emotion}>{entry.emotion}</Text>
          <Text style={styles.date}>{formatDate(entry.date)}</Text>
        </View>
        <View style={styles.contextChip}>
          <Text style={styles.context}>{context.emoji} {context.name}</Text>
        </View>
      </View>
      <Text style={styles.note}>{entry.note}</Text>
      <View style={styles.footer}>
        <Text style={styles.intensityLabel}>Intensidad</Text>
        <View style={styles.bars}>
          {[1, 2, 3, 4, 5].map(level => (
            <View
              key={level}
              style={[styles.bar, level <= entry.intensity && styles.barFilled]}
            />
          ))}
        </View>
        <Text style={styles.intensityValue}>{entry.intensity}/5</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 21,
    padding: 17,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 13 },
  emojiContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 27 },
  headingText: { flex: 1, paddingLeft: 11 },
  emotion: { fontSize: 15, color: colors.title, fontWeight: '700' },
  date: { color: colors.muted, fontSize: 11, marginTop: 3 },
  contextChip: {
    backgroundColor: colors.primarySoft,
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 12,
    maxWidth: 124,
  },
  context: { color: colors.primaryDark, fontSize: 11, fontWeight: '600' },
  note: { color: colors.text, fontSize: 14, lineHeight: 21 },
  footer: { flexDirection: 'row', alignItems: 'center', marginTop: 16, gap: 8 },
  intensityLabel: { fontSize: 11, color: colors.muted },
  bars: { flexDirection: 'row', gap: 4, flex: 1 },
  bar: { width: 17, height: 6, borderRadius: 3, backgroundColor: colors.border },
  barFilled: { backgroundColor: colors.primary },
  intensityValue: { fontSize: 11, color: colors.primaryDark, fontWeight: '700' },
});
