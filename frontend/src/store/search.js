const { csrfFetch } = require('./csrf');

const LOAD_NOTEBOOK = 'search/LOAD_NOTEBOOK_SEARCH';

const load = (list) => ({
  type: LOAD_NOTEBOOK,
  list,
});

export const searchNotebooks = (term) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/search/${term === '' ? 'note' : term}`
  );
  const notebooks = await response.json();
  dispatch(load(notebooks));
  return notebooks;
};

const initialState = { notebooks: {} };

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTEBOOK: {
      const normalNotebooks = {};
      action.list.forEach((notebook) => {
        normalNotebooks[notebook.id] = notebook;
      });
      return { ...state, notebooks: normalNotebooks };
    }
    default:
      return state;
  }
};

export default searchReducer;
