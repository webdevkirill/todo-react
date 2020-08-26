import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../../context/todo/todoContext';

export const Auth = () => {

    const {
        auth, autoLogin
    } = useContext(TodoContext);

    useEffect(() => {
        autoLogin();
        //eslint-disable-next-line
    }, [])

    let email = '', password = '';

    const onChangeHangler = (type, value) => {
        if (type === 'email') {
            email = value;
        } else if (type === 'password') {
            password = value;
        }
    }



    return (
        <div className='container'>
            <h1 className='mb-3 text-primary'>Вход</h1>
            <form onSubmit={(event) => event.preventDefault()}>
                <div className="form-group">
                    <label ftmlfor="inputEmail">Email</label>
                    <input type = "email"
                    className = "form-control"
                    id = "inputEmail"
                    onChange = {(event) => onChangeHangler('email', event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label ftmlfor="exampleInputPassword1">Пароль</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                    onChange = {(event) => onChangeHangler('password', event.target.value)} />
                </div>
                <button className = "btn btn-primary"
                onClick = {() => auth(email, password, true)}>Войти</button>
            </form>
        </div>
    )
}