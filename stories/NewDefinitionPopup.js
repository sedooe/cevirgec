import React, { Component } from 'react'
import { Button, Divider, Grid, Header, Label, List, Icon, Image, Input, Segment } from 'semantic-ui-react'
import tr from '../app/utils/Translation';
import ActiveDictionarySelector from './ActiveDictionarySelector'

class NewDefinitionPopup extends Component {

  render() {

    return (
      <main>
        <Grid>
          <Grid.Column width={6}>
            <ActiveDictionarySelector
              dictionaries={[]}
            />

            <WordSearchInput
              loading={false}
            />

            <ListOfExistingDefinitions />

          </Grid.Column>
          <VerticalDivider />
          <Grid.Column width={10}>
            <Image src='http://semantic-ui.com/images/wireframe/paragraph.png' />
          </Grid.Column>
        </Grid>
      </main>
    )

  }
}

const ListOfExistingDefinitions = ({definitions}) => (
  <span>
    <Segment color='blue' attached>
      <Header as='h5'>{tr('Definitions for $1', 'the word')}</Header>
    </Segment>
    <Segment attached>
      <List divided verticalAlign='middle'>
        <List.Item>
          <List.Content>
            <Label ribbon color='green' size='mini'>{tr('new')}</Label>
            <Icon name='man' />
            <em>n.&nbsp;</em>
            <span>Lorem ipsum dolor sit amed.</span>
          </List.Content>
          <List.Content style={{marginTop: '10px'}}>
              <Label basic size='mini'>
                <Icon name='browser' />
                Context
              </Label>
              <Label basic size='mini'>
                <Icon name='book' />
                Science Dictionary
              </Label>
              <Button basic compact size='mini' icon='edit' floated='right' />
              <Button basic compact size='mini' icon='trash' floated='right' />
              <Button basic compact size='mini' icon='ellipsis horizontal' floated='right' />
          </List.Content>
          <List.Content>
            <em>n.&nbsp;</em>
            <span>Lorem ipsum dolor sit amed.</span>
          </List.Content>
        </List.Item>

        <List.Item>
          <List.Content floated='right'>
            <Button size='mini' icon='edit' />
          </List.Content>
          <List.Content>
            Lena
          </List.Content>
        </List.Item>

        <List.Item>
          <List.Content floated='right'>
            <Button size='mini' icon='edit' />
          </List.Content>
          <List.Content>
            Lena
          </List.Content>
        </List.Item>
      </List>
    </Segment>
  </span>
)

const VerticalDivider = () => (
  <div style={{position: 'relative', padding: '0'}}>
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
    className={ loading ? '' : 'raised segment' }
    style={{border:0, padding:0}}
  />
);

export default NewDefinitionPopup;
