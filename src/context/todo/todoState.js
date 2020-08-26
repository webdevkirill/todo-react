import React, {useReducer} from 'react';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import { INPUT_CHANGE_HANDLER, AUTH_SUCCESS, AUTH_LOGOUT, LOAD_DATA, SET_LOADING, SET_TODO_LIST } from '../types';
import axiosTodo from '../../axios/axios-todo';
import { corsAn } from '../../axios/corsAnyw';
import axios from 'axios';
import firebase from 'firebase';


const API_KEY = process.env.REACT_APP_API_KEY;
const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
const DATABASE_URL = process.env.REACT_APP_DATABASE_URL;

const config = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
}

const db = firebase.initializeApp(config);

export const TodoState = (props) => {

    const initState = {
        isLoad: true,
        todoList: [],
        futureItemName: '',
        token: null,
        email: null
    }

    const [state, dispatch] = useReducer(todoReducer, initState);

    const setLoading = () => dispatch({
        type: SET_LOADING
    })

    const setFutureItemName = (futureItemName) => {
        dispatch({
            type: INPUT_CHANGE_HANDLER,
            futureItemName
        })
    }

    const createTodoItem = (event, name, id) => {

        event.preventDefault();
        let todoList = state.todoList ? [...state.todoList] : [];

        todoList = [...todoList, {
            name,
            finished: false,
            important: false,
            id
        }];

        dispatch(postData(todoList))
    }

    const setQuality = async (name, quality) => {

        const todoList = [...state.todoList];

        todoList.forEach((item) => {
            if (item.name === name) {
                item[quality] = !item[quality]
            }
        })

        dispatch(postData(todoList))

    }

    const deleteItem = (name) => {

        const todoList = [...state.todoList].filter((item) => item.name !== name);

        dispatch(postData(todoList))
    }

    const setTodoList = (data) => {
        dispatch({
            type: SET_TODO_LIST,
            todoList: data
        })
    }


    const authSuccess = (token, email) => {
        const newEmail = email.replace(/\W/g, '');
        
        return {
            type: AUTH_SUCCESS,
            token,
            email: newEmail
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('email')
        dispatch({
            type: AUTH_LOGOUT
        })
    }

    const autoLogout = (time) => {        
        setTimeout(() => {
            logout()    
        }, time * 1000)       
    }

    function autoLogin() {
        const token = localStorage.getItem('token');
        if (!token) {
            logout()
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                logout()
            } else {
                const email = localStorage.getItem('email');

                dispatch(authSuccess(token, email))
                dispatch(loadData(email.replace(/\W/g, '')))
                autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
            }
        }
        
    }

    const auth = async (email, password, isLogin) => {
        const authData = {
            email: email,
            password,
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
            localStorage.setItem('email', email)


            dispatch(authSuccess(data.idToken, email))
            dispatch(loadData(email.replace(/\W/g, '')))

            let timeOut = data.expiresIn;
            autoLogout(timeOut)
        } catch (e) {
            console.log(e)
            alert('Неверный логин или пароль')
        }

    }

    const loadData = async (email) => {
        try {
            setLoading()
            const response = await axiosTodo.get(`/${email}.json`);
            let data = response.data ? 
            Object.keys(response.data).map((key) => {
                return response.data[key]
            }) : 
            [];

            dispatch({
                type: LOAD_DATA,
                payload: data[0]
            })
            
        } catch (error) {

        }
        
    }

    const postData = async (data) => {
        setLoading()
        const email = state.email;
        const response = await axiosTodo.get(`/${email}.json`)

        if (response.data) {
            Object.keys(response.data).forEach(async (key) => {
                await db.database().ref(`/${email}`).child(key).remove()
            });
        }
        
        await axiosTodo.post(`/${email}.json`, data);
        dispatch(loadData(email));
        
    }

    const {
        isLoad,
        todoList,
        futureItemName,
        token,
        email
    } = state;




    return (
        <TodoContext.Provider value={{
            setTodoList, setLoading, createTodoItem, setFutureItemName, setQuality, deleteItem,
            auth, logout, autoLogin, autoLogout, 
            isLoad, todoList, futureItemName, token, email
            }} >
            {props.children}
        </TodoContext.Provider>
    )
}