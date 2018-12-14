import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json'; // Needed to exclude enzyme wrapper from saved snapshots
import Button from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('Button', () => {
  it('renders with correct props', () => {
    const btn = shallow(<Button>Click me</Button>);
    expect(btn.text()).toEqual('Click me');

    btn.setProps({ type: 'submit' });
    expect(toJSON(btn)).toMatchSnapshot();
  });
});

// describe('Button', () => {
//   it('render button with correct props', () => {
//     const btn = shallow(<Button>Click me</Button>);
//     expect(btn).toMatchSnapshot();

//     btn.setProps({ disabled: true });
//     expect(btn.render()).toMatchSnapshot();

//     btn.setProps({ inverted: true });
//     expect(btn.render()).toMatchSnapshot();

//     btn.setProps({ size: 'small' });
//     expect(btn.render()).toMatchSnapshot();

//     btn.setProps({ size: 'large' });
//     expect(btn.render()).toMatchSnapshot();

//     btn.setProps({ rounded: true });
//     expect(btn.render()).toMatchSnapshot();

//     btn.setProps({ style: { backgroundColor: 'orange' } });
//     expect(btn.render()).toMatchSnapshot();
//   });

//   it('renders as anchor tag with href prop', () => {
//     const btn = shallow(<Button href='http://www.chingu.io'>Click me</Button>);
//     expect(btn.find('a').exists()).toBe(true);
//     expect(btn.find('button').exists()).toBe(false);
//   });

//   it('calls event listeners', () => {
//     const click = jest.fn();

//     const btn = shallow(<Button onClick={click}>Click me</Button>);

//     btn.simulate('click');
//     expect(click).toBeCalled();

//     btn.simulate('click');
//     btn.simulate('click');
//     expect(click).toBeCalledTimes(3);
//   });
// });
