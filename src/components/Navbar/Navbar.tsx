import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import { LOGIN_ROUTE } from '../../utils/consts';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useAuthState} from "react-firebase-hooks/auth";

const Navbar = () => {
    const { auth } = useSelector((state: RootState) => state.auth);
    const [user] = useAuthState(auth);

    console.log('user: ', user)

    const logOut = () => {
        auth.signOut();
    }

  return (
    <AppBar color={'secondary'} position="static">
      <Toolbar variant={'dense'}>
        <Grid container justifyContent={'flex-end'}>
          {user ? (
              <Grid container justifyContent={'flex-end'} alignItems={'center'}>
                  <img src={user.photoURL ? user.photoURL : ''} alt="userPhoto" className={'userImg'}/>
                  <div>{user.displayName}</div>
                  <Button onClick={logOut} variant={'outlined'}>Log Out</Button>
              </Grid>
          ) : (
            <Link to={LOGIN_ROUTE}>
              <Button variant={'outlined'}>Login</Button>
            </Link>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
