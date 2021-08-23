import axios from 'axios'
import FormData from 'form-data';
import fs from 'fs'
// Get all the post by latest
const url = "http://localhost:5000";
export const getAllPosts = async () => {
    try {
        
        const res = await axios.get(`${url}/post/`)
        if(res.data.success){
            return res.data.data;
        }
    } catch (error) {
        console.log('postRequests.getAllPosts')
        console.log(`Error: ${error}`)
        return null
    }
}


export const getPostsByTrending = async (limit = 30, date = Date.now()) => {
    try {
        const res = await axios.get(`${url}/post/trending/${limit}/${date}`)
        if(res.data.success){
            return res.data.data
        }
    } catch (error) {
        console.log('postRequests.getPostsByTrending')
        console.log(`Error: ${error}`)
        return []
    }
}

export const getPostByFollowingUsers = async (userId ,limit = 30, date = Date.now()) => {
    try {
        const res = await axios.get(`${url}/post/profile/followingPosts/${userId}/${limit}/${date}`)
        if(res.data.success){
            console.log("Posts from followingPosts")
            console.log(res.data.data)
            return res.data.data
        }
    } catch (error) {
        console.log('postRequests.getPostByFollowingUsers')
        console.log(`Error: ${error}`)
        return []
    }
}
// Get a the post
export const getPost = async (postId) => {
    try {
        
        const res = await axios.get(`${url}/post/${postId}`)
        if(res.data.success){
            return res.data.data;
        }
    } catch (error) {
        console.log('postRequests.getPost')
        console.log(`Error: ${error}`)
        return null
    }
}

export const getPostImageUrl = (imageName) => {
    return `${url}/post/image/${imageName}`
}

// Get a post image
export const getPostImage = async (imageName) => {
    try {
        
        const res = await axios.get(`${url}/post/image/${imageName}`)
        if(res.data.success){
            return res.data.data;
        }
    } catch (error) {
        console.log('postRequests.getPostImage')
        console.log(`Error: ${error}`)
        return null
    }
}

// Get a post image
/**
 * 
 * @param {String} filePath 
 * @param {String} caption 
 * @param {String} uid 
 * @returns 
 */
export const addPost = async (file, caption, uid) => {
    try {
        const form = new FormData();
        form.append('uid', uid)
        form.append('caption', caption ?? '')
        form.append('image', file)

        const res = await axios.post(`${url}/post/add`, form)
        if(res.data.success){
            return res.data.post;
        }

        return null;
    } catch (error) {
        console.log('postRequests.addPost')
        console.log(`Error: ${error}`)
        return null
    }
}

/**
 * 
 * @param {String} postId 
 * @param {String} comment 
 * @param {String} uid 
 */
export const addComment = async (postId, comment, uid) => {
    try {
        const data = {
            postId,
            comment,
            uid
        }

        const res = await axios.post(`${url}/post/addcomment`, data)

        if(res.data.success){
            return res.data.data  
        }
    } catch (error) {
        console.log('postRequests.addComment')
        console.log(`Error: ${error}`)
        return null
    }
}

// Adds a like of a user on a post
export const addLike = async (postId, uid) => {
    try {
        const data = {
            postId,
            uid
        }

        console.log(data)
    
        const res = await axios.post(`${url}/post/addLike`, data)
    
        if(res.data.success){
            return res.data.data  
        }
    } catch (error) {
        console.log('postRequests.addLike')
        console.log(`Error: ${error}`)
        return null
    }
}

// Deletes a like from the user on a post
export const deleteLike = async (postId, uid) => {
    try {
        const data = {
            postId,
            uid
        }
    
        const res = await axios.post(`${url}/post/deleteLike`, data)
    
        if(res.data.success){
            return res.data.data  
        }
    } catch (error) {
        console.log('postRequests.addLike')
        console.log(`Error: ${error}`)
        return null
    }
    
}

// Request to check if a post is liked by a user
export const isLikedByUser = async (postId, uid) => {
    try {
        const data = {
            postId,
            uid
        }
    
        const res = await axios.post(`${url}/post/isLikedByUser`, data)
    
        if(res.data.success){
            return res.data.data  
        }
    } catch (error) {
        console.log('postRequests.addLike')
        console.log(`Error: ${error}`)
        return false
    }
}

// Gets the number of likes
export const getNumOfLikes = async (postId) => {
    
    try {
        const res = await axios.get(`${url}/post/numOfLikes/${postId}`)
        if(res.data.success){
            return res.data.data
        }else  {
            return 0
        }
    } catch (error) {
        console.log('postRequests.getNumOfLikes')
        console.log(`Error: ${error}`)
        return 0;
    }
}

// Gets the number of comments
export const getNumOfComments = async (postId) => {
    
    try {
        const res = await axios.get(`${url}/post/numOfComments/${postId}`)
        if(res.data.success){
            return res.data.data
        }else  {
            return 0
        }
    } catch (error) {
        console.log('postRequests.getNumOfComments')
        console.log(`Error: ${error}`)
        return 0;
    }
}

// Gets the comments
export const getComments = async (postId, start=0, limit=10) => {
    
    try {
        const res = await axios.get(`${url}/post/comments/${postId}/${start}/${limit}`)
        if(res.data.success){
            return res.data.data
        }else  {
            return []
        }
    } catch (error) {
        console.log('postRequests.getNumOfComments')
        console.log(`Error: ${error}`)
        return [];
    }
}

