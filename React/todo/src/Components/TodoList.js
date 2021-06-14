import React from 'react'
//import component
import Todo from './Todo'
const TodoList = ({todos,setTodos,filterTodos})=>{
    return (
        <div className="todo-container">
            <ul className="todo-list">
                {filterTodos.map(todo => (
                    <Todo   
                        key = {todo.id} 
                        text = {todo.text}
                        setTodos = {setTodos} 
                        todo = {todo}
                        todos={todos}    
                    />
                ))}
            </ul>
        </div>  
    )
}

export default TodoList