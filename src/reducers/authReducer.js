const initialState = {
    user: null,
}

const actionTypes = {
    SIGN_IN: 'SIGN_IN',
    SIGN_OUT: 'SIGN_OUT'
}

const authReducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.SIGN_IN:
            return {
                ...state,
                user: action.user,
            }
        case actionTypes.SIGN_OUT:
            return {
                ...state,
                user: null,
            }
        
        default:
            return state;
    }
}

export {actionTypes}
export default authReducer;