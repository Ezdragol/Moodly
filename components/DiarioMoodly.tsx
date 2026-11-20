import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  ThemeProvider, createTheme, Text, Input, Button, Icon, Overlay
} from '@rneui/themed';

const MORADO = '#927EF2';
const theme = createTheme({
  lightColors: { primary: MORADO, background: '#F9FAFC' },
  mode: 'light',
});

type Emocion = 'Feliz' | 'Triste' | 'Enojado' |
  'Neutro' | 'Ansioso' | 'Cansado';
type Entrada = {
  id: string; emocion: Emocion; intensidad: number;
  contexto: string; nota: string; fecha: string;
};
const emociones: { nombre: Emocion; emoji: string }[] = [
  { nombre: 'Feliz', emoji: '😊' },
  { nombre: 'Triste', emoji: '😢' },
  { nombre: 'Enojado', emoji: '😠' },
  { nombre: 'Neutro', emoji: '😐' },
  { nombre: 'Ansioso', emoji: '😰' },
  { nombre: 'Cansado', emoji: '😴' },
];
const contextos = ['Estudio', 'Trabajo', 'Casa', 'Social', 'Ejercicio'];
const ejemplos: Entrada[] = [
  { id: '1', emocion: 'Feliz', intensidad: 4, contexto: 'Social',
    fecha: 'Hoy, 09:15', nota: 'Desayuné con mis amigos y me sentí muy a gusto.' },
  { id: '2', emocion: 'Ansioso', intensidad: 4, contexto: 'Trabajo',
    fecha: 'Ayer, 21:40', nota: 'Entrega de proyecto. Mucha presión al final.' },
  { id: '3', emocion: 'Cansado', intensidad: 3, contexto: 'Ejercicio',
    fecha: 'Lun, 18:00', nota: 'Fui al gimnasio, pero me sentí sin energía.' },
];

