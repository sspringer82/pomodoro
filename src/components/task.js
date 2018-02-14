import React from 'react';
import styled from 'styled-components';
import { formatSeconds } from '../util/formatSeconds';
import { task as taskPropType } from '../types/task';
import { styleVariables } from '../styles/variables';

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid black;
`;

const Cell = styled.div`
  margin: ${styleVariables.margin}
  width: 70px;
`;

const Name = Cell.extend`
  width: 200px;
`;

export const Task = ({ task }) => {
  return (
    <Container>
      <Name>{task.name}</Name>
      <Cell>{formatSeconds(task.duration)}</Cell>
      <Cell>{formatSeconds(task.break)}</Cell>
      <Cell>{task.amount}</Cell>
    </Container>
  );
};

Task.propTypes = {
  task: taskPropType,
};
