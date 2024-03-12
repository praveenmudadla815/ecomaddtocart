import { ActionsTypes } from "../constants/ActionsTypes"

const intialState = {
    cart: []
}

export const addReducer = (state = intialState, action) => {
    switch (action.type) {
        case ActionsTypes.ADD_TO_CART:
            // const copyData = state.cart
            const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id)
            if (itemIndex >= 0) {
                state.cart[itemIndex].qnty += 1
            } else {
                const tempData = { ...action.payload, qnty: 1 }
                return {
                    ...state,
                    cart: [...state.cart, tempData]
                }
            }

        case ActionsTypes.DELETE_CART_ITEM:
            const filterId = state.cart.filter((itemId) => itemId.id !== action.payload)
            return {
                ...state,
                cart: filterId
            }

        case ActionsTypes.REMOVE_ITEM:
            const filterItem_Dec = state.cart.findIndex((itemId) => itemId.id === action.payload.id)
            
            if (state.cart[filterItem_Dec].qnty >= 1) {
                const deleItem = state.cart[filterItem_Dec].qnty -= 1
                return {
                    ...state,
                    cart: [...state.cart]
                }
            } else if (state.cart[filterItem_Dec].qnty === 1) {
                const data = state.cart.filter((itemId) => itemId.id !== action.payload)
                return {
                    ...state,
                    cart: data
                }
            }

        default:
            return state;
    }
}