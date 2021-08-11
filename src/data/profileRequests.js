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