import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { addNote } from '../../store/notes';
import './NoteForm.css';

const NoteForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const { notebookId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  if (!sessionUser) {
    return <Redirect to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const note = await dispatch(addNote(notebookId, title, content)).catch(
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
    if (note) {
      history.push(`/notebooks/${notebookId}/notes/new`);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="note-form-container">
      <form id="note-form" onSubmit={handleSubmit}>
        <div className="note-form-title-container">
          <label htmlFor="title" className="note-title">
            Title
          </label>
          <input
            className="note-title-input"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="note-form-content-container">
          <label htmlFor="content"></label>
          <textarea
            className="note-content-input"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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

export default NoteForm;
