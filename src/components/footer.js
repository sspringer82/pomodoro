import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form } from './form';
import { styleVariables } from '../styles/variables';
import settings from '../assets/settings.svg';
import add from '../assets/add.svg';
import { Settings } from './settings';
import { MODE_SINGLE, MODE_REPEAT_ONE } from '../util/constants';

const Container = styled.div`
  background-color: ${styleVariables.background};
  width: 375px;
  margin: 0 auto;
`;
const FooterContainer = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  border-bottom: 1px solid ${styleVariables.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 50px;
  position: relative;
`;
const LineContainer = styled.div`
  width: 50px;
  height: 50px;
  padding-top: 5px;
`;
const AddContainer = styled.div`
  width: 135px;
  height: 46px;
  margin-top: 4px;
  border-top: 1px solid ${styleVariables.secondary};
`;
const AddDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const Line1 = styled.div`
  border-top: 1px solid ${styleVariables.secondary};
  transform: translateY(22px) translateX(-9px) rotate(318deg);
  width: 67px;
`;
const Line2 = styled.div`
  border-top: 1px solid ${styleVariables.secondary};
  transform: translateY(22px) translateX(-8px) rotate(42deg);
  width: 67px;
`;
const One = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${styleVariables.primary};
  height: 15px;
  width: 15px;
  border-radius: 20px;
  position: absolute;
  top: 23px;
  left: 38px;
`;

export class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addMode: false,
      settings: false,
    };
  }

  handleCreate(data) {
    this.toggleAddMode();
    this.props.onCreate(data);
  }

  toggleAddMode() {
    this.setState({
      addMode: !this.state.addMode,
    });
  }

  toggleSettings() {
    this.setState({
      settings: !this.state.settings,
    });
  }

  render() {
    const repeatMode = this.props.repeatMode;
    const fill =
      repeatMode === MODE_SINGLE
        ? styleVariables.secondary
        : styleVariables.primary;
    return (
      <Container>
        <FooterContainer>
          <ButtonContainer>
            <img
              onClick={() => this.toggleSettings()}
              src={settings}
              alt="settings"
            />
          </ButtonContainer>
          <LineContainer>
            <Line1 />
          </LineContainer>
          <AddContainer>
            {!this.state.addMode ? (
              <AddDiv onClick={() => this.toggleAddMode()}>
                <img src={add} alt="add" />
              </AddDiv>
            ) : (
              ''
            )}
          </AddContainer>
          <LineContainer>
            <Line2 />
          </LineContainer>
          <ButtonContainer onClick={() => this.props.toggleRepeatMode()}>
            <svg
              fill={fill}
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
            {repeatMode === MODE_REPEAT_ONE ? <One>1</One> : ''}
          </ButtonContainer>
        </FooterContainer>
        {this.state.addMode ? (
          <Form onCreate={data => this.handleCreate(data)} />
        ) : (
          ''
        )}
        {this.state.settings ? (
          <Settings
            duration={this.props.duration}
            count={this.props.count}
            onSave={settings => {
              this.setState({ settings: false });
              this.props.saveSettings(settings);
            }}
          />
        ) : (
          ''
        )}
      </Container>
    );
  }
}

Footer.propTypes = {
  repeatMode: PropTypes.number,
  toggleRepeatMode: PropTypes.func,
  onCreate: PropTypes.func,
  saveSettings: PropTypes.func,
};
