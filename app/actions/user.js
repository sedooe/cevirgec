// @flow
import * as actions from './constants';
import fetch from 'isomorphic-fetch';
const ipc = require('electron').ipcRenderer;

const requestRegister = () => ({
  type: actions.REQUEST_REGISTER
})

const registerSuccess = (user: Object) => ({
  type: actions.REGISTER_SUCCESS,
  user
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
  .then(json => dispatch(registerSuccess(json)))
  .catch(e => dispatch(registerFail(e)));
}

const requestLogin = () => ({
  type: actions.REQUEST_LOGIN
})

const loginSuccess = (user: Object) => ({
  type: actions.LOGIN_SUCCESS,
  user
})

const loginFail = error => ({
  type: actions.LOGIN_FAIL,
  error
})

export const login = (userCredentials: Object) => (dispatch: Function) => {
  dispatch(requestLogin());
  fetch('http://localhost:8080/api/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userCredentials)
  })
  .then(response => response.json())
  .then(json => dispatch(loginSuccess(json)))
  .catch(e => dispatch(loginFail(e)));
}