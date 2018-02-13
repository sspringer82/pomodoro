import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Progress } from '../components/progress';

storiesOf('Progress', module)
  .add('started', () => (
    <Progress
      onToggleStartStop={action('onToggleStartStop')}
      time={20 * 60}
      started={true}
    />
  ))
  .add('stopped', () => (
    <Progress
      onToggleStartStop={action('onToggleStartStop')}
      time={20 * 60}
      started={false}
    />
  ));
