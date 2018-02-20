import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { task as taskPropType } from '../types/task';
import { styleVariables } from '../styles/variables';
import { Task } from './task';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export class TaskList extends React.Component {
  render() {
    const { tasks, onDelete, onActivate } = this.props;
    return (
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
  }
}

Task.propTypes = {
  tasks: PropTypes.arrayOf(taskPropType),
  onDelete: PropTypes.func,
  onActivate: PropTypes.func,
};
