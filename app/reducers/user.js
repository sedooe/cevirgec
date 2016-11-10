// @flow
import * as actions from '../actions/constants';

export default function user(state: Object = {}, action: Object) {
  switch (action.type) {
    case actions.REGISTER_SUCCESS: {
      debugger;
    }

    case actions.REGISTER_FAIL: {
      debugger;
    }

    default:
      return state;
  }
}