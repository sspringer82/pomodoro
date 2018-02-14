import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Progress } from '../components/progress';
import { tasks } from './helpers/task.data';

storiesOf('Progress', module)
  .add('started', () => (
    <Progress onToggleStartStop={action('onToggleStartStop')} task={tasks[0]} />
  ))
  .add('stopped', () => (
    <Progress onToggleStartStop={action('onToggleStartStop')} task={tasks[1]} />
  ));
