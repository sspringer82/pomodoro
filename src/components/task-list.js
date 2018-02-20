import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { task as taskPropType } from '../types/task';
import { Task } from './task';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TaskList = ({ tasks, onDelete, onActivate }) => (
  <Container>
    {tasks.map((task, index) => (
      <Task
        key={index}
        task={task}
        onDelete={onDelete}
        onActivate={onActivate}
      />
    ))}
  </Container>
);

Task.propTypes = {
  tasks: PropTypes.arrayOf(taskPropType),
  onDelete: PropTypes.func,
  onActivate: PropTypes.func,
};
