import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { Task } from './task';
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

function getTextFromStyledByClassName(wrapper, className) {
  return wrapper
    .find(`.${className}`)
    .children()
    .text();
}

describe('<Task />', () => {
  test('should display the correct values for normal task', () => {
    const wrapper = shallow(<Task task={task} />);
    expect(getTextFromStyledByClassName(wrapper, 'name')).toBe('task 1');
    expect(getTextFromStyledByClassName(wrapper, 'duration')).toBe('15:00');
    expect(getTextFromStyledByClassName(wrapper, 'break')).toBe('5:00');
    expect(getTextFromStyledByClassName(wrapper, 'amount')).toBe('0');
  });
});
