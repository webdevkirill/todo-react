import { SET_LOADING, INPUT_CHANGE_HANDLER, AUTH_SUCCESS, AUTH_LOGOUT, LOAD_DATA, SET_TODO_LIST } from '../types';


const handlers = {

    [AUTH_SUCCESS]: (state, action) => ({...state, token: action.token, email: action.email}),
    [AUTH_LOGOUT]: (state) => ({...state, token: null, email: null}),
    [LOAD_DATA]: (state, {payload}) => ({...state, todoList: payload, isLoad: false}),

    [SET_LOADING]: (state) => ({...state, isLoad: true}),
    [SET_TODO_LIST]: (state, {todoList}) => {
        return {...state, todoList: todoList}},
    [INPUT_CHANGE_HANDLER]: (state, {futureItemName}) => ({...state, futureItemName}),
    DEFAULT: (state) => state
}

export const todoReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action)
}