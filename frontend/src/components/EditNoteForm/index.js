import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { deleteNote, editNote } from '../../store/notes';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './EditNoteForm.css';

const EditNoteForm = () => {
  const { noteId, notebookId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const note = useSelector((state) => state.notes[noteId]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note.title, note.content]);

  if (!sessionUser) {
    return <Redirect to="/login" />;
  }

  const handleDelete = async () => {
    const res = await dispatch(deleteNote(noteId, notebookId)).catch(
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
    if (res) {
      history.push(`/notebooks/${notebookId}/notes/new`);
    }
  };

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
      history.push(`/notebooks/${notebookId}/notes/new`);
    }
  };

  return (
    <div className="note-form-container">
      <form id="note-form" onSubmit={handleSubmit}>
        <div className="note-form-title-container">
          <label htmlFor="title" className="note-title">
            {title}
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
          <div className="note-content-input" name="content">
            <CKEditor
              className="note-content-input"
              editor={ClassicEditor}
              data={content}
              onChange={(e, editor) => setContent(editor.getData())}
            />
          </div>
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
            <button className="delete-note-button" onClick={handleDelete}>
              <i className="far fa-trash-alt"></i> Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditNoteForm;
