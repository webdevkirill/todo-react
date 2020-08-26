import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { Todo } from './pages/Todo/Todo';
import { Auth } from './pages/Auth/Auth';
import { NavBar } from './components/NavBar/NavBar';
import { TodoState } from './context/todo/todoState';
import { Register } from './pages/Register/Register';
import { NotFound } from './components/NotFound/NotFound';



function App() {

    return (
        <TodoState>
            <BrowserRouter basename={'/todo-react/'}>
                <NavBar isLogin={true} />
                <Switch>  
                    <Route path='/' exact  component={Todo} />
                    <Route path='/auth'  component={Auth} />
                    <Route path='/register'  component={Register} />
                    <Route path="/404" component={NotFound} />
                    <Redirect to="/404" />
                </Switch>
            </BrowserRouter>
        </TodoState>
        
    );
}

export default App;
