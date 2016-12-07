// @flow
import React, { PropTypes } from 'react';
import { Button, Dropdown, Form, Icon, Label, Modal } from 'semantic-ui-react';
import tr from '../../utils/Translation';

const propFunctionProxy = (prop: Function, event, serializedForm) => {
  event.preventDefault();
  prop(serializedForm);
}

type Props = {
  open: boolean,
  onHide: Function,
  onSave: Function,
  definition: Object,
  dictionary: Object
}

const wordTypes = [
  {value: 'NONE', text: tr('N/A')},
  {value: 'NOUN', text: tr('Noun')},
  {value: 'VERB', text: tr('Verb')},
  {value: 'VERB_TRANSITIVE', text: tr('Verb tr.')},
  {value: 'VERB_INTRANSITIVE', text: tr('Verb int.')},
  {value: 'ADJECTIVE', text: tr('Adjective')},
  {value: 'ADVERB', text: tr('Adverb')},
  {value: 'PRONOUN', text: tr('Pronoun')},
  {value: 'PREPOSITION', text: tr('Preposition')},
  {value: 'CONJUNCTION', text: tr('Conjunction')},
  {value: 'INTERJECTION', text: tr('Interjection')},
  {value: 'PHRASAL_VERB', text: tr('Phrasal Verb')},
  {value: 'IDIOM', text: tr('Idiom')},
  {value: 'PHRASE', text: tr('Phrase')}
];

const DefinitionModal = (props: Props) => (
  <Modal open={props.open}>
    <Modal.Header>
      {tr('Edit Definition')}
    </Modal.Header>
    <Modal.Content>
      <Label basic size='tiny'>
        <Icon name='browser' />
        {props.dictionary.context || 'No Context'}
      </Label>
      <Label basic size='tiny'>
        <Icon name='book' />
        {props.dictionary.name}
      </Label>
       <Label basic size='tiny'>
        {props.definition.key}
      </Label>
      <Form onSubmit={propFunctionProxy.bind(null, props.onSave)}>
        <input type="hidden" name="id" value={props.definition.id} />
        <input type="hidden" name="key" value={props.definition.key} />
        <Form.Input
          defaultValue={props.definition.value}
          name='value'
          label='Definition'
        />
        <span>
          <Form.Group inline>
            <Form.Field>
              <Dropdown name='type' defaultValue={props.definition.type} search selection options={wordTypes} />
            </Form.Field>
            <label>{tr(' Word sex')}</label>
            <Form.Radio name='sex' label='⚲' value='NEUTER' defaultChecked={props.definition.sex == 'NEUTER'} className='big-label' />
            <Form.Radio name='sex' label='♂' value='MASCULINE' defaultChecked={props.definition.sex == 'MASCULINE'} className='big-label' />
            <Form.Radio name='sex' label='♀' value='FEMININE' defaultChecked={props.definition.sex == 'FEMININE'} className='big-label' />
          </Form.Group>
          <Form.TextArea name='usage' rows='3' label={tr('Usage Examples')} defaultValue={props.definition.usage} placeholder={tr('Usage Examples')} />
          <Form.TextArea name='notes' rows='3' label={tr('Notes')} defaultValue={props.definition.notes} placeholder={tr('Notes')} />
          <Modal.Actions>
            <Button type='button' color='black' onClick={props.onHide}>
              <Icon name='remove' /> Cancel
            </Button>
            <Button positive type='submit'>
              <Icon name='checkmark' /> Save
            </Button>
          </Modal.Actions>
        </span>
      </Form>
    </Modal.Content>
  </Modal>
);

DefinitionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  definition: PropTypes.object.isRequired,
  dictionary: PropTypes.object.isRequired
};

export default DefinitionModal;
