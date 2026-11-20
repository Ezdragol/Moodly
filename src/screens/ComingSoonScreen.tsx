import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import type { AppTab } from '../components/BottomNavigation';
import { colors } from '../theme/theme';

type Props = {
  section: AppTab;
  onGoHome: () => void;
};

const sectionDetails: Record<'Estadísticas' | 'Autocuidado', { emoji: string; description: string }> = {
  Estadísticas: {
    emoji: '📊',
    description: 'Aquí podrás consultar gráficas y cambios de tu estado emocional con más detalle.',
  },
  Autocuidado: {
    emoji: '💗',
    description: 'Aquí encontrarás ejercicios de respiración y actividades para dedicarte un momento.',
  },
};

export default function ComingSoonScreen({ section, onGoHome }: Props) {
  const details = sectionDetails[section as 'Estadísticas' | 'Autocuidado'];

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.emoji}>{details.emoji}</Text>
      </View>
      <Text style={styles.title}>{section}</Text>
      <Text style={styles.description}>{details.description}</Text>
      <Text style={styles.status}>Esta sección se desarrollará en una siguiente etapa de Moodly.</Text>
      <Button title="Volver a Inicio" onPress={onGoHome} buttonStyle={styles.button} titleStyle={styles.buttonText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: 28 },
  iconCircle: { width: 82, height: 82, borderRadius: 27, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginBottom: 17 },
  emoji: { fontSize: 38 },
  title: { color: colors.title, fontSize: 23, fontWeight: '800' },
  description: { color: colors.text, fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 10 },
  status: { color: colors.muted, fontSize: 11, textAlign: 'center', lineHeight: 17, marginTop: 14, marginBottom: 20 },
  button: { backgroundColor: colors.primary, borderRadius: 13, paddingHorizontal: 25, paddingVertical: 12 },
  buttonText: { fontSize: 13, fontWeight: '700' },
});
