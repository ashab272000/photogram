import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../../actions'
import db, { auth, provider } from '../../firebase'
import { useHistory } from 'react-router'
import firebase from 'firebase'
import './index.css'
import { addProfile, getProfile } from '../../data/profileRequests'


function LoginScreen() {
    const authReducer = useSelector(state => state.authReducer)
    const dispatch = useDispatch();
    const history = useHistory();

    const login = () => {
        auth.signInWithPopup(provider)
        .then(async (result) => {

            // const userRef = db.collection('profiles').doc(result?.user.uid)
            // userRef.get()
            // .then((snap) => {
            //     if(snap.exists){
            //         userRef.update({'loggedTimestamp': firebase.firestore.FieldValue.serverTimestamp()})
            //     }else {
            //         userRef.set({
            //             username: result?.user.displayName,
            //             userAvatar: result?.user.photoURL,
            //         })
            //     }
            // })
            
            // Check if the profile exists
            // If not then add the profile to the database
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