function DiarioMoodly() {
  const [entradas, setEntradas] = useState<Entrada[]>(ejemplos);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [emocion, setEmocion] = useState<Emocion>('Feliz');
  const [intensidad, setIntensidad] = useState(3);
  const [contexto, setContexto] = useState('Estudio');
  const [nota, setNota] = useState('');

  const filtradas = entradas.filter(e =>
    [e.nota, e.contexto, e.emocion].some(valor =>
      valor.toLowerCase().includes(busqueda.toLowerCase().trim())
    )
  );
  const abrirFormulario = () => {
    setEmocion('Feliz'); setIntensidad(3);
    setContexto('Estudio'); setNota('');
    setMostrarFormulario(true);
  };
  const guardar = () => {
    if (!nota.trim()) return;
    const nueva: Entrada = {
      id: Date.now().toString(), emocion, intensidad,
      contexto, nota: nota.trim(), fecha: 'Hoy',
    };
    setEntradas(anteriores => [nueva, ...anteriores]);
    setBusqueda(''); setMostrarFormulario(false);
    setMostrarConfirmacion(true);
  };

  return (
    <SafeAreaView style={styles.pantalla} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.contenido}>
        <Text h4>Diario de Kevin 📓</Text>
        <Input
          placeholder="🔍 Buscar entradas..."
          value={busqueda}
          onChangeText={setBusqueda}
          inputContainerStyle={styles.buscador}
        />
        {filtradas.map(e => (
          <View key={e.id} style={styles.tarjeta}>
            <View style={styles.fila}>
              <Text style={styles.fecha}>
                {emociones.find(x => x.nombre === e.emocion)?.emoji}  {e.fecha}
              </Text>
              <Text style={styles.etiqueta}>{e.contexto}</Text>
            </View>
            <Text style={styles.nota}>{e.nota}</Text>
            <Text style={styles.intensidad}>Intensidad {e.intensidad}/5</Text>
          </View>
        ))}
        {filtradas.length === 0 && <Text>No hay resultados.</Text>}
        <Button title="+ Nueva entrada" onPress={abrirFormulario}
          buttonStyle={styles.boton} />
      </ScrollView>

      <View style={styles.navegacion}>
        {['Inicio', 'Diario', 'Estadísticas', 'Autocuidado'].map((tab, i) => (
          <View key={tab} style={styles.pestana}>
            <Icon name={['home', 'book', 'bar-chart-2', 'heart'][i]}
              type="feather" color={tab === 'Diario' ? MORADO : '#9592AA'} />
            <Text style={{ color: tab === 'Diario' ? MORADO : '#9592AA',
              fontSize: 10 }}>{tab}</Text>
          </View>
        ))}
      </View>

      <Overlay isVisible={mostrarFormulario}
        onBackdropPress={() => setMostrarFormulario(false)}
        overlayStyle={styles.ventana}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Text h4>Nueva entrada</Text>
          <Text style={styles.subtitulo}>¿Cómo te sientes hoy?</Text>
          <View style={styles.opciones}>
            {emociones.map(x => (
              <TouchableOpacity key={x.nombre}
                style={[styles.opcion,
                  emocion === x.nombre && styles.seleccionada]}
                onPress={() => setEmocion(x.nombre)}>
                <Text>{x.emoji} {x.nombre}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.subtitulo}>Intensidad: {intensidad}/5</Text>
          <View style={styles.opciones}>
            {[1, 2, 3, 4, 5].map(n => (
              <TouchableOpacity key={n}
                style={[styles.numero,
                  intensidad === n && styles.seleccionada]}
                onPress={() => setIntensidad(n)}>
                <Text>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.subtitulo}>Contexto</Text>
          <View style={styles.opciones}>
            {contextos.map(x => (
              <TouchableOpacity key={x}
                style={[styles.opcion,
                  contexto === x && styles.seleccionada]}
                onPress={() => setContexto(x)}>
                <Text>{x}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Input placeholder="Escribe cómo estuvo tu día..."
            value={nota} onChangeText={setNota} multiline />
          <Button title="Guardar entrada" onPress={guardar}
            disabled={!nota.trim()} buttonStyle={styles.boton} />
          <Button title="Cancelar" type="clear"
            onPress={() => setMostrarFormulario(false)} />
        </ScrollView>
      </Overlay>

      <Overlay isVisible={mostrarConfirmacion}
        onBackdropPress={() => setMostrarConfirmacion(false)}>
        <Text h4>¡Registro guardado!</Text>
        <Text>Tu entrada se agregó al diario emocional.</Text>
        <Button title="Volver al diario"
          onPress={() => setMostrarConfirmacion(false)} />
      </Overlay>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <DiarioMoodly />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#F9FAFC' },
  contenido: { padding: 22, paddingBottom: 36 },
  buscador: { backgroundColor: 'white', borderBottomWidth: 0,
    borderRadius: 16, marginTop: 12, paddingHorizontal: 12 },
  tarjeta: { backgroundColor: 'white', borderRadius: 20,
    padding: 16, marginBottom: 12 },
  fila: { flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12 },
  fecha: { color: '#89869D', fontSize: 12 },
  etiqueta: { color: '#9384CF', backgroundColor: '#E2DCF7',
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  nota: { color: '#50506C', lineHeight: 22 },
  intensidad: { color: '#9384CF', fontSize: 12, marginTop: 8 },
  boton: { backgroundColor: MORADO, borderRadius: 14,
    marginTop: 10, paddingVertical: 12 },
  navegacion: { flexDirection: 'row', backgroundColor: 'white',
    paddingVertical: 10, justifyContent: 'space-around' },
  pestana: { alignItems: 'center', gap: 4 },
  ventana: { width: '93%', maxHeight: '85%',
    borderRadius: 20, padding: 16 },
  subtitulo: { fontWeight: 'bold', marginTop: 18, marginBottom: 8 },
  opciones: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  opcion: { padding: 9, borderRadius: 12,
    backgroundColor: '#F5F3FA' },
  numero: { padding: 10, minWidth: 38, alignItems: 'center',
    borderRadius: 12, backgroundColor: '#F5F3FA' },
  seleccionada: { backgroundColor: '#DDD5F5',
    borderWidth: 1, borderColor: MORADO },
});
