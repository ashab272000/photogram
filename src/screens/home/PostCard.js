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
import { addLike, deleteLike, getPostImage, getPostImageUrl, isLikedByUser } from '../../data/postRequests';


function PostCard({_id, post}) {
    
    const [imgUrl, setImgUrl] = useState('')
    const [like, setLike] = useState(false)
    const authReducer = useSelector(state => state.authReducer)
    const history = useHistory();

    const handleLikeClick = async () => {
        if(authReducer.user != null){
            const postId = post._id
            const uid = authReducer.user?.uid
            // Check if the user liked the post
            const result = await isLikedByUser(postId, uid)

            // If user has already liked, then delete the like
            // else like the post
            if (result){
                const deleteRes = await deleteLike(postId, uid)
                if(deleteRes != null){
                    setLike(false)
                }
            } else {
                const addRes = await addLike(postId, uid)
                if(addRes != null){
                    setLike(true)
                }
            }
        }
    }

    const handleCommentClick = () => {
        history.push(`/post/${post._id}`);
    }
    
    useEffect(async () => {
        
        // set the image url
        setImgUrl(getPostImageUrl(post.image))
        
        // Check if the user liked and set the setLike accordingly
        const isLiked = await isLikedByUser(post._id, authReducer.user?.uid)
        setLike(isLiked);
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
