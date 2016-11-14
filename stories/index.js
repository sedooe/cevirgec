import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DictionaryList from './DictionaryList';
import Button from './Button';
import tr from '../app/utils/Translation';
import { Form, Checkbox } from 'semantic-ui-react';
import DictionaryModal from './DictionaryModal';
import {dictionariesForDropdown} from './MockData';
import ActiveDictionarySelector from './ActiveDictionarySelector';
import Register from './Register';
import NewDefinitionWindow from './NewDefinitionWindow';

import '../app/index.scss';

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

storiesOf('Register', module)
  .add('Register', () => (
    <Register />
  ));

storiesOf('New Definition Window', module)
  .add('The Container', () => (
    <NewDefinitionWindow />
  ))
  .add('ActiveDictionarySelector', () => (
    <ActiveDictionarySelector
      dictionaries={dictionariesForDropdown}
    />
  ))
