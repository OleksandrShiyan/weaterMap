import {FETCH_GOOGLE_AUTH_OBJ} from "../../utils/consts";
import firebase from 'firebase';

export {}

export function fetchGoogleAuthObjAC(auth: firebase.auth.Auth) {
    return {
        type: FETCH_GOOGLE_AUTH_OBJ,
        auth
    }
}