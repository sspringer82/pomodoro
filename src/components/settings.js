import React from 'react';
import PropTypes from 'prop-types';
import { styleVariables } from '../styles/variables';
import styled from 'styled-components';
import add from '../assets/add.svg';

const Container = styled.div`
  display: flex;
  width: 375px;
  margin: 0 auto;
  height: 50px;
  border-top: 1px solid ${styleVariables.secondary};
  border-bottom: 1px solid ${styleVariables.secondary};
  padding: 4px 0;
  background-color: ${styleVariables.background};
`;

const Input = styled.input`
  height: 36px;
  margin-right: 5px;
  width: 147px;
  padding: 5px;
  font-size: 16px;
  border: 1px solid ${styleVariables.secondary};
  color: ${styleVariables.secondary};
  background-color: ${styleVariables.background};
`;

const ButtonContainer = styled.div`
  height: 46px;
  width: 46px;
  border: 1px solid ${styleVariables.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { duration: props.duration, count: props.count };
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
        <Input
          type="text"
          placeholder="duration"
          name="duration"
          value={this.state.duration}
          onChange={event => this.handleChange(event)}
        />
        <Input
          type="text"
          placeholder="count"
          name="count"
          value={this.state.count}
          onChange={event => this.handleChange(event)}
        />
        <ButtonContainer onClick={() => this.props.onSave(this.state)}>
          <img src={add} alt="add" />
        </ButtonContainer>
      </Container>
    );
  }
}

Settings.propTypes = {
  duration: PropTypes.number,
  count: PropTypes.number,
  onSave: PropTypes.func,
};
