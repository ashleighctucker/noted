import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SplashPage.css';

const SplashPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div id="spash-page-container">
      <div className="splash-page-containers">
        <p id="opener">
          Organize your life... with <span id="logo-span">noted.</span>
        </p>
        <p id="opener-2">
          Plan your next big project, create a quick to-do list, or anything
          in-between.
        </p>
        {!sessionUser && (
          <>
            <NavLink to="/signup">
              <button id="splash-signup-button">Signup for free</button>
            </NavLink>
            <NavLink id="login-redirect" to="/login">
              Already have an account? Login
            </NavLink>
          </>
        )}
      </div>
      <div className="splash-page-containers">
        <img
          id="notebook-image"
          src="https://i.imgur.com/WPBPVC7.png"
          alt="notebook"
        ></img>
      </div>
    </div>
  );
};

export default SplashPage;
