import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../../actions'
import db, { auth, provider } from '../../firebase'
import { useHistory } from 'react-router'
import firebase from 'firebase'
import './index.css'
import { addProfile, getProfile } from '../../data/profileRequests'
import { useCookies } from 'react-cookie'


function LoginScreen() {
    const authReducer = useSelector(state => state.authReducer)
    const dispatch = useDispatch();
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['credential']);

    const login = () => {
        auth.signInWithPopup(provider)
        .then(async (result) => {
            // Check if the profile exists
            // If not then add the profile to the database
            setCookie('credential', result.credential, { path: '/' });
            let profile = await getProfile(result?.user.uid)
            if(profile == null) {
                const user = {
                    uid: result?.user.uid,
                    username: result?.user.displayName,
                    userAvatar: result?.user.photoURL,
                }
                profile =  await addProfile(user)
            }
            dispatch(signIn(result?.user))
            history.push('/');
        })
        .catch(error => alert(error));
    }



    return (
        <div className="login">
            <div className="login__container">
                <div className="login__text">
                    <h1>Sign in to Photogram</h1>
                </div>
                <Button onClick={login}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default LoginScreen
