const todoContainer = document.querySelector('.todo_container')
const todoInfo = document.querySelector('.todo_info')
const status = document.querySelector('.status')
const clear = document.querySelector('.clear')
const widthCheck = window.matchMedia("(max-width:800px)")
function checkStatusPosition(width){
    if(width.matches){
        todoContainer.appendChild(status)
        status.classList.add('status_bot')
    }
    else{
        todoInfo.insertBefore(status,clear)
        status.classList.remove('status_bot')
    }
}
widthCheck.addListener(checkStatusPosition)
checkStatusPosition(widthCheck)
window.addEventListener('resize',checkStatusPosition(widthCheck))
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

/* Take input and create todo */
const todoInput = document.querySelector('#todo_input')
//const todoInfo = document.querySelector('.todo_info')
todoInput.addEventListener('keyup',function(e){
    const todoSize = document.querySelectorAll('.todo').length
    if((e.key === 'Enter' || e.key === 13) && (e.target.value.length>0)){
        newTodo(e.target.value)
        checkTodoSize()
        todoInput.value = ""
    }
})
/* End Take input and create todo ------------------------------------------------------------- */

/* Create todo func------------------------------------------------------------- */

//const todoContainer = document.querySelector('.todo_container')

var todoSize
var itemLeft = document.querySelector('.item_left')

function checkTodoSize(){
    todoSize = document.querySelectorAll('.todo').length
    const activeCircle = document.querySelectorAll('.circle_active').length
    if(todoSize > 0 && (!todoInfo.classList.contains('show'))){
        todoInfo.classList.add('show') 
        status.classList.add('show')       
    }   
    else if(todoSize == 0){
        todoInfo.classList.remove('show')
        status.classList.remove('show')   
    }

    itemLeft.innerText = `${todoSize-activeCircle} items left`
}
var dragSrcEl = ''
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

    var draggable = document.createAttribute('draggable')
    draggable.value = true
    todoLabel.setAttributeNode(draggable)
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
        todoLabel.style.cursor = "move"
        todoDiv.classList.remove('editTodo')
    }
    /* End check edit function------------------------------------------------------------- */

    /* Start Edit------------------------------------------------------------- */
    todoEdit.addEventListener('click',()=>{
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
    todoCircle.addEventListener('click',()=>{
        console.log('clciked')
            /* checkbox is not checked */
            if(!todoInput.checked){
                todoInput.checked = true
                todoCircle.classList.remove('hover_circle')
                todoLabel.classList.add('cross_active') 
                todoCircle.classList.add('circle_active')
                checkTodoSize()         
                return
            }
            /* check box is checked */
            checkTodo = document.querySelectorAll('.circle_active').length
            todoInput.checked = false
            todoLabel.classList.remove('cross_active')
            todoLabel.classList.remove('active')
            todoCircle.classList.remove('circle_active')
            todoCircle.classList.add('hover_circle')
            checkTodoSize()
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
    },false)
    /* End Delete------------------------------------------------------------- */

    /* Drag------------------------------------------------------------- */
    
    todoLabel.addEventListener('dragstart',(e)=>{
        console.log('hi')
        todoDiv.style.opacity = '0.4'
        dragSrcEl = todoLabel
        console.log(dragSrcEl)
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text',todoDiv.innerText)
    },false)
    
    todoLabel.addEventListener('dragend',()=>{
        todoDiv.style.opacity = '1.0'     
    },false)
    todoLabel.addEventListener('dragover',(e)=>{
        e.preventDefault()
        todoDiv.style.transform = 'scale(1.03,1.03)' 
    },false)
    todoLabel.addEventListener('dragleave',()=>{
        todoDiv.style.transform = 'scale(1,1)' 
    },false)
    todoLabel.addEventListener('drop',(e)=>{
        todoDiv.style.transform = 'scale(1,1)'
        dragSrcEl.innerText = todoLabel.innerText
        todoLabel.innerText = e.dataTransfer.getData('text')
    },false)
    /* End Drag------------------------------------------------------------- */
}
/* End create todo func------------------------------------------------------------- */

/* All Active Completed------------------------------------------------------------- */
var alreadyActive 
status.addEventListener('click',(e)=>{
    var alreadyActive = document.querySelector('.status_active')
    var checks
    if(!e.target.classList.contains('status')){
        alreadyActive.classList.remove('status_active')
        e.target.classList.add('status_active')

        if(e.target.innerText === 'Active'){
            checks = document.querySelectorAll('.todo_circle')
            checks.forEach(check=>{
                if(check.classList.contains('circle_active')){
                    check.parentElement.classList.add('hide')
                }
                else{
                    check.parentElement.classList.remove('hide')
                }
            })
        }
        else if(e.target.innerText === 'Completed'){
            checks = document.querySelectorAll('.todo_circle')
            checks.forEach(check=>{
                if(!check.classList.contains('circle_active')){
                    check.parentElement.classList.add('hide')
                }
                else{
                    check.parentElement.classList.remove('hide')
                }
            })
        }
        else{
            checks = document.querySelectorAll('.hide')
            checks.forEach(check=>{
                check.classList.remove('hide')
            }) 
        }

    }
})
/* End All Active Completed------------------------------------------------------------- */

/* Clear------------------------------------------------------------- */
clear.addEventListener('click',()=>{
    const checks = document.querySelectorAll('.circle_active')
    checks.forEach(check=>{
        check.parentElement.classList.add('todo_remove')
        setTimeout(function(){ 
            check.parentElement.remove()
            todoSize = document.querySelectorAll('.todo').length
            if(todoSize === 0){
                todoInfo.classList.remove('show')
                status.classList.remove('show') 
            } 
        },500)
    })
   

})

