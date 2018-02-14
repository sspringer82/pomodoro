import React from 'react';
import { storiesOf } from '@storybook/react';
import { Time } from '../components/time';
import { tasks } from './helpers/task.data';

storiesOf('Time', module).add('view', () => <Time time={tasks[0]} />);
