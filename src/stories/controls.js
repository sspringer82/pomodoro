import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { tasks } from './helpers/task.data';
import { Controls } from '../components/controls';

storiesOf('Controls', module).add('view', () => (
  <Controls
    onDecrease={action('onDecrease')}
    onIncrease={action('onIncrease')}
    onReset={action('onReset')}
    task={tasks[0]}
  />
));
