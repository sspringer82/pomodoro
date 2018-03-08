import React from 'react';
import PropTypes from 'prop-types';
import { formatSeconds } from '../util/formatSeconds';
import { task as taskPropType } from '../types/task';

export const Time = ({ task: { time } }) => {
  return (
    <div>
      <div>{formatSeconds(time)}</div>
    </div>
  );
};

Time.propTypes = {
  task: taskPropType,
};
