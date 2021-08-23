import { FlashOnTwoTone } from '@material-ui/icons';
import axios from 'axios'

const url = "http://localhost:5000";

export const getProfile = async (id) => {
    try {
        const res = await axios.get(`${url}/profile/${id}`)
        if(res.data.success){
            return res.data.data
        }
        return null
    } catch (error) {
        console.log('profileRequests.getProfile')
        console.log(`Error: ${error}`)
        return null
    }
}

// export const getProfiles = 
/**
 * 
 * @param {{uid: String, username: String, userAvatar: String}} user 
 * @returns 
 */
export const addProfile = async(user) => {
    try {
        const res = await axios.post(`${url}/profile/add`, user)
        if(res.data.success){
            return res.data.data
        }
        return null
    } catch (error) {
        console.log('profileRequests.addProfile')
        console.log(`Error: ${error}`)
        return null;
    }
}

export const getProfilePosts = async(userId, limit = 6, createdAt = 0) => {
    // /profile/:userId/:limit/:date
    if(createdAt == 0){
        createdAt = Date.now()
    }

    try {
        const res = await axios.get(`${url}/post/profile/${userId}/${limit}/${createdAt}`)
        if(res.data.success){
            return res.data.data
        }
        return []
    } catch (error) {
        console.log('profileRequests.getProfilePosts')
        console.log(`Error: ${error}`)
        return [];
    }
}

export const getIsFollowing = async (userId, followUserId) => {
    try {
        
        const res = await axios.get(`${url}/profile/isFollowing/${userId}/${followUserId}`)
        if(res.data.success){
            return res.data.data
        }

        return false

    } catch (error) {
        console.log('profileRequests.getIsFollowing')
        console.log(`Error: ${error}`)
        return false;
        
    }
}

export const followProfile = async (userId, followUserId) => {
    try {
        const data = {
            uid: userId,
            followUid: followUserId,
        }
        const res = await axios.post(`${url}/profile/followProfile`, data)

        if(res.data.success){
            return res.data.data
        }

        return false
    } catch (error) {

        console.log('profileRequests.followProfile')
        console.log(`Error: ${error}`)
        return false;
    }
}

export const unFollowProfile = async (userId, followUserId) => {
    try {
        const data = {
            uid: userId,
            followUid: followUserId,
        }
        const res = await axios.post(`${url}/profile/unFollowProfile`, data)

        if(res.data.success){
            return res.data.data
        }

        return false
    } catch (error) {

        console.log('profileRequests.followProfile')
        console.log(`Error: ${error}`)
        return false;
    }
}

export const setProfileDesc = async (userId, desc) => {
    try {
        const res = await axios.post(`${url}/profile/description/set`, {
            userId,
            desc
        })

        if(res.data.success){
            return res.data.data
        }

        return false
    } catch (error) {
        console.log('profileRequests.setProfileDesc')
        console.log(`Error: ${error}`)
        return false;
    }
}

export const searchProfiles = async (searchValue) => {
    if(searchValue.length > 1){
        try {
            const res = await axios.get(`${url}/profile/search/${searchValue}`)
            if(res.data.success){
                return res.data.data
            } else {
                return []
            }
    
        } catch (error) {
            console.log('profileRequests.searchProfiles')
            console.log(`Error: ${error}`)
            return [];
        }
    }
    return []
}
