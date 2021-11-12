import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { logoutUser } from '../../store/session';
import { resetNotebooks } from '../../store/notebooks';
import { resetNotes } from '../../store/notes';
import { editProfile } from '../../store/session';

const EditProfileForm = ({ user, close }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [errors, setErrors] = useState([]);

  const logout = async () => {
    await dispatch(logoutUser());
    await dispatch(resetNotebooks());
    await dispatch(resetNotes());
    window.location.reload();
  };

  const editHandle = async (e) => {
    e.preventDefault();
    setErrors([]);
    await dispatch(editProfile(user.id, username, email)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        const filteredErrors = data.errors.filter(
          (error) => error !== 'Invalid value'
        );
        setErrors(filteredErrors);
      }
    });
    if (errors.length === 0) {
      window.location.reload();
    }
  };

  useEffect(() => {
    setUsername(user.username);
  }, [user.username]);

  return (
    <div className="profile-dropdown">
      <div id="hello">Hello, {username}!</div>
      <div>
        <form className="user-form-modal" onSubmit={editHandle}>
          <div className="note-form-title-container">
            <label htmlFor="username"></label>
            <input
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="note-form-title-container">
            <label htmlFor="email"></label>
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="error-div">
            <p className="user-form-errors">
              {errors.map((error, i) => (
                <span key={i}>{error}</span>
              ))}
            </p>
          </div>
          <div className="note-button-container">
            {user.username === 'demo' ? (
              <button
                className="edit-notebook-button"
                type="submit"
                disabled={true}
              >
                Edit Acount (Demo)
              </button>
            ) : (
              <button className="edit-notebook-button" type="submit">
                Edit Acount
              </button>
            )}
            <button id="logout-button" onClick={logout}>
              <i className="far fa-sign-out "></i> Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
