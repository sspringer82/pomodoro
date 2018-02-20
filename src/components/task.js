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

const ActiveContainer = Container.extend`
  box-shadow: inset 0px 11px 8px -10px ${styleVariables.primary},
    inset 0px -11px 8px -10px ${styleVariables.primary};
`;

const Cell = styled.div`
  margin: ${styleVariables.margin} 5px;
  display: flex;
  align-items: center;
  width: 40px;
`;

const DelCell = Cell.extend`
  width: 20px;
  margin-right: 25px;
`;

const Amount = Cell.extend`
  width: 20px;
`;

const Name = Cell.extend`
  width: 185px;
`;

const ActiveName = Name.extend`
  color: ${styleVariables.primary};
  font-weight: bold;
`;

export const Task = ({ task, onDelete, onActivate }) => {
  if (task.active) {
    return (
      <ActiveContainer>
        <ActiveName>{task.name}</ActiveName>
        <Cell>{formatSeconds(task.duration)}</Cell>
        <Cell>{formatSeconds(task.break)}</Cell>
        <Amount>{task.amount}</Amount>
        <DelCell>
          <img src={del} onClick={() => onDelete(task)} alt="delete" />
        </DelCell>
      </ActiveContainer>
    );
  } else {
    return (
      <Container>
        <Name onClick={() => onActivate(task)}>{task.name}</Name>
        <Cell>{formatSeconds(task.duration)}</Cell>
        <Cell>{formatSeconds(task.break)}</Cell>
        <Amount>{task.amount}</Amount>
        <DelCell>
          <img src={del} onClick={() => onDelete(task)} alt="delete" />
        </DelCell>
      </Container>
    );
  }
};

Task.propTypes = {
  task: taskPropType,
  onDelete: PropTypes.func,
  onActivate: PropTypes.func,
};
