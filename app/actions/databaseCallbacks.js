import { ipcRenderer as ipc } from 'electron';
import * as userActions from './constants/user';
import * as dictionaryActions from './constants/dictionary';
import * as onlineSourceActions from './constants/onlineSource';
import * as definitionActions from './constants/newDefinitionWindow';
import { loginSuccess } from './user';
import { dictionariesAndActiveDictionariesLoaded } from './dictionary';
import { loadOnlineSourcesOfDictionary } from './onlineSource';
import {
  lookForDefinitionsOnWindowOpen,
  lookForDefinitionsWhenNewDefinitionCreated,
  mergeDefinitions
} from './wordAndDefinitions';

const dbCallbacks = [
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

export const listenDbEvents = store => {
  dbCallbacks.forEach(action => {
    ipc.on(action, (event, data, additionalData) => {
      if (action == userActions.REGISTER_SUCCESS_LOCALDB) {
        store.dispatch(loginSuccess(data, additionalData));
      } else {
        store.dispatch({ type: action, data, additionalData });
      }
    });
  });
}

const dbCallbacksNewDefWindow = [
  dictionaryActions.DICTIONARIES_LOADED,
  dictionaryActions.DICTIONARY_CREATED,
  onlineSourceActions.ONLINE_SOURCES_OF_DICTIONARIES_LOADED,
  definitionActions.DEFINITION_SAVED,
  definitionActions.FOUND_DEFINITIONS_OF_WORD,
  definitionActions.DEFINITION_DELETED,
  definitionActions.DEFINITION_EDITED,
  dictionaryActions.DICTIONARIES_ACTIVENESS_CHANGED,
  onlineSourceActions.ONLINE_SOURCE_CREATED
];

export const listenDbEventsForNewDefWindow = store => {
  dbCallbacksNewDefWindow.forEach(action => {
    ipc.on(action, (event, data) => {
      if (action === dictionaryActions.DICTIONARIES_LOADED) { //data: dictionaries, type: array -not object!-
        const activeDictionaryIds = [];
        data.forEach(dictionary => {
          if (dictionary.active) {
            activeDictionaryIds.push(dictionary.id.toString());
          }
        });
        store.dispatch(dictionariesAndActiveDictionariesLoaded(data, activeDictionaryIds));
        store.dispatch(lookForDefinitionsOnWindowOpen(activeDictionaryIds)); //this action is not dependent to action above.
      } else if (action === dictionaryActions.DICTIONARY_CREATED) {
        store.dispatch({ type: action, data });
        store.dispatch(loadOnlineSourcesOfDictionary(data));
      } else if (action === definitionActions.DEFINITION_SAVED) {
        store.dispatch(mergeDefinitions(data));
      } else {
        store.dispatch({ type: action, data });          
      }
    });
  });
}