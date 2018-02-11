import React from 'react';
import PropTypes from 'prop-types';
import { formatSeconds } from '../util/formatSeconds';
import { task as taskPropType } from '../types/task';

export const Task = ({ task }) => {
  return (
    <div>
      <div>{task.name}</div>
      <div>{formatSeconds(task.duration)}</div>
      <div>{formatSeconds(task.break)}</div>
      <div>{task.amount}</div>
    </div>
  );
};

Task.propTypes = {
  task: taskPropType,
};
