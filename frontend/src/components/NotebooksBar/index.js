import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotebooks } from '../../store/notebooks';
import './NotebooksBar.css';

const NotebooksBar = () => {
  const dispatch = useDispatch();
  const notebooks = useSelector((state) => state.notebooks);

  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch]);

  const notebooksArray = [];
  console.log(notebooks, notebooksArray);

  const createTile = (notebooks) => {
    const tiles = [];
    console.log(notebooks);
    for (const notebook in notebooks) {
      const inner = (
        <div className="notebook-tile">
          <img
            className="tile-image"
            src={notebooks[notebook].photoUrl}
            alt="test"
          />
          <p>{notebooks[notebook].title}</p>
        </div>
      );
      tiles.push(inner);
    }
    return tiles;
  };

  return (
    <div id="notebooks-bar-container">
      {notebooks ? createTile(notebooks) : null}
    </div>
  );
};

export default NotebooksBar;
