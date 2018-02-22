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
  padding: 4px;
  background-color: ${styleVariables.background};
`;

const Input = styled.input`
  height: 36px;
  margin-right: 5px;
  padding: 5px;
  border: 1px solid ${styleVariables.secondary};
  color: ${styleVariables.secondary};
  background-color: ${styleVariables.background};
`;

const Break = Input.extend`
  width: 192px;
`;
const Amount = Input.extend`
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

export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', time: '' };
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
        <Break
          type="text"
          placeholder="break"
          name="break"
          value={this.state.break}
          onChange={event => this.handleChange(event)}
        />
        <Amount
          type="text"
          placeholder="amount"
          name="amount"
          value={this.state.amount}
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
  onSave: PropTypes.func,
};