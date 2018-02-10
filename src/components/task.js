import React from 'react';
import PropTypes from 'prop-types';
import { task as taskPropType } from '../types/task';

export const Task = ({ task }) => {
  return (
    <div>
      <div>{task.name}</div>
      <div>{task.duration}</div>
      <div>{task.break}</div>
      <div>{task.amount}</div>
    </div>
  );
};

Task.propTypes = {
  task: taskPropType,
};
