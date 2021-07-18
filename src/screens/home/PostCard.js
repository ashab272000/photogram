import { Avatar, IconButton } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import './PostCard.css'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { storageRef } from '../../firebase';


function PostCard({id, post}) {
    
    const [imgUrl, setImgUrl] = useState('')

    useEffect(() => {
        const downloadImg = async () => {
            const fileRef = storageRef.child(`posts/${id}.jpg`)
            const url = await fileRef.getDownloadURL();
            setImgUrl(url);
            console.log(imgUrl);
        }

        downloadImg();

    }, [])

    return (
        <div className="postCard">
            <div className="postCard__header">
                <Avatar/>
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
                    <IconButton>
                       <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton>
                       <ModeCommentOutlinedIcon />
                    </IconButton>
                    <IconButton>
                       <BookmarkBorderOutlinedIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default PostCard
