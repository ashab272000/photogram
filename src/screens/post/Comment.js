import { Avatar } from '@material-ui/core'
import React from 'react'
import './Comment.css'

function Comment({comment}) {
    return (
        <div className='comment'>
            <div className="comment__avatar">
                <Avatar />
            </div>
            <div className="comment__body">
                <p><span>Mohammed Ashab Uddin</span> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis nesciunt libero dolorem quos, ipsa veritatis nobis in illo molestias quidem dignissimos commodi accusantium hic modi consectetur error quo suscipit. Animi!</p>
                <p>17h</p>
            </div>
        </div>
    )
}

export default Comment
