import React from 'react';
import PropTypes from 'prop-types';
import { styleVariables } from '../styles/variables';
import styled from 'styled-components';
import add from '../assets/add.svg';

const Container = styled.div`
  display: flex;
  height: 50px;
  border-top: 1px solid ${styleVariables.secondary};
  border-bottom: 1px solid ${styleVariables.secondary};
  padding: 4px 0;
  background-color: ${styleVariables.background};
`;

const Input = styled.input`
  height: 36px;
  margin-right: 5px;
  padding: 5px;
  font-size: 16px;
  border: 1px solid ${styleVariables.secondary};
  color: ${styleVariables.secondary};
  background-color: ${styleVariables.background};
`;

const Title = Input.extend`
  width: 200px;
`;
const Time = Input.extend`
  width: 40px;
`;
const Break = Input.extend`
  width: 40px;
`;

const ButtonContainer = styled.div`
  height: 46px;
  width: 46px;
  border: 1px solid ${styleVariables.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', time: '', break: '' };
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyEvent);
  }

  handleKeyEvent(e) {
    if (e.code === 'Enter') {
      this.props.onCreate(this.state);
    }
  }

  handleChange(event) {
    const target = event.target;

    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    return (
      <Container>
        <Title
          type="text"
          placeholder="title"
          name="title"
          autoComplete="off"
          value={this.state.title}
          onChange={event => this.handleChange(event)}
          autoFocus
        />
        <Time
          type="text"
          placeholder="time"
          name="time"
          autoComplete="off"
          value={this.state.time}
          onChange={event => this.handleChange(event)}
        />
        <Break
          type="text"
          placeholder="break"
          name="break"
          autoComplete="off"
          value={this.state.break}
          onChange={event => this.handleChange(event)}
        />
        <ButtonContainer onClick={() => this.props.onCreate(this.state)}>
          <img src={add} alt="add" />
        </ButtonContainer>
      </Container>
    );
  }
}

Form.propTypes = {
  onCreate: PropTypes.func,
};
