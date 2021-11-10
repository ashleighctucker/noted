import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getNotes } from '../../store/notes';

const NotesList = () => {
  const { notebookId } = useParams();
  const dispatch = useDispatch();
  const unfilteredNotes = useSelector((state) => state.notes);

  let notes = [];
  for (const note in unfilteredNotes) {
    if (+unfilteredNotes[note].notebookId === +notebookId) {
      notes.push(unfilteredNotes[note]);
    }
  }

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <div>
      {notes?.map((note) => (
        <span key={note.id}>{note.title}</span>
      ))}
    </div>
  );
};

export default NotesList;
