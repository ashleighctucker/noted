import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getNotebooks } from '../../store/notebooks';
import AddNotebookModal from './AddNotebookModal';
import NotebookTile from './NotebookTile';
import './NotebooksBar.css';

const NotebooksBar = () => {
  const dispatch = useDispatch();
  const notebooks = useSelector((state) => state.notebooks);
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  useEffect(() => {
    if (!sessionUser) {
      history.push('/');
    } else {
      dispatch(getNotebooks());
    }
  }, [dispatch, sessionUser, history]);

  if (!sessionUser) {
    return <Redirect to="/login" />;
  }

  const createTile = (notebooks) => {
    const tiles = [];
    for (const notebook in notebooks) {
      const inner = (
        <NotebookTile key={notebook} notebook={notebooks[notebook]} />
      );
      tiles.push(inner);
    }
    return tiles;
  };

  return (
    <div id="notebooks-bar-container">
      <div className="div-header">Notebooks</div>
      {notebooks ? createTile(notebooks) : null}
      <AddNotebookModal />
    </div>
  );
};

export default NotebooksBar;
