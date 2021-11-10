import { useHistory } from 'react-router-dom';

const NoteTile = ({ note }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/notebooks/${note.notebookId}/notes/${note.id}/edit`);
  };
  return (
    <div className="note-tile" onClick={handleClick}>
      <p>{note.title}</p>
      {/* <p>{note.content}</p> */}
    </div>
  );
};

export default NoteTile;
