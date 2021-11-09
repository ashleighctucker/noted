import React, { useState } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Navigation from './components/Navigation';
import NoteForm from './components/NoteForm';
import EditNoteForm from './components/EditNoteForm';

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
      <NavLink to="/notes/new"> Notes </NavLink>
      <NavLink to="/notes/2/edit"> Edit Test </NavLink>
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route path="/notes/new">
          <NoteForm />
        </Route>
        <Route path="/notes/:noteId/edit">
          <EditNoteForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
