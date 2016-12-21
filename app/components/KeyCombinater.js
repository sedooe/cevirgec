// @flow

import React, { PropTypes } from 'react';
import tr from '../utils/Translation';
import debug from 'debug';

type Props = {
  shortcut: string
};

const KeyCombinater = (props: Props) => {
  const content = props.shortcut.split('+').map((key, index, array)=>{
    if (index != array.length-1) {
      return (<span key={key}><kbd>{key}</kbd> + </span>);
    } else {
      return (<kbd key={key}>{key}</kbd>);
    }
  });

  return (
    <div>
      {content}
    </div>
  );
}

KeyCombinater.propTypes = {
  shortcut: PropTypes.string.isRequired
}

export default KeyCombinater;
