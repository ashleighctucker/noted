const { csrfFetch } = require('./csrf');

const LOAD_NOTES = 'notes/LOAD_NOTES';
const ADD_NOTE = 'notes/ADD_NOTE';
const UPDATE_NOTE = 'notes/UPDATE_NOTE';
const REMOVE_NOTE = 'notes/REMOVE_NOTE';

const load = (list) => ({
  type: LOAD_NOTES,
  list,
});

const add = (note) => ({
  type: ADD_NOTE,
  note,
});

const update = (note) => ({
  type: UPDATE_NOTE,
  note,
});

const remove = (noteId) => ({
  type: REMOVE_NOTE,
  noteId,
});

export const getNotes = () => async (dispatch) => {
  const response = await csrfFetch('/api/notes');
  const notes = await response.json();
  if (response.ok) {
    dispatch(load(notes));
    return notes;
  }
};

export const addNote = (title, content) => async (dispatch) => {
  const response = await csrfFetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });
  const note = await response.json();
  dispatch(add(note));
  return note;
};

export const editNote = (id, title, content) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${id}`, {
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

const initialState = {};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTES: {
      const normalNotes = {};
      action.list.forEach((note) => {
        normalNotes[note.id] = note;
      });
      return { ...state, ...normalNotes };
    }
    case ADD_NOTE:
      return {
        ...state,
        [action.note.id]: action.note,
      };
    case UPDATE_NOTE: {
      return {
        ...state,
        [action.note.id]: action.note,
      };
    }
    case REMOVE_NOTE: {
      const newState = { ...state };
      delete newState[action.noteId];
      return newState;
    }
    default:
      return state;
  }
};

export default noteReducer;
