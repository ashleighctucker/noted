import { useHistory } from 'react-router-dom';

const NotebookTile = ({ notebook }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/notebooks/${notebook.id}/notes/new`);
  };

  return (
    <div className="notebook-tile" key={notebook.id} onClick={handleClick}>
      <img className="tile-image" src={notebook.photoUrl} alt="test" />
      <p>{notebook.title}</p>
    </div>
  );
};

export default NotebookTile;
