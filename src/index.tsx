import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/auth';
import {Provider, useDispatch} from 'react-redux';
import store from "./redux/store";
import {FETCH_GOOGLE_AUTH_OBJ} from "./utils/consts";

// Initialize Firebase

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
