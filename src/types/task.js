import PropTypes from 'prop-types';

export const task = PropTypes.shape({
  name: PropTypes.string,
  time: PropTypes.number,
  duration: PropTypes.number,
  break: PropTypes.number,
  amount: PropTypes.number,
  started: PropTypes.number,
});
