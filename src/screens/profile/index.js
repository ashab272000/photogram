import { Avatar, Button } from '@material-ui/core'
import React from 'react'
import Header from '../../components/Header'
import './index.css'

function ProfileScreen() {

    const renderPost = (imgSrc) => {
        return (
            <div className="profile__bodyPosts__listPost">
                <img src={imgSrc} alt="Post Photo" />
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
                                <Avatar />
                            </div>
                        </div>
                        <div className="profile__bodyInfo__info">
                            <div className="profile__bodyInfo__infoHeader">
                                <h1>s.xyz</h1>
                                <Button size="small" variant="contained" color="blue">Follow</Button>
                            </div>
                            <div className="profile__bodyInfo__infoCounts">
                                <p><b>153</b> posts</p>
                                <p><b>1,807</b> following</p>
                                <p><b>1,533</b> followers</p>
                            </div>
                            <p className="profile__desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus deserunt, error suscipit incidunt minus laboriosam voluptatibus explicabo, distinctio laborum odio praesentium reiciendis nisi expedita quia excepturi neque iusto, fugit ex.</p>
                        </div>
                    </div>
                    <div className="profile__bodyInfo__infoCounts--mobile">
                                <p><b>153</b> posts</p>
                                <p><b>1,807</b> following</p>
                                <p><b>1,533</b> followers</p>
                    </div>
                    <p className="profile__desc--mobile">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus deserunt, error suscipit incidunt minus laboriosam voluptatibus explicabo, distinctio laborum odio praesentium reiciendis nisi expedita quia excepturi neque iusto, fugit ex.</p>
                    <div className="profile__bodyPosts">
                        <div className="profile__bodyPosts__header">
                            <h4>Posts</h4>
                            <hr />
                        </div>
                        <div className="profile__bodyPosts__list">
                            {renderPost('https://i.pinimg.com/736x/5b/b4/8b/5bb48b07fa6e3840bb3afa2bc821b882.jpg')}
                            {renderPost('https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80')}
                            {renderPost('https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwb2JqZWN0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80')}
                            {renderPost('https://phillipbrande.files.wordpress.com/2013/10/random-pic-14.jpg')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
