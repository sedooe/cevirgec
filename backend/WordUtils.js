/* Copyright (c) 2016 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const debug = require('debug')(__filename.split('/').pop());

const eligibilityRxParts = {
  onlyDigitsAndOperators: '^[\\d\\+\\.\\,\\-\\(\\)\\[\\]#\\*\\s]+$',
  protocols: ':\\/\\/',
  emailAddress: '\\S+@\\S+',
  domainNames: '.+\\..+',
  mailLinks: 'mailto:',
  onlySymbols: '^[^A-Za-z]+$',
  filePaths: '[\\/\\\\]',
  hasSymbols: '[\\(\\)\\[\\]:=\\+\\{\\}]'
};

const eligibilityRxPartsValues = Object.keys(eligibilityRxParts).reduce((previousValue, currentValue)=>{
  previousValue.push(eligibilityRxParts[currentValue]);
  return previousValue;
}, []);

const eligibilityRxPartsCombined = eligibilityRxPartsValues.join('|');
const eligibilityRx = new RegExp( eligibilityRxPartsCombined, 'g');
const trimInnerRx = /\s+/g;
const MAX_WORD_COUNT = 10;
const MIN_WORD_COUNT_FOR_CONTEXT = 30;

const definitionTypes = [
  'NONE',
  'NOUN',
  'VERB',
  'VERB_TRANSITIVE',
  'VERB_INTRANSITIVE',
  'ADJECTIVE',
  'ADVERB',
  'PRONOUN',
  'PREPOSITION',
  'CONJUNCTION',
  'INTERJECTION',
  'PHRASAL_VERBS',
  'IDIOM',
  'PHRASE'
];

module.exports = {
  normalize: (word)=>{
    if (typeof word != 'string') {
      return '';
    }

    trimInnerRx.lastIndex = 0;
    return word.toLowerCase().trim().replace(trimInnerRx, ' ');
  },
  shouldTriggerSearch: (selectedText)=>{
    if (typeof selectedText != 'string') {
      return false;
    }

    let words = selectedText.split(' ');

    if (words.length == 1 && !words[0]) { // smth like '' or '  '
      return false;
    }

    if (words.length >= MAX_WORD_COUNT) {
      return false;
    }

    eligibilityRx.lastIndex = 0;
    return !(selectedText.match(eligibilityRx));
  },
  shouldTriggerContextRecognition: (word)=>{
    if ((typeof word != 'string') || (word.split(' ').length <= MIN_WORD_COUNT_FOR_CONTEXT)) {
      return false;
    }

    return true;
  },
  typeAbbreviation: (type) => {

    //FIXME
    function tr(s){
      return s;
    }

    // http://public.oed.com/how-to-use-the-oed/abbreviations/
    switch (type) {
      case 'NONE':
        return tr('(none)');
      case 'NOUN':
        return tr('(n.)');
      case 'VERB':
        return tr('(v.)');
      case 'VERB_TRANSITIVE':
        return tr('(v. trans.)');
      case 'VERB_INTRANSITIVE':
        return tr('(v. intrans.)');
      case 'ADJECTIVE':
        return tr('(adj.)');
      case 'ADVERB':
        return tr('(adv.)');
      case 'PRONOUN':
        return tr('(pron.)');
      case 'PREPOSITION':
        return tr('(prep.)');
      case 'CONJUNCTION':
        return tr('(conj.)');
      case 'INTERJECTION':
        return tr('(interj.)');
      case 'PHRASAL_VERBS':
        return tr('(phrasal verb)');
      case 'IDIOM':
        return tr('(idiom)');
      case 'PHRASE':
        return tr('(phr.)');
      default:
        return tr('(?)');
    }
  },
  definitionTypes: ()=>{
    return definitionTypes;
  }
};
