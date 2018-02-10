import React from 'react';
import PropTypes from 'prop-types';
import { task as taskPropType } from '../types/task';
import { Task } from './task';

export const TaskList = ({ tasks }) => {
  return <div>{tasks.map(task => <Task task={task} />)}</div>;
};

Task.propTypes = {
  tasks: PropTypes.arrayOf(taskPropType),
};
