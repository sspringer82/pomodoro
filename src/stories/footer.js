import React from 'react';
import { storiesOf } from '@storybook/react';
import { Footer } from '../components/footer';

storiesOf('Footer', module)
  .add('mode 0', () => <Footer mode={0} />)
  .add('mode 1', () => <Footer mode={1} />)
  .add('mode 2', () => <Footer mode={2} />);
