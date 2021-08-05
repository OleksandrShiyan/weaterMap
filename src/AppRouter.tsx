import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes/routes';
import { LOGIN_ROUTE, WEATHER_MAP_ROUTE } from './utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import {authSelector} from './selectors/auth-selectors';

const AppRouter = () => {
  const auth = useSelector(authSelector);
  const [user] = useAuthState(auth);

  return user ? (
    <Switch>
      {privateRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact={true} />
      ))}
      <Redirect to={WEATHER_MAP_ROUTE} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact={true} />
      ))}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
