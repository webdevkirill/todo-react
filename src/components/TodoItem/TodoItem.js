import React, { useContext } from 'react';
import { TodoContext } from '../../context/todo/todoContext';

export const TodoItem = ({item}) => {
    
    const name = item.name;

    const {
        setQuality, deleteItem
    } = useContext(TodoContext);

    return (
        <div className="input-group mb-2">
            <input type="text" readOnly value={name} 
            className={`form-control bg-white ${item.important ? 'border-warning' : null}`} />
            <div className="input-group-append" id="button-addon4">
                <button className = {`btn ${item.important ? 'btn-warning' : 'btn-outline-warning'}`}
                type = "button"
                onClick = { () => setQuality(name, 'important')} > Важное </button>
                <button className = {`btn ${item.finished ? 'btn-success' : 'btn-outline-success'}`}
                type = "button"
                onClick = { () => setQuality(name, 'finished')}  >Готово</button>
                <button className="btn btn-danger" type="button"
                onClick={() => deleteItem(name)} >Удалить</button>

            </div>
        </div>
    )
}