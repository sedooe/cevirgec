// @flow
import * as actions from '../../actions/constants/user';

export default function user(state: Object = {}, action: Object) {
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
