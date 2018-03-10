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
  const content = [
    <Cell key="0" className="duration">
      {formatSeconds(task.duration)}
    </Cell>,
    <Cell key="1" className="break">
      {formatSeconds(task.break)}
    </Cell>,
    <Amount key="2" className="amount">
      {task.amount + ''}
    </Amount>,
    <DelCell key="3" className="delete">
      <img src={del} onClick={() => onDelete(task)} alt="delete" />
    </DelCell>,
  ];

  if (task.active) {
    return (
      <ActiveContainer className="active">
        <ActiveName className="name">{task.name}</ActiveName>
        {content}
      </ActiveContainer>
    );
  } else {
    return (
      <Container className="inactive">
        <Name className="name" onClick={() => onActivate(task)}>
          {task.name}
        </Name>
        {content}
      </Container>
    );
  }
};

Task.propTypes = {
  task: taskPropType,
  onDelete: PropTypes.func,
  onActivate: PropTypes.func,
};
