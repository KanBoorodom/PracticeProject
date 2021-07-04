import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Todo = ({todo,todolist,setTodolist}) => {
    const checkHandle = () => {
        setTodolist(todolist.map(
            item => {
                if(item.id === todo.id){
                    todo.check = !todo.check
                }
                return item
            }
        ))
    }
    const deleteHandle = ()=>{
        setTodolist(todolist.map(item => {
            if(item.id === todo.id){
                item.delete = !item.delete
            } 
            return item
        }))
        setTimeout(()=>{
            setTodolist(todolist.filter(item => item.id !== todo.id))
        },800)      
    }

    return (
        <div 
            className = {
                `todo ${todo.delete ? "deleted" : ""}` 
            }
        >
            <label 
                className = {
                    todo.check ? 'checked' : ''
                }    
            >
                <input type="checkbox" onClick = {checkHandle} checked = {todo.check && 'true'}/>
                {todo.text}
            </label>
            <FontAwesomeIcon onClick = {deleteHandle} icon = {faTrashAlt} className = 'trash'/>
        </div>
    )
}

export default Todo
