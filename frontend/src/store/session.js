const { csrfFetch } = require('./csrf');

const SET_SESSION = 'session/SET_SESSION';
const REMOVE_SESSION = 'session/REMOVE_SESSION';

const setSession = (user) => ({
  type: SET_SESSION,
  user,
});

const removeSession = () => ({
  type: REMOVE_SESSION,
});

export const loginUser = (credential, password) => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential, password }),
  });
  const user = await response.json();
  dispatch(setSession(user));
  return user;
};

export const logoutUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeSession());
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session');
  const user = await response.json();
  if (!user.user) dispatch(removeSession());
  else dispatch(setSession(user.user));
  return user.user;
};

export const signup = (username, email, password) => async (dispatch) => {
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  const newUser = await response.json();
  dispatch(setSession(newUser));
  return newUser;
};

export const editProfile = (id, username, email) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email }),
  });
  const user = await response.json();
  dispatch(setSession(user));
  return user;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION:
      return { ...state, user: { ...action.user } };
    case REMOVE_SESSION:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
