import PropTypes from 'prop-types';

export const task = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  time: PropTypes.number,
  duration: PropTypes.number,
  break: PropTypes.number,
  amount: PropTypes.number,
  started: PropTypes.bool,
  active: PropTypes.bool,
});
