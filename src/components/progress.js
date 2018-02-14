import React from 'react';
import PropTypes from 'prop-types';
import { formatSeconds } from '../util/formatSeconds';
import { task as taskPropType } from '../types/task';

export const Progress = ({ onToggleStartStop, task: { time, started } }) => {
  return (
    <div>
      <div>{formatSeconds(time)}</div>
      <div>
        <button onClick={onToggleStartStop()}>
          {started ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
};

Progress.propTypes = {
  onToggleStartStop: PropTypes.func,
  started: PropTypes.bool,
  task: taskPropType,
};
