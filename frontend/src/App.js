import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Navigation from './components/Navigation';
import NoteForm from './components/NoteForm';
import EditNoteForm from './components/EditNoteForm';
import NotebooksBar from './components/NotebooksBar';
import NotesList from './components/NotesList';
import SplashPage from './components/SplashPage';
import FooterComponent from './components/FooterComponent';

import { restoreUser } from './store/session';
import { getNotebooks } from './store/notebooks';
import { getNotes } from './store/notes';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const load = async () => {
      const user = await dispatch(restoreUser());
      if (user) {
        await dispatch(getNotebooks());
        await dispatch(getNotes()).then(() => setIsLoaded(true));
      } else {
        history.push('/');
        setIsLoaded(true);
      }
    };
    load();
  }, [dispatch, history]);

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
    <>
      <div className="content">
        <Navigation isLoaded={isLoaded} />
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          {isLoaded ? <Routes /> : null}
        </Switch>
      </div>
      <FooterComponent className="footer" />
    </>
  );
}

export default App;
