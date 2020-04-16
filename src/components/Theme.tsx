import { createContext, useContext } from 'react';
import {
  primary_color,
  warning_color,
  error_color,
  info_color,
  dark_color,
  grey_color,
  light_color,
  lighter_color,
  background_color,
  font_size,
  font_size_sm,
  font_size_h4,
  font_size_h3,
  font_size_h1,
  font_size_h2,
  bottom_border_color
} from '@/config/theme';
import { scaleFont } from '@/utils/scale';

const defaultTheme = {
  color: {
    primary: primary_color,
    warning: warning_color,
    error: error_color,
    info: info_color,
    dark: dark_color,
    grey: grey_color,
    light: light_color,
    lighter: lighter_color,
    background: background_color,
    foreground: '#fff',
    line: bottom_border_color,
    header: primary_color
  },
  fontSize: {
    xl: scaleFont(40),
    lg: scaleFont(36),
    h1: font_size_h1,
    h2: font_size_h2,
    h3: font_size_h3,
    h4: font_size_h4,
    md: font_size,
    sm: font_size_sm
  }
};

export const theme = {
  light: defaultTheme,
  dark: {
    ...defaultTheme,
    color: {
      ...defaultTheme.color,
      background: '#000',
      foreground: '#222',
      line: '#666',
      header: '#111',
      dark: '#fff'
    }
  }
};

const Context = createContext(defaultTheme);

export function useTheme() {
  return useContext(Context);
}

export const ThemeProvider = Context.Provider;

export const ThemeConsumer = Context.Consumer;

export type ThemeType = typeof defaultTheme;