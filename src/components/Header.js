import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import './Header.css'
import { Avatar, Button, IconButton } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Header() {

    const authReducer = useSelector(state => state.authReducer)
    const history = useHistory();
    const handleLoginClick = () => {
        history.push('/login')
    }
    

    return (
        <div className="header">
            <div className="header__left">
                <h2>PHOTOGRAM</h2>
            </div>
            <div className="flexible">
            
            </div>
            <div className="header__right">
                <IconButton>
                    <HomeIcon />
                </IconButton>
                <IconButton>
                    <AddBoxOutlinedIcon />
                </IconButton>
                { authReducer.user != null ? <Avatar src={authReducer.user?.photoURL}/> : <Button onClick={handleLoginClick} >Login</Button>}
            </div>
        </div>
    )
}

export default Header
