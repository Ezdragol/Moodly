import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { colors } from '../theme/theme';

type Props = {
  onLogin: (username: string) => void;
};

export default function LoginScreen({ onLogin }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    if (!username.trim() || !password.trim()) {
      setError('Escribe tu usuario y contraseña para continuar.');
      return;
    }
    setError('');
    onLogin(username.trim());
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>☺</Text>
        </View>
        <Text style={styles.brand}>Moodly</Text>
        <Text style={styles.tagline}>Tu espacio para conectar con tus emociones</Text>

        <View style={styles.card}>
          <Text style={styles.welcome}>¡Bienvenido de nuevo!</Text>
          <Text style={styles.description}>Inicia sesión para continuar con tu diario emocional.</Text>

          <Text style={styles.label}>Usuario</Text>
          <Input
            value={username}
            onChangeText={value => {
              setUsername(value);
              if (error) setError('');
            }}
            placeholder="Escribe tu usuario"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={<Text style={styles.inputEmoji}>👤</Text>}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            containerStyle={styles.inputOuter}
            accessibilityLabel="Usuario"
          />

          <Text style={styles.label}>Contraseña</Text>
          <Input
            value={password}
            onChangeText={value => {
              setPassword(value);
              if (error) setError('');
            }}
            placeholder="Escribe tu contraseña"
            secureTextEntry
            autoCapitalize="none"
            leftIcon={<Text style={styles.inputEmoji}>🔒</Text>}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            containerStyle={styles.inputOuter}
            accessibilityLabel="Contraseña"
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            title="Iniciar sesión"
            onPress={submit}
            buttonStyle={styles.loginButton}
            titleStyle={styles.loginButtonText}
          />
          <Text style={styles.demoText}>
            Versión de demostración: puedes ingresar con cualquier usuario y contraseña.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 32 },
  logoCircle: { width: 72, height: 72, borderRadius: 24, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginBottom: 9 },
  logoEmoji: { color: colors.primaryDark, fontSize: 49, fontWeight: '700', lineHeight: 58 },
  brand: { color: colors.title, fontSize: 31, fontWeight: '800', letterSpacing: 0.4 },
  tagline: { color: colors.muted, fontSize: 12, textAlign: 'center', marginTop: 5, marginBottom: 27 },
  card: { width: '100%', maxWidth: 430, backgroundColor: colors.surface, borderRadius: 24, padding: 22, borderWidth: 1, borderColor: colors.border, shadowColor: '#302B47', shadowOpacity: 0.06, shadowRadius: 14, shadowOffset: { width: 0, height: 6 }, elevation: 2 },
  welcome: { color: colors.title, fontSize: 21, fontWeight: '700', textAlign: 'center' },
  description: { color: colors.muted, fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 6, marginBottom: 22 },
  label: { color: colors.title, fontSize: 13, fontWeight: '700', marginBottom: 4 },
  inputOuter: { paddingHorizontal: 0, marginBottom: 10 },
  inputContainer: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 13, paddingHorizontal: 11, height: 49, borderBottomWidth: 1 },
  input: { color: colors.text, fontSize: 13 },
  inputEmoji: { fontSize: 16, marginRight: 7 },
  error: { color: colors.error, fontSize: 12, marginBottom: 12, marginTop: -4 },
  loginButton: { backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 14, marginTop: 2 },
  loginButtonText: { fontWeight: '700', fontSize: 14 },
  demoText: { color: colors.muted, fontSize: 10, lineHeight: 15, textAlign: 'center', marginTop: 15 },
});
