/* eslint-disable @typescript-eslint/no-empty-interface */
import theme from './theme.json';

export type Theme = typeof theme.light;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
