import React from 'react';
import { storiesOf } from '@storybook/react';

import { Task } from '../components/task';

const task = {
  name: 'My first task',
  duration: 20 * 60,
  break: 5 * 20,
  amount: 3,
};

storiesOf('Task', module).add('list item view', () => <Task task={task} />);
