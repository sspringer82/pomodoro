import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { task as taskPropType } from '../types/task';
import { formatSeconds } from '../util/formatSeconds';

const Container = styled.div`
  display: flex;
`;

export const Controls = ({ onIncrease, onDecrease, onReset, task }) => {
  const time = task ? task.time : '';
  return (
    <Container>
      <div>
        <div>
          <button onClick={onIncrease()}>increase</button>
        </div>
        <div>
          <button onClick={onDecrease()}>decrease</button>
        </div>
      </div>
      <div>{formatSeconds(time)}</div>
      <div>
        <button onClick={onReset()}>reset</button>
      </div>
    </Container>
  );
};

Controls.propTypes = {
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
  onReset: PropTypes.func,
  task: taskPropType,
};
