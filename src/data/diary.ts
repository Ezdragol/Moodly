export const emotions = [
  { name: 'Feliz', emoji: '😊', background: '#FFF3D8' },
  { name: 'Triste', emoji: '😢', background: '#E7F0FF' },
  { name: 'Enojado', emoji: '😠', background: '#FFE5E5' },
  { name: 'Neutro', emoji: '😐', background: '#EFEFFA' },
  { name: 'Ansioso', emoji: '😰', background: '#FFF0DF' },
  { name: 'Cansado', emoji: '😴', background: '#E9E7FF' },
] as const;

export const contexts = [
  { name: 'Estudio', emoji: '📚' },
  { name: 'Trabajo', emoji: '💼' },
  { name: 'Casa', emoji: '🏡' },
  { name: 'Social', emoji: '🤝' },
  { name: 'Ejercicio', emoji: '🏃' },
] as const;

export type Emotion = (typeof emotions)[number]['name'];
export type Context = (typeof contexts)[number]['name'];

export type NewDiaryEntry = {
  emotion: Emotion;
  intensity: number;
  context: Context;
  note: string;
};

export type DiaryEntry = NewDiaryEntry & {
  id: string;
  date: string;
};

export const MAX_NOTE_LENGTH = 500;

function daysAgo(days: number): string {
  const value = new Date();
  value.setDate(value.getDate() - days);
  return value.toISOString();
}

export const exampleEntries: DiaryEntry[] = [
  {
    id: 'ejemplo-1',
    emotion: 'Feliz',
    intensity: 4,
    context: 'Social',
    note: 'Pasé un rato agradable con mis amigos y pude descansar.',
    date: daysAgo(0),
  },
  {
    id: 'ejemplo-2',
    emotion: 'Ansioso',
    intensity: 4,
    context: 'Trabajo',
    note: 'Tuve una entrega importante y sentí bastante presión.',
    date: daysAgo(1),
  },
  {
    id: 'ejemplo-3',
    emotion: 'Cansado',
    intensity: 3,
    context: 'Ejercicio',
    note: 'Hice ejercicio, aunque hoy tenía poca energía.',
    date: daysAgo(2),
  },
];

export function getEmotionDetails(emotion: Emotion) {
  return emotions.find(item => item.name === emotion) ?? emotions[3];
}

export function getContextDetails(context: Context) {
  return contexts.find(item => item.name === context) ?? contexts[0];
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function isValidNote(note: string): boolean {
  const length = note.trim().length;
  return length > 0 && length <= MAX_NOTE_LENGTH;
}

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es-MX');
}

export function filterEntries(entries: DiaryEntry[], search: string): DiaryEntry[] {
  const query = normalize(search.trim());
  if (!query) return entries;
  return entries.filter(entry =>
    [entry.emotion, entry.context, entry.note].some(value =>
      normalize(value).includes(query)
    )
  );
}

export function createDiaryEntry(
  data: NewDiaryEntry,
  date = new Date(),
  id = `${date.getTime()}-${Math.random().toString(36).slice(2, 8)}`
): DiaryEntry {
  return {
    ...data,
    id,
    note: data.note.trim(),
    date: date.toISOString(),
  };
}

export function getLatestEntry(entries: DiaryEntry[]): DiaryEntry | null {
  return [...entries]
    .filter(entry => Number.isFinite(new Date(entry.date).getTime()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] ?? null;
}

export type WeeklySummary = {
  totalEntries: number;
  averageIntensity: number | null;
  dominantEmotion: Emotion | null;
  dominantEmotionCount: number;
  latestEntry: DiaryEntry | null;
};

export function getWeeklySummary(
  entries: DiaryEntry[],
  now = new Date()
): WeeklySummary {
  const endTime = now.getTime();
  const startTime = endTime - 7 * 24 * 60 * 60 * 1000;
  const weeklyEntries = entries.filter(entry => {
    const entryTime = new Date(entry.date).getTime();
    return Number.isFinite(entryTime) && entryTime >= startTime && entryTime <= endTime;
  });

  const emotionCounts = emotions.map(emotion => ({
    emotion: emotion.name,
    count: weeklyEntries.filter(entry => entry.emotion === emotion.name).length,
  }));
  const dominantEmotionCount = Math.max(0, ...emotionCounts.map(item => item.count));
  const dominantEmotions = emotionCounts.filter(item =>
    item.count > 0 && item.count === dominantEmotionCount
  );
  const dominantEmotion = dominantEmotions.length === 1
    ? dominantEmotions[0].emotion
    : null;

  const latestEntry = [...entries]
    .filter(entry => Number.isFinite(new Date(entry.date).getTime()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] ?? null;

  const intensityTotal = weeklyEntries.reduce((total, entry) => total + entry.intensity, 0);

  return {
    totalEntries: weeklyEntries.length,
    averageIntensity: weeklyEntries.length
      ? Number((intensityTotal / weeklyEntries.length).toFixed(1))
      : null,
    dominantEmotion,
    dominantEmotionCount,
    latestEntry,
  };
}
