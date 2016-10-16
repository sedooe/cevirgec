import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Modal from './Modal';
import Button from './Button';
import Welcome from './Welcome';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ));

storiesOf('Modal', module)
  .add('deneme', () => (
    <Modal>Haydaaa</Modal>
  ));
