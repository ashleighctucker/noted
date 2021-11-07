import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Navigation from './components/Navigation';

import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  console.log(isLoaded);

  return (
    <div>
      <Navigation isLoaded={isLoaded} />

        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
        </Switch>
      
    </div>
  );
}

export default App;
