import { Avatar, Button, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import Header from '../../components/Header'
import { getPostImageUrl } from '../../data/postRequests';
import { followProfile, getIsFollowing, getProfile, getProfilePosts, setProfileDesc, unFollowProfile } from '../../data/profileRequests';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import EditIcon from '@material-ui/icons/Edit';
import './index.css'
import { useSelector } from 'react-redux';
import { findAllByDisplayValue } from '@testing-library/react';

function ProfileScreen() {

    const authReducer = useSelector(state => state.authReducer)
    const {profileId} = useParams();
    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)
    const [descSaved, setDescSaved] = useState(true)
    const [desc, setDesc] = useState('')
    const history = useHistory()
    const [editDescComponent, setEditDescComponent] = useState(null)

    useEffect(async () => {
        setEditDescComponent(getEditDesc())
        // Set the profile
        const tempProfile = await getProfile(profileId)
        setProfile(tempProfile)

        // Set the posts
        const tempPosts = await getProfilePosts(profileId)
        setPosts(tempPosts)

        // Check if the user is following the profile
        if(authReducer.user != null) {
            const tempIsFollow = await getIsFollowing(authReducer.user?.uid, tempProfile.uid)
            setIsFollowing(tempIsFollow);
        }
    }, [profileId])

    const handleFollowClick = async () => {
        if(!isFollowing){
            await followProfile(authReducer.user?.uid, profile.uid)
            setIsFollowing(true)
        } else {
            await unFollowProfile(authReducer.user?.uid, profile.uid)
            setIsFollowing(false)
        }
    }

    const handlePostClick = (postId) => {
        history.push(`/post/${postId}`);
    } 
    
    const handleSaveDescClick = async ()  => {
        setDescSaved(true)
        // await setProfileDesc(authReducer.user?.uid,desc);
    }

    const handleDescOnChange = (e) => {
        setDescSaved(false)
        setDesc(e.target.textContent)
    }

    const getFollowButton = () => {
        if(authReducer.user != null && profile?.uid != null && profile?.uid != authReducer.user?.uid){
            if(!isFollowing){
                return (<Button size="small" variant="contained" color="primary" onClick={handleFollowClick}>Follow</Button>)
            } else {
                return (<Button size="small" variant="contained" style={{backgroundColor: 'grey'}} onClick={handleFollowClick}>Unfollow</Button>)
            }
        } 
        return <div></div>
    }

    const getDesc = (isMobile = false) => {
        if(authReducer.user != null && profile?.uid != null && profile?.uid == authReducer.user?.uid){
            return (
                <div className={`profile__bodyInfo__desc${isMobile ? '--mobile' : ''}`}>
                    <p className={`profile__desc${isMobile ? '--mobile' : ''}`} contentEditable={true} suppressContentEditableWarning={true} spellCheck={false} onInput={handleDescOnChange} >{profile?.desc || "Describe yourself"}</p>
                    {editDescComponent}
                </div>
    
            )
        } else {
            return (
                <div className={`profile__bodyInfo__desc${isMobile ? '--mobile' : ''}`}>
                    <p className={`profile__desc${isMobile ? '--mobile' : ''}`} >{profile?.desc || ""}</p>
                </div>
    
            )
        }
    }

    const getEditDesc = (isMobile = false) => {
        let descElement = document.getElementsByClassName('profile__desc')[0]
        if(isMobile){
            descElement = document.getElementsByClassName('profile__desc--mobile')[0]
        }

        if (descSaved) {
            return <Button variant="contained" style={{backgroundColor: 'grey', color: 'white', marginTop: '8px' ,padding: '2px'}} onClick={() => {
                descElement.focus()
            }}>Edit</Button>
        } else {
            return <Button variant="contained" style={{marginTop: '8px' ,padding: '2px'}} color="primary" onClick={handleSaveDescClick}>Save</Button>
        }
    }

    
    useEffect(() => {
        setEditDescComponent(getEditDesc())
        if(descSaved && authReducer.user != null && desc !=''){
            console.log(desc)
            setProfileDesc(authReducer.user?.uid , desc)
            setDesc(desc)
        }
    }, [descSaved])


    const renderPost = (imgSrc, index, likes = 0, comments = 0 ) => {
        return (
            <div className="profile__bodyPosts__listPost" onClick={() => handlePostClick(posts[index]._id)}>
                <img src={imgSrc} alt="Post Photo" />
                <div className="hover__layer">
                    <FavoriteIcon />
                    <p>{likes}</p>
                    <ModeCommentIcon />
                    <p id="profile__comments">{comments}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="profile">
            <Header />
            <div className="profile__body">
                <div className="container">
                    <div className="profile__bodyInfo">
                        <div className="profile__bodyInfo__pic">
                            <div className="container">
                                <Avatar src={profile?.userAvatar}/>
                            </div>
                        </div>
                        <div className="profile__bodyInfo__info">
                            <div className="profile__bodyInfo__infoHeader">
                                <h1>{profile?.username || "" }</h1>
                                {getFollowButton()}
                            </div>
                            <div className="profile__bodyInfo__infoCounts">
                                <p><b>{profile?.numOfPosts || 0}</b> posts</p>
                                <p><b>{profile?.numOfFollowing || 0}</b> following</p>
                                <p><b>{profile?.numOfFollowers || 0}</b> followers</p>
                            </div>
                            {/* <p className="profile__desc">{profile?.desc || ''} <EditIcon/></p> */}
                            {getDesc()}
                            
                        </div>
                    </div>
                    <div className="profile__bodyInfo__infoCounts--mobile">
                        <p><b>{profile?.numOfPosts || 0}</b> posts</p>
                        <p><b>{profile?.numOfFollowing || 0}</b> following</p>
                        <p><b>{profile?.numOfFollowers || 0}</b> followers</p>
                    </div>
                    {getDesc(true)}
                    {/* <p className="profile__desc--mobile">{profile?.desc || ''}</p> */}
                    <div className="profile__bodyPosts">
                        <div className="profile__bodyPosts__header">
                            <h4>Posts</h4>
                            <hr />
                        </div>
                        <div className="profile__bodyPosts__list">
                            {posts.map((post, index) => 
                                renderPost(getPostImageUrl(post.image), index, post.numOfLikes, post.numOfComments )
                            )}
                            {/* {renderPost('https://i.pinimg.com/736x/5b/b4/8b/5bb48b07fa6e3840bb3afa2bc821b882.jpg')}
                            {renderPost('https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80')}
                            {renderPost('https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwb2JqZWN0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80')}
                            {renderPost('https://phillipbrande.files.wordpress.com/2013/10/random-pic-14.jpg')} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
