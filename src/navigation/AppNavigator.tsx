import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation, { type AppTab } from '../components/BottomNavigation';
import { createDiaryEntry, exampleEntries } from '../data/diary';
import type { DiaryEntry, NewDiaryEntry } from '../data/diary';
import ComingSoonScreen from '../screens/ComingSoonScreen';
import DiarioScreen from '../screens/DiarioScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { colors } from '../theme/theme';

export default function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [displayName, setDisplayName] = useState('Kevin');
  const [activeTab, setActiveTab] = useState<AppTab>('Inicio');
  const [entries, setEntries] = useState<DiaryEntry[]>(exampleEntries);

  const login = (username: string) => {
    setDisplayName(username);
    setIsAuthenticated(true);
    setActiveTab('Inicio');
  };

  const addEntry = (data: NewDiaryEntry) => {
    setEntries(previous => [createDiaryEntry(data), ...previous]);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {activeTab === 'Inicio' && (
          <HomeScreen
            displayName={displayName}
            entries={entries}
            onOpenDiary={() => setActiveTab('Diario')}
            onOpenSelfCare={() => setActiveTab('Autocuidado')}
          />
        )}
        {activeTab === 'Diario' && (
          <DiarioScreen
            displayName={displayName}
            entries={entries}
            onAddEntry={addEntry}
          />
        )}
        {(activeTab === 'Estadísticas' || activeTab === 'Autocuidado') && (
          <ComingSoonScreen section={activeTab} onGoHome={() => setActiveTab('Inicio')} />
        )}
      </View>
      <BottomNavigation activeTab={activeTab} onSelect={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1 },
});
