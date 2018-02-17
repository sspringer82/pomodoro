import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { task as taskPropType } from '../types/task';
import { styleVariables } from '../styles/variables';
import { Task } from './task';
import { Form } from './form';
import add from '../assets/add.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 70px;
  border: 1px solid ${styleVariables.secondary};
  background-color: ${styleVariables.background};
  margin-top: 4px;
`;

export class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addMode: false,
    };
  }

  handleCreate(data) {
    this.toggleAddMode();
    this.props.onCreate(data);
  }

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
        {this.state.addMode ? (
          <Form onCreate={data => this.handleCreate(data)} />
        ) : (
          <AddButton onClick={() => this.toggleAddMode()}>
            <img src={add} alt="add" />
          </AddButton>
        )}
      </Container>
    );
  }

  toggleAddMode() {
    this.setState({
      addMode: !this.state.addMode,
    });
  }
}

Task.propTypes = {
  tasks: PropTypes.arrayOf(taskPropType),
  onDelete: PropTypes.func,
  onActivate: PropTypes.func,
  onCreate: PropTypes.func,
};
