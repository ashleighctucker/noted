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
import { getNotebooks } from './store/notebooks';
import { getNotes } from './store/notes';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const user = await dispatch(restoreUser());
      if (user) {
        await dispatch(getNotebooks());
        await dispatch(getNotes()).then(() => setIsLoaded(true));
      } else {
        setIsLoaded(true);
      }
    };
    load();
  }, [dispatch]);

  const Routes = () => {
    return (
      <>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route path="/notebooks/:notebookId/notes/new">
          <div className="note-view-divider">
            <NotebooksBar />
            <NotesList />
            <NoteForm />
          </div>
        </Route>
        <Route path="/notebooks/:notebookId/notes/:noteId/edit">
          <div className="note-view-divider">
            <NotebooksBar />
            <NotesList />
            <EditNoteForm />
          </div>
        </Route>
        <Route path="/home">
          <div className="note-view-divider">
            <NotebooksBar />
          </div>
        </Route>
      </>
    );
  };

  return (
    <div>
      <Navigation isLoaded={isLoaded} />
      {/* <NavLink to="/notes/new"> Notes </NavLink>
      <NavLink to="/notes/2/edit"> Edit Test </NavLink> */}
      <NavLink to="/home">Home</NavLink>
      <Switch>{isLoaded ? <Routes /> : null}</Switch>
    </div>
  );
}

export default App;
