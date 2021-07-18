const initialState = {
    user: null,
}

const actionTypes = {
    SIGN_IN: 'SIGN_IN'
}

const authReducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.SIGN_IN:
            return {
                ...state,
                user: action.user,
            }
        
        default:
            return state;
    }
}

export {actionTypes}
export default authReducer;