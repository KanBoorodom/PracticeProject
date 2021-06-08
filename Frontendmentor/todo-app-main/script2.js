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
const input = document.querySelector('#todo_input')
input.addEventListener('keyup',function(e){
    todoSize = document.querySelectorAll('.todo').length
    if((e.key === 'Enter' || e.key === 13) && (e.target.value.length>0)){
        newTodo(e.target.value)
        checkTodoSize()
        input.value = ""
    }
})
/* End Take input and create todo ------------------------------------------------------------- */

/* Create todo func------------------------------------------------------------- */
var itemLeft = document.querySelector('.item_left')
var dragSrcEl = null
const newTodo = (value)=>{
    /* Create Component------------------------------------------------------------- */
    const newTodoDiv = document.createElement('div')
    const newTodoCircle = document.createElement('span')
    const newTodoLabel = document.createElement('label')
    const newTodoInput = document.createElement('input')
    const newTodoCross = document.createElement('span')
    const newTodoEdit = document.createElement('span')
    const newType = document.querySelector('.type_todo')
    const newInfo = document.querySelector('.todo_info')
    /* todoContainer.appendChild(todoDiv) */
    todoContainer.insertBefore(newTodoDiv,newInfo)
    newTodoDiv.classList.add('todo')
    requestAnimationFrame(function () {
        newTodoDiv.classList.add('todo_create')
      })

    newTodoDiv.appendChild(newTodoCircle)
    newTodoCircle.classList.add('todo_circle')
    newTodoCircle.classList.add('hover_circle')

    newTodoDiv.appendChild(newTodoLabel)
    newTodoLabel.innerText = value
    newTodoLabel.appendChild(newTodoInput)

    newTodoInput.type = "checkbox"
    newTodoInput.classList.add('todo_checkbox')

    newTodoDiv.appendChild(newTodoCross)
    newTodoCross.classList.add('cross')

    newTodoDiv.appendChild(newTodoEdit)
    newTodoEdit.classList.add('edit')
    var editable = document.createAttribute('contenteditable')
    editable.value = 'false'
    newTodoLabel.setAttributeNode(editable)
    newTodoLabel.addEventListener('click',e=>{
        e.preventDefault()
    })

    var draggable = document.createAttribute('draggable')
    draggable.value = true
    newTodoLabel.setAttributeNode(draggable)
    /* End Create Component------------------------------------------------------------- */



    /* Drag------------------------------------------------------------- */
    
    newTodoDiv.addEventListener('dragstart',(e)=>{
        newTodoDiv.classList.add('dragStart')
        dragSrcEl = newTodoDiv
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/HTML',newTodoDiv.innerHTML)
    })
    
    newTodoDiv.addEventListener('dragend',()=>{
        newTodoDiv.classList.remove('dragStart')
    })

    newTodoDiv.addEventListener('dragover',(e)=>{
        e.preventDefault()
        newTodoDiv.classList.add('dragStart')
        newTodoDiv.classList.add('dragOver')
    })
/* sometimes dragenter not working 
    newTodoDiv.addEventListener('dragenter',(e)=>{
        newTodoDiv.classList.add('dragStart')
        newTodoDiv.classList.add('dragOver')
    })
*/    
    newTodoDiv.addEventListener('dragleave',()=>{
        newTodoDiv.classList.remove('dragStart')
        newTodoDiv.classList.remove('dragOver')
    })

    newTodoDiv.addEventListener('drop',(e)=>{
        e.stopPropagation()
        newTodoDiv.classList.remove('dragStart')
        newTodoDiv.classList.remove('dragOver')
        dragSrcEl.innerHTML = newTodoDiv.innerHTML
        newTodoDiv.innerHTML = e.dataTransfer.getData('text/HTML')

        const newLabels = document.querySelectorAll('label')
        newLabels.forEach(newLabel=>newLabel.addEventListener('click',e=>{
            e.preventDefault()
        })
        )
    })
}
/* End Drag------------------------------------------------------------- */
/* End Create todo func------------------------------------------------------------- */


