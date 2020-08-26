import React, {useReducer} from 'react';
import { authReducer } from './authReducer';
import { corsAn } from '../../axios/corsAnyw';
import { AuthContext } from './authContext';
import { AUTH_SUCCESS, AUTH_LOGOUT, LOAD_DATA } from '../types';
import axios from 'axios';
import axiosTodo from '../../axios/axios-todo';

const API_KEY = process.env.REACT_APP_API_KEY;


export const AuthState = ({children}) => {

    const initialState = {
        token: null,
        email: null,
        data: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);


    const authSuccess = (token, email) => {
        return {
            type: AUTH_SUCCESS,
            token, email
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('expirationDate')
        dispatch({
            type: AUTH_LOGOUT
        })
    }

    const autoLogout = (time) => {
        return dispatch => {
            setTimeout(() => {
                dispatch(logout())
            }, time * 1000)
        }
    }

    const auth = async (email, password, isLogin) => {
        
        const authData = {
            email, password,
            returnSecureToken: true
        }

        let url = corsAn + 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY;
        if (isLogin) {
            url = corsAn + 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY;
        }

        try {
            const response = await axios.post(url, authData)
            const data = response.data

            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

            localStorage.setItem('token', data.idToken)
            localStorage.setItem('userId', data.localId)
            localStorage.setItem('expirationDate', expirationDate)

            dispatch(authSuccess(data.idToken, email))
            dispatch(loadData(email))
            dispatch(autoLogout(data.expiresIn))
        } catch (e) {
            alert('Неверный логин или пароль')
        }

        
        
    }

    const loadData = async (email) => {
        const response = await axiosTodo.get(`/${email}.json`)
        const data = response.data || null;

        dispatch({
            type: LOAD_DATA,
            payload: data
        })
    }

    const postData = async (email, data) => {
        await axiosTodo.post(`/${email}.json`, data)

        dispatch({
            type: LOAD_DATA,
            payload: data
        })
    }
    

    const {token, email, data} = state;



    return (
        <AuthContext.Provider value={{
            auth, logout, loadData, postData,
            token, email, data
            }} >
            {children}
        </AuthContext.Provider>
    )
}