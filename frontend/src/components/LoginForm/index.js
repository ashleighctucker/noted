import { useState } from 'react';
import { loginUser } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(loginUser(credential, password)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div className="form-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <h2 className="user-form-title"> Welcome back!</h2>
        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
        <div className="input-container">
          <div className="form-inputs">
            <label htmlFor="credential">Username or Email</label>
            <input
              name="credential"
              type="text"
              placeholder="username or email address..."
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="user-form-button" type="submit">
          Login
        </button>
        <span className="user-form-redirect">
          Don't have an account? Signup <Link to="/signup">here</Link>.
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
