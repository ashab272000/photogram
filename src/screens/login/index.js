import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../../actions'
import { auth, provider } from '../../firebase'
import { useHistory } from 'react-router'
import './index.css'


function LoginScreen() {
    const authReducer = useSelector(state => state.authReducer)
    const dispatch = useDispatch();
    const history = useHistory();

    const login = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            dispatch(signIn(result?.user))
            history.push('/');
        })
        .catch(error => alert(error));



    }

    const [hekki, sethekki] = useState(<p>hello</p>)

    useEffect(() => {
        console.log(authReducer)
        sethekki((<h4>{authReducer.user?.displayName} is the name</h4>))
    }, [])



    return (
        <div className="login">
            <div className="login__container">
                <div className="login__text">
                    <h1>Sign in to Photogram</h1>
                </div>
                <Button onClick={login}>
                    Sign In With Google
                </Button>
                {hekki}
            </div>
        </div>
    )
}

export default LoginScreen
