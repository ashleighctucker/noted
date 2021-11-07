import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  let links;
  if (sessionUser && sessionUser.user) {
    links = (
        <ProfileButton id="profile-button" user={sessionUser} />
    );
  } else {
    links = (
      <>
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-link" to="/signup">
          Signup
        </NavLink>
      </>
    );
  }

  return (
    <header className="nav-header">
      <nav id="navbar">
        <div id="logo-nav">
            <NavLink className="nav-link" id="logo" to="/">
              noted.
            </NavLink>
        </div>
        <div id="links">
          {isLoaded && links}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;