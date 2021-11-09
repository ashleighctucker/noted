import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { editNote } from '../../store/notes';

const EditNoteForm = () => {
  const { noteId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const note = useSelector((state) => state.notes[noteId]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [errors, setErrors] = useState([]);

  if (!sessionUser) {
    return <Redirect to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const note = await dispatch(editNote(noteId, title, content)).catch(
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
      history.push('/');
    }
  };

  return (
    <div id="note-form-container">
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
              Save Note
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditNoteForm;
