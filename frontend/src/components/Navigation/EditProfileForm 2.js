import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../store/session';

const EditProfileForm = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    history.push('/');
  };

  useEffect(() => {
    setUsername(user.username);
  }, [user.username]);

  return (
    <div className="profile-dropdown">
      <div id="hello">Hello, {username}!</div>
      <div>
        <form className="user-form-modal">
          <div className="note-form-title-container">
            <label htmlFor="username"></label>
            <input name="username" value={username}></input>
          </div>
          <div className="note-form-title-container">
            <label htmlFor="email"></label>
            <input name="email" value={email}></input>
          </div>
          <div className="note-button-container">
            <button className="edit-notebook-button" type="submit">
              Edit Acount
            </button>
            <button id="logout-button" onClick={logout}>
              <i class="far fa-sign-out "></i> Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
