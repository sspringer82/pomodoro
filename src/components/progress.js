import React from 'react';
import PropTypes from 'prop-types';
import { formatSeconds } from '../util/formatSeconds';

export const Progress = ({ onToggleStartStop, time, started }) => {
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
  time: PropTypes.number,
  started: PropTypes.bool,
};
