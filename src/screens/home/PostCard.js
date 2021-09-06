import { Avatar, IconButton } from '@material-ui/core'
import {useEffect, useState} from 'react'
import './PostCard.css'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { addLike, deleteLike, getPostImageUrl, isLikedByUser } from '../../data/postRequests';


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

    const handleProfileClick = () => {
        history.push(`/profile/${post.uid}`)
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
                <Avatar onClick={handleProfileClick} src={post.userAvatar}/>
                <h4>{post.username}</h4>
            </div>
            <div className="postCard__body">
                <LazyLoadImage src={imgUrl} placeholder={<Skeleton height={200}/>} />
            </div>
            <div className="postCard__footer">
                <div className="flexible">
                </div>
                <div className="postCard__footerIcons">
                    <IconButton onClick ={handleLikeClick}>
                        {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton>
                       <ModeCommentOutlinedIcon onClick={handleCommentClick} />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default PostCard
