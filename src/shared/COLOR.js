/* CSS - Cascading Style Sheet */
/* Palette color codes */
/* Palette URL: http://paletton.com/#uid=34h0r1klhllaDvZfYqDqyg2vUaIklhllaDvZfYqDqyg2vUaIklhllaDvZfYqDqyg2vUaI */
/* "Feel free to copy&paste color codes to your application" */
/* As hex codes, the following is the way the codes are ouput from Palette Color Codes */
const COLOR = {
  primary0: { color: '#433075' },	/* Main Primary color */
  primary1: { color: '#897BAF' },
  primary2: { color: '#635192' },
  primary3: { color: '#291758' }, /* Darkest */
  primary4: { color: '#15073B' },
  primaryLightest: {color: '#B8AFCF'},

  secondary10: { color: '#AAAA39' },	/* Main Secondary color (1) */
  secondary11: { color: '#FFFFAA' },
  secondary12: { color: '#D4D46A' },
  secondary13: { color: '#808016' },
  secondary14: { color: '#555500' },

  secondary20: { color: '#AA8839' },	/* Main Secondary color (2) */
  secondary21: { color: '#FFE5AA' },
  secondary22: { color: '#D4B56A' },
  secondary23: { color: '#806016' },
  secondary24: { color: '#553C00' },
};

// Define different component generic color sets
const GENERIC = {
  COLOR,
  BUTTON_COLORS:{
    active: {
      color: COLOR.primary4.color,
      background: COLOR.secondary22.color,
    },
    inactive: {
      color: COLOR.secondary21.color,
      background: COLOR.primary3.color
    },
  },
  DISPLAY_TIME: {
    label: {
      color: COLOR.primaryLightest.color,
    },
    active: {
      color: COLOR.secondary11.color,
    },
    inactive: {
      color: COLOR.secondary10.color,
    },
  },
  DISPLAY_ROUNDS: {
    active: {
      color: COLOR.primary4.color,
      background: COLOR.secondary10.color,
    },
    inactive: {
      color: COLOR.secondary13.color,
      background: COLOR.primary1.color,
    },
    resting: {
      color: COLOR.primary1.color,
      background: COLOR.primary3.color,
    },
    label: {
      color: COLOR.primaryLightest.color,
    }
  },
  INPUT: {
    DEFAULT: {
      color: COLOR.primary3.color,
      background: COLOR.primaryLightest.color,
    },
    LABEL: {
      color: COLOR.primaryLightest.color,
    }
  },
  PANEL: {
    DEFAULT:{
      color: COLOR.primary0.color,
      background: COLOR.primary1.color,
    },
    INPUT:{
      background: COLOR.primary2.color,
    },
    DISPLAY:{
      default: {background: COLOR.primary0.color},
      ready: {background: COLOR.secondary12.color},
      end: {background: COLOR.secondary14.color},
    },
    CONTROLS: {
      background: COLOR.primary2.color,
    },
  }
}

export default GENERIC;
