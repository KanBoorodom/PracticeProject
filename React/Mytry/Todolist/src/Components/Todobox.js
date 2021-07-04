import React from 'react'
import Todo from './Todo'

const Todobox = ({todolist,setTodolist,filterTodo})=>{
    return (
        <div className = 'todoBox'>
            {filterTodo.map(todo => (
                    <Todo todo = {todo} key = {todo.id} todolist = {todolist} setTodolist = {setTodolist}/>
                ))
            }
        </div>
    )
}
export default Todobox