const { csrfFetch } = require('./csrf');

const SET_SESSION = 'session/set';
const REMOVE_SESSION = 'session/remove';

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
  console.log('here', user);
  if (!user.username) dispatch(removeSession());
  else dispatch(setSession(user));
  return user;
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
