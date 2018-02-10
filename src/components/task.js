import React from 'react';
import PropTypes from 'prop-types';

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
  task: PropTypes.shape({
    name: PropTypes.string,
    duration: PropTypes.number,
    break: PropTypes.number,
    amount: PropTypes.number,
  }),
};
