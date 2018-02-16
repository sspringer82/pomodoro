import React from 'react';
import PropTypes from 'prop-types';
import { task as taskPropType } from '../types/task';
import { Task } from './task';

export const TaskList = ({ tasks, onDelete, onActivate }) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onDelete={onDelete}
          onActivate={onActivate}
        />
      ))}
    </div>
  );
};

Task.propTypes = {
  tasks: PropTypes.arrayOf(taskPropType),
  onDelete: PropTypes.func,
  onActivate: PropTypes.func,
};
