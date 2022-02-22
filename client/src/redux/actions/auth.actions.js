import { actionTypes } from "../actionTypes";

export const setFirstAuth = (firstAuth) => {
    return({
        type: actionTypes.SET_FIRST_AUTH,
        payload: firstAuth
    })
}

export const setUser = (user) => {
    return({
        type: actionTypes.SET_USER,
        payload: user
    })
}

export const removeUser = (user) => {
    return({
        type: actionTypes.REMOVE_USER,
        payload: user
    })
}