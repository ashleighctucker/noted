import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, Redirect } from 'react-router-dom';

import { getNotes } from '../../store/notes';
import NoteTile from './NoteTile';
import './NotesList.css';

const NotesList = () => {
  const { notebookId } = useParams();
  const dispatch = useDispatch();
  const unfilteredNotes = useSelector((state) => state.notes);
  const sessionUser = useSelector((state) => state.session.user);

  let notes = [];
  for (const note in unfilteredNotes) {
    if (+unfilteredNotes[note].notebookId === +notebookId) {
      notes.push(unfilteredNotes[note]);
    }
  }

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  if (!sessionUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div id="note-tiles-container">
      <div className="div-header">Notes</div>
      {notes?.map((note) => (
        <NoteTile key={note.id} note={note} />
      ))}
      <div className="add-note-div">
        <p>Add Note</p>
        <NavLink className="nav-link" to={`/notebooks/${notebookId}/notes/new`}>
          <button className="add-note-button">
            <i className="far fa-plus"></i>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default NotesList;
