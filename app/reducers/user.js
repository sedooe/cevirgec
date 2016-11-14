// @flow
import * as actions from '../actions/constants';

export default function user(state: Object = {}, action: Object) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS: {
      return {
        user: action.data,
        isFetching: false,
        registerFailed: false,
        loginFailed: false
      }
    }

    case actions.REGISTER_FAIL: {
      return {
        isFetching: false,
        registerFailed: true
      }
    }

    default:
      return state;
  }
}