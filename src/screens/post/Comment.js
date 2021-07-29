import { Avatar } from '@material-ui/core'
import React from 'react'
import './Comment.css'

function Comment({comment}) {
    return (
        <div className='comment'>
            <div className="comment__avatar">
                <Avatar src={comment?.userAvatar} />
            </div>
            <div className="comment__body">
                <p><span>{comment.username} </span>{comment.comment}</p>
                <p>17h</p>
            </div>
        </div>
    )
}

export default Comment
