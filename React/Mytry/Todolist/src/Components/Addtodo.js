import React from 'react'
import './Addtodo.css'
import { v4 as uuid_v4 } from "uuid"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

const Addtodo = ({todolist,setTodolist,inputText,setInputtext,setStatus})=>{
    const getInputText = (e)=>{setInputtext(e.target.value)}
    const handleSubmit = (e)=>{
        e.preventDefault()
        inputText !== '' && setTodolist([...todolist,
                {
                    text:inputText,
                    check:false,
                    delete:false,
                    id:uuid_v4()
                }
            ]) 
        setInputtext('') 
    }
    const handleSelect = (e)=>{
        setStatus(e.target.value)
    }
    return (
        <form>
            <div className = 'inputContainer'>
                <input
                    onChange = {getInputText}
                    type = 'text'
                    value = {inputText}
                    className = 'inputStyle'
                    placeholder = 'Enter your todo'
                />
                <button 
                    onClick = {handleSubmit}
                    className = 'addBtn'
                    type = 'submit'
                >
                    ADD
                    <FontAwesomeIcon icon={faPlusSquare} className='add'/>
                </button>
            </div>
            <select name="" id="" onChange = {handleSelect}>
                <option value="">-- All --</option>
                <option value="Done">Done</option>
                <option value="NotDone">Not done</option>
            </select>
        </form>
    )
}

export default Addtodo


{/*             <button
                onClick = {(e)=>{
                    e.preventDefault()
                    console.log(todolist)
                }}
            >show</button> */}