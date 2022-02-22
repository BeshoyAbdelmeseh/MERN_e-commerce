import { actionTypes } from "../actionTypes";

export const setAllProducts = (products) => {
    return({
        type: actionTypes.SET_ALL_PRODUCTS,
        payload: products
    })
}

export const setSelectedProduct = (product) => {
    return({
        type: actionTypes.SET_SELECTED_PRODUCT,
        payload: product
    })
}

export const setMyProducts = (products) => {
    return({
        type: actionTypes.SET_MY_PRODUCTS,
        payload: products
    })
}