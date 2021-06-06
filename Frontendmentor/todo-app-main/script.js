

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
function checkTodoSize(){
    const todoSize = document.querySelectorAll('.todo').length
    if(todoSize > 0){
        todoInfo.classList.add('show_info')        
    }   
    else if(todoSize == 0){
        todoInfo.classList.remove('show_info')
    }
    document.querySelector('.item_left').innerText = `${todoSize} items left`
}

const newTodo = (value)=>{
    /* Create Component------------------------------------------------------------- */
    const todoDiv = document.createElement('div')
    const todoCircle = document.createElement('span')
    const todoLabel = document.createElement('label')
    const todoInput = document.createElement('input')
    const todoCross = document.createElement('span')
    const todoEdit = document.createElement('span')
    const type = document.querySelector('.type_todo')
    const info = document.querySelector('.todo_info')
    /* todoContainer.appendChild(todoDiv) */
    todoContainer.insertBefore(todoDiv,info)
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
    todoInput.classList.add('todo_checkbox')

    todoDiv.appendChild(todoCross)
    todoCross.classList.add('cross')

    todoDiv.appendChild(todoEdit)
    todoEdit.classList.add('edit')
    var editable = document.createAttribute('contenteditable')
    editable.value = 'false'
    todoLabel.setAttributeNode(editable)
    /* End Create Component------------------------------------------------------------- */

    /* check edit function------------------------------------------------------------- */
    todoLabel.addEventListener('click',(e)=>{
        e.preventDefault()
    })
    /* ลบข้อความทิ้งทั้งหมด */
    const checkRemove = ()=>{
        if(todoLabel.innerText.length === 0){
            todoDiv.classList.add('todo_remove')    
            setTimeout(function(){ 
            todoCross.parentElement.remove()
            },500)
            return
        }
    }
    /* แก้ข้อความบางส่วน */
    const editSomeText = ()=>{
        type.classList.remove('nonclick')    
        editable.value = 'false'
        todoLabel.style.cursor = "default"
        todoDiv.classList.remove('editTodo')
    }
    /* End check edit function------------------------------------------------------------- */

    /* Start Edit------------------------------------------------------------- */
    todoEdit.addEventListener('click',(e)=>{
        todoDiv.classList.add('editTodo')
        todoLabel.style.cursor = "text"

        /* ทำให้ที่ add คลิ็กไม่ได้ */
        type.classList.add('nonclick')
        /* ทำให้ todo ตัวอื่นทุกตัวคลิ้กไม่ได้เมื่อมีตัวใดตัวหนึ่งกำลังถูกแก้ไข */
        const todos = document.querySelectorAll('.todo')
        todos.forEach((todo)=>{
            if(!todo.classList.contains('editTodo')){
                todo.classList.toggle('blur')
                todo.classList.toggle('nonclick')
            }
        })

        /* ยืนยันการแก้ข้อความโดยกดที่ปุ่น enter*/
        todoLabel.addEventListener('keypress',(e)=>{
            if(e.key === 'Enter'){
                e.preventDefault();
                checkRemove()
                /* กด enter หมายถึงแก้ไขสำเร็จแล้วจะเป็นการ remove อย่างเดียว */
                todos.forEach((todo)=>{
                    if(!todo.classList.contains('editTodo')){
                        todo.classList.remove('blur')
                        todo.classList.remove('nonclick')
                    }
                })        
                editSomeText()
                return
            }
        })        
        /* ยืนยันการแก้ข้อความโดยกดที่ปุ่น edit ซ้ำ */
        if(editable.value == 'true'){
            checkRemove()        
            editSomeText()
            return
        } 

        editable.value = 'true'
    })
    /* End Edit------------------------------------------------------------- */

    /* Checkbox------------------------------------------------------------- */
    todoCircle.addEventListener('click',(e)=>{
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
    /* End Checkbox------------------------------------------------------------- */

    /* Delete------------------------------------------------------------- */
    todoCross.addEventListener('click',()=>{
        todoDiv.classList.add('todo_remove')    
        const todos = document.querySelectorAll('.todo')
        todos.forEach((todo)=>{
            todo.classList.remove('blur')
            todo.classList.remove('nonclick')
        })
        type.classList.remove('nonclick')
        setTimeout(function(){ 
            todoCross.parentElement.remove()
            checkTodoSize()
            },500
        )
        checkTodoSize()
    })
    /* End Delete------------------------------------------------------------- */
}
/* End create todo func------------------------------------------------------------- */

/* Todo */
const todoInput = document.querySelector('#todo_input')
const todoInfo = document.querySelector('.todo_info')
/* const todos = []
 */
todoInput.addEventListener('keyup',function(e){
    const todoSize = document.querySelectorAll('.todo').length
    if((e.key === 'Enter' || e.key === 13) && (e.target.value.length>0)){
/*         if(todoSize == 0){
            todoInfo.classList.add('show_info')           
        }     */
       /*  todos.push({value:e.target.value,checked:false}) */
        newTodo(e.target.value)
        /*  */
        checkTodoSize()
        todoInput.value = ""
    }
})


