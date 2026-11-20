const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const Module = require('node:module');
const typescript = require('typescript');

const file = path.resolve(__dirname, '../src/data/diary.ts');
const source = fs.readFileSync(file, 'utf8');
const js = typescript.transpileModule(source, {
  compilerOptions: { module: typescript.ModuleKind.CommonJS, target: typescript.ScriptTarget.ES2022 },
}).outputText;
const compiled = new Module(file, module);
compiled.filename = file;
compiled.paths = module.paths;
compiled._compile(js, file);
const {
  emotions,
  contexts,
  exampleEntries,
  filterEntries,
  getEmotionDetails,
  getContextDetails,
  isValidNote,
  MAX_NOTE_LENGTH,
  createDiaryEntry,
  formatDate,
} = compiled.exports;

test('ofrece las seis emociones y cinco contextos del formulario', () => {
  assert.equal(emotions.length, 6);
  assert.equal(contexts.length, 5);
  assert.deepEqual(emotions.map(item => item.name), ['Feliz', 'Triste', 'Enojado', 'Neutro', 'Ansioso', 'Cansado']);
});

test('incluye tres entradas de ejemplo con datos completos', () => {
  assert.equal(exampleEntries.length, 3);
  for (const entry of exampleEntries) {
    assert.ok(entry.id);
    assert.ok(entry.note);
    assert.ok(entry.date);
    assert.ok(entry.intensity >= 1 && entry.intensity <= 5);
    assert.ok(emotions.some(item => item.name === entry.emotion));
    assert.ok(contexts.some(item => item.name === entry.context));
    assert.ok(Number.isFinite(new Date(entry.date).getTime()));
  }
});

test('permite buscar por emoción, contexto y texto de nota sin acentos', () => {
  assert.equal(filterEntries(exampleEntries, 'feliz').length, 1);
  assert.equal(filterEntries(exampleEntries, 'TRABAJO').length, 1);
  assert.equal(filterEntries(exampleEntries, 'presion').length, 1);
  assert.equal(filterEntries(exampleEntries, 'ejercicio').length, 1);
  assert.equal(filterEntries(exampleEntries, '  ').length, 3);
  assert.equal(filterEntries(exampleEntries, 'sin coincidencia').length, 0);
});

test('exige una nota no vacía de máximo 500 caracteres', () => {
  assert.equal(isValidNote(''), false);
  assert.equal(isValidNote('   '), false);
  assert.equal(isValidNote('Hoy me sentí bien.'), true);
  assert.equal(isValidNote('a'.repeat(MAX_NOTE_LENGTH)), true);
  assert.equal(isValidNote('a'.repeat(MAX_NOTE_LENGTH + 1)), false);
});

test('construye la nueva entrada con fecha, ID y nota sin espacios exteriores', () => {
  const date = new Date('2026-11-03T15:00:00.000Z');
  const entry = createDiaryEntry(
    { emotion: 'Feliz', intensity: 4, context: 'Social', note: '  Me sentí bien.  ' },
    date,
    'entrada-prueba'
  );
  assert.equal(entry.id, 'entrada-prueba');
  assert.equal(entry.date, '2026-11-03T15:00:00.000Z');
  assert.equal(entry.note, 'Me sentí bien.');
});

test('resuelve el emoji, contexto y fecha para cada tarjeta', () => {
  assert.equal(getEmotionDetails('Feliz').emoji, '😊');
  assert.equal(getContextDetails('Social').emoji, '🤝');
  assert.ok(formatDate('2026-11-03T15:00:00.000Z').length > 0);
});

test('calcula el resumen de los últimos siete días y encuentra el registro más reciente', () => {
  const now = new Date('2026-11-16T12:00:00.000Z');
  const entries = [
    { id: 'a', emotion: 'Feliz', intensity: 4, context: 'Social', note: 'Bien', date: '2026-11-16T10:00:00.000Z' },
    { id: 'b', emotion: 'Feliz', intensity: 2, context: 'Estudio', note: 'Bien', date: '2026-11-13T10:00:00.000Z' },
    { id: 'c', emotion: 'Triste', intensity: 5, context: 'Casa', note: 'Mal', date: '2026-11-12T10:00:00.000Z' },
    { id: 'd', emotion: 'Ansioso', intensity: 5, context: 'Trabajo', note: 'Presión', date: '2026-11-01T10:00:00.000Z' },
  ];
  const summary = compiled.exports.getWeeklySummary(entries, now);
  assert.equal(summary.totalEntries, 3);
  assert.equal(summary.averageIntensity, 3.7);
  assert.equal(summary.dominantEmotion, 'Feliz');
  assert.equal(summary.dominantEmotionCount, 2);
  assert.equal(summary.latestEntry.id, 'a');
});

test('devuelve un resumen vacío cuando no existen registros en los últimos siete días', () => {
  const now = new Date('2026-11-16T12:00:00.000Z');
  const entries = [
    { id: 'antigua', emotion: 'Triste', intensity: 3, context: 'Casa', note: 'Hace tiempo', date: '2026-11-01T10:00:00.000Z' },
  ];
  const summary = compiled.exports.getWeeklySummary(entries, now);
  assert.equal(summary.totalEntries, 0);
  assert.equal(summary.averageIntensity, null);
  assert.equal(summary.dominantEmotion, null);
  assert.equal(summary.latestEntry.id, 'antigua');
});

test('identifica empate cuando varias emociones tienen la misma frecuencia', () => {
  const now = new Date('2026-11-16T12:00:00.000Z');
  const entries = [
    { id: 'a', emotion: 'Feliz', intensity: 3, context: 'Social', note: 'Uno', date: '2026-11-16T10:00:00.000Z' },
    { id: 'b', emotion: 'Triste', intensity: 3, context: 'Casa', note: 'Dos', date: '2026-11-15T10:00:00.000Z' },
  ];
  const summary = compiled.exports.getWeeklySummary(entries, now);
  assert.equal(summary.totalEntries, 2);
  assert.equal(summary.dominantEmotion, null);
  assert.equal(summary.dominantEmotionCount, 1);
});
