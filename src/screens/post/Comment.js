import { Avatar } from '@material-ui/core'
import './Comment.css'

function Comment({comment}) {

    const getDisplayTime = () => {
        // Get time difference in seconds
        if(comment?.createdAt == -1){
            return '0s';
        }
        const timeDiff = (Date.now() - Date.parse(comment?.createdAt))/1000
        
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

    return (
        <div className='comment'>
            <div className="comment__avatar">
                <Avatar src={comment?.userAvatar} />
            </div>
            <div className="comment__body">
                <p><span>{comment.username} </span>{comment.comment}</p>
                <p>{getDisplayTime()}</p>
            </div>
        </div>
    )
}

export default Comment
