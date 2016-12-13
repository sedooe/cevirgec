// @flow
import * as actions from '../../actions/constants/study';

export function study(state: Object = {}, action: Object) {
  switch (action.type) {
    case actions.STUDY_READY: //action.data: wordsAndDefinitions for study
      return action.data;
    default:
      return state;
  }
}

export function isFetching(state: boolean = false, action: Object) {
  switch (action.type) {
    case actions.REQUEST_START_STUDY:
      return true;
    case actions.STUDY_READY:
      return false;
    default:
      return state;
  }
}
