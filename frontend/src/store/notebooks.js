const { csrfFetch } = require('./csrf');

const LOAD = 'notebooks/LOAD';
const ADD = 'notebooks/ADD';
const UPDATE = 'notebooks/UPDATE';
const REMOVE = 'notebooks/REMOVE';

const load = (list) => ({
  type: LOAD,
  list,
});

const add = (notebook) => ({
  type: ADD,
  notebook,
});

const update = (notebook) => ({
  type: UPDATE,
  notebook,
});

const remove = (notebookId) => ({
  type: REMOVE,
  notebookId,
});

export const getNotebooks = () => async (dispatch) => {
  const response = await csrfFetch('/api/notebooks');
  const notebooks = await response.json();
  if (response.ok) {
    dispatch(load(notebooks));
    return notebooks;
  }
};

export const addNotebook = (title, photoUrl) => async (dispatch) => {
  const response = await csrfFetch('/api/notebooks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, photoUrl }),
  });
  const notebook = await response.json();
  dispatch(add(notebook));
  return notebook;
};

export const editNotebook = (id, title, photoUrl) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, photoUrl }),
  });
  const notebook = await response.json();
  dispatch(update(notebook));
  return notebook;
};

export const deleteNotebook = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks/${id}`, {
    method: 'DELETE',
  });
  const message = await response.json();
  dispatch(remove(id));
  return message;
};

const initialState = {};

const notebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const normalNotebooks = {};
      action.list.forEach((notebook) => {
        normalNotebooks[notebook.id] = notebook;
      });
      console.log(normalNotebooks);
      return { ...state, ...normalNotebooks };
    }
    case ADD: {
      return {
        ...state,
        [action.notebook.id]: action.notebook,
      };
    }
    case UPDATE: {
      return {
        ...state,
        [action.notebook.id]: action.notebook,
      };
    }
    case REMOVE: {
      const newState = { ...state };
      delete newState[action.notebookId];
      return newState;
    }
    default:
      return state;
  }
};

export default notebookReducer;
