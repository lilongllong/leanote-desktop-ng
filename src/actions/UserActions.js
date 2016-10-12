import * as types from '../constants/ActionTypes';

export function receiveAuthedUser(status, userInfo) {
  return { type: types.RECEIVE_AUTHED_USER, status, userInfo };
}

export function autologin() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      service.user.init((userInfo) => {
        if (userInfo) {
          dispatch(receiveAuthedUser('success', userInfo));
          resolve(userInfo);
        }
        else {
          dispatch(receiveAuthedUser('error'));
          reject();
        }
      });
    });
  }
}

export function login(account, password, host) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      service.user.login(account, password, host, (ret) => {
        ret ? resolve() : reject();
      });
    });
  }
}
