
import { AUTH_SUCCESS, AUTH_LOGOUT, LOAD_DATA } from '../types';

const handlers = {
    [AUTH_SUCCESS]: (state, action) => ({...state, token: action.token, email: action.email}),
    [AUTH_LOGOUT]: (state) => ({...state, token: null, email: null}),
    [LOAD_DATA]: (state, {payload}) => ({...state, data: payload}),
    DEFAULT: (state) => state
}

export const authReducer = (state, action) => {

    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action)
}