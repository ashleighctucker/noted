import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addNotebook } from '../../store/notebooks';

const NotebookForm = ({ close }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const notebook = await dispatch(addNotebook(title, photoUrl)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          const filteredErrors = data.errors.filter(
            (error) => error !== 'Invalid value'
          );
          setErrors(filteredErrors);
        }
      }
    );
    if (notebook) {
      close();
      history.push(`/notebooks/${notebook.id}/notes/new`);
    }
  };

  return (
    <div id="notebook-modal">
      <form id="note-form" onSubmit={handleSubmit}>
        <div className="note-form-title-container">
          <label className="note-title" htmlFor="title">
            Title
          </label>
          <input
            className="note-title-input"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="photo-input-container">
          <label htmlFor="photoUrl">Notbook Cover Photo</label>
          <input
            className="note-title-input"
            name="photoUrl"
            value={photoUrl}
            placeholder="Insert a photo URL (optional)"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>
        <div className="note-button-container">
          <div className="error-div">
            <p className="user-form-errors">
              {errors.map((error, i) => (
                <span key={i}>{error}</span>
              ))}
            </p>
          </div>
          <div className="button-div">
            <button className="note-button" type="submit">
              <i className="far fa-save"></i> Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NotebookForm;
