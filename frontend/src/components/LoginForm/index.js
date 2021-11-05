import { useState } from 'react';
import { loginUser } from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginForm.css';

const LoginForm = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(loginUser(credential, password)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div class="form-container">
      <form id="login-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
        <label htmlFor="credential">
          Username or Email
          <input
            name="credential"
            type="text"
            placeholder="username or email address..."
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
