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
    console.log(todoContainer)
    const todo = document.createElement('div')
    const todoText = document.createElement('p')
    const todoCheckBox = document.createElement('input')
    const todoCheckBoxLabel = document.createElement('label')
    const todoCross = document.createElement('span')
    todoText.textContent = value
    todoCheckBox.type = "checkbox"
    todoCheckBox.name = "checkbox"
    todoCheckBoxLabel.htmlFor = "checkbox" /* sets or returns the value of the for attribute of a label. */
    todoCross.classList.add('cross')
    /* Cancle checked */
    todoCheckBoxLabel.addEventListener('click',(e)=>{
        if(!todoCheckBox.checked){
            todoCheckBox.checked = true
            todoCheckBoxLabel.classList.add('active')
            todoText.classList.add('cross_active') 
            console.log('hi')
            return
        }
        todoCheckBox.checked = false
        todoText.classList.remove('cross_active')
        todoCheckBoxLabel.classList.remove('active')
    })

    /* delete done */
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
