import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DictionaryList from './DictionaryList';
import Button from './Button';
import Welcome from './Welcome';
import tr from '../app/utils/Translation';
import { Form, Checkbox } from 'semantic-ui-react';
import DictionaryModal from './DictionaryModal';
import ActiveDictionarySelector from './ActiveDictionarySelector';
import Register from './Register';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ));

storiesOf('DictionaryList', module)
  .add('deneme', () => (
    <DictionaryList/>
  ));

storiesOf('DictionaryModal', module)
  .add('deneme', () => (
    <DictionaryModal/>
  ));

// storiesOf('New Definition Window', module)
//   .add('ActiveDictionarySelector', () => (
//     <ActiveDictionarySelector/>
//   ));

storiesOf('Register', module)
  .add('Register', () => (
    <Register />
  ));
