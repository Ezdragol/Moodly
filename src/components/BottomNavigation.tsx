import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@rneui/themed';
import { colors } from '../theme/theme';

export type AppTab = 'Inicio' | 'Diario' | 'Estadísticas' | 'Autocuidado';

type Props = {
  activeTab: AppTab;
  onSelect: (tab: AppTab) => void;
};

const tabs: { title: AppTab; emoji: string }[] = [
  { title: 'Inicio', emoji: '🏠' },
  { title: 'Diario', emoji: '📖' },
  { title: 'Estadísticas', emoji: '📊' },
  { title: 'Autocuidado', emoji: '💗' },
];

export default function BottomNavigation({ activeTab, onSelect }: Props) {
  return (
    <View style={styles.container} accessibilityLabel={`Navegación principal. ${activeTab} seleccionado.`}>
      {tabs.map(tab => {
        const selected = activeTab === tab.title;
        return (
          <TouchableOpacity
            key={tab.title}
            style={styles.tab}
            onPress={() => onSelect(tab.title)}
            accessibilityRole="button"
            accessibilityLabel={`Ir a ${tab.title}`}
            accessibilityState={{ selected }}
          >
            <Text style={styles.emoji}>{tab.emoji}</Text>
            <Text style={[styles.label, selected && styles.active]}>{tab.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
    paddingBottom: 8,
  },
  tab: { alignItems: 'center', justifyContent: 'center', flex: 1, gap: 3, minHeight: 48 },
  emoji: { fontSize: 21 },
  label: { color: colors.muted, fontSize: 10 },
  active: { color: colors.primary, fontWeight: '700' },
});
