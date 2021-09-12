import { Avatar, Button, IconButton } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import './index.css'
import Comment from './Comment'
import { useHistory, useParams } from 'react-router-dom'
import { addComment, addLike, deleteLike, getComments, getNumOfComments, getNumOfLikes, getPost, getPostImageUrl, isLikedByUser } from '../../data/postRequests'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function PostScreen() {

    const {postId} = useParams();
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [imgUrl, setImgUrl] = useState('')
    const [like, setLike] = useState(false)
    const [likeAmount, setLikeAmount] = useState(0)
    const [commentAmount, setCommentAmount] = useState(0)
    const [commentInput, setCommentInput] = useState('')
    const authReducer = useSelector(state => state.authReducer)
    const history = useHistory()
    // Whenever user clicks on the like button
    const handleLikeClick = async () => {
        // if user is not null
        if(authReducer.user != null){
            // Add Like or delete the like
            // adn SetLike
            if(!like){
                await addLike(post._id, authReducer.user?.uid)
                setLike(true)
                setLikeAmount(likeAmount + 1)
            }else {
                await deleteLike(post._id, authReducer.user?.uid)
                setLike(false)
                setLikeAmount(likeAmount - 1)
            }
        }
    }   

    const handleProfileClick = () => {
        history.push(`/profile/${post.uid}`)
    }

    const getDisplayTime = () => {
        // Get time difference in seconds
        if(post != null){
            const timeDiff = (Date.now() - Date.parse(post?.createdAt))/1000
            
            if(timeDiff < 60){
                return `${Math.floor(timeDiff)}s`
            } else if(timeDiff < 3600) {
                return `${Math.floor(timeDiff/60)}m`
            } else if(timeDiff < 86400){
                return `${Math.floor(timeDiff/3600)}h`
            }else if(timeDiff < 31536000){
                return `${Math.floor(timeDiff/86400)}d`
            }else{
                return `${Math.floor(timeDiff/31536000)}y`
            }
        }

        
    }

    const handleCommentClick = async (e) => {
        e.preventDefault();
        // if the user is not null
        if(authReducer.user != null){
            if(commentInput != '') {
                // Add the new comment
                const newComment = {
                    uid: authReducer.user?.uid,
                    username: authReducer.user?.displayName,
                    userAvatar: authReducer.user?.photoURL,
                    comment: commentInput,
                    createdAt: -1,
                }

                await addComment(post._id, commentInput, authReducer.user?.uid)

                // Set the comment amount
                setCommentAmount(commentAmount + 1)
                setComments([newComment, ...comments])
                setCommentInput('')
            }
        }
    }

    const handleCommentInputChange = (e) => {
        setCommentInput(e.target.value);
    }

    // Gets all the posts and setPostState is called
    useEffect(async () => {
        // Get Post
        // console.log('PostId: ')
        // console.log(postId)
        const tempPost = await getPost(postId)
        // console.log('TempPost: ')
        // console.log(tempPost)
        
        // Set Post 
        setPost(tempPost)
        // console.log("Post after set:")
        // console.log(post)
 
        // set the image url of the post
        // const downloadImg = async () => {
        //     const fileRef = storageRef.child(`posts/${postId}.jpg`)
        //     const url = await fileRef.getDownloadURL();
        //     setImgUrl(url);
        // }
        setImgUrl(getPostImageUrl(tempPost.image))
        
        // Check if the user already liked the post
        // and set the user liked
        const isLiked = await isLikedByUser(tempPost._id, authReducer.user?.uid)
        setLike(isLiked);


        // get number of likes
        const numOfLikes = await getNumOfLikes(tempPost._id)
        setLikeAmount(numOfLikes)

        // Get number of comments
        const numOfComments = await getNumOfComments(tempPost._id)
        setCommentAmount(numOfComments)

        // Get Comments
        const tempComments = await getComments(tempPost._id)
        setComments(tempComments.comments)


    }, []) 
    




    return (
        <div className="postScreen">
            <Header />
            <div className="postScreen__postBody">
                <div className="postScreen__postBody__post">
                    <LazyLoadImage
                        src={imgUrl}
                        effect='blur'
                        placeholder={ <div style={{height: '300px', width: '300px', backgroundColor: 'black'}}> </div> }
                    />
                    {/* <img src={imgUrl} alt="placeholderImage" /> */}
                </div>
                <div className="postScreen__postBody__comments">
                    <div className="postScreen__postBody__commentsHeader">
                        <div className="postScreen__postBody__commentsHeaderRight">
                            <Avatar onClick={handleProfileClick} src={post?.userAvatar} />
                            <p>{post?.username}</p>
                        </div>
                        <div className="postScreen__postBody__commentsHeaderLeft">
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <div className="postScreen__postBody__commentsBody">
                        <div className="container">
                            {post?.caption && <Comment comment={ {
                                username: post.username,
                                comment: post.caption,
                                userAvatar: post?.userAvatar,
                                createdAt: post.createdAt,
                            }} /> }
                            {comments?.map((comment) => <Comment comment={comment} /> )}
                        </div>
                    </div>
                    <div className="postScreen__postBody__commentsFooter">
                        <div className="postScreen__postBody__commentsFooterInfo">
                            <div className="left">
                                <IconButton onClick={handleLikeClick}>
                                    {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                </IconButton>
                            </div>
                            <div className="right">
                                <p> <span>{likeAmount}</span> Likes  <span>{commentAmount}</span> comments</p>
                                <p>{getDisplayTime()}</p>
                            </div>
                        </div>
                        <div className="postScreen__postBody__commentsFooterInput">
                            <form onSubmit={handleCommentClick}>
                                <input type="text" value={commentInput} placeholder="Add a comment" onChange={handleCommentInputChange} />
                                <button type="sumbit">Submit Button</button>
                            </form>
                            <Button onClick={handleCommentClick}>POST</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostScreen
