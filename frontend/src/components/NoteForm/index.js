import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { addNote } from '../../store/notes';

const NoteForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  if (!sessionUser) {
    return <Redirect to="/login" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const note = dispatch(addNote(title, content)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        const filteredErrors = data.errors.filter(
          (error) => error !== 'Invalid value'
        );
        setErrors(filteredErrors);
      }
    });
    history.push('/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add a new note</h2>
        <ul className="user-form-errors">
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content"></label>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Save Note</button>
      </form>
    </div>
  );
};

export default NoteForm;
