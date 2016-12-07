// @flow
import * as actions from '../../actions/constants/user';

export function user(state: Object = {}, action: Object) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
    case actions.LOAD_USER:
      return { user: {...action.user, token: action.token } };
    case actions.LOGOUT_SUCCESS:
      return {};
    case actions.REGISTER_FAIL:
      return { registerFailed: true };
    case actions.LOGIN_FAIL:
      return { loginFailed: true };
    default:
      return state;
  }
}

export function isFetching(state: boolean = false, action: Object) {
  switch (action.type) {
    case actions.REQUEST_REGISTER:
    case actions.REQUEST_LOGIN:
    case actions.REQUEST_LOGOUT:
      return true;
    case actions.REGISTER_FAIL:
    case actions.LOGIN_SUCCESS:
    case actions.LOGIN_FAIL:
    case actions.LOGOUT_SUCCESS:
    case actions.LOGOUT_FAIL:
      return false;
    default:
      return state;
  }
}