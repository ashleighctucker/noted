import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../store/session';
import { resetNotebooks } from '../../store/notebooks';
import { resetNotes } from '../../store/notes';
import { editProfile } from '../../store/session';

const EditProfileForm = ({ user, close }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const logout = async () => {
    await dispatch(logoutUser());
    await dispatch(resetNotebooks());
    await dispatch(resetNotes());
    history.push('/');
  };

  const editHandle = async (e) => {
    e.preventDefault();
    await dispatch(editProfile(user.id, username, email));
    history.push('/');
    // close();
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
          <div className="note-button-container">
            <button className="edit-notebook-button" type="submit">
              Edit Acount
            </button>
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
