import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { loginUser } from '../../store/session';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const demoLogin = async () => {
    await dispatch(loginUser('demo', 'password'));
    history.push('/home');
  };

  let links;
  if (sessionUser) {
    links = (
      <>
        <NavLink id="nav-notes-link" to="/home">
          <i className="far fa-book-open fa-lg"></i> Notes
        </NavLink>
        <ProfileButton id="profile-button" user={sessionUser} />
      </>
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
        <span className="nav-link" onClick={demoLogin}>
          Demo
        </span>
      </>
    );
  }

  return (
    <header className="nav-header">
      <nav id="navbar">
        <div id="logo-nav">
          <div>
            <NavLink className="nav-link" id="logo" to="/">
              noted.
            </NavLink>
          </div>
        </div>
        <div id="search-bar-container">{sessionUser && <SearchBar />}</div>
        <div id="links">{isLoaded && links}</div>
      </nav>
    </header>
  );
};

export default Navigation;
