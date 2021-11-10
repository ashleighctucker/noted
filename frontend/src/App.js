import React, { useState } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Navigation from './components/Navigation';
import NoteForm from './components/NoteForm';
import EditNoteForm from './components/EditNoteForm';
import NotebooksBar from './components/NotebooksBar';
import NotesList from './components/NotesList';

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
      {/* <NavLink to="/notes/new"> Notes </NavLink>
      <NavLink to="/notes/2/edit"> Edit Test </NavLink> */}
      <NavLink to="/home">Home</NavLink>
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route path="/notebooks/:notebookId/notes/new">
          <NoteForm />
        </Route>
        <Route path="/notebooks/:notebookId/notes/:noteId/edit">
          <div className="note-view-divider">
            <NotebooksBar />
            <NotesList />
            <EditNoteForm />
          </div>
        </Route>
        <Route path="/home">
          <NotebooksBar />
        </Route>
        <Route path="/notebooks/:notebookId/view">
          <div className="note-view-divider">
            <NotebooksBar />
            <NotesList />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
