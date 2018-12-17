import variables from 'components/UI/styles/variables';

const { colors } = variables;

export default {
  default: {
    fg: 'white',
    bg: colors.theme_green,
  },
  error: {
    fg: 'white',
    bg: colors.attention_red,
  },
  warning: {
    fg: 'white',
    bg: colors.health_yellow,
  },
  info: {
    fg: 'white',
    bg: 'steelblue',
  },
  disabled: {
    fg: 'white',
    bg: colors.light_grey,
  },
};
