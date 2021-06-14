import React, {useState,useEffect} from 'react'
import './App.css';
//Importing Components
import Form from './Components/Form'
import TodoList from './Components/TodoList';
function App() {
  //State stuff
  const [inputText, setInputText] = useState("")
  const [todos,setTodos] = useState([])
  const [status,setStatus] = useState('all')
  const [filterTodos,setfilterTodos] = useState([])

  //Run Once when app start
  useEffect(()=>{
    getLocalTodos()
  }, []) //empty array cause only run once
  //Use Effect
  useEffect(()=>{
    saveLocalTodos()
    filterHandler()
  }, [todos,status]) //everytime todo and status change do a function

  //function
  const filterHandler = ()=>{
    switch(status){
      case 'completed':
        setfilterTodos(todos.filter(todo=> todo.completed === true))
        break
      case 'uncompleted':
        setfilterTodos(todos.filter(todo=> todo.completed === false))
        break
      default:
        setfilterTodos(todos)
        break
    }
  }

  //Save to local
  //Refresh แล้วข้อมูลก็ยังคงอยู๋ 
  const saveLocalTodos = ()=>{
      localStorage.setItem('todos',JSON.stringify(todos))
  }
  const getLocalTodos = ()=>{
    if(localStorage.getItem('todos' === null)){
      localStorage.setItem('todos',JSON.stringify([]))
    }else{
      let todoLocal = JSON.parse(localStorage.getItem('todos'))
      setTodos(todoLocal)
    }
  }

  return (
    <div className="App">
      <header>
        Kan's Todo list
      </header>
      <Form todos={todos} 
            setTodos={setTodos} 
            inputText={inputText} 
            setInputText = {setInputText}
            setStatus = {setStatus}
      />
      <TodoList setTodos = {setTodos} 
                todos={todos} 
                filterTodos = {filterTodos}
      />
    </div>
  );
}
export default App;
