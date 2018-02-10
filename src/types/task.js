import PropTypes from 'prop-types';

export const task = PropTypes.shape({
  name: PropTypes.string,
  duration: PropTypes.number,
  break: PropTypes.number,
  amount: PropTypes.number,
});
