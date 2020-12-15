import { ADD_ALL_PRODUCT, ADD_CATEGORY, ADD_TO_CART, ADD_USER, REMOVE_FROM_CART } from "../Actions/StoreActions";

const initialState = {
    user: {},
    cart: [],
    categories: [],
    products: []
}

export const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                user: action.userDetails
            }
        case ADD_TO_CART:
            return {
                ...state,
                cart: funcToAddCart(state.cart, action.product)
            }
        case REMOVE_FROM_CART:
            const remaingFoods = state.cart.filter(food => food.id !== action.id);
            return {
                ...state,
                cart : remaingFoods
            }
        case ADD_CATEGORY:
            return{
                ...state,
                categories : action.category
            }
        case ADD_ALL_PRODUCT:
            return{
                ...state,
                products : action.product
            }
        default:
            return state;
    }
}

const funcToAddCart = (cartItems, cartItemToAdd) =>{
    const existingCartItem = cartItems.find(item => item.key === cartItemToAdd.key);
    if (existingCartItem) {
        const dfdf = cartItems.map(item =>
        item.key === cartItemToAdd.key
            ? { ...cartItemToAdd, quantity: item.quantity + cartItemToAdd.quantity }
            : item
        );
        return dfdf;
    }  
    return [...cartItems, { ...cartItemToAdd, quantity: cartItemToAdd.quantity }];
}