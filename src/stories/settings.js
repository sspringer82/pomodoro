import React from 'react';
import { storiesOf } from '@storybook/react';
import { Settings } from '../components/settings';
import { action } from '@storybook/addon-actions';

storiesOf('Settings', module).add('show settings form', () => <Settings />);
