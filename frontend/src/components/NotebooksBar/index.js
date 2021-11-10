import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNotebooks } from '../../store/notebooks';
import NotebookTile from './NotebookTile';
import './NotebooksBar.css';

const NotebooksBar = () => {
  const dispatch = useDispatch();
  const notebooks = useSelector((state) => state.notebooks);

  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch]);

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
      <div className="add-note-div">
        <p>Add Notebook</p>
        <NavLink className="nav-link" to={`/notebooks/new`}>
          <button className="add-note-button">
            <i className="far fa-plus"></i>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default NotebooksBar;
