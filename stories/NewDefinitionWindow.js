import React, { Component } from 'react'
import { Button, Divider, Grid, Form, Header, Label, List, Icon, Image, Input, Menu, Message, Segment } from 'semantic-ui-react'
import tr from '../app/utils/Translation';
import ActiveDictionarySelector from './ActiveDictionarySelector'

class NewDefinitionWindow extends Component {

  state = {
    currentWord: 'computer',
    dictionaries: [],
    definitions: Array(3).fill(),
    onlineDictionaries: [{name: 'test 1', url: 'http://www.tureng.com'}, {name: 'test 2', url: 'http://www.thefreedictionary.com'}],
    loading: false
  }

  render() {

    return (
      <main>
        <Grid>
          <Grid.Column width={6}>
            <ActiveDictionarySelector
              dictionaries={this.state.dictionaries}
            />

            <WordSearchInput
              loading={this.state.loading}
            />

            <NewDefinitionForm />

            <ListOfExistingDefinitions
              definitions={this.state.definitions}
            />

          </Grid.Column>
          <VerticalDivider />
          <Grid.Column width={10}>
            <OnlineDictionariesTabView
              onlineDictionaries={this.state.onlineDictionaries}
            />
          </Grid.Column>
        </Grid>
      </main>
    )

  }
}

class OnlineDictionariesTabView extends Component {
  state = {
    activeTabIndex: 0
  }

  setActiveTab = (newIndex) => this.setState({activeTabIndex: newIndex})

  render() {
    const that = this;

    let title = this.props.onlineDictionaries.map( (onlineDictionary, index) => {
      return <Menu.Item
                name={onlineDictionary.name}
                active={index == that.state.activeTabIndex}
                onClick={that.setActiveTab.bind(that, index)}
              />
    } );

    let content = this.props.onlineDictionaries.map((onlineDictionary, index) => <WordBrowser url={onlineDictionary.url} active={index == that.state.activeTabIndex} />)

    return (
      <Segment style={{display: 'flex'}}>
        <span style={{display:'flex', flexDirection: 'column', flexGrow: 1}}>
          <Menu attached='top' tabular>
            {title}
          </Menu>

          <Segment attached='bottom'>
            {content}
          </Segment>
        </span>
      </Segment>
    );
  }
}

OnlineDictionariesTabView.propTypes = {
  onlineDictionaries: React.PropTypes.array.isRequired
}

class WordBrowser extends Component {

  render() {
    const display = this.props.active ? 'flex' : 'none';
    return (
      <span style={{display: display, flexDirection: 'column', flexGrow: 1}}>
        <Input fluid style={{marginBottom: '14px'}}>
          <Button.Group>
            <Button icon='arrow left' />
            <Button icon='arrow right' />
            <Button icon='refresh' />
            <Button icon='home' className='no-right-radius' />
          </Button.Group>
          <div className="ui fluid icon input full-width">
            <input type="text" placeholder="Search..." className='no-left-radius full-width' />
            <Icon name='checkmark' />
          </div>
        </Input>

        <iframe
          sandbox="allow-forms allow-same-origin allow-scripts"
          onLoad={this.removeLoading}
          src={this.props.url}
          style={{width: '100%', height: '600px', border: '1px solid #eee', flexGrow: 1 }}
          ref={c => {this.rootElement = c}}>
        </iframe>
      </span>
    )
  }
}

const HorizontalToggle = ({active, onToggle}) => (
  <Divider horizontal style={active ? null : {marginBottom: 0}}>
    <ButtonToggle basic compact
      type='button'
      size='tiny'
      icon={active ? 'angle up' : 'angle down'}
      content={active ? tr('Less') : tr('More')}
      onToggle={onToggle}
    />
  </Divider>
);
HorizontalToggle.propTypes = {
  onToggle: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired
};

class NewDefinitionForm extends Component {
  state = {
    detailsShown: false
  }

