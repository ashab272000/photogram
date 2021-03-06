import { useEffect, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { Avatar, Button, CircularProgress, IconButton } from '@material-ui/core';
import './AddPost.css'
import ReactModal from 'react-modal';
import { useDropzone} from 'react-dropzone';
import { useSelector } from 'react-redux';
import { addPost } from '../../data/postRequests';
import useWindowDimensions from '../../hooks/UseWindowDimension';
import Resizer from "react-image-file-resizer";

function AddPost({ isOpen, onClickClose }) {

    const [files, setFiles] = useState([])
    const [header, setHeader] = useState('New Post')
    const [captionInput, setCaptionInput] = useState('')
    const [clickedshare, setClickedShare] = useState(false)
    const authReducer = useSelector(state => state.authReducer)
    
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: async (acceptedFiles) => {
            const resizedFile = await resizeFile(acceptedFiles[0]);
            const file = Object.assign(resizedFile, {
                preview: URL.createObjectURL(resizedFile)
            })
            console.log(file)
            setFiles([file]);
        }
    })

    const resizeFile = (file) =>
        new Promise((resolve) => {
        Resizer.imageFileResizer(
        file,
        1080,
        11080,
        "JPEG",
        80,
        0,
        (uri) => {
            resolve(uri);
        },
        "file"
        );
    });

    const modalStyle = {
        content : {
            borderRadius: '12px',
            padding: '0',
            inset: '40px',
        }
    }
    const containerStyle = {height: '100%', display: 'flex', flexDirection:'column'}

    const handlePhotoSelectClick = (e) => {
        const i = document.getElementById('photoSelectInput');
        i.disabled = false;
        i.click()
        i.disabled = true;
    }
    const handleClickShare = async () => {
        // Set the header and body to uploading set
       setClickedShare(true);
        
    }
    
    const handleCaptionOnChange = (caption) => {
        setCaptionInput(caption)
        console.log(captionInput);
    }

    useEffect(async () => {
        if(clickedshare){
            setHeader('Uploading')
            setBody(loadingBody)
    
            // Add Post
            await addPost(files[0], captionInput, authReducer.user?.uid)
    
            // Close the modal after reseting the header and the body
            setHeader('New Post')
            setBody(initialBody)
            setFiles([])
            onClickClose()
            setClickedShare(false);
        }
    }, [clickedshare])
    


    const initialBody = (
        <div className="addPost__body" {...getRootProps()}>
            <input id='photoSelectInput' {...getInputProps()} disabled='disabled' />
            <svg aria-label="Icon to represent media such as images or videos" className="_8-yf5 " fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"></path></svg>
            <h2>Drag photos and videos here</h2>
            <Button onClick={handlePhotoSelectClick}>Select From Computer</Button>                
        </div>
    )
    const loadingBody = (
        <div className="addPost__body">
            <CircularProgress />
        </div>)

    const composeBody = (
        <div className="addPost__body">
            <div className="addPost__bodyCompose">
                <div className="addPost__bodyComposeLeft">
                    <img src={files[0]?.preview} alt="Preview" />
                </div>
                <div className="addPost__bodyComposeRight">
                    <div className="addPost__bodyComposeRight__header">
                        <Avatar src={authReducer.user?.photoURL}/>
                        <h2>{authReducer.user?.displayName}</h2>
                    </div>
                    <CaptionTextArea onChangeCaption={handleCaptionOnChange} />
                    <div className="container" style={{flex:'1', margin:'0px -20px', borderTop:'1px solid #dbdbdb'}}></div>
                    <Button onClick={handleClickShare}>Share</Button>
                </div>
            </div>
        </div>
        )

        // Code from https://www.youtube.com/watch?v=eftyBaoDkNA
    const [body, setBody] = useState(initialBody)


    useEffect(() => {
        if(files.length > 0) {
            setHeader('Loading')
            setBody(loadingBody)
            const img = new Image();
            img.onload =  () => {
                setHeader('Compose')
                setBody(composeBody)
            }
            img.src=files[0].preview;
        }
    }, [files])

    const onClickCloseTemp = () => {
        setHeader('New Post')
        setBody(initialBody)
        setFiles([])
        onClickClose()
    }

    return (
        <div className="addPost">
            <ReactModal isOpen={isOpen} style={modalStyle} >
                <div className="container" style={containerStyle}>
                    <div className="addPost__header">
                        <div className="addPost__headerContainer"></div>
                        <h3>{header}</h3>
                        <div className="addPost__headerContainer">
                            <IconButton onClick={onClickCloseTemp}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                    </div>
                    {body}
                </div>
            </ReactModal>
        </div>
    )
}


function CaptionTextArea({onChangeCaption}) {

    const [captionValue, setCaptionValue] = useState('')
    const [numOfRows, setNumOfRows] = useState(7)
    const { height, width } = useWindowDimensions();
    const handleCaptionOnChange = (e) => {
        setCaptionValue(e.target.value)
        
    }

    useEffect(() => {
        if(width < 736) {
            setNumOfRows(1)
        }
    }, [width])

    useEffect(() => {
        onChangeCaption(captionValue)
    }, [captionValue])

    return (
        <textarea rows={numOfRows} placeholder={'Write a caption'} onChange={handleCaptionOnChange} value={captionValue}/>
    )
}

export default AddPost
