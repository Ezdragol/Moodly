import { createTheme } from '@rneui/themed';

export const colors = {
  primary: '#927EF2',
  primaryDark: '#7863D9',
  primarySoft: '#EDE7FF',
  background: '#F9FAFC',
  surface: '#FFFFFF',
  title: '#302B47',
  text: '#57516A',
  muted: '#89839E',
  border: '#EAE6F2',
  chip: '#F3F0FB',
  error: '#BD4766',
  success: '#5FAD9C',
};

export const theme = createTheme({
  lightColors: {
    primary: colors.primary,
    background: colors.background,
  },
  mode: 'light',
});
