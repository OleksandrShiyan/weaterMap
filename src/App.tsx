import React, { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './AppRouter';
import './App.css';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import Loader from './components/Loader/Loader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fetchGoogleAuthObjAC } from './redux/actions/auth-AC';

const apiKey = process.env.REACT_APP_FIREBASE_API;

firebase.initializeApp({
  apiKey: apiKey,
  authDomain: 'weathermap-3f4cd.firebaseapp.com',
  projectId: 'weathermap-3f4cd',
  storageBucket: 'weathermap-3f4cd.appspot.com',
  messagingSenderId: '154882471955',
  appId: '1:154882471955:web:4503edb574fc97b517e7e6',
  measurementId: 'G-G33F7B5F0D',
});

const auth = firebase.auth();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoogleAuthObjAC(auth));
  }, [auth]);

  const [, loading] = useAuthState(auth);

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
