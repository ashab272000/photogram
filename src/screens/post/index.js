import { Avatar, Button, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import db, { storageRef } from '../../firebase'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './index.css'
import Comment from './Comment'
import { useParams } from 'react-router-dom'
import firebase from 'firebase'

function PostScreen() {

    const {postId} = useParams();
    console.log(postId);
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [imgUrl, setImgUrl] = useState('')
    const [like, setLike] = useState(false)
    const [likeAmount, setLikeAmount] = useState(0)
    const [commentAmount, setCommentAmount] = useState(0)
    const [commentInput, setCommentInput] = useState('')
    const authReducer = useSelector(state => state.authReducer)

    // Whenever user clicks on the like button
    const handleLikeClick = () => {
        if(authReducer.user != null){
            const postRef = db.collection('posts').doc(postId).collection('likedBy').doc(authReducer.user?.uid);
            postRef.get()
            .then((snap) => {
                if(!snap.exists){
                    postRef.set({
                        'username': authReducer.user?.displayName,
                        'userAvatar': authReducer.user?.photoURL,
                    });
                    setLike(true)
                    setLikeAmount(likeAmount+1)
                }else {
                    postRef.delete()
                    setLike(false)
                    setLikeAmount(likeAmount-1)
                }
            })
        }
    }   

    const handleCommentClick = (e) => {
        e.preventDefault();
        if(authReducer.user != null){
            if(commentInput != '') {
                const newComment = {
                    uid: authReducer.user?.uid,
                    username: authReducer.user?.displayName,
                    userAvatar: authReducer.user?.photoURL,
                    comment:commentInput,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }
    
                db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .add(newComment)
    
                setCommentAmount(commentAmount+1)
                setComments([newComment, ...comments])
                setCommentInput('')
            }
        }
    }

    const handleCommentInputChange = (e) => {
        setCommentInput(e.target.value);
    }

    // Gets all the posts and setPostState is called
    useEffect(() => {
        const postRef = db.collection('posts').doc(postId)
        postRef.get()
        .then( snap => {
            setPost(snap.data())
        })        
    }, []) 
    
    useEffect(() => {
        
        // Downloading post
        const downloadImg = async () => {
            const fileRef = storageRef.child(`posts/${postId}.jpg`)
            const url = await fileRef.getDownloadURL();
            setImgUrl(url);
        }
        
        // Check if the user already liked the post
        if(authReducer.user != null){
            const postRef = db.collection('posts').doc(postId).collection('likedBy').doc(authReducer.user?.uid);
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
        
        // get number of likes
        db.collection('posts').doc(postId).collection('likedBy').get().then(snap => {
            setLikeAmount(snap.size)
         });
        // Get number of comments
        db.collection('posts').doc(postId).collection('comments').get().then(snap => {
            setCommentAmount(snap.size)
         });

        db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .limit(8)
        .get()
        .then(querySnap => {
            // The is bugged
            // need to add the previous comments if scrolls down and getting new comments
            // console.log(querySnap)
            setComments(querySnap.docs.map((doc) => doc.data()))
            // console.log("Priniting Comments")
            // console.log(comments)
        })
    }, [post])




    return (
        <div className="postScreen">
            <Header />
            <div className="postScreen__postBody">
                <div className="postScreen__postBody__post">
                    <img src={imgUrl} alt="placeholderImage" />
                </div>
                <div className="postScreen__postBody__comments">
                    <div className="postScreen__postBody__commentsHeader">
                        <div className="postScreen__postBody__commentsHeaderRight">
                            <Avatar src={post?.userAvatar} />
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
                            }} /> }
                            {comments.map((comment) => <Comment comment={comment} /> )}
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
                                <p>8 hours ago</p>
                            </div>
                        </div>
                        <div className="postScreen__postBody__commentsFooterInput">
                            <InsertEmoticonIcon />
                            <form onSubmit={handleCommentClick}>
                                <input type="text" value={commentInput} placeholder="Add a comment" onChange={handleCommentInputChange} />
                                <button type="sumbit">Submit Button</button>
                            </form>
                            <Button onClick={handleCommentClick}>POST</Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="postScreen__morePosts">
            
            </div> */}
        </div>
    )
}

export default PostScreen
