import { ActionsTypes } from "../constants/ActionsTypes"

export const addToItem = (addData) => {
    return {
        type: ActionsTypes.ADD_TO_CART,
        payload: addData

    }
}

export const deleteItem = (id) => {
    return {
        type: ActionsTypes.DELETE_CART_ITEM,
        payload: id
    }
}

export const removeItems = (item) => {
    return {
        type: ActionsTypes.REMOVE_ITEM,
        payload: item
    }
}