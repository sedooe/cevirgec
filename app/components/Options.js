// @flow

import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { Checkbox, Header, Segment } from 'semantic-ui-react';
import tr from '../utils/Translation';

type Props = {
  verbose: boolean,
  changeVerbosity: Function
}

const Options = (props: Props) => (
  <DocumentTitle title={tr('Cevirgec › Settings › Options')}>
    <Segment.Group>
      <Segment>
        <Header as="h3" content={tr('Options')} />
      </Segment>
      <Segment color="blue">
        <Checkbox
          toggle
          label={tr('Is verbose')}
          checked={props.verbose}
          onChange={() => props.changeVerbosity()}
        />
      </Segment>
    </Segment.Group>
  </DocumentTitle>
);

Options.propTypes = {
  verbose: PropTypes.bool.isRequired,
  changeVerbosity: PropTypes.func.isRequired
};

export default Options;
