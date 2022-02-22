import { actionTypes } from "../actionTypes";

const initialState = {
    allProducts: [],
    myProducts: [],
    selectedProduct: []
}

export const productsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.SET_ALL_PRODUCTS:
            return {...state, allProducts: payload}
        case actionTypes.SET_MY_PRODUCTS:
            return {...state, myProducts: payload}
        case actionTypes.SET_SELECTED_PRODUCT:
            return {...state, selectedProduct: payload}
        default:
            return state;
    }
}