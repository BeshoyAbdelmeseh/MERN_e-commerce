import { actionTypes } from "../actionTypes";

const intialState = {
    user: {},
    firstAuth: false,
    firstAuthChecked: false
}

export const userReducer = (state = intialState, {type, payload}) => {
    switch (type) {
        case actionTypes.SET_FIRST_AUTH:
            return {...state, firstAuth: payload, firstAuthChecked: true}
        case actionTypes.SET_USER:
            return {...state, user: payload}
        case actionTypes.REMOVE_USER:
            return {...state, user: {}}
        default:
            return state
    }
}