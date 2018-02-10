import React from 'react';
import { storiesOf } from '@storybook/react';

import { TaskList } from '../components/task-list';

const tasks = [
  {
    name: 'My first task',
    duration: 20 * 60,
    break: 5 * 20,
    amount: 3,
  },
  {
    name: 'My second task',
    duration: 10 * 60,
    break: 5 * 20,
    amount: 5,
  },
];

storiesOf('TaskList', module).add('list view', () => (
  <TaskList tasks={tasks} />
));
