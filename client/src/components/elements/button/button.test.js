import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Button from './button';

describe('Button Component', () => {
  it('Should exist', () => {
    expect(Button).toMatchSnapshot();
  });

  it('Should render a default button', () => {
    const button = renderer.create(<Button>Click</Button>);
    expect(button.toJSON()).toMatchSnapshot();
  });

  it('Should render a secondary button', () => {
    const button = renderer.create(<Button color='secondary'>Click</Button>);
    expect(button.toJSON()).toMatchSnapshot();
  });

  it('Should render a full width button', () => {
    const button = renderer.create(<Button fullwidth>Click</Button>);
    expect(button.toJSON()).toMatchSnapshot();
  });

  it('Should render an outlined button', () => {
    const button = renderer.create(<Button outlined>Click</Button>);
    expect(button.toJSON()).toMatchSnapshot();
  });

  it('Should render a loading button', () => {
    const button = renderer.create(<Button loading>Click</Button>);
    expect(button.toJSON()).toMatchSnapshot();
  });

  it('Should render a disabled button', () => {
    const button = renderer.create(<Button disabled>Click</Button>);
    expect(button.toJSON()).toMatchSnapshot();
  });

  it('Should have a click listener', () => {
    const onClick = jest.fn();
    const button = shallow(<Button onClick={onClick} />);
    button.simulate('click');
    button.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('Should not dispatch click event if disabled', () => {
    const onClick = jest.fn();
    const button = shallow(<Button disabled onClick={onClick} />);
    button.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('Should have a default click event', () => {
    const spy = jest.spyOn(Button.defaultProps, 'onClick');
    const button = shallow(<Button />);
    button.simulate('click');
    button.simulate('click');
    expect(spy).toHaveBeenCalledTimes(2);
    Button.defaultProps.onClick.mockRestore();
  });
});
