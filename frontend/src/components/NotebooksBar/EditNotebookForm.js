import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editNotebook } from '../../store/notebooks';

const EditNotebookForm = ({ close, notebook }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState(notebook.title);
  const [photoUrl, setPhotoUrl] = useState(notebook.photoUrl);
  const [errors, setErrors] = useState([]);
  console.log('open');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const editedNotebook = await dispatch(
      editNotebook(notebook.id, title, photoUrl)
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        const filteredErrors = data.errors.filter(
          (error) => error !== 'Invalid value'
        );
        setErrors(filteredErrors);
      }
    });
    if (editedNotebook) {
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

export default EditNotebookForm;
