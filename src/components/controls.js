import React from 'react';
import PropTypes from 'prop-types';

export const Controls = ({ onIncrease, onDecrease, onReset }) => {
  return (
    <div>
      <div>
        <div>
          <button onClick={onIncrease()}>increase</button>
        </div>
        <div>
          <button onClick={onDecrease()}>decrease</button>
        </div>
      </div>
      <div>Time</div>
      <div>
        <button onClick={onReset()}>reset</button>
      </div>
    </div>
  );
};

Controls.propTypes = {
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
  onReset: PropTypes.func,
};
