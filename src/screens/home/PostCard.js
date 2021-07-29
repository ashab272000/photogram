import { Avatar, IconButton } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import './PostCard.css'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import db, { storageRef } from '../../firebase';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function PostCard({id, post}) {
    
    const [imgUrl, setImgUrl] = useState('')
    const [like, setLike] = useState(false)
    const authReducer = useSelector(state => state.authReducer)
    const history = useHistory();

    const handleLikeClick = () => {
        if(authReducer.user != null){
            const postRef = db.collection('posts').doc(id).collection('likedBy').doc(authReducer.user?.uid);
            postRef.get()
            .then((snap) => {
                if(!snap.exists){
                    postRef.set({
                        'username': authReducer.user?.displayName,
                        'userAvatar': authReducer.user?.photoURL,
                    });
                    setLike(true)
                }else {
                    postRef.delete()
                    setLike(false)
                }
            })
        }
    }

    const handleCommentClick = () => {
        history.push(`/post/${id}`);
    }
    
    useEffect(() => {
        
        const downloadImg = async () => {
            const fileRef = storageRef.child(`posts/${id}.jpg`)
            const url = await fileRef.getDownloadURL();
            setImgUrl(url);
            console.log(imgUrl);
        }
        
        if(authReducer.user != null){
            const postRef = db.collection('posts').doc(id).collection('likedBy').doc(authReducer.user?.uid);
            postRef.get()
            .then((snap) => {
                if(!snap.exists){                
                    setLike(false)
                }else {
                    setLike(true)
                }
            })
        }

        downloadImg();
    }, [])

    return (
        <div className="postCard">
            <div className="postCard__header">
                <Avatar src={post.userAvatar}/>
                <h4>{post.username}</h4>
            </div>
            <div className="postCard__body">
                <img src={imgUrl} alt="postImage" />
            </div>
            <div className="postCard__footer">
                <div className="postCard__footerExpand">
                    <IconButton>
                       <UnfoldMoreIcon />
                    </IconButton>
                </div>
                <div className="flexible">
                    <img src="" alt="" />
                </div>
                <div className="postCard__footerIcons">
                    <IconButton onClick ={handleLikeClick}>
                        {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton>
                       <ModeCommentOutlinedIcon onClick={handleCommentClick} />
                    </IconButton>
                    {/* <IconButton>
                       <BookmarkBorderOutlinedIcon />
                    </IconButton> */}
                </div>
            </div>
        </div>
    )
}

export default PostCard
