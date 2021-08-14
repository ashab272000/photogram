import React, { useState } from 'react'
import HomeIcon from '@material-ui/icons/Home';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import './Header.css'
import { Avatar, Button, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';
import ReactModal from 'react-modal';
import AddPost from '../screens/addPost/AddPost';
import { signOut } from '../actions';

function Header() {

    const [openDropdown, setOpenDropdown] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useDispatch()

    const authReducer = useSelector(state => state.authReducer)
    const history = useHistory();
    const handleLoginClick = () => {
        history.push('/login')

    }

    const handleHomeClick = () => {
        history.push('/')
    }
    
    const handleLogout = () => {
        dispatch(signOut());
        history.replace('/')
    }

    const handleAddPostClick = () => {
        if(authReducer.user != null) {
            setOpenModal(!openModal);
        }
    }
    

    return (
        <div className="header">
            <AddPost isOpen={openModal} onClickClose={handleAddPostClick} />
            <div className="header__left">
                <h2 onClick={handleHomeClick} style={{cursor:'pointer'}}>PHOTOGRAM</h2>
            </div>
            <div className="flexible">
            
            </div>
            <div className="header__right">
                <IconButton>
                    <HomeIcon onClick={handleHomeClick}/>
                </IconButton>
                <IconButton>
                    <AddBoxOutlinedIcon onClick={handleAddPostClick}/>
                </IconButton>
                { authReducer.user != null ?
                 <div className="header__rightProfile">
                    <IconButton onClick={() => {setOpenDropdown(!openDropdown)}}>
                        <Avatar src={authReducer.user?.photoURL}/>
                    </IconButton>
                    {openDropdown && 
                        <Dropdown>
                            <DropdownItem leftIcon={<Avatar src={authReducer.user?.photoURL}/>}>
                                MyProfile
                            </DropdownItem>
                            <div className="divider"></div>
                            <DropdownItem onClick={handleLogout}>
                                Logout
                            </DropdownItem>
                        </Dropdown>
                    }
                 </div> : 
                <Button onClick={handleLoginClick} >Login</Button>}
            </div>
        </div>
    )
}

export default Header
