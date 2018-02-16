import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { formatSeconds } from '../util/formatSeconds';
import { task as taskPropType } from '../types/task';
import { styleVariables } from '../styles/variables';
import del from '../assets/delete.svg';

const Container = styled.div`
  display: flex;
  width: 375px;
  margin: 0 auto;
  border-bottom: 1px solid ${styleVariables.secondary};
  background-color: ${styleVariables.background};
  color: ${styleVariables.secondary};
`;

const Cell = styled.div`
  margin: ${styleVariables.margin} 5px;
  display: flex;
  align-items: center;
  width: 40px;
`;

const DelCell = Cell.extend`
  width: 70px;
  justify-content: center;
`;

const Name = Cell.extend`
  width: 185px;
`;

const ActiveName = Name.extend`
  color: ${styleVariables.primary};
  font-weight: bold;
`;

export const Task = ({ task, onDelete, onActivate }) => {
  return (
    <Container>
      {task.active ? (
        <ActiveName>{task.name}</ActiveName>
      ) : (
        <Name onClick={() => onActivate(task)}>{task.name}</Name>
      )}
      <Cell>{formatSeconds(task.duration)}</Cell>
      <Cell>{formatSeconds(task.break)}</Cell>
      <Cell>{task.amount}</Cell>
      <DelCell>
        <img src={del} onClick={task => onDelete(task)} alt="delete" />
      </DelCell>
    </Container>
  );
};

Task.propTypes = {
  task: taskPropType,
  onDelete: PropTypes.func,
  onActivate: PropTypes.func,
};
