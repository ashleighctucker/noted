import React, { useState, useEffect, useSelector } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../store/session';

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState(user.username);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    setUsername(user.username);
  }, [user.username]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    history.push('/');
  };

  return (
    <div id="profile-nav">
      <i
        className="fas
         fa-user-circle"
        onClick={openMenu}
      />
      {showMenu && (
        <div className="profile-dropdown">
          <div id="hello">Hello, {user.username}!</div>
          <div>
            <button id="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