/* All Active Completed------------------------------------------------------------- */
status.addEventListener('click',(e)=>{
    var checks = null
    var alreadyActive = document.querySelector('.status_active') 
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
/* End Clear------------------------------------------------------------- */

/* Set event delegation *************************************************/

/* event delegation variable****/
var todoSize,todoDiv,todoInput,todoLabel,todoCross,type = null

/* event delegation function****/
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
function checkRemove(){
    if(todoLabel.innerText.length === 0){
        todoDiv.classList.add('todo_remove')    
        setTimeout(function(){ 
        todoDiv.remove()
        checkTodoSize()
        },500)
        return
    }
}
function editSomeText(){
    type.classList.remove('nonclick')    
    todoLabel.setAttribute('contenteditable','false')
    todoLabel.style.cursor = "move"
    todoDiv.classList.remove('editTodo')
}

/* Start event delegation****/
const todos = document.querySelector('.todos')
todos.addEventListener('click',e=>{
    
    todoDiv   = e.target.parentElement
    todoInput = e.target.parentElement.querySelector('.todo_checkbox')
    todoLabel = e.target.parentElement.querySelector('label')
    todoCross = e.target.parentElement.querySelector('cross')
    type = document.querySelector('.type_todo')

    /* Click checkbox circle */
    if(e.target.classList.contains('todo_circle')){
        if(todoInput.checked || (!todoInput.checked && e.target.classList.contains('circle_active'))){
            todoInput.checked = false
            todoLabel.classList.remove('cross_active')
            todoLabel.classList.remove('active')
            e.target.classList.remove('circle_active')
            e.target.classList.add('hover_circle')
            checkTodoSize()
            return
        }
        else if(!todoInput.checked){
            todoInput.checked = true
            e.target.classList.remove('hover_circle')
            todoLabel.classList.add('cross_active') 
            e.target.classList.add('circle_active')
            checkTodoSize()
            return
        }
    }
    /* Click Edit */
    if(e.target.classList.contains('edit')){
        const totalTodos = document.querySelectorAll('.todo')
        console.log(e.target.parentElement.querySelector('.todo_circle'))
        e.target.parentElement.querySelector('.todo_circle').classList.add('edit_circle')
        todoDiv.classList.add('editTodo')
        todoLabel.style.cursor = "text"
        type.classList.add('nonclick')
        
        totalTodos.forEach((todo)=>{
            if(!todo.classList.contains('editTodo')){
                todo.classList.toggle('blur')
                todo.classList.toggle('nonclick')
            }
        })
        todoLabel.addEventListener('keypress',(e)=>{
            if(e.key === 'Enter'){
                e.preventDefault();
                checkRemove()
                totalTodos.forEach((todo)=>{
                    if(!todo.classList.contains('editTodo')){
                        todo.classList.remove('blur')
                        todo.classList.remove('nonclick')
                    }
                })        
                editSomeText()
                return
            }
        })     
        if(todoLabel.getAttribute('contenteditable') == 'true'){
            checkRemove()        
            editSomeText()
            e.target.parentElement.querySelector('.todo_circle').classList.remove('edit_circle')
            return
        }    
        todoLabel.setAttribute('contenteditable','true')
        return
    }

    /* Click Delete */
    if(e.target.classList.contains('cross')){
        console.log(e.target.parentElement)
        todoDiv.classList.add('todo_remove')    
        //todoDiv.style.opacity = '0.4'
        const allTodos = document.querySelectorAll('.todo')
        allTodos.forEach((todo)=>{
            todo.classList.remove('blur')
            todo.classList.remove('nonclick')
        })
        type.classList.remove('nonclick')
        setTimeout(function(){ 
            todoDiv.remove()
            checkTodoSize()
            },500
        )
    }
})
