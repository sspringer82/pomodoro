import React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import * as momentDurationFormat from 'moment-duration-format';
import { task as taskPropType } from '../types/task';

momentDurationFormat(moment);

export const Task = ({ task }) => {
  return (
    <div>
      <div>{task.name}</div>
      <div>{moment.duration(task.duration, 'seconds').format()}</div>
      <div>{moment.duration(task.break, 'seconds').format()}</div>
      <div>{task.amount}</div>
    </div>
  );
};

Task.propTypes = {
  task: taskPropType,
};
