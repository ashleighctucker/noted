import { useHistory, NavLink } from 'react-router-dom';

const NoteTile = ({ note }) => {
  const history = useHistory();
  const handleClick = () => {
    // history.push(`/notebooks/${note.notebookId}/notes/${note.id}/edit`);
  };
  return (
    <NavLink to={`/notebooks/${note.notebookId}/notes/${note.id}/edit`}>
      <div className="note-tile" onClick={handleClick}>
        <p>{note.title}</p>
        {/* <p>{note.content}</p> */}
      </div>
    </NavLink>
  );
};

export default NoteTile;
