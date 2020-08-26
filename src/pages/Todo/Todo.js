import React, {
    useContext, useEffect
} from 'react';
import classes from './Todo.module.sass'
import { TodoContext } from '../../context/todo/todoContext';
import { TodoItem } from '../../components/TodoItem/TodoItem';
import { Loader } from '../../components/Loader/Loader';

export const Todo = () => {

    const {
        setLoading,
        createTodoItem,
        setFutureItemName,
        isLoad,
        todoList,
        futureItemName
    } = useContext(TodoContext);

    let finishedTodos = [];
    let notFinishedTodos = [];
    
    (todoList || []).forEach((item) => {
        if (item.finished) {
            finishedTodos.push(item)
        } else {
            notFinishedTodos.push(item);
        }
    })
    
    
    
    useEffect(() => {
        setLoading();
        //eslint-disable-next-line
    }, [])



    return (
        <div className={classes.Todo}>
            <div className="container">
                <form onSubmit={(event) => {
                    createTodoItem(event, futureItemName, new Date().getTime());
                    setFutureItemName('')
                    }} >
                    <div className = "input-group mb-5" >
                        <input type="text" 
                        className="form-control" 
                        value={futureItemName || ''}
                        onChange={(event) => setFutureItemName(event.target.value)}
                        placeholder='Введите задачу' />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit">Добавить</button>
                        </div>
                    </div>
                    <div>
                        {isLoad ? <Loader /> : 
                            <>
                                <p className='text-center text-muted'>Не выполненные задачи:</p>
                                
                                {notFinishedTodos.map((item) => {
                                    return (
                                        <TodoItem key={item.id} 
                                        item={item}
                                        />
                                    )
                                })}

                                <p className='text-center text-muted'>Выполненные задачи:</p>

                                {finishedTodos.map((item) => {
                                    return (
                                        <TodoItem key={item.id} 
                                        item={item}
                                        />
                                    )
                                })}
                            </>
                        }
                        
                        
                    </div>
                </form>
            </div>
            
        </div>
    )
}