/* Nav and Scroll *******************************************/

/*Nav***********************/
const hamburger = document.querySelector('#hamburger')
const hambars = document.querySelectorAll('.hambar')
const menu = document.querySelector('.menu')
const menuItems = document.querySelectorAll('.menu_items')
const logoChar = document.querySelector('.logoChar')
const circle = document.querySelector('.circle')
const path = document.querySelector('.path')
const logo = document.querySelector('.logo')
const social = document.querySelector('.social')
const startWidth = window.innerWidth
/* Nav Function */
const menuToggle = ()=>{
    hambars.forEach((hambar)=>{
        hambar.classList.toggle('active')
    })
    menu.classList.toggle('menuActive')
    logoChar.classList.toggle('logoActive')
    circle.classList.toggle('logoActive')
    path.classList.toggle('logoActiveBlue')
    logo.classList.toggle('logoActive')
    social.classList.toggle('social_active')
}

/*Scroll***********************/
var prevScrollpos = window.pageYOffset
/* Scroll Function */
const scrollCheck = ()=>{ 
    var currentPos = window.pageYOffset;
    if(prevScrollpos > currentPos){
            menu.style.top = "2%"
    }    
    else{
            menu.style.top = "-10%"
    }
    prevScrollpos = currentPos
}
 
/* จัดการการแสดงผล Responsive nav and scroll**************/
 
if(startWidth<1024){   /* ถ้าเริ่มที่ mobile จะทำการ toggle menu items ให้ nav link ได้โดยไม่มีปัญหา */
    menuItems.forEach((menuItem)=>{
        menuItem.addEventListener('click',menuToggle)
    })
}
else{  /* ถ้าเริ่ม desktop จะจัดการ Scroll bar*/
    window.addEventListener('scroll',scrollCheck)
}

window.addEventListener('resize',()=>{
    var currentWidth = window.innerWidth
    if((currentWidth > 1024 && startWidth < 1024) || (currentWidth > 1024 && startWidth > 1024)){ /* เริ่มที่ mobile scale ไป desktop*/
        menuItems.forEach((menuItem)=>{
            menuItem.removeEventListener('click',menuToggle)
        })
        window.addEventListener('scroll',scrollCheck) 
        return    
    }
    else if((currentWidth < 1024 && startWidth < 1024) || (currentWidth < 1024 && startWidth > 1024)){ /* เริ่มที่ mobile scale ไป desktop แล้วกลับมา mobile*/
        menuItems.forEach((menuItem)=>{
            menuItem.addEventListener('click',menuToggle)
        })
        window.removeEventListener('scroll',scrollCheck) 
        menu.style.removeProperty("top");
        return
    }
    else{
        menuItems.forEach((menuItem)=>{
            menuItem.addEventListener('click',menuToggle)
        })    
    }
})
hamburger.addEventListener('click',menuToggle)

/* Tap and Feature Info*******************************************/
const tapHeads = document.querySelectorAll('.tap_head')
const featureActive = document.querySelectorAll('.feature_info_container')
/* Default อยู่ที่ tap แรก */
featureActive[0].classList.toggle('feature_active')
tapHeads[0].classList.toggle('tap_bottom_active')
tapHeads[0].classList.toggle('tap_head_active')

for (let i = 0; i<tapHeads.length;i++){
    tapHeads[i].addEventListener('click',()=>{
        let tapHeadActive = document.querySelectorAll('.tap_head_active')
        let featureAlreadyActive = document.querySelectorAll('.feature_active')
        if(tapHeadActive.length > 0){
            tapHeadActive[0].classList.toggle('tap_head_active')
            tapHeadActive[0].classList.toggle('tap_bottom_active')
        }
        tapHeads[i].classList.toggle('tap_head_active')
        tapHeads[i].classList.toggle('tap_bottom_active')
        /* คลิ๊กตัวเองไม่ต้อง toggle */
        if(featureActive[i].classList.contains('feature_active')){
            return
        }
        featureAlreadyActive[0].classList.toggle('feature_active')
        featureActive[i].classList.toggle('feature_active')      
    })
}

/* FAQ *******************************************/
const arrows = document.querySelectorAll('.arrow')
const answers = document.querySelectorAll('.answer')
const questions = document.querySelectorAll('.question')


for (let i=0;i<questions.length;i++){   /* use let in for loop to avoid closure problem !!*/
    questions[i].addEventListener('click',()=>{
        let arrowActive = document.querySelector('.arrow_active')
        let answerActive = document.querySelector('.answer_active')
        /* Check คลิ๊กตัวเองถ้าคลิ๊กตัวเองก็ toggle ให้หุบลงแล้วออกเลย */
        if(arrowActive !== null){
            if(answers[i].classList.contains('answer_active')){
                answerActive.classList.toggle('answer_active')
                arrows[i].classList.toggle('arrow_active')
                arrows[i].classList.toggle('arrow_up')
                return
            }    
            /* Check ถ้าไม่ได้คลิ๊กตัวเอง toggle ตัวก่อนหน้าให้หุบลง */
            arrowActive.classList.toggle('arrow_active')
            arrowActive.classList.toggle('arrow_up')
            answerActive.classList.toggle('answer_active')
        }
        answers[i].classList.toggle('answer_active')
        arrows[i].classList.toggle('arrow_active')
        arrows[i].classList.toggle('arrow_up')
    })
}

/* Email validation *******************************************/
const reg = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
const email = document.querySelector('#email')
const submit = document.querySelector('#form')
const input = document.querySelector('.input')
const text = document.querySelector('.normal_text')
const inputContainer = document.querySelector('.inputContainer')
const errorIcon = document.querySelector('.errorIcon')
var errorOn = false
submit.addEventListener('submit',function(e){
    e.preventDefault()
    if(email.value.match(reg)){
        if(errorOn){
            text.classList.toggle('text_error')
            inputContainer.classList.toggle('input_error')
            errorIcon.classList.toggle('error')
            errorOn = false
        }
    }
    else{
        if(!errorOn){ /* ป้องกันไม่ให้กดปุ่มซ้ำแล้วทำให้ error หายถ้ายังไม่ valid */
            text.classList.toggle('text_error')
            inputContainer.classList.toggle('input_error')
            errorIcon.classList.toggle('error')
            errorOn = true
        }
    }
})
