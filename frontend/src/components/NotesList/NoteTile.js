import { NavLink, useParams } from 'react-router-dom';

const NoteTile = ({ note }) => {
  const { noteId } = useParams();

  const selected = +noteId === note.id;
  return (
    <NavLink
      className="nav-link"
      to={`/notebooks/${note.notebookId}/notes/${note.id}/edit`}
    >
      <div className={selected ? 'note-tile-selected' : 'note-tile'}>
        <p>
          {note.title} <i className="far fa-pencil"></i>
        </p>
      </div>
    </NavLink>
  );
};

export default NoteTile;
