// @flow
import * as actions from '../actions/constants';

export default function user(state: Object = {}, action: Object) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
    case actions.LOAD_USER: {
      return {
        user: action.user,
        isFetching: false,
        registerFailed: false,
        loginFailed: false
      }
    }

    case actions.LOGOUT_SUCCESS: {
      return {
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
