// @flow
import * as actions from './constants/user';
import fetch from 'isomorphic-fetch';
import { hashHistory } from 'react-router';

const {ipcRenderer} = require('electron')

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
  .then(json => ipcRenderer.send(actions.REQUEST_REGISTER_LOCALDB, {...json.user, token: json.token}))
  .catch(e => dispatch(registerFail(e)));
}

const requestLogin = () => ({
  type: actions.REQUEST_LOGIN
})

export const loginSuccess = (user: Object, token: String) => (dispatch: Function) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
  ipcRenderer.send(actions.LOGIN_SUCCESS, user);
  hashHistory.push('/');

  dispatch({
    type: actions.LOGIN_SUCCESS,
    user,
    token
  });
}

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
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(userCredentials.username + ':' + userCredentials.password)
    }
  })
  .then(response => response.json())
  .then(response => dispatch(loginSuccess(response.user, response.token)))
  .catch(e => dispatch(loginFail(e)));
}

const requestLogout = () => ({
  type: actions.REQUEST_LOGOUT
})

const logoutSuccess = () => (dispatch: Function) => {
  localStorage.clear();
  ipcRenderer.send(actions.LOGOUT_SUCCESS);
  // hashHistory.push('/'); // doesn't work
  window.location.reload();// this will redirect to login

  dispatch({
    type: actions.LOGOUT_SUCCESS
  });
}

const logoutFail = error => ({
  type: actions.LOGOUT_FAIL,
  error
})

export const logout = () => (dispatch: Function) => {
  dispatch(requestLogout());
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
  .then(response => dispatch(logoutSuccess()))
  .catch(e => dispatch(logoutFail(e)));
}

export const loadUser = (user: Object) => ({
  type: actions.LOAD_USER,
  user
})
