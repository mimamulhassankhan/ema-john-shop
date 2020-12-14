export const ADD_USER = 'ADD_USER';

export const addSignedUser = userDetails => {
    return {
        type: ADD_USER,
        userDetails
    }
}