  render () {
    return (
      <Segment>
        <Label attached='top'>{tr('Add new Definitions for <word>')}</Label>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input label='Definition' placeholder='You can choose from left browser' />
          </Form.Group>
          <HorizontalToggle
            active={this.state.detailsShown}
            onToggle={(active) => this.setState({detailsShown: active})}
          />
          {this.state.detailsShown &&
            <span>
              <Form.Group inline>
                <label>Size</label>
                <Form.Radio label='Small' value='sm' checked={'value' === 'sm'} onChange={this.handleChange} />
                <Form.Radio label='Medium' value='md' checked={'value' === 'md'} onChange={this.handleChange} />
                <Form.Radio label='Large' value='lg' checked={'value' === 'lg'} onChange={this.handleChange} />
              </Form.Group>
              <Form.TextArea label='About' placeholder='Tell us more about you...' />
              <Form.Checkbox label='I agree to the Terms and Conditions' />
              <Form.Group inline className='no-margin'>
                <Button primary content={tr('Save')} style={{marginLeft: 'auto'}} />
              </Form.Group>
            </span>
          }
        </Form>
      </Segment>
    );
  }
}

const ListOfExistingDefinitions = ({definitions}) => (
  <Segment disabled={!definitions.length}>
    <Label attached='top'>{tr('Definitions for $1', 'the word')}</Label>
    <List divided relaxed verticalAlign='middle' >
      {definitions.length ?
        definitions.map(function (definition) {
          return <DefinitionListItem definition={definition} />
        })
        :
        <List.Item style={noSidePadding}>
          <List.Content>
            <Message
              header={tr('There are no definitoins for this word yet.')}
              content={tr('Don\'t forget that we only look up from active dictionaries.')}
            />
          </List.Content>
        </List.Item>
      }
    </List>
  </Segment>
)

ListOfExistingDefinitions.propTypes = {
  definitions: React.PropTypes.array.isRequired,
};

const VerticalDivider = () => (
  <div style={{position: 'relative'}} className='no-padding'>
    {/*
      Wrapper is for vertical divider bug https://github.com/Semantic-Org/Semantic-UI/issues/4342#issuecomment-253209017
      Also we cannot use !important https://github.com/facebook/react/issues/1881
      */}
    <Divider vertical>
      <Icon name='square outline' style={{color: '#aaa'}} />
    </Divider>
  </div>
);

const WordSearchInput = ({loading}) => (
  <Input fluid disabled={loading}
    icon='search'
    placeholder={tr('Search a word...')}
    label={tr('Word/Phrase')}
    loading={loading}
    className={ loading ? 'no-padding no-border' : 'no-padding no-border raised segment' }
  />
);

const noSidePadding = {padding: '14px 0'};
const noBoxShadow = {boxShadow: 'none'}
class DefinitionListItem extends Component {
  state = {
    detailsShown: false
  }

  toggleDetails = (active) => {
    this.setState({detailsShown: active});
    console.log(active);
  }

  render () {
    return (
      <List.Item style={noSidePadding}>
        <List.Content>
          <Label ribbon color='green' size='mini'>{tr('new')}</Label>
          <Icon name='man' />
          <em>n.&nbsp;</em>
          <span>Lorem ipsum dolor sit amed.</span>
        </List.Content>
        <List.Content style={{marginTop: '10px'}}>
            <Label basic size='tiny'>
              <Icon name='browser' />
              Context
            </Label>
            <Label basic size='tiny'>
              <Icon name='book' />
              Science Dictionary
            </Label>
            <Button basic compact size='tiny' icon='edit' floated='right' />
            <Button basic compact size='tiny' icon='trash' floated='right' />
            <ButtonToggle basic compact size='tiny'
              icon={this.state.detailsShown ? 'angle up' : 'angle down'}
              content={this.state.detailsShown ? tr('Less') : tr('More')}
              floated='right'
              onToggle={this.toggleDetails}
            />
        </List.Content>
        {this.state.detailsShown && <List.Content>
          <Segment basic style={noSidePadding}>
            <Segment style={noBoxShadow}>
              <Label attached='top right'>{tr('Usage Examples')}</Label>
              Lorem ipsum dolor sit amed.
            </Segment>
            <Segment style={noBoxShadow}>
              <Label attached='top right'>{tr('Notes')}</Label>
              Lorem ipsum dolor sit amed.
            </Segment>
          </Segment>
        </List.Content>}
      </List.Item>
    );
  }
}

class ButtonToggle extends Component {
  state = {}

  handleClick = () => {
    this.setState({ active: !this.state.active });
    if (typeof this.props.onToggle == 'function') {
      this.props.onToggle(!this.state.active);
      console.log('button', !this.state.active);
    }
  }

  render() {
    const { active } = this.state
    return (
      <Button {... this.props} toggle active={active} onClick={this.handleClick}>
        {this.children}
      </Button>
    )
  }
}

ButtonToggle.propTypes = {
  onToggle: React.PropTypes.func
};

export default NewDefinitionWindow;
