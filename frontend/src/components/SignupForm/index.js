import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { signup, loginUser } from '../../store/session';
import './SignupForm.css';

const SignupForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (confirmPassword !== password) {
      return setErrors(['Passwords do not match.']);
    } else {
      await dispatch(signup(username, email, password)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          const filteredErrors = data.errors.filter(
            (error) => error !== 'Invalid value'
          );
          setErrors(filteredErrors);
        }
      });
      return await dispatch(loginUser(username, password));
    }
  };

  return (
    <div className="form-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <h2 className="form-title"> Signup </h2>
        <ul className="user-form-errors">
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
        <div className="input-container">
          <div className="form-inputs">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              name="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="user-form-button" type="submit">
          Signup
        </button>
        <span className="user-form-redirect">
          Already have an account? Login{' '}
          <Link className="redirect-link" to="/login">
            here
          </Link>
          .
        </span>
      </form>
    </div>
  );
};

export default SignupForm;
