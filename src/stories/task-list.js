import React from 'react';
import { storiesOf } from '@storybook/react';
import { TaskList } from '../components/task-list';
import { tasks } from './helpers/task.data';

storiesOf('TaskList', module).add('list view', () => (
  <TaskList tasks={tasks} />
));
