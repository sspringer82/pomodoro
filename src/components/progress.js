import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { task as taskPropType } from '../types/task';
import { styleVariables } from '../styles/variables';
import play from '../assets/play.svg';
import stop from '../assets/stop.svg';

import NVD3Chart from 'react-nvd3';

const Container = styled.div`
  display: flex;
  width: 410px;
  margin: 0 auto;
  position: relative;
  height: 300px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  left: ${(410 - 40) / 2}px;
  top: ${(300 - 40) / 2}px;
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
`;

export const Progress = ({ onToggleStartStop, task }) => {
  let started;

  if (task) {
    started = task.started;
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
        width={410}
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
