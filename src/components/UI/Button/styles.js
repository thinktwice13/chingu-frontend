import { css } from 'styled-components';
import themes from 'components/UI/styles/themes';

const sizes = {
  default: css`
    font-size: 14px;
    min-width: 150px;
  `,
  small: css`
    font-size: 10px;
    min-width: 80px;
  `,
  large: css`
    font-size: 18px;
    min-width: 200px;
  `,
};

/**
 * @description gets button size bnased on size prop
 * @param {Object} props passed to Button component
 * @param {string} props.size must be default, small or large
 *
 * @returns {Object} css for button size properties
 */
export const getSize = props => sizes[props.size];

/**
 * @description Invert button styles
 * @param {Object} s - styles
 * @param {string} s.color - primary color
 * @param {string} s.background - background color
 * @param {string} s.border - border color
 * @param {string} s.hover - hover background color
 *
 * @returns {Object} inverted styles object
 */
const invert = s => ({
  color: s.background,
  background: s.color,
  border: s.background,
  hover: '#00000011',
});

/**
 * @description gets button color styles
 * @param {Object} props - cbutton component props must have  theme, disbaled and inverted props
 */
export const getColors = props => {
  const { theme, inverted, disabled } = props;

  const t = disabled ? 'disabled' : theme;

  const { fg, bg } = themes[t];
  let styles = {
    color: fg,
    background: bg,
    border: '#00000000',
    hover: `${bg}aa`,
  };

  if (inverted) {
    styles = invert(styles);
  }

  return css`
    color: ${styles.color};
    background-color: ${styles.background};
    border-color: ${styles.border};
    :hover {
      background-color: ${disabled ? '' : styles.hover};
    }
  `;
};
