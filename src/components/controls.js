import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { task as taskPropType } from '../types/task';
import { formatSeconds } from '../util/formatSeconds';
import { styleVariables } from '../styles/variables';
import arrowDown from '../assets/arrow-up.svg';
import arrowUp from '../assets/arrow-down.svg';
import reset from '../assets/reset.svg';

const Container = styled.div`
  display: flex;
  width: 410px;
  margin: 0 auto;
  border-bottom: 1px solid ${styleVariables.secondary};
  height: 50px;
`;

const LineContainer = styled.div`
  width: 50px;
  height: 50px;
`;

const TimeContainer = styled.div`
  text-align: center;
  vertical-align: middle;
  width: 170px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${styleVariables.primary};
  font-size: 35px;
  border-bottom: 1px solid ${styleVariables.secondary};
`;

const ButtonContainer = styled.div`
  border-top: 1px solid ${styleVariables.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
`;

const ArrowUp = styled.img`
  margin-top: -5px;
`;

const ArrowDown = styled.img`
  margin-bottom: -5px;
`;

const DirectionButtons = ButtonContainer.extend`
  flex-direction: column;
`;

const Line1 = styled.div`
  border-top: 1px solid ${styleVariables.secondary};
  transform: translateY(22px) translateX(-8px) rotate(42deg);
  width: 67px;
`;

const Line2 = styled.div`
  border-top: 1px solid ${styleVariables.secondary};
  transform: translateY(22px) translateX(-9px) rotate(318deg);
  width: 67px;
`;

export const Controls = ({ onIncrease, onDecrease, onReset, task }) => {
  const time = task ? task.time : '';

  return (
    <Container>
      <DirectionButtons>
        <div>
          <ArrowDown src={arrowDown} onClick={() => onIncrease()} />
        </div>
        <div>
          <ArrowUp src={arrowUp} onClick={() => onDecrease()} />
        </div>
      </DirectionButtons>
      <LineContainer>
        <Line1 />
      </LineContainer>
      <TimeContainer>
        <div>{formatSeconds(time)}</div>
      </TimeContainer>
      <LineContainer>
        <Line2 />
      </LineContainer>
      <ButtonContainer>
        <img src={reset} onClick={() => onReset()} alt="reset" />
      </ButtonContainer>
    </Container>
  );
};

Controls.propTypes = {
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
  onReset: PropTypes.func,
  task: taskPropType,
};
