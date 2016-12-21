// @flow
import * as actions from '../../actions/constants/quiz';

export function quiz(state: Object = {}, action: Object) {
  switch (action.type) {
    case actions.REQUEST_START_QUIZ: // clear previous quiz's state.
      return {};
    case actions.QUIZ_READY: // action.data: definition and words for quiz
      return action.data;
    case actions.QUIZ_REJECTED: // action.data: error message
      return { error: action.data };
    default:
      return state;
  }
}

export function isFetching(state: boolean = false, action: Object) {
  switch (action.type) {
    case actions.REQUEST_START_QUIZ:
      return true;
    case actions.QUIZ_READY:
      return false;
    default:
      return state;
  }
}
