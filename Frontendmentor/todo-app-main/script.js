window.onload = (event)=>{
    document.querySelector('body').classList.remove('preload')
}

/* Swap theme------------------------------------------------------------- */
const themeBtn = document.querySelector('.toggle_btn')
const changeTheme = ()=>{
    document.body.classList.toggle('light')
}
themeBtn.addEventListener('click',changeTheme)
/* End Swap theme ------------------------------------------------------------- */


/* Create todo func------------------------------------------------------------- */
const todoContainer = document.querySelector('.todo_container')
const newTodo = (value)=>{
    const todoDiv = document.createElement('div')
    const todoCircle = document.createElement('span')
    const todoLabel = document.createElement('label')
    const todoInput = document.createElement('input')
    const todoCross = document.createElement('span')
/* 
    const todo = document.createElement('div')
    const todoText = document.createElement('p')
    const todoCheckBox = document.createElement('input')
    const todoCheckBoxLabel = document.createElement('label')
    const todoCross = document.createElement('span')
    todoText.textContent = value
    todoCheckBox.type = "checkbox"
    todoCheckBox.name = "checkbox"
    todoCheckBoxLabel.htmlFor = "checkbox" /* link label with input field
    todoCross.classList.add('cross')
 */   
    todoContainer.appendChild(todoDiv)
    todoDiv.classList.add('todo')
    requestAnimationFrame(function () {
        todoDiv.classList.add('todo_create')
      })
    todoDiv.appendChild(todoCircle)
    todoCircle.classList.add('todo_circle')
    todoCircle.classList.add('hover_circle')
    todoDiv.appendChild(todoLabel)
    todoLabel.innerText = value
    todoLabel.appendChild(todoInput)
    todoInput.type = "checkbox"
    todoDiv.appendChild(todoCross)
    todoCross.classList.add('cross')

    const labels = [todoCircle,todoLabel]
    labels.forEach((label)=>{
        label.addEventListener('click',(e)=>{
            /* checkbox is not checked */
            if(!todoInput.checked){
                todoInput.checked = true
                todoCircle.classList.remove('hover_circle')
                todoLabel.classList.add('cross_active') 
                todoCircle.classList.add('circle_active')
                return
            }
            /* check box is checked */
            todoInput.checked = false
            todoLabel.classList.remove('cross_active')
            todoLabel.classList.remove('active')
            todoCircle.classList.remove('circle_active')
            todoCircle.classList.add('hover_circle')
        })
    })
/* 
    /* delete done 
    todoCross.addEventListener('click',(e)=>{
        e.target.parentElement.remove()
    })

    todo.classList.add('todo')
    todoCheckBoxLabel.classList.add('todo_circle')
    todoCross.classList.add('cross')

    todo.appendChild(todoCheckBox)
    todo.appendChild(todoCheckBoxLabel)
    todo.appendChild(todoText)
    todo.appendChild(todoCross)
    todoContainer.appendChild(todo)
 */
    todoCross.addEventListener('click',()=>{
        todoDiv.classList.add('todo_remove')    
        setTimeout(function(){ 
            todoCross.parentElement.remove()
            },500
        )
    })
}
/* End create todo func------------------------------------------------------------- */

/* Todo */
const todoInput = document.querySelector('#todo_input')
const todos = []
todoInput.addEventListener('keyup',function(e){
    if(e.key === 'Enter' || e.key === 13){
        todos.push({value:e.target.value,checked:false})
        newTodo(e.target.value)
        todoInput.value = ""
    }
})
