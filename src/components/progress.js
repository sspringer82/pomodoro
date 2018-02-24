import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { task as taskPropType } from '../types/task';
import { styleVariables } from '../styles/variables';
import play from '../assets/play.svg';
import stop from '../assets/stop.svg';
import { STATE_STARTED, STATE_PAUSE_STARTED } from '../util/constants';

import NVD3Chart from 'react-nvd3';

const Container = styled.div`
  background-color: ${styleVariables.background};
  display: flex;
  width: 375px;
  margin: 0 auto;
  position: relative;
  padding-top: 13px;
  height: 280px;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  position: absolute;
  left: ${(375 - 40) / 2}px;
  top: ${10 + (300 - 40) / 2}px;
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
`;

const Title = styled.h1`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${styleVariables.secondary};
  font-size: 35px;
  margin: 0;
  font-weight: normal;
`;

export const Progress = ({ onToggleStartStop, task }) => {
  let started = false;

  if (task) {
    started = [STATE_STARTED, STATE_PAUSE_STARTED].includes(task.state);
  } else {
    task = { time: 0, duration: 0 };
  }

  var data = [
    { key: '', y: task.time, color: styleVariables.primary },
    { key: '', y: task.duration - task.time, color: '#4f4f4f ' },
  ];

  const playImg = <img src={play} height="48" width="48" alt="start" />;
  const stopImg = <img src={stop} height="48" width="48" alt="stop" />;

  return (
    <Container>
      <NVD3Chart
        id="chart"
        width={375}
        height={300}
        type="pieChart"
        datum={data}
        x="key"
        y="y"
        tooltip={{ enabled: false }}
        showLegend={false}
        donut={true}
        donutRatio={0.85}
        growOnHover={false}
      />
      <Title>{task.name}</Title>

      <ButtonContainer>
        <div onClick={() => onToggleStartStop()}>
          {started ? stopImg : playImg}
        </div>
      </ButtonContainer>
    </Container>
  );
};

Progress.propTypes = {
  onToggleStartStop: PropTypes.func,
  task: taskPropType,
};
