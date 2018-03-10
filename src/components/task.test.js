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
    expect(wrapper.find('.active').length).toEqual(0);
    expect(wrapper.find('.inactive').length).toEqual(1);
  });

  test('delete a task', () => {
    const deleteMock = jest.fn();
    const wrapper = shallow(<Task task={task} onDelete={deleteMock} />);
    wrapper.find('.delete > img').simulate('click');
    expect(deleteMock).toHaveBeenCalledTimes(1);
    expect(deleteMock).toHaveBeenCalledWith(task);
  });
  test('activate a task', () => {
    const activateMock = jest.fn();
    const wrapper = shallow(<Task task={task} onActivate={activateMock} />);
    wrapper.find('.name').simulate('click');
    expect(activateMock).toHaveBeenCalledTimes(1);
    expect(activateMock).toHaveBeenCalledWith(task);
  });

  test('should display the correct values for activated task', () => {
    const clone = { ...task, active: true };
    const wrapper = shallow(<Task task={clone} />);
    expect(getTextFromStyledByClassName(wrapper, 'name')).toBe('task 1');
    expect(getTextFromStyledByClassName(wrapper, 'duration')).toBe('15:00');
    expect(getTextFromStyledByClassName(wrapper, 'break')).toBe('5:00');
    expect(getTextFromStyledByClassName(wrapper, 'amount')).toBe('0');
    expect(wrapper.find('.active').length).toEqual(1);
    expect(wrapper.find('.inactive').length).toEqual(0);
  });
});
