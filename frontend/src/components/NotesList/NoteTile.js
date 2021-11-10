import { NavLink } from 'react-router-dom';

const NoteTile = ({ note }) => {
  return (
    <NavLink
      className="nav-link"
      to={`/notebooks/${note.notebookId}/notes/${note.id}/edit`}
    >
      <div className="note-tile">
        <p>{note.title}</p>
        {/* <p>{note.content}</p> */}
      </div>
    </NavLink>
  );
};

export default NoteTile;
