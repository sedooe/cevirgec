// @flow
import * as dictionaryActions from '../actions/constants/dictionary';
import * as onlineSourceActions from '../actions/constants/onlineSource';
import * as userActions from '../actions/constants/user';
import * as definitionActions from '../actions/constants/newDefinitionWindow';

export default function isFetching(state: boolean = false, action: Object) {
  switch (action.type) {
    case dictionaryActions.REQUEST_CREATE_DICTIONARY:
    case dictionaryActions.REQUEST_DELETE_DICTIONARY:
    case dictionaryActions.REQUEST_EDIT_DICTIONARY:
    case dictionaryActions.REQUEST_CHANGE_ACTIVENESS_OF_DICTIONARY:
    case dictionaryActions.REQUEST_LOAD_DICTIONARIES:
    case dictionaryActions.REQUEST_LOAD_ONLINE_SOURCES_OF_ACTIVE_DICTIONARIES:
    case onlineSourceActions.REQUEST_UPSERT_ONLINE_SOURCE:
    case onlineSourceActions.REQUEST_DELETE_ONLINE_SOURCE:
    case onlineSourceActions.REQUEST_CHANGE_ACTIVENESS_OF_ONLINE_SOURCE:
    case userActions.REQUEST_REGISTER:
    case userActions.REQUEST_LOGIN:
    case userActions.REQUEST_LOGOUT:
    case definitionActions.REQUEST_SAVE_DEFINITION:
      return true;
    case dictionaryActions.DICTIONARY_CREATED:
    case dictionaryActions.DICTIONARY_DELETED:
    case dictionaryActions.DICTIONARY_EDITED:
    case dictionaryActions.DICTIONARY_ACTIVENESS_CHANGED:
    case dictionaryActions.DICTIONARIES_LOADED:
    case onlineSourceActions.ONLINE_SOURCE_CREATED:
    case onlineSourceActions.ONLINE_SOURCE_DELETED:
    case onlineSourceActions.ONLINE_SOURCE_EDITED:
    case onlineSourceActions.ONLINE_SOURCE_ACTIVENESS_CHANGED:
    case onlineSourceActions.ONLINE_SOURCES_OF_DICTIONARIES_LOADED:
    case userActions.REGISTER_FAIL:
    case userActions.LOGIN_SUCCESS:
    case userActions.LOGIN_FAIL:
    case userActions.LOGOUT_SUCCESS:
    case userActions.LOGOUT_FAIL:
    case definitionActions.DEFINITION_SAVED:
      return false;
    default:
      return state;
  }
}
