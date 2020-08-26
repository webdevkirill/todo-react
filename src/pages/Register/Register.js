import React, { useContext } from 'react';
import { TodoContext } from '../../context/todo/todoContext';

export const Register = () => {

    const {
        auth
    } = useContext(TodoContext);

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
            <form onSubmit={(event) => event.preventDefault()}>
                <h1 className='mb-3 text-primary'>Регистрация</h1>
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
                onClick = {() => auth(email, password, false)}>Зарегистрироваться</button>
            </form>
        </div>
    )
}