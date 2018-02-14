import React from 'react';
import PropTypes from 'prop-types';
import { formatSeconds } from '../util/formatSeconds';
import { task as taskPropType } from '../types/task';

export const Progress = ({ onToggleStartStop, task }) => {
  let time, started;

  if (task) {
    time = task.time;
    started = task.started;
  }

  return (
    <div>
      <div>{time ? formatSeconds(time) : ''}</div>
      <div>
        <button onClick={() => onToggleStartStop()}>
          {started ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
};

Progress.propTypes = {
  onToggleStartStop: PropTypes.func,
  task: taskPropType,
};
