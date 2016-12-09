// @flow
import { ipcRenderer } from 'electron';
import * as actions from './constants/study';

const requestStartStudy = () => ({
  type: actions.REQUEST_START_STUDY
})

export const startStudy = (dictionaryId: number) => (dispatch: Function) => {
  dispatch(requestStartStudy());
  ipcRenderer.send(actions.START_STUDY, dictionaryId);
}
