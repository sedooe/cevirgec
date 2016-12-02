import * as userActions from './constants/user';
import * as dictionaryActions from './constants/dictionary';
import * as onlineSourceActions from './constants/onlineSource';
import * as definitionActions from './constants/newDefinitionWindow';

export const dbCallbacks = [
  dictionaryActions.DICTIONARIES_LOADED,
  dictionaryActions.DICTIONARY_CREATED,
  dictionaryActions.DICTIONARY_EDITED,
  dictionaryActions.DICTIONARY_ACTIVENESS_CHANGED,
  dictionaryActions.DICTIONARY_DELETED,
  userActions.REGISTER_SUCCESS_LOCALDB,
  onlineSourceActions.ONLINE_SOURCES_LOADED,
  onlineSourceActions.ONLINE_SOURCE_CREATED,
  onlineSourceActions.ONLINE_SOURCE_EDITED,
  onlineSourceActions.ONLINE_SOURCE_DELETED
];

export const dbCallbacksNewDefWindow = [
  dictionaryActions.DICTIONARIES_LOADED,
  onlineSourceActions.ONLINE_SOURCES_OF_DICTIONARIES_LOADED,
  definitionActions.DEFINITION_SAVED,
  definitionActions.FOUND_DEFINITIONS_OF_WORD,
  definitionActions.DEFINITION_DELETED
];