// @flow
import React, { PropTypes } from 'react';
import { Button, Checkbox, Flag, List, Popup } from 'semantic-ui-react';
import tr from '../utils/Translation';

const propFunctionProxy = (prop: Function, onlineSource: Object) => {
  prop(onlineSource);
}

type Props = {
  onlineSources: Object,
  onEdit: Function,
  onDelete: Function
}

const OnlineSourceList = (props: Props) => {

  let onlineSourceKeys = Object.getOwnPropertyNames(props.onlineSources);

  if(onlineSourceKeys.length) {
    return (
      <List divided relaxed>
        {Object.getOwnPropertyNames(props.onlineSources).map((key) => {
          const onlineSource = props.onlineSources[key];
          return (
            <List.Item key={`onlineSource-${key}`}>
              <List.Content floated="right">
                <Popup trigger={<Button icon="edit" onClick={propFunctionProxy.bind(null, props.onEdit, onlineSource)} />} content={tr('Edit')} />
                <Popup trigger={<Button icon="trash" onClick={propFunctionProxy.bind(null, props.onDelete, onlineSource)} />} content={tr('Delete')} />
              </List.Content>

              <List.Content>
                <List.Header><Flag name={onlineSource.sourceLanguage} /> {onlineSource.name}</List.Header>
                <List.Description>{onlineSource.url}</List.Description>
              </List.Content>
            </List.Item>
          )
        })}
      </List>
    )
  }
  else {
    return (
      <div className="ui icon message">
        <i className="info icon"></i>
        <div className="content">
          {tr('There is no online source yet.')}
        </div>
      </div>
    )
  }
};

OnlineSourceList.propTypes = {
  onlineSources: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default OnlineSourceList
