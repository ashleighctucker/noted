import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotebooks } from '../../store/notebooks';
import AddNotebookModal from './AddNotebookModal';
import NotebookTile from './NotebookTile';
import './NotebooksBar.css';

const NotebooksBar = () => {
  const dispatch = useDispatch();
  const notebooks = useSelector((state) => state.notebooks);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch, sessionUser]);

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
      {notebooks ? createTile(notebooks) : null}
      <AddNotebookModal />
    </div>
  );
};

export default NotebooksBar;
