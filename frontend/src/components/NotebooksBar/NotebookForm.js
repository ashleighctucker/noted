import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addNotebook } from '../../store/notebooks';

const NotebookForm = () => {
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
      history.push(`/notebooks/${notebook.id}/notes/new`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="photoUrl">Notbook Cover Photo</label>
          <input
            name="photoUrl"
            value={photoUrl}
            placeholder="Insert a photo URL"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>
        <div>
          <div className="error-div">
            <p className="user-form-errors">
              {errors.map((error, i) => (
                <span key={i}>{error}</span>
              ))}
            </p>
          </div>
          <button type="submit">
            <i className="far fa-save"></i> Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotebookForm;
