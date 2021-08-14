export const signIn = (user) => {
    return {
        type: 'SIGN_IN',
        user: user,
    }
}

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}