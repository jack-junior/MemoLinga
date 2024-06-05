import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: '#ff7f6b', // Rouge
  secondary: '#2bb1eb', // bleu clair
  tertiary: '#2bb1eb', // Vert '#228B22'
  principal: '#4169E1', 
  green  : '#2dcf42',
  // 1C42A7

  // colors
  black: '#1E1F20',
  white: '#FFFFFF',
  lightGray: '#eff2f5',
  gray: '#8b9097',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: {
    fontFamily: 'Roboto-regular',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: {fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontSize: SIZES.h4, lineHeight: 22},
  body1: {
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};
export const spacing = {
  s: 8,
  m: 18,
  l: 24,
  xl: 40,
};

const appTheme = {COLORS, SIZES, FONTS, spacing};

export default appTheme;
