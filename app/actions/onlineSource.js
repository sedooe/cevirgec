// @flow
import * as actions from './constants';

const requestLoadOnlineSources = () => ({
  type: actions.REQUEST_LOAD_ONLINE_SOURCES
})

export const loadOnlineSources = () => (dispatch: Function) => {
  dispatch(requestLoadOnlineSources());
  ipc.send(actions.LOAD_ONLINE_SOURCES);
}

const requestCreateOnlineSource = (dictionary: Object) => ({
  type: actions.REQUEST_CREATE_ONLINE_SOURCE,
  dictionary
})

export const createOnlineSource = (dictionary: Object) => (dispatch: Function) => {
  dispatch(requestCreateOnlineSource(dictionary));
  ipc.send(actions.CREATE_ONLINE_SOURCE, dictionary);
}

const requestEditOnlineSource = (dictionary: Object) => ({
  type: actions.REQUEST_EDIT_ONLINE_SOURCE,
  dictionary
})

export const editOnlineSource = (dictionary: Object) => (dispatch: Function) => {
  dispatch(requestEditOnlineSource(dictionary));
  ipc.send(actions.EDIT_ONLINE_SOURCE, dictionary);
}

const requestDeleteOnlineSource = (dictionaryId: number) => ({
  type: actions.REQUEST_DELETE_ONLINE_SOURCE,
  dictionaryId
})

export const deleteOnlineSource = (dictionaryId: number) => (dispatch: Function) => {
  dispatch(requestDeleteOnlineSource(dictionaryId));
  ipc.send(actions.DELETE_ONLINE_SOURCE, dictionaryId);
}
