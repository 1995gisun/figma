// Mirrors the Figma "MUI Workspace" variables (MUI · Components › Foundations).
export const color = {
  blue600: '#1976D2',
  blue700: '#1565C0',
  blue50: '#E3F2FD',
  neutral0: '#FFFFFF',
  neutral50: '#F5F7FA',
  neutral200: '#E2E8F0',
  neutral500: '#64748B',
  neutral800: '#1F2937',
  green800: '#2E7D32',
  green50: '#E8F5E9',
  orange800: '#ED6C02',
  orange50: '#FFF3E0',
} as const;

export const radius = { sm: 4, md: 8, lg: 12 } as const;

export const shadow = {
  card: '0px 2px 4px 0px rgba(31,41,55,0.03)',
  button: '0px 2px 4px 0px rgba(31,41,55,0.12)',
} as const;

export const fontFamily = 'Roboto, "Helvetica Neue", Arial, sans-serif';
