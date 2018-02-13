import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { formatSeconds } from '../util/formatSeconds';
import { task as taskPropType } from '../types/task';

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid black;
`;

const Cell = styled.div`
  margin: 15px;
  width: 70px;
`;

const Name = Cell.extend`
  margin: 15px;
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
