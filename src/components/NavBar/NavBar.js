import React, { useContext } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { TodoContext } from '../../context/todo/todoContext';

export const NavBar = () => {

    const {
        token, logout
    } = useContext(TodoContext);

    return (
        <nav className='navbar navbar-dark bg-primary navbar-expand-lg mb-3 d-flex justify-content-between'>
            <div className="navbar-brand">Todo App</div>
            <ul className="navbar-nav">
                {
                    token ?
                    <li className="nav-item">
                        <Redirect to="/" />
                        <button className="btn btn-danger" onClick={() => logout()}>Выйти</button>
                    </li> :
                    <li className="nav-item">
                        <Redirect to="/auth" />
                        <NavLink to='/auth' className='text-white mr-3'>Вход</NavLink>
                        <NavLink to='/register' className='text-white'>Регистрация</NavLink>
                    </li>
                }
                
            </ul>
        </nav>
    )
}