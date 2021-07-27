import { Avatar, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import db, { storageRef } from '../../firebase'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './index.css'
import Comment from './Comment'
function PostScreen({id, post}) {

    const [imgUrl, setImgUrl] = useState('')
    const [like, setLike] = useState(false)
    const authReducer = useSelector(state => state.authReducer)

    const handleLikeClick = () => {
        const postRef = db.collection('profiles').doc(authReducer.user?.uid).collection('likedPosts').doc(id);
        postRef.get()
        .then((snap) => {
            if(!snap.exists){
                postRef.set(post);
                setLike(true)
            }else {
                postRef.delete()
                setLike(false)
            }
        })
        
    }
    
    useEffect(() => {
        
        const downloadImg = async () => {
            const fileRef = storageRef.child(`posts/${id}.jpg`)
            const url = await fileRef.getDownloadURL();
            setImgUrl(url);
            console.log(imgUrl);
        }
        
        const postRef = db.collection('profiles').doc(authReducer.user?.uid).collection('likedPosts').doc(id);
        postRef.get()
        .then((snap) => {
            if(snap.exists){
                setLike(true)
            }else {
                setLike(false)
            }
        })

        downloadImg();
    }, [])


    return (
        <div className="postScreen">
            <Header />
            <div className="postScreen__postBody">
                <div className="postScreen__postBody__post">
                    <img src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" alt="placeholderImage" />
                </div>
                <div className="postScreen__postBody__comments">
                    <div className="postScreen__postBody__commentsHeader">
                        <div className="postScreen__postBody__commentsHeaderRight">
                            <Avatar />
                            <p>Mohammed Ashab Uddin</p>
                        </div>
                        <div className="postScreen__postBody__commentsHeaderLeft">
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <div className="postScreen__postBody__commentsBody">
                        <div className="container">
                            <Comment />
                            <Comment />
                            <Comment />
                        </div>
                    </div>
                    <div className="postScreen__postBody__commentsFooter">
                        <div className="postScreen__postBody__commentsFooterInfo">
                            <div className="left">
                                <FavoriteBorderIcon/>
                            </div>
                            <div className="right">
                                <p> <span>331</span> Likes  <span>29</span> comments</p>
                                <p>8 hours ago</p>
                            </div>
                        </div>
                        <div className="postScreen__postBody__commentsFooterInput">
                            <InsertEmoticonIcon />
                            <form action="">
                                <input type="text" placeholder="Add a comment" />
                                <button type="sumbit">Submit Button</button>
                            </form>
                            <Button>POST</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="postScreen__morePosts">
            
            </div>
        </div>
    )
}

export default PostScreen
