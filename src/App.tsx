import React, { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './AppRouter';
import './App.css';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_GOOGLE_AUTH_OBJ } from './utils/consts';
import { RootState } from './redux/store';
import Loader from './components/Loader/Loader';
import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
 
});

const auth = firebase.auth();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_GOOGLE_AUTH_OBJ, auth });
  }, [auth]);

  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
