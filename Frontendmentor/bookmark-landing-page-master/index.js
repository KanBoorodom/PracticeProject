/* Mobile width 375px */
/* Var */
const hamburger = document.querySelector('#hamburger')
const hambar = document.querySelectorAll('.hambar')
const menu = document.querySelector('.menu')
const logoChar = document.querySelector('.logoChar')
const circle = document.querySelector('.circle')
const path = document.querySelector('.path')
const logo = document.querySelector('.logo')

/* Function */
const menuToggle = ()=>{
    for (const a of hambar){
        a.classList.toggle('active')
    }
    menu.classList.toggle('menuActive')
    logoChar.classList.toggle('logoActive')
    circle.classList.toggle('logoActive')
    path.classList.toggle('logoActiveBlue')
    logo.classList.toggle('logoActive')
}
hamburger.addEventListener('click',menuToggle)

