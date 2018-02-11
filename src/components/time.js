import React from 'react';
import PropTypes from 'prop-types';
import { formatSeconds } from '../util/formatSeconds';

export const Time = ({ time }) => {
  return (
    <div>
      <div>{formatSeconds(time)}</div>
    </div>
  );
};

Time.propTypes = {
  time: PropTypes.number,
};
