import React,{useState,useEffect} from 'react'
import './App.css';
import './Components/Todobox.css'
import './Components/Todo.css'
import Addtodo from './Components/Addtodo'
import Todobox from './Components/Todobox'
function App() {
  const [todolist,setTodolist] = useState([])
  const [inputText,setInputtext] = useState('')
  const [filterTodo,setFilterTodo] = useState([]) 
  const [status,setStatus] = useState('')
  const handleFilter = ()=>{
      switch(status){
        case 'Done':
            setFilterTodo(todolist.filter(item => item.check))
            break
        case 'NotDone':
            setFilterTodo(todolist.filter(item => !item.check))
            break
        default:
            setFilterTodo(todolist)
    }
  }

  useEffect(()=>{
    console.log(todolist)
    handleFilter()
  },
  [todolist,status])
  return (
    <div className="App">
        <h1>KAN's todolist</h1>
        <Addtodo 
          todolist = {todolist} 
          setTodolist = {setTodolist}
          inputText = {inputText}
          setInputtext = {setInputtext}  
          setStatus = {setStatus}
        />
        <Todobox
          todolist = {todolist}
          setTodolist = {setTodolist}
          filterTodo = {filterTodo}
        />
    </div>
  );
}

export default App;
