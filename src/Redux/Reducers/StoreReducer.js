import { ADD_USER } from "../Actions/StoreActions";

const initialState = {
    user: {}
}

export const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                user: action.userDetails
            }
        default:
            return state;
    }
}