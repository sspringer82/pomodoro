import React from 'react';
import PropTypes from 'prop-types';
import { styleVariables } from '../styles/variables';
import styled from 'styled-components';
import add from '../assets/add.svg';

const Container = styled.div`
  display: flex;
  width: 367px;
  margin: 0 auto;
  height: 50px;
  border-top: 1px solid ${styleVariables.secondary};
  border-bottom: 1px solid ${styleVariables.secondary};
  padding: 4px;
  background-color: ${styleVariables.background};
`;

const Input = styled.input`
  height: 36px;
  margin-right: 5px;
  width: 143px;
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
    this.state = { breakTime: props.breakTime, breakCount: props.breakCount };
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
          placeholder="breakTime"
          name="breakTime"
          value={this.state.breakTime}
          onChange={event => this.handleChange(event)}
        />
        <Input
          type="text"
          placeholder="count"
          name="breakCount"
          value={this.state.breakCount}
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
  breakTime: PropTypes.number,
  breakCount: PropTypes.number,
  onSave: PropTypes.func,
};
