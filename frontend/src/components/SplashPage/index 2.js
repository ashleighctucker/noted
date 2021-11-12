import { NavLink } from 'react-router-dom';

const SplashPage = () => {
  return (
    <div>
      <NavLink to="/home">Home</NavLink>
      <div>
        <p>
          Organize your life with <span>noted.</span>
        </p>
      </div>
    </div>
  );
};

export default SplashPage;
