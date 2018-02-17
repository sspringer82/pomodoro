import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form } from '../components/form';
import { action } from '@storybook/addon-actions';

storiesOf('Form', module).add('show form', () => (
  <Form onCreate={action('onToggleStartStop')} />
));
