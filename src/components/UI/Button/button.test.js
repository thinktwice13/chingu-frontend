import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import { colors, borders } from '../styles/variables';
import Button from '.';
import themes from '../styles/themes';

Enzyme.configure({ adapter: new Adapter() });

describe('Button', () => {
  it('renders as button by default', () => {
    const btn = shallow(<Button href='#'>Click</Button>);
    expect(btn.render()[0].name).toEqual('a');
  });

  it('renders as anchor tag link with href prop', () => {});

  it('renders with correct props', () => {
    const btn = shallow(<Button>Click me</Button>);
    expect(btn.text()).toEqual('Click me');

    btn.setProps({ type: 'submit' });
    expect(btn).toMatchSnapshot();

    btn.setProps({ rounded: true });
    expect(btn).toMatchSnapshot();

    btn.setProps({ inverted: true });
    expect(btn).toMatchSnapshot();

    btn.setProps({ size: 'small' });
    expect(btn).toMatchSnapshot();

    btn.setProps({ size: 'large' });
    expect(btn).toMatchSnapshot();

    btn.setProps({ disabled: true });
    expect(btn).toMatchSnapshot();
  });

  it('renders with correct styles', () => {
    const btn = mount(<Button>CLick me</Button>);

    expect(btn).not.toHaveStyleRule('border-radius', borders.button_border_radius_rounded);

    btn.setProps({ rounded: true });
    expect(btn).toHaveStyleRule('border-radius', borders.button_border_radius_rounded);

    btn.setProps({ disabled: true });
    expect(btn).toHaveStyleRule('background-color', colors.light_grey);

    btn.setProps({ disabled: false });
    expect(btn).toHaveStyleRule('color', 'white');

    btn.setProps({ size: 'small' });
    expect(btn).toHaveStyleRule('padding', '5px');

    btn.setProps({ size: 'large' });
    expect(btn).toHaveStyleRule('font-size', '18px');

    btn.setProps({ theme: 'error' });
    expect(btn).toHaveStyleRule('background-color', themes.error.bg);

    btn.setProps({ theme: 'warning' });
    expect(btn).toHaveStyleRule('background-color', themes.warning.bg);

    btn.setProps({ theme: 'warning', inverted: true });
    expect(btn).toHaveStyleRule('color', themes.warning.bg);
  });

  it('calls event listeners correctly', () => {
    const btn = shallow(<Button>Click me</Button>);

    const onClick = jest.fn();
    btn.setProps({ onClick });

    // Simulate button click
    btn.simulate('click');
    expect(onClick).toBeCalledTimes(1);

    // Alternative way to call event listener prop
    btn.prop('onClick')();
    expect(onClick).toBeCalledTimes(2);
  });
});
