import React from 'react';
import { storiesOf } from '@storybook/react';

import { Time } from '../components/time';

const time = 20 * 60;

storiesOf('Time', module).add('view', () => <Time time={time} />);
