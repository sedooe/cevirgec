// @flow
import { ipcRenderer } from 'electron';
import * as actions from './constants/quiz';
import { FINISH_STUDY } from './constants/study';

const requestStartQuiz = () => ({
  type: actions.REQUEST_START_QUIZ
})

export const startQuiz = (dictionaryId: number) => (dispatch: Function) => {
  dispatch(requestStartQuiz());
  ipcRenderer.send(actions.START_QUIZ, dictionaryId);
}

export const finishQuiz = (results: Object) => (dispatch: Function) => {
  ipcRenderer.send(FINISH_STUDY, results); // same with study
}
