import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteNotebook } from '../../store/notebooks';
import EditNotebookModal from './EditNotebookModal';

const NotebookTile = ({ notebook }) => {
  const { notebookId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTile] = useState(notebook.title);
  const [photoUrl, setPhotoUrl] = useState(notebook.photoUrl);

  const selected = +notebookId === notebook.id;

  const handleClick = () => {
    history.push(`/notebooks/${notebook.id}/notes/new`);
  };

  const deleteThis = () => {
    dispatch(deleteNotebook(notebook.id));
    history.push('/home');
  };

  useEffect(() => {
    setTile(notebook.title);
    setPhotoUrl(notebook.photoUrl);
  }, [notebook.title, notebook.photoUrl]);

  const Buttons = () => {
    return (
      <>
        <EditNotebookModal notebook={notebook} />
        <button className="delete-notebook-button" onClick={deleteThis}>
          <i className="far fa-trash-alt"></i> Delete
        </button>
      </>
    );
  };

  return (
    <div
      className={selected ? 'notebook-tile-selected' : 'notebook-tile'}
      key={notebook.id}
    >
      <div onClick={handleClick}>
        <img
          className="tile-image"
          src={photoUrl ? photoUrl : 'https://i.imgur.com/WPBPVC7.png'}
          alt="test"
        />
        <p>{title}</p>
      </div>
      <div>{selected ? <Buttons /> : null}</div>
    </div>
  );
};

export default NotebookTile;
