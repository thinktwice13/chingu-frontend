import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import variables from 'components/UI/styles/variables';
import media from 'components/UI/styles/mediaSizes';
import themes from 'components/UI/styles/themes';
import Button from '.';

Enzyme.configure({ adapter: new Adapter() });
const { colors } = variables;

describe('Button', () => {
  it('renders as button by default', () => {
    const btn = shallow(<Button>Click</Button>);
    expect(btn).toMatchSnapshot();
    expect(btn.render()[0].name).toEqual('button');
  });

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

    expect(btn).toHaveStyleRule('border-radius', '5px');

    btn.setProps({ rounded: true });
    expect(btn).toHaveStyleRule('border-radius', '20px');

    btn.setProps({ disabled: true });
    expect(btn).toHaveStyleRule('background-color', colors.light_grey);

    btn.setProps({ disabled: false });
    expect(btn).toHaveStyleRule('color', 'white');

    btn.setProps({ size: 'large' });
    expect(btn).toHaveStyleRule('font-size', '18px');

    btn.setProps({ theme: 'error' });
    expect(btn).toHaveStyleRule('background-color', themes.error.bg);

    btn.setProps({ theme: 'warning' });
    expect(btn).toHaveStyleRule('background-color', themes.warning.bg);

    btn.setProps({ theme: 'warning', inverted: true });
    expect(btn).toHaveStyleRule('color', themes.warning.bg);
  });

  it('applies media query style correctly', () => {
    const btn = mount(<Button>CLick me</Button>);

    expect(btn).toHaveStyleRule('width', '100%', {
      media: `(max-width:${media.phone}px)`,
    });
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

  it('renders as anchor tag link with href prop', () => {
    const btn = shallow(<Button href='#'>Click</Button>);
    expect(btn).toMatchSnapshot();
    expect(btn.render()[0].name).toEqual('a');
  });

  it('renders custom component if proviuded as prop', () => {
    const btn = shallow(
      <Button component={() => <img className='myClassName' alt='' />}>Click</Button>,
    );

    const rendered = btn.render()[0];

    expect(btn).toMatchSnapshot();
    expect(rendered.name).toEqual('img');
    expect(rendered.attribs.class).toEqual('myClassName');
  });

  // it('renders as React-router Link if provided "to" prop', () => {
  //   const btn = shallow(
  //     <BrowserRouter>
  //         <Button to='/'>Click</Button>
  //     </BrowserRouter>,
  //   );
  //   console.log(btn.render());
  // });
});
