import React from 'react';
import { storiesOf } from '@storybook/react';
import { Task } from '../components/task';
import { tasks } from './helpers/task.data';

storiesOf('Task', module).add('list item view', () => <Task task={tasks[0]} />);
