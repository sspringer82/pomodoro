import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Task } from '../components/task';

const task = {
  name: 'My first task',
  duration: 20 * 60,
  break: 5 * 20,
  amount: 3,
};

storiesOf('Task', module).add('list item view', () => <Task task={task} />);
