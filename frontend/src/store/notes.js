const { csrfFetch } = require('./csrf');

const LOAD = 'notes/LOAD';
const ADD = 'notes/ADD';
const UPDATE = 'notes/UPDATE';
const REMOVE = 'notes/REMOVE';
const RESET = 'notes/RESET_STATE';

const load = (list) => ({
  type: LOAD,
  list,
});

const add = (note) => ({
  type: ADD,
  note,
});

const update = (note) => ({
  type: UPDATE,
  note,
});

const remove = (noteId) => ({
  type: REMOVE,
  noteId,
});

const reset = () => ({
  type: RESET,
});

export const getNotes = () => async (dispatch) => {
  const response = await csrfFetch('/api/notes');
  const notes = await response.json();
  if (response.ok) {
    dispatch(load(notes));
    return notes;
  }
};

export const addNote = (notebookId, title, content) => async (dispatch) => {
  const response = await csrfFetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notebookId, title, content }),
  });
  const note = await response.json();
  dispatch(add(note));
  return note;
};

export const editNote = (noteId, title, content) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${noteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });
  const note = await response.json();
  dispatch(update(note));
  return note;
};

export const deleteNote = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${id}`, { method: 'DELETE' });
  const message = await response.json();
  dispatch(remove(id));
  return message;
};

export const resetNotes = () => async (dispatch) => {
  dispatch(reset());
};

const initialState = {};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const normalNotes = {};
      action.list.forEach((note) => {
        normalNotes[note.id] = note;
      });
      return { ...state, ...normalNotes };
    }
    case ADD:
      return {
        ...state,
        [action.note.id]: action.note,
      };
    case UPDATE: {
      return {
        ...state,
        [action.note.id]: action.note,
      };
    }
    case REMOVE: {
      const newState = { ...state };
      delete newState[action.noteId];
      return newState;
    }
    case RESET: {
      return {};
    }
    default:
      return state;
  }
};

export default noteReducer;
