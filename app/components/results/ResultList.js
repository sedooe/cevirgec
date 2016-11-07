/* Copyright (c) 2016 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, {Component} from 'react';
import './ResultList.scss';
import debug from 'debug';
import tr from '../../utils/Translation';
const logger = debug('ResultList');

const wordUtils = require('../../../backend/WordUtils');

const sexIndicatorStyle = {
    position: 'absolute',
    left: '-5px',
    height: '100%',
    backgroundColor: '#eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666'
};
const noContentWarning = {
  color: 'grey',
  fontSize: '0.9rem',
  fontStyle: 'italic'
};

export default class ResultList extends Component {

  static propTypes = {
    definitions: React.PropTypes.array.isRequired
  }

  render() {
    const that = this;

    let liElements = [];

    this.props.definitions.forEach((dictionary, index, array)=>{
      let unique = (index + dictionary.name).replace(/\s/g, '');
      liElements.push( (
        <li key={unique} className='dictionary' onClick={that.toggleExpand.bind(that, unique + '')}>
          {dictionary.name}
        </li>
      ) );

      // definitions of dictionary
      dictionary.definitions.forEach((currentValue, index, array)=>{
        let unique = (index + currentValue.value + dictionary.name).replace(/\s/g, '');
        liElements.push( (
          <li key={unique} onClick={that.toggleExpand.bind(that, unique + '')}>
            <em>{wordUtils.typeAbbreviation(currentValue.type)} </em>
            {currentValue.value}
            <div className="ui basic segment">
              <i className={that.sexClass(currentValue.sex) + " icon"} style={sexIndicatorStyle}></i>
              <p>{currentValue.usage || <span style={noContentWarning}>{tr('No usage examples')}</span>}</p>
              <p>{currentValue.notes || <span style={noContentWarning}>{tr('No notes')}</span>}</p>
            </div>

          </li>
        ) );
      });
    });

    return (
      <ul>
        {liElements}
      </ul>
    );
  }

  toggleExpand(id, e) {
    jQuery(e.currentTarget).find('.ui.basic.segment').toggle();
  }

  sexClass(sex) {
    switch (sex) {
      case 'MASCULINE':
        return 'man';
      case 'FEMININE':
        return 'woman';
      case 'NEUTER':
      default:
        return 'neuter';
    }
  }
}
