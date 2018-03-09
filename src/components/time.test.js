import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { Time } from './time';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const task = {
  id: 1,
  name: 'task 1',
  time: 60,
  duration: 15 * 60,
  break: 5 * 60,
  amount: 0,
  state: 0,
  active: false,
};

describe('<Time />', () => {
  test('show 1:00 if 60 seconds is passed as prop', () => {
    const wrapper = shallow(<Time task={task} />);
    expect(wrapper.find('div > div').text()).toBe('1:00');
  });
});
