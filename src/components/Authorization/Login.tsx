import React from 'react';
import {Box, Container, Grid, Button} from '@material-ui/core';
import firebase from "firebase";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const Login = () => {

    const auth = useSelector((state: RootState) => state.auth)
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    const facebookProvider = new firebase.auth.FacebookAuthProvider()
    const gitHubProvider = new firebase.auth.GithubAuthProvider()


    const loginGoogle = async () => {
        if (auth){
            const { user } = await auth.auth.signInWithPopup(googleProvider);
            console.log('user: ', user);
        }
    }
    const loginFacebook = async () => {
        if (auth){
            const { user } = await auth.auth.signInWithPopup(facebookProvider);
            console.log('user: ', user);
        }
    }
    const loginGitHub = async () => {
        if (auth){
            const { user } = await auth.auth.signInWithPopup(gitHubProvider);
            console.log('user: ', user);
        }
    }

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems={'center'}
        justifyContent={'center'}
      >
          <Grid style={{width: 400, background: 'lightgray'}}
          container
                alignItems={"center"}
                direction={"column"}
          >
              <Box p={5}>
                    <Button onClick={loginGoogle} variant={"outlined"}>Enter with Google</Button>
                    <Button onClick={loginFacebook} variant={"outlined"}>Enter with Facebook</Button>
                    <Button onClick={loginGitHub} variant={"outlined"}>Enter with GitHub</Button>
              </Box>
          </Grid>
      </Grid>
    </Container>
  );
};

export default Login;