import { get, post} from 'axios'

// const url = "http://photogram-ashab272000.codes:5000";
const url = "http://localhost:5000";
const headers = {
    headers : {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
    }, 
}

export const getProfile = async (id) => {
    try {
        const res = await get(`${url}/profile/${id}`)
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
export const addProfile = async (user) => {
    try {
        // var form_data = new FormData();
    
        // for ( var key in user ) {
        //     form_data.append(key, user[key]);
        // }

        const res = await post(`${url}/profile/add`, user)
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
        const res = await get(`${url}/post/profile/${userId}/${limit}/${createdAt}`)
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
        
        const res = await get(`${url}/profile/isFollowing/${userId}/${followUserId}`)
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
        // var form_data = new FormData();

        // for ( var key in data ) {
        //     form_data.append(key, data[key]);
        // }

        const res = await post(`${url}/profile/followProfile`, data)

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

        // var form_data = new FormData();

        // for ( var key in data ) {
        //     form_data.append(key, data[key]);
        // }

        const res = await post(`${url}/profile/unFollowProfile`, data)

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

        const data = {
            userId,
            desc
        }

        // var form_data = new FormData();

        // for ( var key in data ) {
        //     form_data.append(key, data[key]);
        // }

        const res = await post(`${url}/profile/description/set`, data)

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
            const res = await get(`${url}/profile/search/${searchValue}`)
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
