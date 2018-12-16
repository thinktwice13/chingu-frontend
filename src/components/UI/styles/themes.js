import { colors } from 'components/UI/styles/variables';

export default {
  primary: {
    fg: 'white',
    bg: colors.theme_green,
    hover: colors.theme_green__hover,
  },
  error: {
    fg: 'white',
    bg: colors.attention_red,
    hover: colors.attention_red__light,
  },
  warning: {
    fg: 'white',
    bg: colors.health_yellow,
    hover: colors.health_yellow__light,
  },
  info: {
    fg: 'white',
    bg: colors.frontend,
    hover: colors.frontend_dependency,
  },
};