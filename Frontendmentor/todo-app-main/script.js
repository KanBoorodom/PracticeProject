/* Swap theme */
const themeBtn = document.querySelector('.toggle_btn')
const changeTheme = ()=>{
    document.body.classList.toggle('light')
}
themeBtn.addEventListener('click',changeTheme)

/* Todo */
const todoInput = document.querySelector('#todo_input')
const todos = []
todoInput.addEventListener('keyup',function(e){
    if(e.key === 'Enter' || e.key === 13){
        todos.push(e.target.value)
       /*  console.log(todos) */
    todoInput.value = ""
    }
})

const newTodo = (value)=>{
    const todo = document.createElement('div')
    const todoText = document.createElement('p')
    const todoCheckBox = document.createElement('input')
    const todoCheckBoxLabel = document.createElement('label')
    const todoCross = document.createElement('span')

    todoText.textContent = value
    todoCheckBox.type = "checkbox"
    todoCheckBox.name = "checkbox"
    todoCheckBoxLabel.htmlFor = "checkbox" /* sets or returns the value of the for attribute of a label. */
    
    todoCheckBoxLabel.addEventListener('click',(e)=>{
        /* กดที่ label เพื่อยกเลิก check */
        if(todoCheckBox.checked){
            todoCheckBox.checked = false
            todoText.style.textDecoration = "none"
            todoCheckBoxLabel.classList.remove('active')
        }else{
            todoCheckBox.checked = false
            todoText.style.textDecoration = "line-through"
            todoCheckBoxLabel.classList.add('active')
        }
    })

    todoCross.style.backgroundImage = "url('./images/icon-cross.svg')"
    todoCross.addEventListener('click',(e)=>{
        e.target.parentElement.remove()
    })


}