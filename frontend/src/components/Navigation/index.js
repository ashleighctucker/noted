import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  let links;
  if (sessionUser && sessionUser.user) {
    links = (
      <div>
        <ProfileButton id="profile-button" user={sessionUser} />
      </div>
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
        <ul id="right-nav">
          <li id="nav-holder">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            {isLoaded && links}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
