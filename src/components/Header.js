import { useEffect, useState } from 'react'
import HomeIcon from '@material-ui/icons/Home';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import './Header.css'
import { Avatar, Button, IconButton, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';
import AddPost from '../screens/addPost/AddPost';
import { signOut } from '../actions';
import { searchProfiles } from '../data/profileRequests';
import useWindowDimensions from '../hooks/UseWindowDimension';
import { useCookies } from 'react-cookie';

function Header() {

    const [openDropdown, setOpenDropdown] = useState(false)
    const [openSearchDropdown, setOpenSearchDropdown] = useState(false)
    const [searchedProfiles, setSearchedProfiles] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [typeTimeout, setTypeTimeout] = useState(null)
    const dispatch = useDispatch()
    const location = useLocation()
    const { height, width } = useWindowDimensions();
    const [cookies, setCookie] = useCookies(['credential']) 

    const authReducer = useSelector(state => state.authReducer)
    const history = useHistory();
    const handleLoginClick = () => {
        history.push('/login')
    }

    const handleProfileClick = (id) => {
        history.push(`/profile/${id}`)
    }

    const handleHomeClick = () => {
        history.push('/')
    }

    const handleTrendClick = () => {
        history.push('/trending')
    }
    
    const handleLogout = () => {
        setCookie('credential', null)
        dispatch(signOut());
        history.replace('/')
    }

    const handleAddPostClick = () => {
        if(authReducer.user != null) {
            setOpenModal(!openModal);
        }
    }

    const handleSearchOnChange = (e) => {
        setSearchText(e.target.value)
        console.log(searchText)
    }

    const handleSearchOnClick = (e) => {
        setOpenSearchDropdown(true)
    }

    const getSearchDropdown = () => {
        if(isLoading){
            return (
                <Dropdown>
                    <DropdownItem style={{height: '75px'}}>
                        <div style={{width:'100%', display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress style={{ padding: '4px'}} />
                        </div>
                    </DropdownItem>
                </Dropdown>
            )
        } else {
            if(searchedProfiles.length < 1){
                return (
                    <Dropdown>
                        <DropdownItem>
                            <p>No User Found</p>
                        </DropdownItem>
                    </Dropdown>
                )
            }else {
                return (
                    <Dropdown>
                        {searchedProfiles.map(profile => {
                            return (
                                <DropdownItem leftIcon={<Avatar src={profile.userAvatar}/>} onMouseDown={(e) => {console.log(e.target);handleProfileClick(profile.uid)}} >
                                    <p>{profile.username}</p>                                
                                </DropdownItem>
                            )
                        })}
                    </Dropdown>
                )
            }
        }
    }

    const getHeaderRight = () => {
        if (authReducer.user == null){
            return (
                <div className="header__right">
                    <Button onClick={handleLoginClick}>Login</Button>
                </div>
            )
        } else {
            if(width > 736) {
                return (
                <div className="header__right">
                    <IconButton>
                        {location.pathname == '/' ? <HomeIcon onClick={handleHomeClick}/> : <HomeOutlinedIcon onClick={handleHomeClick}/>}
                    </IconButton>
                    <IconButton>
                        {location.pathname == '/trending' ? <WhatshotIcon onClick={handleTrendClick}/> : <WhatshotOutlinedIcon onClick={handleTrendClick}/>}
                    </IconButton>
                    <IconButton>
                        <AddBoxOutlinedIcon onClick={handleAddPostClick}/>
                    </IconButton>
                    <div className="header__rightProfile" onBlur={() => {setOpenDropdown(false)}}>
                        <IconButton onClick={() => {setOpenDropdown(!openDropdown)}}>
                            <Avatar src={authReducer.user?.photoURL}/>
                        </IconButton>
                        {openDropdown && 
                            <Dropdown>
                                <DropdownItem leftIcon={<Avatar src={authReducer.user?.photoURL}/>} onMouseDown={() => {handleProfileClick(authReducer.user?.uid)}}>
                                    MyProfile
                                </DropdownItem>
                                <div className="divider"></div>
                                <DropdownItem onMouseDown={handleLogout}>
                                    Logout
                                </DropdownItem>
                            </Dropdown>
                        }
                    </div>
                </div>
                )
            } else {
                return (
                    <div className="header__right">
                        <div className="header__rightProfile" onBlur={() => {setOpenDropdown(false)}}>
                            <IconButton onClick={() => {setOpenDropdown(!openDropdown)}}>
                                <Avatar src={authReducer.user?.photoURL}/>
                            </IconButton>
                            {openDropdown && 
                                <Dropdown>
                                    <DropdownItem leftIcon={<Avatar src={authReducer.user?.photoURL}/>} onMouseDown={() => {handleProfileClick(authReducer.user?.uid)}}>
                                        MyProfile
                                    </DropdownItem>
                                    <DropdownItem leftIcon={ location.pathname == '/' ? <HomeIcon/> : <HomeOutlinedIcon/> } onMouseDown={handleHomeClick}>
                                        Home
                                    </DropdownItem>
                                    <DropdownItem leftIcon={ location.pathname == '/trending' ? <WhatshotIcon/> : <WhatshotOutlinedIcon/> } onMouseDown={handleTrendClick}>
                                        Trending
                                    </DropdownItem>
                                    <DropdownItem leftIcon={ < AddBoxOutlinedIcon /> } onMouseDown={handleAddPostClick}>
                                        Add Post
                                    </DropdownItem>
                                    <div className="divider"></div>
                                    <DropdownItem onMouseDown={handleLogout}>
                                        Logout
                                    </DropdownItem>
                                </Dropdown>
                            }
                        </div>
                    </div>
                    )
            }
        }
    }

    useEffect(() => { 
        // set isLoading is true when the typing is stopped
        // use SetTimeout to recognize that

        if (typeTimeout != null){
            clearTimeout(typeTimeout)
            setIsLoading(false)
        }
        const checkTypingStopped = setTimeout(() => {
            setIsLoading(true)
            setTimeout(async () => {
                const profiles = await searchProfiles(searchText)
                setSearchedProfiles(profiles);
                setIsLoading(false)
            }, 400)
        },500)

        setTypeTimeout(checkTypingStopped)

    }, [searchText])
    

    return (
        <div className="header">
            <AddPost isOpen={openModal} onClickClose={handleAddPostClick} />
            <div className="header__left">
                <h2 onClick={handleHomeClick} style={{cursor:'pointer'}}>PHOTOGRAM</h2>
            </div>
            <div className="header__middle">
                <div className="header__searchBar" onBlur={(e) => {console.log(e.target);setOpenSearchDropdown(false)}}>
                    <input type="text" value={searchText} onClick={handleSearchOnClick} onChange={handleSearchOnChange} placeholder={'Search'}/>
                    {openSearchDropdown && getSearchDropdown()}
                </div>
            </div>
            {getHeaderRight()}
            
        </div>
    )
}

export default Header
