// @flow
import * as actions from './constants';
import fetch from 'isomorphic-fetch';
const ipc = require('electron').ipcRenderer;
import { hashHistory } from 'react-router';

const requestRegister = () => ({
  type: actions.REQUEST_REGISTER
})

const registerFail = error => ({
  type: actions.REGISTER_FAIL,
  error
})

export const register = (user: Object) => (dispatch: Function) => {
  dispatch(requestRegister());
  fetch('http://localhost:8080/api/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(response => response.json())
  .then(json => ipc.send(actions.REQUEST_REGISTER_LOCALDB, {...json.user, token: json.token}))
  .catch(e => dispatch(registerFail(e)));
}

const requestLogin = () => ({
  type: actions.REQUEST_LOGIN
})

export const loginSuccess = (user: Object, token: String) => (dispatch: Function) => {

  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
  hashHistory.push('/');

  dispatch({
    type: actions.LOGIN_SUCCESS,
    user
  });
}

const logoutSuccess = () => ({
  type: actions.LOGOUT_SUCCESS
})

const loginFail = error => ({
  type: actions.LOGIN_FAIL,
  error
})

const logoutFail = error => ({
  type: actions.LOGOUT_FAIL,
  error
})

export const login = (userCredentials: Object) => (dispatch: Function) => {
  dispatch(requestLogin());//FIXME obsolete or just needed for isFetching:true ?

  fetch('http://localhost:8080/api/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userCredentials)
  })
  .then(response => response.json())
  .then(response => dispatch(loginSuccess(response.user, response.token)))
  .catch(e => dispatch(loginFail(e)));
}

export const logout = () => (dispatch: Function) => {
  dispatch(requestLogin());
  fetch('http://localhost:8080/api/logout', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.status != 204) {
      throw 'Logout Failed with status ' + response.status;
    }
  } )
  .then(() => {
    localStorage.clear();
    location.reload();// this will redirect to login
  })
  .catch(e => dispatch(logoutFail(e)));
}

export const loadUser = (user: Object) => ({
  type: actions.LOAD_USER,
  user
})
