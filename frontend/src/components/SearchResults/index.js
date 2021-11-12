import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getNotebooks } from '../../store/notebooks';
import AddNotebookModal from '../NotebooksBar/AddNotebookModal';
import NotebookTile from '../NotebooksBar/NotebookTile';
import './SearchResults.css';

const NotebooksBar = () => {
  const dispatch = useDispatch();
  const notebooks = useSelector((state) => state.search.notebooks);
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  Object.size = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  const notebookLength = Object.size(notebooks);

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
      {notebookLength === 0 ? (
        <p id="search-no-match">There we're no matches to your search</p>
      ) : null}
      <AddNotebookModal />
    </div>
  );
};

export default NotebooksBar;
