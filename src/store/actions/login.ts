export const LOGIN = 'USER_LOGIN';
export const LOGOUT = 'USER_LOGOUT';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export function loginRequest(payload?: {
  user: User;
  cb: (err?: Error) => void;
}) {
  return { type: LOGIN_REQUEST, payload };
}

export function logoutRequest() {
  return { type: LOGOUT_REQUEST };
}

export function login(payload: User) {
  return { type: LOGIN, payload };
}

export function logout() {
  return { type: LOGOUT };
}
